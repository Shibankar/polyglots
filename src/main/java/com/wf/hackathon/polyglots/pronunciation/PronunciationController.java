package com.wf.hackathon.polyglots.pronunciation;

import com.sun.istack.NotNull;
import com.wf.hackathon.polyglots.pronunciation.model.User;
import com.wf.hackathon.polyglots.pronunciation.model.Voice;
import com.wf.hackathon.polyglots.pronunciation.repo.PronunciationRepo;
import com.wf.hackathon.polyglots.pronunciation.repo.VoiceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.List;

@RequestMapping("/api/v1/pronunciation")
@RestController
public class PronunciationController {

    @Autowired
    private final PronunciationService pronunciationService;

    @Autowired
    private final VoiceRepo voiceRepo;

    @Autowired
    private final PronunciationRepo pronunciationRepo;

    public PronunciationController(PronunciationService pronunciationService, VoiceRepo voiceRepo, PronunciationRepo pronunciationRepo) {
        this.pronunciationService = pronunciationService;
        this.voiceRepo = voiceRepo;
        this.pronunciationRepo = pronunciationRepo;
    }


    @GetMapping(produces = MediaType.APPLICATION_OCTET_STREAM_VALUE, value = "/byId")
    public ResponseEntity getUserById(@NotNull @RequestParam("uid") String uid,
                                      @NotNull @RequestParam("fname") String fname,
                                      @NotNull @RequestParam("lname") String lname,
                                      @NotNull @RequestParam("country") String country,
                                      @RequestParam(value = "voicename", required = false) String voiceName ) throws FileNotFoundException {
        String filePath = pronunciationService.getPronunciation(uid, fname, lname, country, voiceName);
        System.out.println(filePath);
        long length = new File(filePath).length();
        InputStreamResource inputStreamResource = new InputStreamResource(new FileInputStream(filePath));
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentLength(length);
        httpHeaders.set("Content-Type", "audio/vnd.wav");
        httpHeaders.setCacheControl(CacheControl.noCache().getHeaderValue());
        return new ResponseEntity(inputStreamResource, httpHeaders, HttpStatus.OK);
    }

        @PostMapping(value = "/save")
    public User uploadFile(@NotNull @RequestParam("file") MultipartFile file,
                             @NotNull @RequestParam("uid") String uid,
                             @NotNull @RequestParam("fname") String fname,
                             @NotNull @RequestParam("lname") String lname,
                             @NotNull @RequestParam("country") String country,
                             @NotNull @RequestParam("voicename") String voiceName,
                             @NotNull @RequestParam("voicegender") String voiceGender,
                             @NotNull @RequestParam("serviceOptOut") Boolean serviceOptOut){

            return pronunciationService.savePronunciation(file, uid, fname, lname, country, voiceName, voiceGender, serviceOptOut);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/getVoices")
    public ResponseEntity<List<Voice>> getAllVoices() {
        return ResponseEntity.ok().body(voiceRepo.findAll());
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/getUserById")
    public ResponseEntity<User> getUserById(@NotNull @RequestParam("uid") String uid){
        return ResponseEntity.ok().body(pronunciationRepo.findByUid(uid));
    }

}
