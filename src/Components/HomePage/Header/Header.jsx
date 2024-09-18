import './Header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/UMGm1.png'; // Importa la imagen desde Assets

const Header = () => {
  const navigate = useNavigate();

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
        <button className="register">Registrarme</button>
        <button className="sign-in" onClick={goToLogin}>Ingresar</button>
      </div>
    </header>
  );
};

export default Header;
