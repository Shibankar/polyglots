import "./PlayPrononunciation.scss";

export const PlayPronunciation = ({data}) => {
    return (
        <div className="play-pronunciation-modal">
            <div className="play-section">
                <audio src={`/api/v1/pronunciation/byId?uid=${data.uid}&fname=${data.firstname}&lname=${data.lastname}&country=${data.location}`} controls />
            </div>
        </div>
    );
};