package com.wf.hackathon.polyglots.pronunciation;

import com.sun.istack.NotNull;
import com.wf.hackathon.polyglots.pronunciation.repo.PronunciationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

@RequestMapping("/api/v1/pronunciation")
@RestController
public class PronunciationController {

    @Autowired
    private final PronunciationService pronunciationService;

    public PronunciationController(PronunciationService pronunciationService) {
        this.pronunciationService = pronunciationService;
    }


    @GetMapping(produces = MediaType.APPLICATION_OCTET_STREAM_VALUE, value = "/byId")
    public ResponseEntity getUserById(@NotNull @RequestParam("uid") String uid, @NotNull @RequestParam("fname") String fname, @NotNull @RequestParam("lname") String lname) throws FileNotFoundException {
        String filePath = pronunciationService.getPronunciation(uid, fname, lname);
        System.out.println(filePath);
        long length = new File(filePath).length();
        InputStreamResource inputStreamResource = new InputStreamResource( new FileInputStream(filePath));
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentLength(length);
        httpHeaders.set("Content-Type", "audio/vnd.wav");
        httpHeaders.setCacheControl(CacheControl.noCache().getHeaderValue());
        return new ResponseEntity(inputStreamResource, httpHeaders, HttpStatus.OK);
    }

    @PostMapping(value = "/save")
    public String uploadFile(@NotNull @RequestParam("file") MultipartFile file, @NotNull @RequestParam("uid") String uid){
        String filePath = pronunciationService.savePronunciation(file, uid);
        return  filePath;
    }

}
