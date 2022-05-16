package com.wf.hackathon.polyglots.pronunciation;

import com.wf.hackathon.polyglots.pronunciation.exception.FileStorageException;
import com.wf.hackathon.polyglots.pronunciation.model.User;
import com.wf.hackathon.polyglots.pronunciation.model.Voice;
import com.wf.hackathon.polyglots.pronunciation.repo.PronunciationRepo;
import com.wf.hackathon.polyglots.pronunciation.repo.VoiceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
@Transactional
public class PronunciationService {

    String basePath = "/polyglots/audioclips/";

    @Autowired
    private final PronunciationRepo pronunciationRepo;

    @Autowired
    private final VoiceRepo voiceRepo;

    @Autowired
    private FilesWrapper filesWrapper;

    public PronunciationService(PronunciationRepo pronunciationRepo, VoiceRepo voiceRepo, FilesWrapper filesWrapper) {
        this.pronunciationRepo = pronunciationRepo;
        this.voiceRepo = voiceRepo;
        this.filesWrapper = filesWrapper;
    }

    public String getPronunciation(String uid, String fname, String lname, String country, String voiceName, String voiceGender) {
        String path;
        Voice voice;

        //Check if VoiceName provided
        if (voiceName != null) {
            MsCognitiveServiceClient msCognitiveServiceClient = new MsCognitiveServiceClient();
            System.out.println(voiceName);
            path = msCognitiveServiceClient.generateSpeechAndSave(uid, fname + " " + lname, voiceName, basePath);
            /*User user = new User(uid, fname, lname, country, path, new Date(), voiceName, voiceGender, false);
            pronunciationRepo.save(user);*/
            return path;
        }

        //Check if user exists in DB
        User dbUser = pronunciationRepo.findByUid(uid);
        if (dbUser != null) {
            path = dbUser.getAudio_file_path();
            dbUser.setAudio_file_path(path);
            pronunciationRepo.save(dbUser);
            return path;
        }

        // Find voice by country
        List<Voice> voiceList = voiceRepo.findByCountry(country);
        if (voiceList.size() == 0) {
            List<Voice> defaultVoiceList = voiceRepo.findByCountry("United States");
            Random randomizer = new Random();
            voice = defaultVoiceList.get(randomizer.nextInt(defaultVoiceList.size()));
        } else if (voiceList.size() > 1) {
            Random randomizer = new Random();
            voice = voiceList.get(randomizer.nextInt(voiceList.size()));
        } else {
            voice = voiceList.get(0);
        }
        MsCognitiveServiceClient msCognitiveServiceClient = new MsCognitiveServiceClient();
        System.out.println(voice.getVoice_name());
        path = msCognitiveServiceClient.generateSpeechAndSave(uid, fname + " " + lname, voice.getVoice_name(), basePath);
        User user = new User(uid, fname, lname, voice.getCountry(), path, new Date(), voice.getVoice_name(), voice.getGender(), false);
        pronunciationRepo.save(user);

        return path;
    }

    public User savePronunciation(MultipartFile file, String uid, String fname, String lname, String country, String voiceName, String voiceGender, Boolean serviceOptOut) {
        String fileName = uid.toLowerCase().trim() + ".wav";
        Path fileStorageLocation = Paths.get(basePath).toAbsolutePath().normalize();
        User user = new User();
        user.setUid(uid);
        user.setFirst_name(fname);
        user.setLast_name(lname);
        user.setLast_modified_date(new Date());
        user.setCountry(country);
        try {
            if (serviceOptOut) {
                user.setVoice_name("N/A");
                user.setVoice_gender("N/A");
                user.setAudio_file_path("N/A");
                pronunciationRepo.save(user);
            } else {
                user.setVoice_name(voiceName);
                user.setVoice_gender(voiceGender);
                Path targetLocation = fileStorageLocation.resolve(fileName);
                filesWrapper.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                user.setAudio_file_path(targetLocation.toString());
                pronunciationRepo.save(user);
            }


            return user;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ".wav" + ". Please try again!", ex);
        }
    }

    public User serviceOptOut(String uid, Boolean serviceOptOut) {
        User dbUser = pronunciationRepo.findByUid(uid);
        dbUser.setService_opt_out(serviceOptOut);

        return pronunciationRepo.save(dbUser);
    }
}
