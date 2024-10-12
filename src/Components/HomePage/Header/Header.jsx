import './Header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/UMGm1.png'; // Importa la imagen desde Assets
import { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si el usuario está autenticado (puedes reemplazar esta lógica con tu sistema de autenticación)
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const goToHome = () => {
    navigate('/');
  };

  const goToAplicaciones = () => {
    navigate('/aplicaciones');
  };

  const goToPermisos = () => {
    navigate('/permisos');
  };

  const goToAboutUs = () => {
    navigate('/aboutus');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Elimina el token de autenticación
    setIsAuthenticated(false); // Actualiza el estado
    navigate('/'); // Redirige al home o página de login
  };

  return (
    <header className="header">
      <div className="logo" onClick={goToHome} style={{ cursor: 'pointer' }}> 
        <img src={logo} alt="Logo umg" /> 
      </div>
      <nav>
        <ul>
          <li><a href="/aplicaciones" onClick={(e) => { e.preventDefault(); goToAplicaciones(); }}>Apps</a></li>   
          <li><a href="/permisos" onClick={(e) => { e.preventDefault(); goToPermisos(); }}>Permisos</a></li>
          <li><a href="/aboutus" onClick={(e) => { e.preventDefault(); goToAboutUs(); }}>Acerca de Nosotros</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {!isAuthenticated ? (
          <>
            <button className="register">Registrarme</button>
            <button className="sign-in" onClick={goToLogin}>Ingresar</button>
          </>
        ) : (
          <button className="logout" onClick={handleLogout}>Logout</button> // Botón de Logout si el usuario está autenticado
        )}
      </div>
    </header>
  );
};

export default Header;
