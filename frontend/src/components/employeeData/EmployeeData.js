import "./EmployeeData.scss";
import ProfileImage from "../../employee-profile-default.svg";

export const EmployeeData = ({data, pronunciation}) => {
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
                    <td><i className="pi pi-plus-circle"/></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};