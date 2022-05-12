import "./EmployeeData.scss";
import {useState, useEffect} from "react";
import ProfileImage from "../../employee-profile-default.svg";
import MicRecorder from "mic-recorder-to-mp3";
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export const EmployeeData = ({data, pronunciation}) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isRecordingStp, setIsRecordingStp] = useState(false);
    const [blobURL, setBlobURL] = useState("");

    useEffect(() => {
        navigator.getUserMedia = (
              navigator.getUserMedia ||
              navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia ||
              navigator.msGetUserMedia
             );

        //Detects the action on user click to allow or deny permission of audio device
        navigator.getUserMedia(
            { audio: true },
            () => {
                console.log('Permission Granted');
                setIsBlocked(false);
            },
            () => {
                console.log('Permission Denied');
                setIsBlocked(true);
            });
    });

    const start = () => {
        /*
         * If the user denys permission to use the audio device
         * in the browser no recording can be done and an alert is shown
         * If the user allows permission the recoding will begin
         */
        if (isBlocked) {
          alert('Permission Denied');
        } else {
          Mp3Recorder
            .start()
            .then(() => {
              setIsRecording(true);
            }).catch((e) => console.error(e));
        }
    };

    const stop = () => {
         /*
         * Once the recoding starts the stop button is activated
         * Click stop once recording as finished
         * An MP3 is generated for the user to download the audio
         */
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob);
                setBlobURL(blobURL);
                setIsRecording(false);
                setIsRecordingStp(true);
            }).catch((e) => console.log(e));
    };

    const reset = () => {
          /*
           * The user can reset the audio recording
           * once the stop button is clicked
           */
       document.getElementsByTagName('audio')[1].src = '';
       setIsRecordingStp(false);
    };

    return (
        <div className="employee-data">
            <table>
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>UID</th>
                        <th>LOB</th>
                        <th>Location</th>
                        <th>Play Pronunciation</th>
                        <th>Override Pronunciation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <img className="employee-image" src={ProfileImage} alt="profile"/>
                        </td>
                        <td>{data.fullname}</td>
                        <td>{data.uid}</td>
                        <td>{data.lob}</td>
                        <td>{data.location}</td>
                        <td>
                            <audio
                                src={`/api/v1/pronunciation/byId?uid=${data.uid}&fname=${data.firstname}&lname=${data.lastname}`}
                                controls
                            />
                        </td>
                        <td>
                            <audio src={blobURL} controls />
                            <div>
                                <button className="btn btn-light" onClick={start} disabled={isRecording}>Record</button>
                                <button className="btn btn-danger" onClick={stop} disabled={!isRecording}>Stop</button>
                                <button className="btn btn-warning" onClick={reset} disabled={!isRecordingStp}>Reset</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};