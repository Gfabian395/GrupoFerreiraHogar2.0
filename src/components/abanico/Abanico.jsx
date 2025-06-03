import React, { useState } from "react";
import "./Abanico.css";

export const Abanico = ({ onAgregar, onEditar, onEliminarModo }) => {
  const [activo, setActivo] = useState(false);

  const toggleDropdown = () => {
    setActivo(!activo);
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    if (onAgregar) onAgregar();
    setActivo(false);
  };

  const handleEditar = (e) => {
    e.preventDefault();
    if (onEditar) onEditar();
    setActivo(false);
  };

  const handleEliminarModo = (e) => {
    e.preventDefault();
    const password = prompt("Ingresa la contraseña para eliminar:");
    if (password === "asd") {
      if (onEliminarModo) onEliminarModo();
    } else {
      alert("Contraseña incorrecta. No se eliminó la categoría.");
    }
    setActivo(false);
  };

  return (
    <div className={`box ${activo ? "open" : "closed"}`}>
      <div className={`dropdown ${activo ? "active" : ""}`} onClick={toggleDropdown}>
        +
        <div className="items">
          <a href="#" style={{ "--i": 1 }} onClick={handleAgregar}>
            <span></span>Agregar
          </a>
          <a href="#" style={{ "--i": 2 }} onClick={handleEditar}>
            <span></span>Editar
          </a>
          <a href="#" style={{ "--i": 3 }} onClick={handleEliminarModo}>
            <span></span>Borrar
          </a>
        </div>
      </div>
    </div>
  );
};