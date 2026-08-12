import React from 'react';
import {Button} from '@mui/material';
import LogIn from './LogIn';

const LogInButton = ({openLogin}) => {

  return (
    <div>
        <button className="border p-4 border-blue-300 rounded-lg font-semibold" type="button" onClick={openLogin}>Log In</button>
    </div>
  )
}

export default LogInButton