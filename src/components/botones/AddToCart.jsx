import React, { useRef } from 'react';
import './AddToCart.css';

export const AddToCart = () => {
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    const button = buttonRef.current;

    if (!button.classList.contains('add-to-cart__loading')) {
      button.classList.add('add-to-cart__loading');
      setTimeout(() => {
        button.classList.remove('add-to-cart__loading');
      }, 3700);
    }
  };

  return (
    <>
      <button className="add-to-cart__button" ref={buttonRef} onClick={handleClick}>
        <span className="add-to-cart__text">Agregar al carrito</span>
        <div className="add-to-cart__cart">
          <svg viewBox="0 0 36 26">
            <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
            <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
          </svg>
        </div>
      </button>
    </>
  );
};