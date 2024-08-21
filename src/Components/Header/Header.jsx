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

  return (
    <header className="header">
      <div className="logo" onClick={goToLandingPage} style={{ cursor: 'pointer' }}> 
        <img src={logo} alt="Logo" /> 
      </div>
      <nav>
        <ul>
          <li><a href="#apps">Apps</a></li>   
          <li><a href="/permisos" onClick={(e) => { e.preventDefault(); navigate('/permisos'); }}>Permisos</a></li> {/* Navega a /permisos */}
          <li><a href="#about">Acerca de Nosotros</a></li>
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
