//package com.wf.hackathon.polyglots;
//
//import java.util.Locale;
//import java.util.Scanner;
//import javax.speech.Central;
//import javax.speech.synthesis.Synthesizer;
//import javax.speech.synthesis.SynthesizerModeDesc;
//
//import com.sun.speech.freetts.FreeTTS;
//import com.sun.speech.freetts.Voice;
//import com.sun.speech.freetts.VoiceManager;
//import com.sun.speech.freetts.audio.AudioPlayer;
//import com.sun.speech.freetts.audio.SingleFileAudioPlayer;
//
//
//import javax.sound.sampled.AudioFileFormat.Type;
//
//public class TextSpeech {
//
//    public static void main(String[] args) {
//        Scanner input = new Scanner(System.in);
//        String i = input.next();
//        TextSpeech textSpeech = new TextSpeech();
//        textSpeech.playAudio(i);
//        textSpeech.saveAudio(i);
//    }
//
//    private void saveAudio(String text) {
//        System.setProperty("freetts.voices", "com.sun.speech.freetts.en.us" + ".cmu_us_kal.KevinVoiceDirectory");
//        FreeTTS freetts;
//        AudioPlayer audioPlayer = null;
//        String voiceName = "kevin16";
//
//        System.out.println();
//        System.out.println("Using voice: " + voiceName);
//
//        VoiceManager voiceManager = VoiceManager.getInstance();
//        Voice helloVoice = voiceManager.getVoice(voiceName);
//
//        if (helloVoice == null) {
//            System.err.println(
//                    "Cannot find a voice named "
//                            + voiceName + ".  Please specify a different voice.");
//            System.exit(1);
//        }
//
//        audioPlayer = new SingleFileAudioPlayer("/Users/shibankar/Documents/WF_Hackathon/audio_clips/"+ text, Type.WAVE);
//        helloVoice.setAudioPlayer(audioPlayer);
//        helloVoice.allocate();
//        helloVoice.speak(text);
//        helloVoice.deallocate();
//        audioPlayer.close();
//        System.exit(0);
//    }
//
//    private void playAudio(String text) {
//        try {
//            System.setProperty("freetts.voices", "com.sun.speech.freetts.en.us.cmu_us_kal.KevinVoiceDirectory");
//            Central.registerEngineCentral("com.sun.speech.freetts.jsapi.FreeTTSEngineCentral");
//            Synthesizer synthesizer = Central.createSynthesizer(new SynthesizerModeDesc(Locale.ENGLISH));
//            synthesizer.allocate();
//            synthesizer.resume();
//            synthesizer.speakPlainText(text, null);
//            synthesizer.waitEngineState(Synthesizer.QUEUE_EMPTY);
//            synthesizer.deallocate();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//}
