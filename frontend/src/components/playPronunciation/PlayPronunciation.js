import Button from "react-bootstrap/Button";
import "./PlayPrononunciation.scss";

export const PlayPronunciation = ({data}) => {
    return (
        <div className="play-pronunciation-modal">
            <div className="play-section">
                <audio src={`/api/v1/pronunciation/byId?uid=${data.uid}&fname=${data.firstname}&lname=${data.lastname}`} controls />
            </div>
        </div>
    );
};