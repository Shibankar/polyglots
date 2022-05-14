package com.wf.hackathon.polyglots.pronunciation;

import com.microsoft.cognitiveservices.speech.*;
import com.microsoft.cognitiveservices.speech.audio.*;

import java.util.Scanner;
import java.util.concurrent.ExecutionException;

public class MsCognitiveServiceClient {
    private static String YourSubscriptionKey = "";
    private static String YourServiceRegion = "";

    public String generateSpeechAndSave(String uid, String text, String voiceName, String pathToSave) {
        try {
            String completePath = pathToSave.trim() + uid.trim() + ".wav";
            SpeechConfig speechConfig = SpeechConfig.fromSubscription(YourSubscriptionKey, YourServiceRegion);
            speechConfig.setSpeechSynthesisVoiceName(voiceName);
            SpeechSynthesizer speechSynthesizer = new SpeechSynthesizer(speechConfig);
            SpeechSynthesisResult speechRecognitionResult = speechSynthesizer.SpeakTextAsync(text).get();

            if (speechRecognitionResult.getReason() == ResultReason.SynthesizingAudioCompleted) {
                AudioDataStream audioDataStream = AudioDataStream.fromResult(speechRecognitionResult);
                audioDataStream.saveToWavFileAsync(completePath);
                return completePath;
            } else  {
                return null;
            }
        } catch (Exception err) {
            System.out.println(err);
            return null;
        }
    }
}
