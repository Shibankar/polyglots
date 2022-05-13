package com.wf.hackathon.polyglots.pronunciation;

import com.wf.hackathon.polyglots.FttsClient;
import com.wf.hackathon.polyglots.pronunciation.exception.FileStorageException;
import com.wf.hackathon.polyglots.pronunciation.model.User;
import com.wf.hackathon.polyglots.pronunciation.repo.PronunciationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
@Transactional
public class PronunciationService {

    String basePath = "/Users/shibankar/Documents/WF_Hackathon/audio_clips/";

    @Autowired
    private final PronunciationRepo pronunciationRepo;

    public PronunciationService(PronunciationRepo pronunciationRepo) {
        this.pronunciationRepo = pronunciationRepo;
    }

    public String getPronunciation(String uid, String fname, String lname) {
        String path;
        User user = pronunciationRepo.findByUid(uid);
        if (user != null) {
            path = user.getAudio_file_path();
        } else {
            FttsClient fttsClient = new FttsClient();
            path = fttsClient.generateAndSaveAudio(uid, fname, lname);
        }
        return path;
    }

    public String savePronunciation(MultipartFile file, String uid) {
        String fileName = uid.toLowerCase().trim() + ".wav";
        Path fileStorageLocation = Paths.get(basePath).toAbsolutePath().normalize();
        try {
            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return targetLocation.toString();
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ".wav" + ". Please try again!", ex);
        }
    }
}
