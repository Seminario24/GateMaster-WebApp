// src/Components/Aplicaciones/Aplicaciones.jsx
import React, { useState, useEffect } from 'react';
import './Aplicaciones.css';

const Aplicaciones = () => {
    const [aplicaciones, setAplicaciones] = useState([]);
    const [nuevaAplicacion, setNuevaAplicacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [editIndex, setEditIndex] = useState(-1);

    useEffect(() => {
        const aplicacionesGuardadas = JSON.parse(localStorage.getItem('aplicaciones') || '[]');
        setAplicaciones(aplicacionesGuardadas);
    }, []);

    useEffect(() => {
        localStorage.setItem('aplicaciones', JSON.stringify(aplicaciones));
    }, [aplicaciones]);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const addOrEditAplicacion = () => {
        if (nuevaAplicacion.trim() && descripcion.trim()) {
            const nuevaApp = { name: nuevaAplicacion, description: descripcion };
            const updatedApps = [...aplicaciones];
            if (editIndex >= 0) {
                updatedApps[editIndex] = nuevaApp;
            } else {
                updatedApps.push(nuevaApp);
            }
            setAplicaciones(updatedApps);
            setNuevaAplicacion('');
            setDescripcion('');
            setEditIndex(-1);
        }
    };

    const startEdit = (index) => {
        setEditIndex(index);
        setNuevaAplicacion(aplicaciones[index].name);
        setDescripcion(aplicaciones[index].description);
    };

    const deleteAplicacion = (index) => {
        const updatedApps = aplicaciones.filter((_, i) => i !== index);
        setAplicaciones(updatedApps);
    };

    return (
        <div className="aplicaciones-container">
            {aplicaciones.map((app, index) => (
                <div key={index} className="app-card">
                    <div className="app-title">"{app.name}"</div>
                    <div className="app-description">{app.description}</div>
                    <div className="buttons-container">
                        <button onClick={() => startEdit(index)} className="edit-button">Editar</button>
                        <button onClick={() => deleteAplicacion(index)} className="delete-button">Eliminar</button>
                    </div>
                </div>
            ))}
            <div className="app-card add-new">
                <input
                    type="text"
                    placeholder="Nombre de la nueva aplicación"
                    value={nuevaAplicacion}
                    onChange={handleInputChange(setNuevaAplicacion)}
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={handleInputChange(setDescripcion)}
                />
                <button onClick={addOrEditAplicacion} className="add-button">
                    {editIndex >= 0 ? 'Actualizar' : 'Agregar'}
                </button>
            </div>
        </div>
    );
};

export default Aplicaciones;
