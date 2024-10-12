import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import './usuariosvista.css'; // Asegúrate de importar el archivo CSS

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState(''); // Campo para la contraseña
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Estado para éxito
  const navigate = useNavigate(); // Hook para navegación

  const createUser = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setMessage('Token no encontrado, por favor inicia sesión.');
      return;
    }

    try {
      // Primer paso: Crear usuario
      await axios.post(
        'http://localhost:8081/api/gatemaster/createuser',
        {
          username,
          email,
          firstName,
          lastName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Segundo paso: Obtener el ID del usuario creado
      const userResponse = await axios.post(
        'http://localhost:8081/api/gatemaster/getuser',
        {
          username,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userId = userResponse.data.id; // Asumimos que devuelve el 'id'
      console.log('Usuario creado con ID:', userId);

      // Tercer paso: Establecer la contraseña del usuario
      const passwordResponse = await axios.post(
        'http://localhost:8081/api/gatemaster/setuserpassword',
        {
          id: userId,
          password, // La contraseña ingresada
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Mensaje de éxito si todo sale bien
      setMessage('Usuario y contraseña creados exitosamente');
      setIsSuccess(true); // Establece el estado de éxito a verdadero
      console.log('Contraseña establecida:', passwordResponse.data);
      
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setMessage('Error: ' + (error.response ? error.response.data : error.message));
      setIsSuccess(false); // Restablecer el estado de éxito en caso de error
    }
  };

  // Función para regresar al dashboard
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="create-account-container">
      <h2>Crear Usuario</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Campo para la contraseña
      />
      <button onClick={createUser}>Crear Usuario</button>

      <button onClick={goToDashboard} className="back-button">
        Regresar al Dashboard
      </button>

      {/* Mostrar mensaje de éxito con ícono de check */}
      {isSuccess && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i> {/* Ícono Font Awesome */}
          <p>{message}</p>
        </div>
      )}

      {/* Mostrar solo el mensaje de error si no es éxito */}
      {!isSuccess && message && <p>{message}</p>}
    </div>
  );
};

export default CreateUser;
