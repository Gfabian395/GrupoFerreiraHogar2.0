import React from "react";
import "./CardCategory.css";

export const CardCategory = ({
  categoria,
  modoEdicion,
  modoEliminar,
  onEditar,
  onEliminar,
  onSeleccionarCategoria,
  seleccionado,
  onCheckboxChange,
}) => {
  return (
    <div
      className={`card-category ${modoEdicion || modoEliminar ? "no-pointer" : "pointer"}`}
      onClick={() => {
        if (!modoEdicion && !modoEliminar && onSeleccionarCategoria) {
          onSeleccionarCategoria(categoria.id);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Ver productos de ${categoria.nombre}`}
      onKeyPress={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !modoEdicion && !modoEliminar) {
          onSeleccionarCategoria && onSeleccionarCategoria(categoria.id);
        }
      }}
    >
      
      {categoria.imagenUrl && (
        <img src={categoria.imagenUrl} alt={categoria.nombre} className="card-category-image" />
      )}

      <h3 className="card-category-title">{categoria.nombre}</h3>
      {categoria.descripcion && <p>{categoria.descripcion}</p>}

      {modoEdicion && (
        <button
          className="btn-edit"
          onClick={(e) => {
            e.stopPropagation();
            onEditar && onEditar(categoria);
          }}
        >
          Editar
        </button>
      )}

      {modoEliminar && (
        <button
          className="btn-delete"
          onClick={(e) => {
            e.stopPropagation();
            onEliminar && onEliminar(categoria.id);
          }}
        >
          Eliminar
        </button>
      )}
    </div>
  );
};
