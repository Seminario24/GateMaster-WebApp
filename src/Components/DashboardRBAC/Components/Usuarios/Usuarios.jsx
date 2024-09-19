import './usuarios.css';
import { useState } from 'react';
import EditIcon from '../../../../../public/icons/modificar.png';
import DeleteIcon from '../../../../../public/icons/borrar.png';
import AddIcon from '../../../../../public/icons/agregar.png';
import SearchIcon from '../../../../../public/icons/buscar.png';
import SuspendIcon from '../../../../../public/icons/suspendido.png'; // Ícono de suspensión
import { useNavigate } from 'react-router-dom';
const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
    { id: 3, name: 'Mike Ross', email: 'mike@example.com', status: 'suspended' }, // Ejemplo de usuario suspendido
    // Agrega más usuarios según sea necesario
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const navigate = useNavigate();
  const handleAddUser = () => {
    navigate('/CrearUsuarios'); 
    
  };

  const handleEditUser = (id) => {
    // Lógica para editar un usuario existente
    console.log("Editar usuario", id);
  };

  const handleDeleteUser = (id) => {
    // Lógica para eliminar un usuario existente
    setUsers(users.filter(user => user.id !== id));
  };

  const handleToggleSuspendUser = (id) => {
    // Lógica para alternar entre suspender y reactivar a un usuario
    setUsers(users.map(user =>
      user.id === id
        ? { ...user, status: user.status === 'suspended' ? 'active' : 'suspended' }
        : user
    ));
    console.log(`Usuario con id ${id} ${users.find(user => user.id === id).status === 'suspended' ? 'reactivado' : 'suspendido'}`);
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
          <span>Nombre</span>
          <span>Correo</span>
          <span>Estado</span>
          <span>Acciones</span>
        </div>

        {filteredUsers.map((user) => (
          <div className="user-table-row" key={user.id}>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span className={
              user.status === 'active' ? 'status-active' : 
              user.status === 'suspended' ? 'status-suspended' : 
              'status-inactive'}>
              {user.status === 'active' ? 'Activo' : user.status === 'suspended' ? 'Suspendido' : 'Inactivo'}
            </span>
            <span className="user-actions">
              <img src={EditIcon} alt="Editar" onClick={() => handleEditUser(user.id)} />
              <img src={DeleteIcon} alt="Eliminar" onClick={() => handleDeleteUser(user.id)} />
              <img
                src={SuspendIcon}
                alt={user.status === 'suspended' ? "Reactivar" : "Suspender"}
                onClick={() => handleToggleSuspendUser(user.id)}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
