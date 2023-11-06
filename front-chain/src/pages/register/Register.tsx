import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface FormData {
  dni: number;
  nombre: string;
  apellido: string;
  telefono: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    dni: 0,
    nombre: '',
    apellido: '',
    telefono: '',
  });

  useEffect(() => {
    // Función para obtener el parámetro de la URL
    const getTokenFromUrl = () => {
      // Extraer el parámetro de búsqueda 'token' de la URL
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');
  
      if (token) {
        window.localStorage.setItem('authToken', token);
  
        // Opcional: Navegar a otro camino si es necesario
        // navigate('/pathAfterSavingToken', { replace: true });
  
        // Limpiar la URL
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState({}, '', newUrl);
      }
    };
  
    getTokenFromUrl();
  }, [navigate]);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Obtener el token de localStorage
    const token = window.localStorage.getItem('authToken');
    
    // Si hay un token, realizar la solicitud POST con el token en el encabezado
    if (token) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/votechain/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Incluir el token en el encabezado de Autorización
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Manejar la respuesta exitosa
          console.log('Registro exitoso');
          // Opcionalmente navegar a otra página o mostrar mensaje de éxito
        } else {
          // Manejar la respuesta fallida
          console.error('Registro fallido:', data.message);
        }
      })
      .catch(error => {
        // Manejar el error de la solicitud
        console.error('Error:', error);
      });
    } else {
      // Si no hay token, manejar la falta de autenticación
      console.error('No hay token de autenticación disponible.');
    }
    
    setDialogOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setDialogOpen(true)} variant="contained">
        Registrarse
      </Button>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Ingrese sus datos</DialogTitle>
        <DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="dni"
            label="DNI"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.dni}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="nombre"
            label="Nombre"
            type="string"
            fullWidth
            variant="outlined"
            value={formData.nombre}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="apellido"
            label="Apellido"
            type="string"
            fullWidth
            variant="outlined"
            value={formData.apellido}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="telefono"
            label="Telefono"
            type="string"
            fullWidth
            variant="outlined"
            value={formData.telefono}
            onChange={handleChange}
          />
        </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Register;
