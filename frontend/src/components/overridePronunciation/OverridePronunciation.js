import "./OverridePronunciation.scss";
import {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {SelectButton} from "primereact/selectbutton";
import {Dropdown} from "primereact/dropdown";
import MicRecorder from "mic-recorder-to-mp3";
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export const OverridePronunciation = ({data}) => {
    const options = ["Option 1", "Option 2"];
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const [selectedCountry, setSelectedCountry] = useState(undefined);
    const [countries, setCountries] = useState([]);

    const [isRecording, setIsRecording] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isRecordingStp, setIsRecordingStp] = useState(false);
    const [blobURL, setBlobURL] = useState("");
    const [blob, setBlob] = useState(undefined);

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

    useEffect(() => {
        setCountries([""]);
    }, []);

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
                setBlob(blob);
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

    const save = () => {
        if (blob !== undefined)
        var postdata = new FormData();

        // data.append('text', "this is the transcription of the audio file");
        postdata.append('file', blob, data.uid + ".wav");

        fetch("/api/v1/pronunciation/save?uid=" + data.uid, {
            method: 'POST',
            body: postdata
        })
        .then(response => console.log('API Response', response))
        .catch(error => console.log("Error : ", error));
    };

    return (
        <>
            <SelectButton value={selectedOption} options={options} onChange={(e) => setSelectedOption(e.value)} />
            <div className="override-pronunciation-modal">
                {selectedOption && selectedOption === options[0] && <div className="select-section">
                    <div className="elements">Change Country/Voice</div>
                    <Dropdown value={selectedCountry} options={countries} onChange={(e) => setSelectedCountry(e.value)} optionLabel="country" placeholder="Select a Country" />
                    <audio src={`/api/v1/pronunciation/byId?uid=${data.uid}&fname=${data.firstname}&lname=${data.lastname}`} controls />
                </div>}
                {selectedOption && selectedOption === options[1] && <div className="record-section">
                    <div className="elements">Record Custom Audio</div>
                    <div className="elements">
                        <Button variant="light" onClick={start} disabled={isRecording}>Record</Button>
                        <Button variant="danger" onClick={stop} disabled={!isRecording}>Stop</Button>
                        <Button variant="warning" onClick={reset} disabled={!isRecordingStp}>Reset</Button>
                    </div>
                    <audio src={blobURL} controls />
                </div>}
            </div>
            <Modal.Footer>
                <Button variant="primary" onClick={save}>Save changes</Button>
            </Modal.Footer>
        </>
    );
};