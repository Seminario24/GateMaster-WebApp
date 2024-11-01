import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css';

import UmgLogo from '../../../../Assets/UMGm1.png';
import User from '../../../../../public/icons/user.png';
import Settings from '../../../../../public/icons/settings.png';
import Home from '../../../../../public/icons/home.png';
import Rol from '../../../../../public/icons/roles.png';
import Sesion from '../../../../../public/icons/cerrar-sesion.png';
import AppsIcon from '../../../../../public/icons/roles.png'; // Asegúrate de tener el ícono para Apps

function Sidebar() {
  
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = import.meta.env.VITE_APP_ENDPOINT;
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <img src={UmgLogo} alt="Logo Umg" className="sidebar-logo" />
        <button className="toggle-button" onClick={handleToggle}>
          {isExpanded ? '←' : '→'}
        </button>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard" className="sidebar-link">
            <img src={Home} alt="Inicio" className="menu-icon" />
            {isExpanded && <span>Inicio</span>}
          </Link>
        </li>
        <li>
          <Link to="/users" className="sidebar-link">
            <img src={User} alt="Usuarios" className="menu-icon" />
            {isExpanded && <span>Usuarios</span>}
          </Link>
        </li>
        <li>
          <Link to="/roles" className="sidebar-link">
            <img src={Rol} alt="Roles" className="menu-icon" />
            {isExpanded && <span>Roles</span>}
          </Link>
        </li>
        <li>
          <Link to="/settings" className="sidebar-link">
            <img src={Settings} alt="Ajustes" className="menu-icon" />
            {isExpanded && <span>Ajustes</span>}
          </Link>
        </li>
        
        {/* Botón para ir a la sección de Apps, justo debajo de Ajustes */}
        <li>
          <Link to="/apps" className="sidebar-link">
            <img src={AppsIcon} alt="Apps" className="menu-icon" />
            {isExpanded && <span>Apps</span>}
          </Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          <img src={Sesion} alt="Logout" className="menu-icon" />
          {isExpanded && <span>Salir</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
