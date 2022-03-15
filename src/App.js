import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import EmployeesList from './components/EmployeesList';
import Login from './components/Login';
import EmployeeModal from './components/EmployeeModal';

function App() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [employeeToUpdate, setEmployeeToUpdate] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

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
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/signin">
            {isConnected ? <Redirect to="/" /> : <Login setIsConnected={setIsConnected} />}
          </Route>
          <Route exact path="/">
            {isConnected ? (
              <>
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
              </>
            ) : (
              <Redirect to="/signin" />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
