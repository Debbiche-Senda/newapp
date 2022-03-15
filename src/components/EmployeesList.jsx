import React, { useState } from 'react';
import axios from 'axios';

import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide
} from '@mui/material';
import Paper from '@mui/material/Paper';
import EmployeesItem from './EmployeesItem';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EmployeesList = ({ employees, setOpen, setEmployeeToUpdate, removeEmployee }) => {
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const deleteEmployee = async (employee) => {
    try {
      await axios.delete('/api/employee/' + employee._id);
      removeEmployee(employee);
      setEmployeeToDelete(null);
      console.log('Employee deleted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="pt-6 flex justify-end pr-8">
        <Button
          onClick={() => {
            setEmployeeToUpdate(undefined);

            setOpen(true);
          }}
        >
          Add Employee
        </Button>
      </div>
      <div className="pt-12 px-6">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell className="!font-bold !text-xl">First name</TableCell>
                <TableCell className="!font-bold !text-xl" align="left">
                  Last name
                </TableCell>
                <TableCell className="!font-bold !text-xl" align="left">
                  Bank account
                </TableCell>
                <TableCell className="!font-bold !text-xl" align="left">
                  Salary
                </TableCell>
                <TableCell className="!font-bold !text-xl" align="left">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <EmployeesItem
                  employee={employee}
                  setOpen={setOpen}
                  setEmployeeToUpdate={setEmployeeToUpdate}
                  setEmployeeToDelete={setEmployeeToDelete}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pt-6 flex justify-end pr-8">
          <Button>!!!</Button>
        </div>
      </div>
      <div>
        <Dialog
          open={employeeToDelete != null}
          TransitionComponent={Transition}
          onClose={() => setEmployeeToDelete(null)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'Delete Employee ?'}</DialogTitle>
          <DialogContent>
            {employeeToDelete != null && (
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete employee {employeeToDelete.firstName} {employeeToDelete.lastName}
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEmployeeToDelete(null)}>Cancel</Button>
            <Button onClick={() => deleteEmployee(employeeToDelete)}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default EmployeesList;
