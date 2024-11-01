import React from 'react';
import Sidebar from '../sideBar/sidebar';  

const Ajustes = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar /> 
      <div style={{ textAlign: 'center', marginTop: '20%', flexGrow: 1 }}>
        <h1>Ajustes</h1>
        <p>Trabajando en pantalla... Espera un poco mas!!!</p>
      </div>
    </div>
  );
};

export default Ajustes;