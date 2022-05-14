import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "./App.scss";
import {useState, useEffect} from "react";
import {SearchEmployee} from "./components/searchEmployee/SearchEmployee";
import {EmployeeData} from "./components/employeeData/EmployeeData";
import {getPronunciation} from "./api/PronunciationApi";
import AppLogo from "./images/wf_logo_48px.png";
import UserIcon from "./images/user-icon.jpeg";
import AlertsIcon from "./images/alert1.png";
import SettingsIcon from "./images/settings.png";
import PlayIcon from "./images/play.png";
import RecordIcon from "./images/record.png";
import SilentIcon from "./images/no-sound.png"
import Santhosh from "./images/avatars/Santhosh.jpeg";
import {CustomModal} from "./components/customModal/CustomModal";
import {PlayPronunciation} from "./components/playPronunciation/PlayPronunciation";
import {OverridePronunciation} from "./components/overridePronunciation/OverridePronunciation";

function App(data) {
    const [selectedEmployee, setSelectedEmployee] = useState(undefined);
    const [showEmployeeData, setShowEmployeeData] = useState(false);
    const [currentUser, setCurrentUser] = useState(data);
    const [pronunciation, setPronunciation] = useState(undefined);
    const [showPlayModal, setShowPlayModal] = useState(false);
    const [showOverrideModal, setShowOverrideModal] = useState(false);

    useEffect(() => {
        if (selectedEmployee !== undefined && selectedEmployee.uid !== null && selectedEmployee.firstname !== null && selectedEmployee.lastname !== null) {
            setPronunciation(getPronunciation(selectedEmployee.uid, selectedEmployee.firstname, selectedEmployee.lastname));
        }
    }, [selectedEmployee]);

    const getImage = (image) => {
        return <img src={require(`./images/avatars/${image}.jpeg`)} />
     }

    return (
        <>
        <div className="user-header">
            <div className="user-img">
                <img src={Santhosh}/>
            </div>
            <div className="user-name">
                <div className="name">
                    <span>Welcome Santhosh </span>
                </div>
                <div className="profile">
                    <span>My Profile</span>
                </div>
            </div>
            <div className="user-sites">
                <span>Sites A-Z</span>
            </div>
            <div className="user-bell">
                <img src={AlertsIcon}/>
            </div>
            <div className="user-settings">
                <img src={SettingsIcon}/>
            </div>
        </div>
        <div className="app-header">
            <div className="app-logo">
                <img src={AppLogo} alt="logo"/>
            </div>
            <div className="app-name">
                <div className="top-name">
                    <span>Teamworks</span>
                </div>
                <div className="bottom-name">
                    <span>Personal Workspace</span>
                </div>
            </div>
            <div className="app-search">
                <div className="search-panel-1">
                    <div>
                        <select name="people" id="people">
                        <option value="People">People</option>
                        </select>
                    </div>
                    <div>
                        <SearchEmployee showSelection={setShowEmployeeData} setSelection={setSelectedEmployee} />
                    </div>
                </div>
                <div className="search-panel-2">
                    <div>
                    <select name="people" id="people">
                    <option value="People">Search All sites</option>
                    </select>
                    </div>
                    <div>
                    <input placeholder="Search internal sites"></input>
                    </div>
                </div>
            </div>
        </div>
        <div className="red-tape">
            <div className="menu-item"><span>Inside Teamworks</span></div>
            <div className="menu-item"><span>Personal Workspace</span></div>
            <div className="menu-item"><span>Documents (OneDrive) </span></div>
            <div className="menu-item"><span>Followed Sites</span></div>
        </div>
        {selectedEmployee && <div className="main-content">
            <div className="image-content">
                <div className="user-image">
                    {getImage(selectedEmployee.firstname)}
                </div>
                <div className="user-link">Profile</div>
                <div className="user-link">People</div>
            </div>
            <div className="details-content">
                <div className="content-1">
                    <div className="name">
                        <span>{selectedEmployee.fullname}</span>
                        <img src={PlayIcon} onClick={() => setShowPlayModal(true)} />
                        <img src={RecordIcon} onClick={() => setShowOverrideModal(true)} />
                        <img src={SilentIcon} />
                    </div>
                    <div className="geography">Software Engineer Senior Manager | GENERAL MANAGEMENT</div>
                    <div className="follow"> Follow this person</div>
                    <h3 className="org">25 Directs, 25 Total Team | View Org Chart</h3>
                    <div className="action"></div>
                    <div className="mention">
                        Feel free to <span>mention</span> me in a post
                    </div>
                </div>
                <div className="content-2">
                    <div className="sub-item"><span>Contact Information</span></div>
                    <div className="sub-item-link"><span>Business Title/Organization</span></div>
                    <div className="sub-item-link"><span>Professsional</span></div>
                </div>
                <div className="content-3">
                    <table>
                        <tbody>
                        <tr>
                            <td className="legend">Legal Name:</td>
                            <td className="value">Santhosh Jayaraman</td>
                        </tr>
                        <tr className="mgrbtm5">
                            <td colSpan={2}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="legend">Work Phone:</td>
                            <td className="value">+91 98808 87085</td>
                        </tr>
                        <tr>
                            <td className="legend">Mobile:</td>
                            <td className="value">+91 98808 87085</td>
                        </tr>
                        <tr className="mgrbtm5">
                            <td colSpan={2}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="legend">Email:</td>
                            <td className="value">santhosh.jayaraman@wellsfargo.com</td>
                        </tr>
                        <tr className="mgrbtm5">
                            <td colSpan={2}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="legend">MAC:</td>
                            <td className="value">O2830-010</td>
                        </tr>
                        <tr className="mgrbtm5">
                            <td colSpan={2}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="legend">Address:</td>
                            <td className="value">4001 Woodcreek Oaks Blvd</td>
                        </tr>
                        <tr className="mgrbtm5">
                            <td colSpan={2}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="legend">Ent Logon ID:</td>
                            <td className="value">U813376</td>
                        </tr>
                        <tr>
                            <td className="legend">Cost centre:</td>
                            <td className="value">0229878</td>
                        </tr>
                        <tr className="mgrbtm5">
                            <td colSpan={2}>&nbsp;</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="content-4">
                    <div className="activity-header">
                        <span>Santhosh Jayaraman's Activities</span>
                    </div>
                    <div className="activity"> Santhosh Jayaraman has no activities.</div>
                </div>
            </div>
            <div className="org-content">
                <div className="in-common">
                    <div className="header">
                        <span>In Common</span>
                    </div>
                    <div className="content">
                       <span>Manager you share</span>
                       <img></img>
                    </div>
                </div>
                <div className="org-outline">
                <div className="header">
                        <span>Organizational Outline</span>
                </div>
                <div className="content">
                       <span>Org Image</span>
                       <img></img>
                </div>
                </div>
                
            </div>
        </div>}
        <CustomModal
            showModal={showPlayModal}
            setShowModal={setShowPlayModal}
            title="Play Pronunciation"
            body={<PlayPronunciation data={selectedEmployee} />}
        />
        <CustomModal
            showModal={showOverrideModal}
            setShowModal={setShowOverrideModal}
            title="Add Custom Pronunciation"
            body={<OverridePronunciation data={selectedEmployee} />}
            largeSize />
       </>
      );
}

export default App;
