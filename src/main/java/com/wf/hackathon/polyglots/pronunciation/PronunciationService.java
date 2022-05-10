package com.wf.hackathon.polyglots.pronunciation;

import com.wf.hackathon.polyglots.FttsClient;
import com.wf.hackathon.polyglots.pronunciation.model.User;
import com.wf.hackathon.polyglots.pronunciation.repo.PronunciationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PronunciationService {

    @Autowired
    private final PronunciationRepo pronunciationRepo;

    public PronunciationService(PronunciationRepo pronunciationRepo) {
        this.pronunciationRepo = pronunciationRepo;
    }

    public String getPronunciation(String uid, String fname, String lname){
        String path;
        User user = pronunciationRepo.findByUid(uid);
        if(user != null){
            path = user.getAudio_file_path();
        } else {
            FttsClient fttsClient = new FttsClient();
            path = fttsClient.generateAndSaveAudio(uid, fname, lname);
        }
        return path;
    }
}
