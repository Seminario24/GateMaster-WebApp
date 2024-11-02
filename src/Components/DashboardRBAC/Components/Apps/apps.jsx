import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../sideBar/sidebar';
import './apps.css';

const Apps = () => {
  const [apps, setApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newApp, setNewApp] = useState({ app_id: '', name: '', description: '', version: '' });
  const [editingApp, setEditingApp] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchApps = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setMessage('Token no encontrado, por favor inicia sesión.');
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/gatemaster/getallapps`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setApps(response.data); 
      } catch (error) {
        console.error("Error al obtener las aplicaciones:", error);
        setMessage('Error al obtener aplicaciones');
      }
    };

    fetchApps();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredApps = apps.filter(app =>
    app.app_name && app.app_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApp({ ...newApp, [name]: value });
  };

  const handleCreateApp = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setMessage('Token no encontrado, por favor inicia sesión.');
      return;
    }

    if (newApp.app_id && newApp.name && newApp.description && newApp.version) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/gatemaster/createapp`,
          {
            app_id: newApp.app_id,
            app_name: newApp.name,
            app_description: newApp.description || null,
            app_version: newApp.version || null,
            created_by: "andrick", // Cambia esto al nombre de usuario adecuado
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setApps([...apps, { app_id: response.data.app_id, ...newApp }]);
        setNewApp({ app_id: '', name: '', description: '', version: '' });
        setIsCreating(false);
        setMessage('Aplicación creada con éxito');
      } catch (error) {
        console.error("Error al crear la aplicación:", error);
        setMessage(error.response?.status === 409 ? 'El nombre de la aplicación ya existe' : 'Error al crear aplicación');
      }
    } else {
      setMessage('Por favor completa todos los campos.');
    }
  };

  const handleEditApp = (app) => {
    setEditingApp(app);
    setNewApp({ app_id: app.app_id, name: app.app_name, description: app.app_description, version: app.app_version });
  };

  const handleUpdateApp = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setMessage('Token no encontrado, por favor inicia sesión.');
      return;
    }

    if (editingApp) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/gatemaster/updateapp/${editingApp.app_id}`,
          {
            app_name: newApp.name,
            app_description: newApp.description,
            app_version: newApp.version,
            updated_by: "andrick", // Cambia esto al nombre de usuario adecuado
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setApps(apps.map(app => app.app_id === editingApp.app_id ? { ...app, ...newApp } : app));
        setEditingApp(null);
        setNewApp({ app_id: '', name: '', description: '', version: '' });
        setMessage('Aplicación actualizada con éxito');
      } catch (error) {
        console.error("Error al actualizar la aplicación:", error);
        setMessage(error.response?.status === 409 ? 'El nombre de la aplicación ya existe' : 'Error al actualizar aplicación');
      }
    }
  };

  return (
    <div className="apps-management-container">
      <Sidebar />
      <div className="apps-content">
        <h2 className="apps-title">Gestión de Aplicaciones</h2>
        <div className="apps-search-create">
          <input
            type="text"
            placeholder="Buscar por nombre de app"
            value={searchTerm}
            onChange={handleSearchChange}
            className="apps-search"
          />
          <button onClick={() => setIsCreating(true)} className="apps-create-button">
            + Crear App
          </button>
        </div>

        {(isCreating || editingApp) && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>{isCreating ? 'Agregar Nueva App' : 'Editar App'}</h3>
              <input
                type="text"
                name="app_id"
                placeholder="ID de la App"
                value={newApp.app_id}
                onChange={handleInputChange}
                disabled={!!editingApp}
              />
              <input
                type="text"
                name="name"
                placeholder="Nombre de la App"
                value={newApp.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Descripción"
                value={newApp.description}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="version"
                placeholder="Versión"
                value={newApp.version}
                onChange={handleInputChange}
              />
              <div className="modal-actions">
                {isCreating ? (
                  <button onClick={handleCreateApp} className="save-button">Guardar</button>
                ) : (
                  <button onClick={handleUpdateApp} className="save-button">Actualizar</button>
                )}
                <button onClick={() => { setIsCreating(false); setEditingApp(null); }} className="cancel-button">Cancelar</button>
              </div>
            </div>
          </div>
        )}

        <table className="apps-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Versión</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((app) => (
              <tr key={app.app_id}>
                <td>{app.app_name}</td>
                <td>{app.app_description}</td>
                <td>{app.app_version}</td>
                <td>
                  <button onClick={() => handleEditApp(app)} className="edit-button">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Apps;
