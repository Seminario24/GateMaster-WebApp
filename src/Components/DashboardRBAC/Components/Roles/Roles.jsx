import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './roles.css';
import Sidebar from '../sideBar/sidebar';
import { FaSearch, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

const RoleManagement = () => {
  const [roleId, setRoleId] = useState('');
  const [roleName, setRoleName] = useState('');
  const [createdBy, setCreatedBy] = useState(''); // Cambiado de roleDescription a createdBy
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Función para obtener todos los roles
  const getAllRoles = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setMessage('Token no encontrado, por favor inicia sesión.');
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/gatemaster/getallroles`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setRoles(response.data);
    } catch (error) {
      console.error('Error al obtener roles:', error);
      setMessage('Error al obtener roles');
    }
  };

  // Función para crear un nuevo rol
  const createRole = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setMessage('Token no encontrado, por favor inicia sesión.');
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/gatemaster/createrole`,
        {
          role_id: roleId || null,
          name: roleName,
          active: true,
          created_by: createdBy, // Cambiado de dcreated_by a created_by
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setMessage('Rol creado exitosamente');
      setIsSuccess(true);

      // Limpiar campos
      setRoleId('');
      setRoleName('');
      setCreatedBy(''); // Limpiar createdBy
      setIsModalOpen(false);

      // Llamar a getAllRoles para actualizar la lista automáticamente
      getAllRoles();

    } catch (error) {
      console.error('Error al crear rol:', error);
      setMessage('Error: ' + (error.response ? error.response.data : error.message));
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    getAllRoles(); // Cargar roles al montar el componente
  }, []);

  // Resto del código sigue igual...
  
  return (
    <div className="role-management-container">
      <Sidebar />
      <div className="role-management-content">
        <header className="header">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre de rol"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <th>ID del Rol</th>
                <th>Nombre del Rol</th>
                <th>Creado por</th> {/* Cambiado de Descripción a Creado por */}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {roles.filter(role => role.name.toLowerCase().includes(searchTerm.toLowerCase())).map((role) => (
                <tr key={role.role_id}>
                  <td>{role.role_id || 'Sin ID'}</td>
                  <td>{role.name}</td>
                  <td>{role.created_by || 'Sin información'}</td> {/* Cambiado de dcreated_by a created_by */}
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
          {roles.filter(role => role.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
            <p className="no-results">No se encontraron roles que coincidan con la búsqueda.</p>
          )}
        </section>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Agregar Nuevo Rol</h3>
              <form onSubmit={(e) => { e.preventDefault(); createRole(); }}>
                <div className="form-group">
                  <label>ID del Rol</label>
                  <input
                    type="text"
                    name="role_id"
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                    placeholder="Ingrese ID (opcional)"
                  />
                </div>
                <div className="form-group">
                  <label>Nombre del Rol</label>
                  <input
                    type="text"
                    name="name"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Creado por</label> {/* Cambiado de Descripción a Creado por */}
                  <textarea
                    name="created_by" // Cambiado de description a created_by
                    value={createdBy} // Cambiado de roleDescription a createdBy
                    onChange={(e) => setCreatedBy(e.target.value)} // Cambiado de setRoleDescription a setCreatedBy
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

