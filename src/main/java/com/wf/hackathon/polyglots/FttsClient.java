package com.wf.hackathon.polyglots;

import com.sun.speech.freetts.Voice;
import com.sun.speech.freetts.VoiceManager;
import com.sun.speech.freetts.audio.AudioPlayer;
import com.sun.speech.freetts.audio.SingleFileAudioPlayer;

import javax.sound.sampled.AudioFileFormat.Type;

public class FttsClient {

    public String generateAndSaveAudio(String uid, String fname, String lname) {
        System.setProperty("freetts.voices", "com.sun.speech.freetts.en.us.cmu_us_kal.KevinVoiceDirectory");
        String basePath = "/Users/shibankar/Documents/WF_Hackathon/audio_clips/";
        AudioPlayer audioPlayer;
        String voiceName = "kevin16";

        System.out.println();
        System.out.println("Using voice: " + voiceName);

        VoiceManager voiceManager = VoiceManager.getInstance();
        Voice helloVoice = voiceManager.getVoice(voiceName);

        if (helloVoice == null) {
            System.err.println(
                    "Cannot find a voice named "
                            + voiceName + ".  Please specify a different voice.");
        }

        audioPlayer = new SingleFileAudioPlayer(basePath + uid.toLowerCase().trim(), Type.WAVE);
        helloVoice.setAudioPlayer(audioPlayer);
        helloVoice.allocate();
        helloVoice.speak(fname + " " + lname);
        helloVoice.deallocate();
        audioPlayer.close();
        return (basePath + uid + ".wav").trim();
    }

}
