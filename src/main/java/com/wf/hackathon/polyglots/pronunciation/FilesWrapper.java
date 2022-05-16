package com.wf.hackathon.polyglots.pronunciation;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.CopyOption;
import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class FilesWrapper {
    public void copy(InputStream in, Path target, CopyOption... options) throws IOException {
        Files.copy(in, target, options);
    }
}
