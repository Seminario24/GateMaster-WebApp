import './gateMasterLogin.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; 

// TODO Iconos e imagenes
import { FcGoogle } from 'react-icons/fc';
import IconCorreo from '../../../public/icons/correo-electronico.png'
import IconPassword from '../../../public/icons/candado.png'

export default function GateMasterLogin() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa el contexto de autenticación
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    // Datos quemados para validación
    const validEmail = 'Fake@123.com';
    const validPassword = '1234';

    // Validación con datos quemados (mientras se conecta con el backend)
    if (email !== validEmail && password !== validPassword) {
      setErrorMessage('Correo electrónico y contraseña incorrectos');
    } else if (email !== validEmail) {
      setErrorMessage('Correo electrónico incorrecto');
    } else if (password !== validPassword) {
      setErrorMessage('Contraseña incorrecta');
    } else {
      setErrorMessage(''); // Limpia el mensaje de error
      login();
      navigate('/landingpage');
    }

    // TODO: Espacio de trabajo para la integración con el backend
    // Aquí es donde se implementará la lógica para hacer la verificación real
    // con el backend. Por ejemplo, podrías hacer una llamada a una API para
    // autenticar al usuario, como se muestra en el ejemplo comentado abajo:

    /*
    try {
      const response = await fetch('https://tu-backend.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        login(); // Marca al usuario como autenticado
        navigate('/landingpage');
      } else {
        // Muestra el mensaje de error recibido desde el backend
        setErrorMessage(data.message || 'Correo o contraseña incorrectos');
      }
    } catch (error) {
      setErrorMessage('Error de conexión. Inténtalo de nuevo más tarde.');
    }
    */
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Bienvenido a GateMater</h1>
            <p className="login-description">
              Inicia sesión con tus credenciales para acceder al ERP 2024. Si no tienes acceso, contáctanos en seminario2024@gmail.com.
            </p>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <img src={IconCorreo} alt="Email Icon" className="input-icon" />
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="input-group">
              <img src={IconPassword} alt="Password Icon" className="input-icon" />
              <label htmlFor="password">Contraseña</label>
              <input id="password" name="password" type="password" placeholder="********" required />
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
  )
}