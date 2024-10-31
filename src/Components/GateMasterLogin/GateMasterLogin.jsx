import './gateMasterLogin.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import IconCorreo from '../../../public/icons/correo-electronico.png';
import IconPassword from '../../../public/icons/candado.png';

export default function GateMasterLogin() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      // Enviar credenciales al backend utilizando la URL del .env
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/login`, {
        username: username,
        password: password,
      });

      const { accessToken, refreshToken } = response.data;
      // Guardar los tokens en el localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (error) {
      // Manejar errores de autenticación o conexión
      setErrorMessage('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Bienvenido a GateMater</h1>
            <p className="login-description">
              Inicia sesión con tus credenciales. Si no tienes acceso, contáctanos en seminario2024@gmail.com
            </p>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <img src={IconCorreo} alt="Email Icon" className="input-icon" />
              <label htmlFor="username">Correo electrónico</label>
              <input id="username" name="username" type="text" placeholder="" required />
            </div>
            <div className="input-group">
              <img src={IconPassword} alt="Password Icon" className="input-icon" />
              <label htmlFor="password">Contraseña</label>
              <input id="password" name="password" type="password" placeholder="" required />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="login-button">Iniciar Sesión</button>
          </form>
          <div className="divider">
            <span>O inicia sesión con</span>
          </div>
          <button className="login-button google-button">
            <FcGoogle className="icon" />
            Iniciar sesión con Google
          </button>
        </div>
      </div>
    </div>
  );
}