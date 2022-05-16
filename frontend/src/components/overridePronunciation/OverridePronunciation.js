import "./OverridePronunciation.scss";
import {useState, useEffect} from "react";
import {getAllVoices, getUserById, savePronunciation, getPronunciationURL, getPronunciationURLWithVoiceName, getPronunciation} from "../../api/PronunciationApi";
import Modal from "react-bootstrap/Modal";
import {Button} from "primereact/button";
import {SelectButton} from "primereact/selectbutton";
import {Dropdown} from "primereact/dropdown";
import MicRecorder from "mic-recorder-to-mp3";
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export const OverridePronunciation = ({employeeData, setShowOverrideModal}) => {
    const options = ["Option 1", "Option 2"];
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [userVoiceData, setUserVoiceData] = useState(undefined);

    // For option 1
    const [allVoices, setAllVoices] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(undefined);
    const [countries, setCountries] = useState([]);
    const [selectedVoiceName, setSelectedVoiceName] = useState(undefined);
    const [voiceNames, setVoiceNames] = useState([]);
    const [generatedAudioURL, setGeneratedAudioURL] = useState("");
    const [generatedAudio, setGeneratedAudio] = useState(undefined);

    //For option 2
    const [isRecording, setIsRecording] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isRecordingStp, setIsRecordingStp] = useState(false);
    const [recordedAudioURL, setRecordedAudioURL] = useState("");
    const [recordedAudio, setRecordedAudio] = useState(undefined);

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
    }, [allVoices, selectedCountry]);

    useEffect(() => {
        if (employeeData && selectedCountry && selectedVoiceName) {
            setGeneratedAudioURL(getPronunciationURLWithVoiceName(employeeData.uid, employeeData.firstname ,employeeData.lastname, selectedCountry, selectedVoiceName));
        }
    }, [employeeData, selectedCountry, selectedVoiceName]);

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
                setRecordedAudio(blob);
                const blobURL = URL.createObjectURL(blob);
                setRecordedAudioURL(blobURL);
                setIsRecording(false);
                setIsRecordingStp(true);
            }).catch((e) => console.log(e));
    };

    const reset = () => {
        document.getElementsByTagName('audio')[0].src = '';
        setRecordedAudio(undefined);
        setRecordedAudioURL("");
        setIsRecordingStp(false);
    };

    const save = () => {
        if (selectedOption === options[0] && generatedAudioURL !== "") {
            getPronunciation(generatedAudioURL)
                .then(data => data.blob())
                .then(blobFile => setGeneratedAudio(new File([blobFile], "generatedAudio", { type: "audio/vnd.wav" })));
        }
        if (selectedOption === options[0] ? generatedAudio : recordedAudio) {
            let postdata = new FormData();
            postdata.append('file', selectedOption === options[0] ? generatedAudio : recordedAudio, employeeData.uid + ".wav");

            savePronunciation(employeeData.uid, employeeData.firstname, employeeData.lastname,
                selectedOption === options[0] ? selectedCountry : employeeData.location,
                selectedOption === options[0] ? selectedVoiceName : "Custom",
                selectedOption === options[0]
                    ? allVoices.filter(v => v.country === selectedCountry && v.voice_name === selectedVoiceName).gender
                    : "Custom",
                false,
                postdata)
                .then(data => {
                    console.log('API Response', data);
                    setShowOverrideModal(false);
                })
                .catch(error => console.log("Error : ", error));
        }
    };

    return (
        <>
            <SelectButton value={selectedOption} options={options} onChange={(e) => setSelectedOption(e.value)} />
            <div className="override-pronunciation-modal">
                {selectedOption && selectedOption === options[0] && <div className="select-section">
                    <div className="elements">Change Country and Voice</div>
                    <div className="elements">
                        <Dropdown value={selectedCountry} options={countries} onChange={(e) => setSelectedCountry(e.value)} placeholder="Select a Country" />
                        <Dropdown value={selectedVoiceName} options={voiceNames} onChange={(e) => setSelectedVoiceName(e.value)} placeholder="Select a Voice" disabled={selectedCountry === undefined} />
                    </div>
                    <audio preload="none" src={
                        selectedCountry &&
                        countries.includes(selectedCountry)
                        && selectedVoiceName &&
                        voiceNames.includes(selectedVoiceName)?
                            generatedAudioURL :
                            getPronunciationURL(employeeData.uid, employeeData.firstname ,employeeData.lastname, employeeData.location)}
                    controls />
                </div>}
                {selectedOption && selectedOption === options[1] && <div className="record-section">
                    <div className="elements">Record Custom Audio</div>
                    <div className="elements">
                        <Button className="p-button-rounded p-button-help" onClick={start} disabled={isRecording}>Record</Button>
                        <Button className="p-button-rounded p-button-danger" onClick={stop} disabled={!isRecording}>Stop</Button>
                        <Button className="p-button-rounded p-button-warning" onClick={reset} disabled={!isRecordingStp}>Reset</Button>
                    </div>
                    <audio preload="none" src={recordedAudioURL} controls />
                </div>}
            </div>
            <Modal.Footer>
                <Button
                    className="p-button-info"
                    onClick={save}
                    disabled={selectedOption === options[0]
                        ? (selectedCountry === undefined && selectedCountry === undefined)
                        : recordedAudio === undefined}>
                    Save changes
                </Button>
            </Modal.Footer>
        </>
    );
};