import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "./App.css";
import {useState, useEffect} from "react";
import {SearchEmployee} from "./components/searchEmployee/SearchEmployee";
import {EmployeeData} from "./components/employeeData/EmployeeData";
import {getPronunciation} from "./api/PronunciationApi";

function App() {
    const [selectedEmployee, setSelectedEmployee] = useState(undefined);
    const [showEmployeeData, setShowEmployeeData] = useState(false);
    const [pronunciation, setPronunciation] = useState(undefined);

    useEffect(() => {
        if (selectedEmployee !== undefined && selectedEmployee.uid !== null && selectedEmployee.firstname !== null && selectedEmployee.lastname !== null) {
            setPronunciation(getPronunciation(selectedEmployee.uid, selectedEmployee.firstname, selectedEmployee.lastname));
        }
    }, [selectedEmployee]);

    return (
        <div className="App">
            <SearchEmployee showSelection={setShowEmployeeData} setSelection={setSelectedEmployee} />
            {showEmployeeData && <EmployeeData data={selectedEmployee} pronunciation={pronunciation} />}
        </div>
      );
}

export default App;
