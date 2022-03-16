import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ setIsConnected }) => {
  return (
    <div className="bg-white shadow-lg h-10 flex justify-center">
      <div className="flex justify-center flex-1">
        <ul className="flex space-x-32 text-sm font-sans items-center ">
          <li>
            <Link to="/" className="flex-1 hover:font-bold">
              Employees
            </Link>
          </li>
          <li>
            <Link to="/companies" className="flex-1 hover:font-bold">
              Companies
            </Link>
          </li>
          <li>
            <Link to="/report" className="flex-1 hover:font-bold">
              Report
            </Link>
          </li>
          <li
            onClick={() => {
              localStorage.removeItem('token');
              setIsConnected(false);
            }}
          >
            <Link to="/signin" className=" flex-1 hover:font-bold">
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
