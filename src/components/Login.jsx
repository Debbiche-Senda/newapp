import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsConnected }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setIsConnected(true);

      console.log('token', res.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex w-full h-screen items-center  py-12 px-6  justify-center  ">
        <div>
          <div className="max-w-xs h-64 flex flex-col justify-center bg-white dark:bg-gray-200 rounded-lg border border-gray-100 mb-6 py-5 px-4">
            <div>
              <h4 className=" text-gray-600 font-bold text-center text-xl mb-3">Login</h4>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                className="!mb-3 !w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                className="!w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center justify-center pt-3">
                <Button className="!text-gray-600" onClick={() => login()}>
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
