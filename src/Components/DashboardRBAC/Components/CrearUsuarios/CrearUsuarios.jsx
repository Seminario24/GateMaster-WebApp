import  { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8081/api/gatemaster'; // URL actualizada

const getAccessToken = async () => {
  let accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken && !refreshToken) {
    throw new Error('No hay tokens disponibles. Por favor, inicia sesión.');
  }

  try {
    await axios.get(`${API_URL}/authenticate`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    return accessToken; // El accessToken aún es válido, retornarlo
  } catch (error) {
    if (error.response && error.response.status === 401) {
      try {
        const response = await axios.post(`${API_URL}/refresh-token`, { token: refreshToken });
        const { newAccessToken } = response.data;
        localStorage.setItem('accessToken', newAccessToken);
        return newAccessToken;
      } catch (refreshError) {
        throw new Error('No se pudo renovar el token, por favor inicia sesión nuevamente.');
      }
    }
    throw new Error('Error al verificar o renovar el token.');
  }
};

const createUser = async (userData) => {
  const accessToken = await getAccessToken(); // Obtener (o renovar) el token antes de la solicitud

  try {
    const response = await axios.post(`${API_URL}/createuser`, userData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Asegúrate de que el token se incluya aquí
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error); // Muestra el error en la consola
    throw new Error('Error al crear el usuario');
  }
};

const CrearUsuarios = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userData = {
      username,
      email,
      firstName,
      lastName,
    };

    try {
      const result = await createUser(userData);
      console.log("Usuario creado exitosamente:", result);
      // Aquí puedes redirigir o mostrar un mensaje de éxito
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CrearUsuarios;
