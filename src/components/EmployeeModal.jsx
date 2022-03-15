import React, { useState, useEffect } from 'react';
import { TextField, Button, Modal, Box } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const EmployeeModal = ({ open, setOpen, addEmployee, editEmployee, employeeToUpdate }) => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    bankAccount: '',
    salary: ''
  });

  useEffect(() => {
    if (employeeToUpdate != null) {
      console.log(employeeToUpdate);
      setValues(employeeToUpdate);
    }
  }, [employeeToUpdate, open]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    if (open === false) setValues({ firstName: '', lastName: '', bankAccount: '', salary: '' });
  }, [open]);

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setValues({
            firstName: '',
            lastName: '',
            bankAccount: '',
            salary: ''
          });
        }}
      >
        <form
          autoComplete="off"
          className="form"
          onSubmit={async (e) => {
            e.preventDefault();
            console.log(values);

            try {
              if (employeeToUpdate != null) {
                const response = await axios.put('/api/edit/' + employeeToUpdate._id, values);
                const updatedEmployee = response.data;
                editEmployee(updatedEmployee);
                setOpen(false);
              } else {
                const response = await axios.post('/api/employee', values);
                const newEmployee = response.data;
                addEmployee(newEmployee);
                setOpen(false);

                console.log('Employee created successfully');
              }
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <Box sx={style}>
            <TextField
              label="First name"
              variant="standard"
              value={values.firstName}
              onChange={handleChange('firstName')}
            />

            <TextField
              label="Last name"
              variant="standard"
              value={values.lastName}
              onChange={handleChange('lastName')}
            />

            <TextField
              label="Bank account"
              variant="standard"
              value={values.bankAccount}
              onChange={handleChange('bankAccount')}
            />

            <TextField label="Salary" variant="standard" value={values.salary} onChange={handleChange('salary')} />

            <Button type="submit">{employeeToUpdate != null ? 'Edit' : 'Add'}</Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
};

export default EmployeeModal;
