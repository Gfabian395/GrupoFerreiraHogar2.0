// src/components/abanico/Abanico.jsx
import React, { useState } from 'react';
import './Abanico.css';

export const Abanico = ({ onAgregar }) => {
  const [activo, setActivo] = useState(false);

  const toggleDropdown = () => {
    setActivo(!activo);
  };

  return (
    <div className={`box ${activo ? 'open' : 'closed'}`}>
      <div className={`dropdown ${activo ? 'active' : ''}`} onClick={toggleDropdown}>
        +
        <div className="items">
          <a
            href="#"
            style={{ "--i": 1 }}
            onClick={(e) => {
              e.preventDefault();
              if (onAgregar) onAgregar();
              setActivo(false);
            }}
          >
            <span></span>Agregar
          </a>
          <a href="#" style={{ "--i": 2 }}><span></span>Editar</a>
          <a href="#" style={{ "--i": 3 }}><span></span>Borrar</a>
        </div>
      </div>
    </div>
  );
};
