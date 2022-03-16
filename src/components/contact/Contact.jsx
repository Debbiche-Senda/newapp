import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import EmployeesList from '../EmployeesList';
import EmployeeModal from '../EmployeeModal';

const Contact = ({ setIsConnected }) => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [employeeToUpdate, setEmployeeToUpdate] = useState(null);

  console.log({ employeeToUpdate });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsConnected(true);
    }

    axios
      .get('/api/employee')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addEmployee = (newEmployee) => {
    const newArr = [newEmployee, ...employees];
    setEmployees(newArr);
  };
  const removeEmployee = (employeeToDelete) => {
    const removeArr = employees.filter((employee) => employee._id !== employeeToDelete._id);
    setEmployees(removeArr);
  };

  const editEmployee = (updatedEmployee) => {
    const newEmployees = [...employees];
    const index = newEmployees.findIndex((employee) => employee._id === updatedEmployee._id);
    newEmployees.splice(index, 1, updatedEmployee);
    setEmployees(newEmployees);
  };
  return (
    <div>
      <Navbar setIsConnected={setIsConnected} />
      <EmployeesList
        employees={employees}
        setOpen={setOpen}
        removeEmployee={removeEmployee}
        setEmployeeToUpdate={setEmployeeToUpdate}
      />
      <EmployeeModal
        open={open}
        setOpen={setOpen}
        addEmployee={addEmployee}
        editEmployee={editEmployee}
        employeeToUpdate={employeeToUpdate}
      />
    </div>
  );
};

export default Contact;
