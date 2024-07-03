import React, { useState } from 'react';

import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [cantidad, setCantidad] = useState(1);

  const obtenerUsuarios = (num) => {
    fetch(`https://randomuser.me/api/?results=${num}`)
      .then(response => response.json())
      .then(data => {
        setUsuarios(data.results);
      })
      .catch(error => console.error('Error al obtener los usuarios:', error));
  };

  const manejarCambio = (e) => {
    setCantidad(e.target.value);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    obtenerUsuarios(cantidad);
  };

  return (
    <div className="contenedor">
      <div className="App">
        <h1>Usuarios Aleatorios</h1>
        <form onSubmit={manejarSubmit}>
          <label>
            Ingrese el número de usuarios:
            <input 
              type="number" 
              value={cantidad} 
              onChange={manejarCambio} 
              min="1"
            />
          </label>
          <button type="submit">Buscar</button>
        </form>
        <div className="usuarios">
          {usuarios.map((usuario, index) => (
            <div key={index} className="usuario">
              <h2>{`${usuario.name.first} ${usuario.name.last}`}</h2>
              <p>Correo: {usuario.email}</p>
              <p>Teléfono: {usuario.phone}</p>
              <p>Ubicación: {usuario.location.city}, {usuario.location.country}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
