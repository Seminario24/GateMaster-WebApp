import React, { useState } from 'react';
import './apps.css';

const Apps = () => {
  const [apps, setApps] = useState([
    { id: 1, name: 'App1', description: 'Descripción de App1', version: '1.0.0' },
    { id: 2, name: 'App2', description: 'Descripción de App2', version: '2.1.0' },
    { id: 3, name: 'App3', description: 'Descripción de App3', version: '3.3.2' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newApp, setNewApp] = useState({ name: '', description: '', version: '' });
  const [isCreating, setIsCreating] = useState(false);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApp({ ...newApp, [name]: value });
  };

  const handleCreateApp = () => {
    if (newApp.name && newApp.description && newApp.version) {
      setApps([...apps, { id: apps.length + 1, ...newApp }]);
      setNewApp({ name: '', description: '', version: '' });
      setIsCreating(false);
    }
  };

  return (
    <div className="apps-container">
      <h2 className="apps-title">Gestión de Aplicaciones</h2>
      <div className="apps-search-create">
        <input
          type="text"
          placeholder="Buscar por nombre de app"
          value={searchTerm}
          onChange={handleSearchChange}
          className="apps-search"
        />
        <button onClick={() => setIsCreating(!isCreating)} className="apps-create-button">
          + Crear App
        </button>
      </div>
      
      {isCreating && (
        <div className="apps-create-form">
          <h3>Agregar Nueva App</h3>
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
          <div className="apps-create-actions">
            <button onClick={handleCreateApp} className="save-button">Guardar</button>
            <button onClick={() => setIsCreating(false)} className="cancel-button">Cancelar</button>
          </div>
        </div>
      )}

      <table className="apps-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Versión</th>
          </tr>
        </thead>
        <tbody>
          {filteredApps.map((app) => (
            <tr key={app.id}>
              <td>{app.name}</td>
              <td>{app.description}</td>
              <td>{app.version}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Apps;
