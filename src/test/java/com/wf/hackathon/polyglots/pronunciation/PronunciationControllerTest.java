package com.wf.hackathon.polyglots.pronunciation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wf.hackathon.polyglots.pronunciation.model.User;
import com.wf.hackathon.polyglots.pronunciation.model.Voice;
import com.wf.hackathon.polyglots.pronunciation.repo.PronunciationRepo;
import com.wf.hackathon.polyglots.pronunciation.repo.VoiceRepo;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.any;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = PronunciationController.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Tag("UnitTest")
public class PronunciationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PronunciationService pronunciationService;

    @MockBean
    private VoiceRepo voiceRepo;

    @MockBean
    private PronunciationRepo pronunciationRepo;

    /*@MockBean
    private ObjectMapper objectMapper;*/

    private final String basePath = "/api/v1/pronunciation";

    @Test
    public void contextLoads() { assertNotNull(pronunciationService); };

    /*@Test
    public void getUserByIdTestNotFound() throws Exception {
        when(pronunciationService.getPronunciation(anyString(), anyString(), anyString(), anyString(), anyString(), anyString()))
                .thenReturn("/filepath");

        mockMvc.perform(MockMvcRequestBuilders.get(basePath+ "/byId?uid=\"U123\"&fname=\"fname\"&lname=\"lname\"&country=\"country\""))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }*/

    @Test
    public void uploadFileTest() throws Exception {
        User mockUser = mock(User.class);

        MockMultipartFile audioFile = new MockMultipartFile("file.wav", "", "audio/vnd.wav", "".getBytes());

        when(pronunciationService.savePronunciation(
                eq(audioFile),
                anyString(),
                anyString(),
                anyString(),
                anyString(),
                anyString(),
                anyString(),
                eq(Boolean.TRUE))
        )
                .thenReturn(mockUser);

        mockMvc.perform(MockMvcRequestBuilders.multipart(basePath+ "/save")
                        .file("file", audioFile.getBytes())
                .queryParam("uid","uid")
                .queryParam("fname","fname")
                .queryParam("lname","lname")
                .queryParam("country","country")
                .queryParam("voicename","voicename")
                .queryParam("voicegender","voicegender")
                .queryParam("serviceOptOut", String.valueOf(Boolean.FALSE)));
    }

    @Test
    public void serviceOptOutTest() throws Exception {
        User user = new User();
        when(pronunciationService.serviceOptOut(anyString(), anyBoolean())).thenReturn(user);

        mockMvc.perform(MockMvcRequestBuilders.post(basePath+ "/serviceOptOut")
                        .queryParam("uid", "uid")
                        .queryParam("serviceOptOut", String.valueOf(Boolean.FALSE)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void getAllVoicesTest() throws Exception {
        List<Voice> voiceList = new ArrayList<>();

        when(voiceRepo.findAll()).thenReturn(voiceList);
        mockMvc
                .perform(MockMvcRequestBuilders.get(basePath+ "/getVoices").requestAttr("uid","uid"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void getUserByIdTest() throws Exception {
        User mockUser = new User();

        when(pronunciationRepo.findByUid(anyString())).thenReturn(mockUser);
        mockMvc
                .perform(MockMvcRequestBuilders.get(basePath+ "/getUserById?uid=U000007"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
