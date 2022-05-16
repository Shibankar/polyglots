package com.wf.hackathon.polyglots.pronunciation;

import com.wf.hackathon.polyglots.pronunciation.exception.FileStorageException;
import com.wf.hackathon.polyglots.pronunciation.model.User;
import com.wf.hackathon.polyglots.pronunciation.repo.PronunciationRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PronunciationServiceTest {

    @InjectMocks
    private PronunciationService pronunciationService;

    @Mock
    private PronunciationRepo pronunciationRepo;

    @Mock
    private FilesWrapper filesWrapper;

    @Test
    public void getPronunciationTestWithNoVoiceName() throws IOException {

        User mockUser = mock(User.class);
        when(pronunciationRepo.findByUid(anyString())).thenReturn(mockUser);
        lenient().doNothing().when(filesWrapper).copy(any(InputStream.class), any(Path.class), eq(StandardCopyOption.REPLACE_EXISTING));
        lenient().when(pronunciationRepo.save(mockUser)).thenReturn(mockUser);

        MsCognitiveServiceClient mockMsCognitiveServiceClient = mock(MsCognitiveServiceClient.class);
        lenient().when(mockMsCognitiveServiceClient.generateSpeechAndSave(
                anyString(),
                anyString(),
                anyString(),
                anyString()
        )).thenReturn("/file_path");

        pronunciationService.getPronunciation(
                "UID",
                "fname",
                "lname",
                "country",
                eq(null),
                "voiceGender");

    }

    @Test
    public void savePronunciationTestWithServiceOptOut() {
        User mockUser = mock(User.class);
        when(pronunciationRepo.save(any(User.class))).thenReturn(mockUser);

        pronunciationService.savePronunciation(
                mock(MultipartFile.class),
                "UID",
                "fname",
                "lname",
                "country",
                "voiceName",
                "voiceGender",
                Boolean.TRUE
        );
    }

    /*@Test
    public void savePronunciationTestThrowsException() throws IOException {
        User mockUser = mock(User.class);
        when(pronunciationRepo.save(any(User.class))).thenReturn(mockUser);
        doThrow(IOException.class).doNothing().when(filesWrapper).copy(any(InputStream.class), any(Path.class), eq(StandardCopyOption.REPLACE_EXISTING));

        *//*pronunciationService.savePronunciation(
                mock(MultipartFile.class),
                "UID",
                "fname",
                "lname",
                "country",
                "voiceName",
                "voiceGender",
                Boolean.TRUE
        );*//*

        assertThatThrownBy(() -> pronunciationService.savePronunciation(
                mock(MultipartFile.class),
                "UID",
                "fname",
                "lname",
                "country",
                "voiceName",
                "voiceGender",
                Boolean.FALSE
        )).isInstanceOf(FileStorageException.class);
    }*/

    @Test
    public void savePronunciationTestWithServiceOptIn() {
        User mockUser = mock(User.class);
        when(pronunciationRepo.save(any(User.class))).thenReturn(mockUser);

        pronunciationService.savePronunciation(
                mock(MultipartFile.class),
                "UID",
                "fname",
                "lname",
                "country",
                "voiceName",
                "voiceGender",
                Boolean.FALSE
        );
    }

    @Test
    public void serviceOptOutTest() {
        User mockUser = mock(User.class);
        when(pronunciationRepo.findByUid(anyString())).thenReturn(mockUser);

        pronunciationService.serviceOptOut("UIDXYZ", Boolean.TRUE);
    }
}
