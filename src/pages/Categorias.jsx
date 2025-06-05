import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';
import { Abanico } from '../components/abanico/Abanico';
import { CardCategory } from '../components/categorias/CardCategory';
import { AddCategory } from '../components/categorias/AddCategory';
import { CardProductDetail } from '../components/productos/CardProductDetail';
import { Loading } from '../components/load/Loading';

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

  // Eliminar categoría y su imagen en Firebase Storage
  const eliminarCategoria = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        // Obtener datos de la categoría antes de eliminarla
        const categoriaRef = doc(db, 'categorias', id);
        const categoriaSnapshot = await getDoc(categoriaRef);

        if (categoriaSnapshot.exists()) {
          const categoriaData = categoriaSnapshot.data();

          // Si tiene imagen, eliminarla de Firebase Storage
          if (categoriaData.imagenUrl) {
            const imageRef = ref(storage, categoriaData.imagenUrl);
            await deleteObject(imageRef);
          }
        }

        // Eliminar la categoría de Firestore
        await deleteDoc(categoriaRef);

        // Recargar lista de categorías después de eliminación
        cargarCategorias();
        
      } catch (error) {
        console.error('Error eliminando categoría e imagen:', error);
      }
    }
  };

  // Manejadores de abanico
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

  // Editar categoría en el formulario
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
    <div>
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

          {loading && <Loading />}

          {categorias.length === 0 && !loading && (
            <p>No hay categorías disponibles.</p>
          )}

          {/* Contenedor FLEX exclusivo para categorías */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1200px',
          }}>
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
          </div>
        </>
      )}

      {categoriaSeleccionada && (
        <>
          <button 
            onClick={handleVolverListado} 
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              marginBottom: '15px',
            }}
          >
            ←
          </button>

          {/* Contenedor exclusivo para los productos */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
            width: '100%',
            padding: '10px',
            justifyItems: 'center',
          }}>
            <CardProductDetail categoryId={categoriaSeleccionada} />
          </div>
        </>
      )}
    </div>
  );
};