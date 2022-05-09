package com.wf.hackathon.polyglots.pronunciation;

import com.sun.istack.NotNull;
import com.wf.hackathon.polyglots.pronunciation.model.User;
import com.wf.hackathon.polyglots.pronunciation.repo.PronunciationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/pronunciation")
@RestController
public class PronunciationController {

//    @Autowired
//    private final PronunciationRepo pronunciationRepo;
//
//    public PronunciationController(PronunciationRepo pronunciationRepo) {
//        this.pronunciationRepo = pronunciationRepo;
//    }
//
//
//    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/byId")
//    public ResponseEntity<User> getUserById(@NotNull @RequestParam("uid") String uid) {
//        return ResponseEntity.status(HttpStatus.OK).body(pronunciationRepo.searchUserById(uid));
//    }

}
