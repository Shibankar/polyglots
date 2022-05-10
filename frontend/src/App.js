import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "./App.css";
import {useState} from "react";
import {SearchEmployee} from "./components/searchEmployee/SearchEmployee";
import {EmployeeData} from "./components/employeeData/EmployeeData";

function App() {
    const [selectedEmployee, setSelectedEmployee] = useState(undefined);
    const [showEmployeeData, setShowEmployeeData] = useState(false);

    return (
        <div className="App">
            <SearchEmployee showSelection={setShowEmployeeData} setSelection={setSelectedEmployee} />
            {showEmployeeData && <EmployeeData data={selectedEmployee} />}
        </div>
      );
}

export default App;
