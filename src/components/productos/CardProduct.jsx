import React, { useState } from 'react';
import './CardProduct.css';
import { AddToCart } from '../botones/AddToCart';

export const CardProduct = ({
  id,
  title,
  modelo,
  price,
  image,
  descripcion,
  colors = [],
  stock1,
  stock2,
  modoEdicion = false,
  modoEliminar = false,
  onEditar,
  onEliminar
}) => {
  const priceFormatted = `$${Math.round(price)}`;
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="card-product"
        role="button"
        tabIndex={0}
        aria-label={`Ver producto ${title}`}
      >
        <img
          src={image}
          alt={title}
          className="card-product-image"
          onClick={() => setModalOpen(true)}
        />

        <div className="card-product-content">
          <h4 className="card-product-title">{title}</h4>
          <p className="card-product-price">{priceFormatted}</p>

          <p className="descripcion">
            <strong>Descripción:</strong>
            <br /> {descripcion}
          </p>
          <br />

          {colors.length > 0 && (
            <div className="product-colors">
              <strong>Colores:</strong> {colors.join(', ')}
            </div>
          )}
          <br />

          <div className="product-stock">
            <strong>Stock</strong>
            <br />
            <strong>Los Andes 4320:</strong> {stock1} |{' '}
            <strong>Los Andes 4034:</strong> {stock2}
          </div>

          <p>
            <strong>Modelo:</strong> {modelo}
          </p>
        </div>

        <AddToCart />

        {(modoEdicion || modoEliminar) && (
          <div className="product-actions">
            {modoEdicion && (
              <button className="btn-editar" onClick={onEditar}>
                Editar
              </button>
            )}
            {modoEliminar && (
              <button className="btn-eliminar" onClick={onEliminar}>
                Eliminar
              </button>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="image-modal" onClick={() => setModalOpen(false)}>
          <img src={image} alt={title} className="image-modal-content" />
          <span className="image-modal-close">&times;</span>
        </div>
      )}
    </>
  );
};
