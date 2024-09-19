import { useState } from "react";
// Importamos axios
import axios from 'axios';
const CrearUsuario = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Recuperar el token del localStorage
      const token = localStorage.getItem('authToken');
      
      // 1. Llamada al primer servicio: Crear usuario
      const createUserResponse = await axios.post('http://localhost:8081/api/gatemaster/createUser', {
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Añadimos el token en los headers
        }
      });

      if (createUserResponse.status === 201) {
        // 2. Llamada al segundo servicio: Conseguir usuario
        const getUserResponse = await axios.post('http://localhost:8081/api/gatemaster/getuser', {
          username: formData.username
        }, {
          headers: {
            'Authorization': `Bearer ${token}` // Añadimos el token en los headers
          }
        });

        const userData = getUserResponse.data; // Capturamos los datos del usuario
        const userId = userData.id; // Capturamos el ID del usuario

        // 3. Llamada al tercer servicio: Asignar contraseña
        const setPasswordResponse = await axios.post('http://localhost:8081/api/gatemaster/setuserpassword', {
          id: userId,
          password: formData.password
        }, {
          headers: {
            'Authorization': `Bearer ${token}` // Añadimos el token en los headers
          }
        });

        if (setPasswordResponse.status === 200) {
          setResponseMessage('Usuario creado y contraseña asignada correctamente.');
        } else {
          setResponseMessage('Error al asignar la contraseña.');
        }
      } else {
        setResponseMessage('Error al crear el usuario.');
      }
    } catch (error) {
      setResponseMessage('Error en la solicitud: ' + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default CrearUsuario;

