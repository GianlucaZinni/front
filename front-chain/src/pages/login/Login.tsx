import React from 'react';
import { Button } from '@mui/material';

const Login: React.FC = () => {

  const handleLoginClick = () => {
    // Asegúrate de que el REACT_APP_BACKEND_URL termina con `/google/login`
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/google/login`;
  };

  return (
    <div>
      <Button onClick={handleLoginClick} variant="contained">
        Logearse con Google
      </Button>
    </div>
  );
};

export default Login;