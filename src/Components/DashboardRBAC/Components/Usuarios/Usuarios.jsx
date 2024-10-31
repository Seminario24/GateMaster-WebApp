import './usuarios.css';
import { useState, useEffect } from 'react';
import EditIcon from '../../../../../public/icons/modificar.png';
import DeleteIcon from '../../../../../public/icons/borrar.png';
import AddIcon from '../../../../../public/icons/agregar.png';
import SearchIcon from '../../../../../public/icons/buscar.png';
import SuspendIcon from '../../../../../public/icons/suspendido.png'; // Ícono de suspensión
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [userStatus, setUserStatus] = useState({}); // Estado para los estados de usuario

  // Obtener usuarios del backend
  useEffect(() => {
    const fetchUsers = async () => {
      const accessToken = localStorage.getItem('accessToken'); // Obtener token

      if (accessToken) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/gatemaster/getallusers`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });

          // Filtrar los campos necesarios: username, email
          const filteredUsers = response.data.map(user => ({
            username: user.username,
            email: user.email,
          }));

          setUsers(filteredUsers); // Actualizar el estado de los usuarios

          // Obtener el estado de todos los usuarios
          const statusResponse = await axios.get(`${import.meta.env.VITE_APP_API_URL}/gatemaster/getallusersstatus`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });

          // Guardar los estados en un objeto
          const statusData = {};
          statusResponse.data.forEach(user => {
            statusData[user.username] = user.status; // Mapa de username a status
          });

          setUserStatus(statusData); // Actualizar el estado con los estados de los usuarios
        } catch (error) {
          console.error('Error al obtener los usuarios:', error);
        }
      } else {
        console.error('Token no encontrado en el localStorage');
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();
  const handleAddUser = () => {
    navigate('/CrearUsuarios');
  };

  const handleEditUser = (username) => {
    // Lógica para editar un usuario existente
    console.log("Editar usuario", username);
  };

  const handleDeleteUser = (username) => {
    // Lógica para eliminar un usuario existente
    setUsers(users.filter(user => user.username !== username));
  };

  const handleToggleSuspendUser = async (username) => {
    const accessToken = localStorage.getItem('accessToken'); // Obtener token

    if (accessToken) {
      try {
        console.log("Deshabilitando usuario:", username); // Imprimir el nombre de usuario
        const response = await axios.put(`${import.meta.env.VITE_APP_API_URL}/gatemaster/disableuser`, {
          username: username
        }, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        console.log(response.data); // Mensaje de éxito del backend

        // Actualizar el estado del usuario
        setUserStatus(prevStatus => ({
          ...prevStatus,
          [username]: 'suspended' // Cambiar el estado a "suspendido"
        }));
      } catch (error) {
        console.error('Error al deshabilitar al usuario:', error);
      }
    } else {
      console.error('Token no encontrado en el localStorage');
    }
  };

  const handleToggleEnableUser = async (username) => {
    const accessToken = localStorage.getItem('accessToken'); // Obtener token

    if (accessToken) {
      try {
        console.log("Habilitando usuario:", username); // Imprimir el nombre de usuario
        const response = await axios.put(`${import.meta.env.VITE_APP_API_URL}/gatemaster/enableuser`, {
          username: username
        }, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        console.log(response.data); // Mensaje de éxito del backend

        // Actualizar el estado del usuario
        setUserStatus(prevStatus => ({
          ...prevStatus,
          [username]: 'active' // Cambiar el estado a "activo"
        }));
      } catch (error) {
        console.error('Error al habilitar al usuario:', error);
      }
    } else {
      console.error('Token no encontrado en el localStorage');
    }
  };

  return (
    <div className="user-section">
      <div className="user-controls">
        <div className="search-container">
          <img src={SearchIcon} alt="Buscar" className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por correo"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <button onClick={handleAddUser} className="add-user-button">
          <img src={AddIcon} alt="Agregar usuario" /> Agregar Usuario
        </button>
      </div>

      <div className="user-table-grid">
        <div className="user-table-header">
          <span>Username</span>
          <span>Email</span>
          <span>Status</span>
          <span>Acciones</span>
        </div>

        {filteredUsers.map((user) => (
          <div className="user-table-row" key={user.username}>
            <span>{user.username}</span>
            <span>{user.email}</span>
            <span className={userStatus[user.username] === 'active' ? 'status-active' : 'status-suspended'}>
              {userStatus[user.username] === 'active' ? 'Activo' : 'Suspendido'}
            </span>
            <span className="user-actions">
              <img src={EditIcon} alt="Editar" onClick={() => handleEditUser(user.username)} />
              <img src={DeleteIcon} alt="Eliminar" onClick={() => handleDeleteUser(user.username)} />
              {userStatus[user.username] === 'suspended' ? (
                <img
                  src={SuspendIcon}
                  alt="Reactivar"
                  onClick={() => handleToggleEnableUser(user.username)} // Cambia el estado a habilitar
                />
              ) : (
                <img
                  src={SuspendIcon}
                  alt="Suspender"
                  onClick={() => handleToggleSuspendUser(user.username)} // Cambia el estado a suspender
                />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;