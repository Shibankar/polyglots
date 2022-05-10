import "./SearchEmployee.scss";
import React, {useState, useEffect} from "react";
import {AutoComplete} from "primereact/autocomplete";
import ProfileImage from "../../employee-profile-default.svg";

export const SearchEmployee = ({showSelection, setSelection}) => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [filteredEmployees, setFilteredEmployees] = useState(null);

     useEffect(() => {
         setEmployees([
             {name: "Bhavleen Kaur", uid: "u825726"},
             {name: "Ankit Bhowmick", uid: "u851490"},
             {name: "Shibankar Ghosh", uid: "u816352"},
             {name: "Santhosh Jayaraman", uid: "u813376"},
             {name: "Gopal Kamaraj", uid: "u845165"}
         ]);
     }, []); // eslint-disable-line react-hooks/exhaustive-deps

     const searchEmployee = (event) => {
         let _filteredEmployees;
         if (!event.query.trim().length) {
             _filteredEmployees = [...employees];
         }
         else {
             _filteredEmployees = employees.filter((employee) =>
                (employee.name !== null && employee.name.toLowerCase().indexOf(event.query.toLowerCase()) !== -1)
                || (employee.uid !== null && employee.uid.toLowerCase().indexOf(event.query.toLowerCase()) !== -1));
         }

         setFilteredEmployees(_filteredEmployees);
     }

     const itemTemplate = (item) => {
         return (
             <div className="employee-item">
                 <img alt={item.name} src={ProfileImage} className={"employee-element employee-image " + item.uid} />
                 <div className="employee-element">{item.name}</div>
                 <div className="employee-element">{item.uid}</div>
             </div>
         );
     }

     return (
         <AutoComplete
             value={selectedEmployee}
             suggestions={filteredEmployees}
             completeMethod={searchEmployee}
             field="name"
             placeholder="Search pronunciation by Name or UID"
             forceSelection
             itemTemplate={itemTemplate}
             onChange={(e) => setSelectedEmployee(e.value)}
             aria-label="Employees"
             onSelect={(e) => {
                 setSelection(e.value);
                 showSelection(true);
             }}
          />
     );
};