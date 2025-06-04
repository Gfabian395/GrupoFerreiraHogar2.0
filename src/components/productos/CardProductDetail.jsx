import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { CardProduct } from './CardProduct';
import { Loading } from '../load/Loading';
import { P404 } from '../404/P404';
import { AddProductForm } from './AddProductForm';
import { Abanico } from '../abanico/Abanico';
import './CardProductDetail.css';

export const CardProductDetail = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  const [modoEdicion, setModoEdicion] = useState(false);
  const [modoEliminar, setModoEliminar] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsCol = collection(db, 'categorias', categoryId, 'productos');
      const productsSnapshot = await getDocs(productsCol);
      const prods = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(prods);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchProducts();
      setShowForm(false);
      setModoEdicion(false);
      setModoEliminar(false);
      setProductoEditando(null);
    }
  }, [categoryId]);

  // Funciones para el Abanico
  const handleAgregarClick = () => {
    setShowForm(true);
    setModoEdicion(false);
    setModoEliminar(false);
    setProductoEditando(null);
  };

  const handleEditarClick = () => {
    setModoEdicion(true);
    setModoEliminar(false);
    setShowForm(false);
    setProductoEditando(null);
  };

  const handleEliminarModoClick = () => {
    const password = prompt("Ingresa la contraseña para eliminar:");
    if (password === "asd") {
      setModoEliminar(true);
      setModoEdicion(false);
      setShowForm(false);
      setProductoEditando(null);
    } else {
      alert("Contraseña incorrecta. No se activó modo eliminar.");
    }
  };

  const handleEditarProducto = (producto) => {
    setProductoEditando(producto);
    setShowForm(true);
  };

  const handleEliminarProducto = async (productoId) => {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) return;
    try {
      await deleteDoc(doc(db, 'categorias', categoryId, 'productos', productoId));
      fetchProducts();
    } catch (error) {
      alert("Error eliminando producto");
      console.error(error);
    }
  };

  const handleFormAddedOrUpdated = () => {
    fetchProducts();
    setShowForm(false);
    setProductoEditando(null);
    setModoEdicion(false);
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="products-container">
      <Abanico
        onAgregar={handleAgregarClick}
        onEditar={handleEditarClick}
        onEliminarModo={handleEliminarModoClick}
      />

      {showForm && (
        <AddProductForm
          categoryId={categoryId}
          productoEditando={productoEditando}
          onAdded={handleFormAddedOrUpdated}
          onUpdated={handleFormAddedOrUpdated}
        />
      )}

      {products.length > 0 ? (
        products.map((prod) => (
          <CardProduct
            key={prod.id}
            id={prod.id}
            title={prod.nombre || prod.modelo}
            modelo={prod.modelo}
            price={prod.precio}
            image={prod.imagen}
            colors={prod.color || []}
            stock1={prod.stock1}
            stock2={prod.stock2}
            descripcion={prod.descripcion}
            modoEdicion={modoEdicion}
            modoEliminar={modoEliminar}
            onEditar={() => handleEditarProducto(prod)}
            onEliminar={() => handleEliminarProducto(prod.id)}
          />
        ))
      ) : (
        !showForm && <P404 />
      )}
    </div>
  );
};
