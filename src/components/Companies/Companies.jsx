import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyList from './CompanyList';
import CompanyModal from './CompanyModal';
import Navbar from '../Navbar';

const Companies = ({ setIsConnected }) => {
  const [companies, setCompanies] = useState([]);
  const [openCompany, setOpenCompany] = useState(false);
  const [companyToUpdate, setCompanyToUpdate] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsConnected(true);
    }

    axios
      .get('/api/company')
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const addCompany = (newCompany) => {
    const newArr = [newCompany, ...companies];
    setCompanies(newArr);
  };

  const removeCompany = (companyToDelete) => {
    const removeArr = companies.filter((company) => company._id !== companyToDelete._id);
    setCompanies(removeArr);
  };

  const editCompany = (updatedCompany) => {
    const newCompanies = [...companies];
    const index = newCompanies.findIndex((company) => company._id === updatedCompany._id);
    newCompanies.splice(index, 1, updatedCompany);
    setCompanies(newCompanies);
  };

  return (
    <div>
      <Navbar setIsConnected={setIsConnected} />
      <CompanyList
        companies={companies}
        setOpen={setOpenCompany}
        removeCompany={removeCompany}
        setCompanyToUpdate={setCompanyToUpdate}
      />
      <CompanyModal
        open={openCompany}
        setOpen={setOpenCompany}
        addCompany={addCompany}
        editCompany={editCompany}
        companyToUpdate={companyToUpdate}
      />
    </div>
  );
};

export default Companies;
