import "./SearchEmployee.scss";
import React, {useState, useEffect} from "react";
import {AutoComplete} from "primereact/autocomplete";
import ProfileImage from "../../employee-profile-default.svg";
import EmployeeData from "../../employees.json";

export const SearchEmployee = ({showSelection, setSelection}) => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [filteredEmployees, setFilteredEmployees] = useState(null);

     useEffect(() => {
         setEmployees(EmployeeData);
     }, []); // eslint-disable-line react-hooks/exhaustive-deps

     const searchEmployee = (event) => {
         let _filteredEmployees;
         if (!event.query.trim().length) {
             _filteredEmployees = [...employees];
         }
         else {
             _filteredEmployees = employees.filter((employee) =>
                (employee.fullname !== null && employee.fullname.toLowerCase().indexOf(event.query.toLowerCase()) !== -1)
                || (employee.uid !== null && employee.uid.toLowerCase().indexOf(event.query.toLowerCase()) !== -1));
         }

         setFilteredEmployees(_filteredEmployees);
     }

     const getImage = (image) => {
        return <img src={require(`../../images/avatars/${image}.jpeg`)} />
     }

     const itemTemplate = (item) => {
         return (
             <div className="employee">
                <div className="employee-image">
                    {getImage(item.firstname)}
                </div>
                <div className="employee-details">
                    <div className="employee-name">{item.fullname}</div>
                    <div className="employee-detail">{item.uid}</div>
                </div>
             </div>
         );
     }

     return (
         <AutoComplete
             value={selectedEmployee}
             suggestions={filteredEmployees}
             completeMethod={searchEmployee}
             field="fullname"
             placeholder="Search by name or profile info"
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