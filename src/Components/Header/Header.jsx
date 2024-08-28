import './Header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/UMGm1.png'; // Importa la imagen desde Assets

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.location.href = 'http://localhost:5173/';
  };

  const goToLandingPage = () => {
    navigate('/landingpage'); // Navega a la página de aterrizaje
  };

  const goToAplicaciones = () => {
    navigate('/aplicaciones'); // Navega a la página de aplicaciones
  };

  const goToPermisos = () => {
    navigate('/permisos'); // Navega a la página de permisos
  };

  const goToAboutUs = () => {
    navigate('/aboutus'); // Navega a la página de About Us
  };

  return (
    <header className="header">
      <div className="logo" onClick={goToLandingPage} style={{ cursor: 'pointer' }}> 
        <img src={logo} alt="Logo" /> 
      </div>
      <nav>
        <ul>
          <li><a href="/aplicaciones" onClick={(e) => { e.preventDefault(); goToAplicaciones(); }}>Apps</a></li>   
          <li><a href="/permisos" onClick={(e) => { e.preventDefault(); goToPermisos(); }}>Permisos</a></li>
          <li><a href="/aboutus" onClick={(e) => { e.preventDefault(); goToAboutUs(); }}>Acerca de Nosotros</a></li> {/* Ajuste para navegar a About Us */}
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="sign-in">Sign in</button>
        <button className="register">Register</button>
        <button className="logout" onClick={handleLogout}>Salir</button>
      </div>
    </header>
  );
};

export default Header;
