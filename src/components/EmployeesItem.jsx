import React, { useState } from 'react';

import { Button, TableRow, TableCell, Menu, MenuItem } from '@mui/material';

const EmployeesItem = ({ employee, setOpen, setEmployeeToUpdate, setEmployeeToDelete }) => {
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
      <TableCell align="left">{employee.firstName}</TableCell>
      <TableCell align="left">{employee.lastName}</TableCell>
      <TableCell align="left">{employee.bankAccount}</TableCell>
      <TableCell align="left">{employee.salary}</TableCell>
      <TableCell className="pl-16 w-min">
        <div>
          <Button
            id={employee._id + 'btn'}
            aria-controls={open ? employee._id + 'menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Select
          </Button>
          <Menu
            id={employee._id + 'menu'}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem
              onClick={() => {
                console.log({ employee });
                setEmployeeToUpdate(employee);
                setOpen(true);
                handleClose();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setEmployeeToDelete(employee);
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

export default EmployeesItem;
