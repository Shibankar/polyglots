import "./EmployeeData.scss";
import ProfileImage from "../../employee-profile-default.svg";

export const EmployeeData = ({data}) => {
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
                            <img className="employee-image" src={ProfileImage} alt="profile" />
                        </td>
                        <td>{data.name}</td>
                        <td>{data.uid}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};