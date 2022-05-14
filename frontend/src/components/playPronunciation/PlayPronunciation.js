import "./PlayPrononunciation.scss";

export const PlayPronunciation = ({employeeData}) => {
    return (
        <div className="play-pronunciation-modal">
            <div className="play-section">
                <audio preload="none" src={`/api/v1/pronunciation/byId?uid=${employeeData.uid}&fname=${employeeData.firstname}&lname=${employeeData.lastname}&country=${employeeData.location}`} controls />
            </div>
        </div>
    );
};