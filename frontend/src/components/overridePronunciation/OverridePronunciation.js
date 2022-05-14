import "./OverridePronunciation.scss";
import {useState, useEffect} from "react";
import {getAllVoices, getUserById, savePronunciation} from "../../api/PronunciationApi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {SelectButton} from "primereact/selectbutton";
import {Dropdown} from "primereact/dropdown";
import MicRecorder from "mic-recorder-to-mp3";
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export const OverridePronunciation = ({employeeData}) => {
    const options = ["Option 1", "Option 2"];
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [userVoiceData, setUserVoiceData] = useState(undefined);

    const [allVoices, setAllVoices] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(undefined);
    const [countries, setCountries] = useState([]);
    const [selectedVoiceName, setSelectedVoiceName] = useState(undefined);
    const [voiceNames, setVoiceNames] = useState([]);

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

        getAllVoices()
                    .then(data => setAllVoices(data))
                    .catch((e) => console.error(e));
    }, []);

    useEffect(() => {
        if (employeeData.uid) {
            getUserById(employeeData.uid)
                .then(data => setUserVoiceData(data))
                .catch((e) => console.error(e));
        }
    }, [employeeData]);

    useEffect(() => {
        if (allVoices.length !== 0) {
            setCountries([...new Set(allVoices.map(v => v.country))]);
        }
    }, [allVoices]);

    useEffect(() => {
        if (userVoiceData && userVoiceData.country && userVoiceData.voice_name) {
            setSelectedCountry(userVoiceData.country);
            setSelectedVoiceName(userVoiceData.voice_name);
        }
    }, [userVoiceData]);

    useEffect(() => {
        if (selectedCountry && allVoices.length !== 0) {
            setVoiceNames([...new Set(allVoices.filter(v => v.country === selectedCountry).map(v => v.voice_name))]);
        }
    }, [selectedCountry]);

    const start = () => {
        if (isBlocked) {
            alert('Permission Denied');
        } else {
        Mp3Recorder
            .start()
            .then(() => setIsRecording(true))
            .catch((e) => console.error(e));
        }
    };

    const stop = () => {
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
        document.getElementsByTagName('audio')[1].src = '';
        setIsRecordingStp(false);
    };

    const save = () => {
        let postdata = new FormData();
        postdata.append('file', blob, employeeData.uid + ".wav");

        savePronunciation(
            employeeData.uid,
            employeeData.firstname,
            employeeData.lastname,
            selectedOption === options[0] ? selectedCountry : employeeData.location,
            selectedOption === options[0] ? selectedVoiceName : "Custom",
            selectedOption === options[0] ?
                allVoices.filter(v => v.country === selectedCountry && v.voice_name === selectedVoiceName).gender
                : "",
            false,
            postdata)
            .then(data => console.log('API Response', data))
            .catch(error => console.log("Error : ", error));
    };

    return (
        <>
            <SelectButton value={selectedOption} options={options} onChange={(e) => setSelectedOption(e.value)} />
            <div className="override-pronunciation-modal">
                {selectedOption && selectedOption === options[0] && <div className="select-section">
                    <div className="elements">Change Country/Voice</div>
                    <div className="elements">
                        <Dropdown value={selectedCountry} options={countries} onChange={(e) => setSelectedCountry(e.value)} placeholder="Select a Country" />
                    </div>
                    <div className="elements">
                        <Dropdown value={selectedVoiceName} options={voiceNames} onChange={(e) => setSelectedVoiceName(e.value)} placeholder="Select a Voice" disabled={selectedCountry === undefined} />
                    </div>
                    {selectedCountry && selectedVoiceName
                        ? <audio src={`/api/v1/pronunciation/byId?uid=${employeeData.uid}&fname=${employeeData.firstname}&lname=${employeeData.lastname}&country=${selectedCountry}&voicename=${selectedVoiceName}`} controls />
                        : <audio src={`/api/v1/pronunciation/byId?uid=${employeeData.uid}&fname=${employeeData.firstname}&lname=${employeeData.lastname}&country=${employeeData.location}`} controls />}
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