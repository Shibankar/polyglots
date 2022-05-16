package com.wf.hackathon.polyglots.pronunciation;

import com.microsoft.cognitiveservices.speech.*;

public class MsCognitiveServiceClient {
    private static String YourSubscriptionKey = "3bb7968a4024404187a5a95c4c82548f";
    private static String YourServiceRegion = "eastus";

    public String generateSpeechAndSave(String uid, String text, String voiceName, String pathToSave) {
        try {
            String completePath = pathToSave.trim() + uid.trim() + ".wav";
            SpeechConfig speechConfig = SpeechConfig.fromSubscription(YourSubscriptionKey, YourServiceRegion);
            speechConfig.setSpeechSynthesisVoiceName(voiceName);
            SpeechSynthesizer speechSynthesizer = new SpeechSynthesizer(speechConfig);
            SpeechSynthesisResult speechSynthesisResult = speechSynthesizer.SpeakTextAsync(text).get();

            if (speechSynthesisResult.getReason() == ResultReason.SynthesizingAudioCompleted) {
                AudioDataStream audioDataStream = AudioDataStream.fromResult(speechSynthesisResult);
                audioDataStream.saveToWavFileAsync(completePath);
                return completePath;
            } else if (speechSynthesisResult.getReason() == ResultReason.Canceled) {
                SpeechSynthesisCancellationDetails cancellation = SpeechSynthesisCancellationDetails.fromResult(speechSynthesisResult);
                System.out.println("CANCELED: Reason=" + cancellation.getReason());

                if (cancellation.getReason() == CancellationReason.Error) {
                    System.out.println("CANCELED: ErrorCode=" + cancellation.getErrorCode());
                    System.out.println("CANCELED: ErrorDetails=" + cancellation.getErrorDetails());
                    System.out.println("CANCELED: Did you set the speech resource key and region values?");
                }
            }
            return null;
        } catch (Exception err) {
            System.out.println(err);

            return null;
        }
    }
}
