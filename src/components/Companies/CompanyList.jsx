import React, { useState } from 'react';
import axios from 'axios';
import CompanyItem from './CompanyItem';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CompanyList = ({ companies, setOpen, removeCompany, setCompanyToUpdate }) => {
  const [companyToDelete, setCompanyToDelete] = useState(null);

  const deleteCompany = async (company) => {
    try {
      await axios.delete('/api/delete/company/' + company._id);
      removeCompany(company);
      setCompanyToDelete(null);
      console.log('Company deleted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="pt-6 flex justify-end pr-8">
        <Button
          onClick={() => {
            setCompanyToDelete(undefined);
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
                  Company name
                </TableCell>
                <TableCell className="!font-bold !text-xl" align="left">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((company) => (
                <CompanyItem
                  company={company}
                  setOpen={setOpen}
                  setCompanyToUpdate={setCompanyToUpdate}
                  setCompanyToDelete={setCompanyToDelete}
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
          open={companyToDelete != null}
          TransitionComponent={Transition}
          onClose={() => setCompanyToDelete(null)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'Delete Company ?'}</DialogTitle>
          <DialogContent>
            {companyToDelete != null && (
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete company {companyToDelete.firstName} {companyToDelete.lastName}
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCompanyToDelete(null)}>Cancel</Button>
            <Button onClick={() => deleteCompany(companyToDelete)}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CompanyList;
