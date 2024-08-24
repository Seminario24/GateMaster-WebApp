import './gateMasterLogin.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; 

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
    if (email === validEmail && password === validPassword) {
      login(); // Marca al usuario como autenticado
      navigate('/landingpage');
    } else {
      setErrorMessage('Correo o contraseña incorrectos');
    }

    // **Espacio de trabajo para la integración con el backend**
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
        <div className="login-header">
          <h1>Bienvenido a GateMaster</h1>
          <p>Inicia sesión para continuar</p>
        </div>
        <div className="login-card">
          <button className="login-button google-button">
            <ChromeIcon className="icon" />
            Iniciar sesión con Google
          </button>
          <div className="divider">
            <span>o inicia sesión con</span>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" type="email" placeholder="ejemplo@gmail.com" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input id="password" type="password" placeholder="********" required />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="login-button">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"           
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
