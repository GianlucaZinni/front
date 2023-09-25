// Login.tsx
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, CircularProgress, Paper, Box } from '@material-ui/core';
import { LockOpen as LockOpenIcon } from '@material-ui/icons';
import axios from 'axios';
import '../../commons/styles/Login.css'

interface LoginProps {
  onLoginSuccess?: (token: string) => void;
  onLoginFailure?: (error: any) => void;
  endpoint: string;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onLoginFailure, endpoint }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(endpoint, { username, password });
      if (response.data && response.data.token) {
        onLoginSuccess && onLoginSuccess(response.data.token);
      } else {
        onLoginFailure && onLoginFailure("No token received");
      }
    } catch (error) {
      onLoginFailure && onLoginFailure(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fullScreenContainer">
      <Container maxWidth='xs'>
        <Paper elevation={8} style={{ padding: '20px', backgroundColor: 'white' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Loguearse
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box mt={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={loading ? <CircularProgress size={20} /> : <LockOpenIcon />}
                onClick={handleLogin}
                disabled={loading}
              >
                Iniciar Sesion
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );  
}

export default Login;
