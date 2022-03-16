import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button, TableRow, TableCell, Menu, MenuItem } from '@mui/material';

const CompanyItem = ({ company, setOpen, setCompanyToUpdate, setCompanyToDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left">{company.firstName}</TableCell>
      <TableCell align="left">{company.lastName}</TableCell>
      <TableCell align="left">{company.bankAccount}</TableCell>
      <TableCell align="left">{company.salary}</TableCell>
      <TableCell align="left">{company.companyName}</TableCell>

      <TableCell className="pl-16 w-min">
        <div>
          <Button
            id={company._id + 'btn'}
            aria-controls={open ? company._id + 'menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id={company._id + 'menu'}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem
              onClick={() => {
                console.log({ company });
                setCompanyToUpdate(company);
                setOpen(true);
                handleClose();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setCompanyToDelete(company);
                handleClose();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CompanyItem;
