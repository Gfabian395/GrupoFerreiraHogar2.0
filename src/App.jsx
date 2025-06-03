import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import { Sidebar } from './components/sidebar/Sidebar';
import { Carrusel } from './components/carrusel/Carrusel';
import { Home } from './pages/Home';
import { Clientes } from './pages/Clientes';
import { Categorias } from './pages/Categorias';
import { Carrito } from './pages/Carrito';
import { CierreCaja } from './pages/CierreCaja.jsx';

function App() {
  const [sidebarActive, setSidebarActive] = useState(false);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar setSidebarActive={setSidebarActive} />
        <div
          style={{
            marginLeft: sidebarActive ? '260px' : '80px',
            transition: 'margin-left 0.3s ease',
            padding: '5px',
            width: '100%'
          }}
        >
          <Routes>
            <Route path="/" element={<Carrusel />} />
            <Route path="/inicio" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/cierreCaja" element={<CierreCaja />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
