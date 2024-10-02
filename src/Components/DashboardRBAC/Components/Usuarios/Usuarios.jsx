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

  // Obtener usuarios del backend
  useEffect(() => {
    const fetchUsers = async () => {
      const accessToken = localStorage.getItem('accessToken'); // Obtener token

      if (accessToken) {
        try {
          const response = await axios.get('http://localhost:8081/api/gatemaster/getallusers', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });

          // Filtrar los campos necesarios: username, email, status
          const filteredUsers = response.data.map(user => ({
            username: user.username,  // Asegúrate de que "username" exista en el objeto devuelto por el backend
            email: user.email,
            status: user.status
          }));

          setUsers(filteredUsers); // Actualizar el estado de los usuarios
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

  const handleToggleSuspendUser = (username) => {
    // Lógica para alternar entre suspender y reactivar a un usuario
    setUsers(users.map(user =>
      user.username === username
        ? { ...user, status: user.status === 'suspended' ? 'active' : 'suspended' }
        : user
    ));
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
            <span className={
              user.status === 'active' ? 'status-active' :
              user.status === 'suspended' ? 'status-suspended' :
              'status-inactive'}>
              {user.status === 'active' ? 'Activo' : user.status === 'suspended' ? 'Suspendido' : 'Inactivo'}
            </span>
            <span className="user-actions">
              <img src={EditIcon} alt="Editar" onClick={() => handleEditUser(user.username)} />
              <img src={DeleteIcon} alt="Eliminar" onClick={() => handleDeleteUser(user.username)} />
              <img
                src={SuspendIcon}
                alt={user.status === 'suspended' ? "Reactivar" : "Suspender"}
                onClick={() => handleToggleSuspendUser(user.username)}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;