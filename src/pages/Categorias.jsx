import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Abanico } from '../components/abanico/Abanico';
import { CardCategory } from '../components/categorias/CardCategory';
import { AddCategory } from '../components/categorias/AddCategory';
import { CardProductDetail } from '../components/productos/CardProductDetail';

export const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modoEliminar, setModoEliminar] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // Cargar categorías desde Firebase
  const cargarCategorias = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'categorias'));
      const cats = [];
      querySnapshot.forEach((doc) => {
        cats.push({ id: doc.id, ...doc.data() });
      });
      setCategorias(cats);
    } catch (error) {
      console.error('Error cargando categorías:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // Agregar o editar categoría
  const guardarCategoria = async (categoria) => {
    try {
      const dataAGuardar = {
        nombre: categoria.nombre,
        imagenUrl: categoria.imagenUrl || '',
      };

      if (categoria.id) {
        // Editar
        const categoriaRef = doc(db, 'categorias', categoria.id);
        await updateDoc(categoriaRef, dataAGuardar);
      } else {
        // Agregar
        await addDoc(collection(db, 'categorias'), dataAGuardar);
      }

      setShowForm(false);
      setCategoriaEditando(null);
      setModoEdicion(false);
      cargarCategorias();
    } catch (error) {
      console.error('Error guardando categoría:', error);
    }
  };

  // Eliminar categoría
  const eliminarCategoria = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        await deleteDoc(doc(db, 'categorias', id));
        cargarCategorias();
      } catch (error) {
        console.error('Error eliminando categoría:', error);
      }
    }
  };

  // Manejadores abanico
  const handleAgregar = () => {
    setCategoriaEditando(null);
    setShowForm(true);
    setModoEdicion(false);
    setModoEliminar(false);
  };

  const handleModoEditar = () => {
    setModoEdicion((prev) => !prev);
    setModoEliminar(false);
    setShowForm(false);
    setCategoriaEditando(null);
  };

  const handleModoEliminar = () => {
    setModoEliminar((prev) => !prev);
    setModoEdicion(false);
    setShowForm(false);
    setCategoriaEditando(null);
  };

  // Cuando clickean editar en una CardCategory
  const onEditarCategoria = (categoria) => {
    setCategoriaEditando(categoria);
    setShowForm(true);
  };

  // Cancelar formulario
  const onCancelarForm = () => {
    setShowForm(false);
    setCategoriaEditando(null);
  };

  // Seleccionar categoría para ver productos
  const handleSeleccionarCategoria = (id) => {
    if (!modoEdicion && !modoEliminar) {
      setCategoriaSeleccionada(id);
    }
  };

  // Volver al listado de categorías
  const handleVolverListado = () => {
    setCategoriaSeleccionada(null);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Categorías</h2>

      {!categoriaSeleccionada && (
        <>
          <Abanico
            onAgregar={handleAgregar}
            onEditar={handleModoEditar}
            onEliminarModo={handleModoEliminar}
          />

          {showForm && (
            <AddCategory
              categoriaEditando={categoriaEditando}
              onGuardar={guardarCategoria}
              onCancelar={onCancelarForm}
            />
          )}

          {loading && <p>Cargando categorías...</p>}

          {categorias.length === 0 && !loading && (
            <p>No hay categorías disponibles.</p>
          )}

          {categorias.map((cat) => (
            <CardCategory
              key={cat.id}
              categoria={cat}
              modoEdicion={modoEdicion}
              modoEliminar={modoEliminar}
              onEditar={onEditarCategoria}
              onEliminar={eliminarCategoria}
              onSeleccionarCategoria={handleSeleccionarCategoria}
            />
          ))}
        </>
      )}

      {categoriaSeleccionada && (
        <>
          <button
            onClick={handleVolverListado}
            className="back"
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.2rem',
              cursor: 'pointer',
              marginBottom: '15px',
            }}
          >
            ←
          </button>

          <CardProductDetail categoryId={categoriaSeleccionada} />
        </>
      )}
    </div>
  );
};
