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

const CompanyModal = ({ open, setOpen, addCompany, editCompany, companyToUpdate }) => {
  const [companyValues, setCompanyValues] = useState({
    firstName: '',
    lastName: '',
    bankAccount: '',
    salary: '',
    companyName: ''
  });

  useEffect(() => {
    if (companyToUpdate != null) {
      console.log(companyToUpdate);
      setCompanyValues(companyToUpdate);
    }
  }, [companyToUpdate, open]);

  const handleChange = (prop) => (event) => {
    setCompanyValues({ ...companyValues, [prop]: event.target.value });
  };

  useEffect(() => {
    if (open === false) setCompanyValues({ firstName: '', lastName: '', bankAccount: '', salary: '', companyName: '' });
  }, [open]);

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setCompanyValues({
            firstName: '',
            lastName: '',
            bankAccount: '',
            salary: '',
            companyName: ''
          });
        }}
      >
        <form
          autoComplete="off"
          className="form"
          onSubmit={async (e) => {
            e.preventDefault();
            console.log({ companyToUpdate });
            console.log({ companyValues });

            try {
              if (companyToUpdate != null) {
                const response = await axios.put('/api/edit/company/' + companyToUpdate._id, companyValues);
                const updatedCompany = response.data;
                editCompany(updatedCompany);
                setOpen(false);
              } else {
                const response = await axios.post('/api/company', companyValues);
                const newCompany = response.data;
                addCompany(newCompany);
                setOpen(false);

                console.log('Company created successfully');
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
              value={companyValues.firstName}
              onChange={handleChange('firstName')}
            />

            <TextField
              label="Last name"
              variant="standard"
              value={companyValues.lastName}
              onChange={handleChange('lastName')}
            />

            <TextField
              label="Bank account"
              variant="standard"
              value={companyValues.bankAccount}
              onChange={handleChange('bankAccount')}
            />
            <TextField
              label="Salary"
              variant="standard"
              value={companyValues.salary}
              onChange={handleChange('salary')}
            />
            <TextField
              label="Company name"
              variant="standard"
              value={companyValues.companyName}
              onChange={handleChange('companyName')}
            />
            <div className="mr-0 flex justify-end">
              <Button className="!flex !justify-center !items-center" type="submit">
                {companyToUpdate != null ? 'Edit' : 'Add'}
              </Button>
            </div>
          </Box>
        </form>
      </Modal>
    </div>
  );
};

export default CompanyModal;
