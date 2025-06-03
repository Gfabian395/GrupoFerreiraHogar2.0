import React, { useState } from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const [active, setActive] = useState(false);
  const location = useLocation();

  return (
    <nav className={`sidebar ${active ? 'active' : ''}`}>
      <div className="logo-menu">
        <h3 className="logo">
          <img src="/Oficial.png" alt="Logo" style={{ height: '70px' }} />
        </h3>

        <i
          className="bx bx-menu toggle-btn bx-md"
          onClick={() => setActive(!active)}
          aria-label="Toggle sidebar"
          role="button"
          tabIndex={0}
          onKeyPress={e => { if (e.key === 'Enter') setActive(!active) }}
        ></i>
      </div>

      <ul className="list">
        <li className={`list-item ${location.pathname === '/' ? 'active' : ''}`}>
          <Link to="/">
            <i className='bx bx-home-smile bx-md'></i>
            <span className="link-name" style={{ '--i': 1 }}>Inicio</span>
          </Link>
        </li>

        <li className={`list-item ${location.pathname === '/clientes' ? 'active' : ''}`}>
          <Link to="/clientes">
            <i className="bx bx-user bx-md"></i>
            <span className="link-name" style={{ '--i': 2 }}>Clientes</span>
          </Link>
        </li>

        <li className={`list-item ${location.pathname.startsWith('/categorias') ? 'active' : ''}`}>
          <Link to="/categorias">
            <i className="bx bx-category bx-md"></i>
            <span className="link-name" style={{ '--i': 3 }}>Categorías</span>
          </Link>
        </li>

        <li className={`list-item ${location.pathname === '/carrito' ? 'active' : ''}`}>
          <Link to="/carrito">
            <i className="bx bx-cart-add bx-md"></i>
            <span className="link-name" style={{ '--i': 4 }}>Carrito</span>
          </Link>
        </li>

        <li className={`list-item ${location.pathname === '/cierrecaja' ? 'active' : ''}`}>
          <Link to="/cierrecaja">
            <i className="bx bxs-bank bx-md"></i>
            <span className="link-name" style={{ '--i': 5 }}>Cierre de caja</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
