import React, { useState } from 'react';
import './roles.css';
import Sidebar from '../sideBar/sidebar';  
import { FaSearch, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { name: 'Admin', description: 'Acceso completo a todos los recursos' },
    { name: 'Editor', description: 'Puede editar contenido pero no administrar usuarios' },
    { name: 'Viewer', description: 'Solo puede ver contenido' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole((prevRole) => ({ ...prevRole, [name]: value }));
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    setRoles([...roles, newRole]);
    setNewRole({ name: '', description: '' });
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="role-management-container">
      <Sidebar /> {/* Incluye el Sidebar en el contenedor principal */}
      <div className="role-management-content">
        <header className="header">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre de rol"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button className="add-role-btn" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Agregar Rol
          </button>
        </header>

        <section className="roles-table">
          <table>
            <thead>
              <tr>
                <th>Nombre del Rol</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map((role, index) => (
                <tr key={index}>
                  <td>{role.name}</td>
                  <td>{role.description}</td>
                  <td>
                    <button className="action-btn edit-btn">
                      <FaEdit /> Editar
                    </button>
                    <button className="action-btn delete-btn">
                      <FaTrashAlt /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRoles.length === 0 && (
            <p className="no-results">No se encontraron roles que coincidan con la búsqueda.</p>
          )}
        </section>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Agregar Nuevo Rol</h3>
              <form onSubmit={handleAddRole}>
                <div className="form-group">
                  <label>Nombre del Rol</label>
                  <input
                    type="text"
                    name="name"
                    value={newRole.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Descripción</label>
                  <textarea
                    name="description"
                    value={newRole.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">Guardar</button>
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancelar</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleManagement;