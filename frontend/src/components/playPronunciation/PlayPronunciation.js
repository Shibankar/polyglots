import "./PlayPrononunciation.scss";
import {getPronunciationURL} from "../../api/PronunciationApi";

export const PlayPronunciation = ({employeeData}) => {
    return (
        <div className="play-pronunciation-modal">
            <div className="play-section">
                <audio preload="none" src={getPronunciationURL(employeeData.uid, employeeData.firstname ,employeeData.lastname, employeeData.location)} controls />
            </div>
        </div>
    );
};