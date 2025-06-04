import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
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
      console.log('CategoryId cambiado:', categoryId);
      fetchProducts();
      setShowForm(false); // Ocultar formulario si cambia categoría
    }
  }, [categoryId]);

  const handleAgregarClick = () => {
    console.log('handleAgregarClick llamado - showForm antes:', showForm);
    setShowForm(true);
  };

  useEffect(() => {
    console.log('showForm cambió:', showForm);
  }, [showForm]);

  const handleFormAdded = () => {
    fetchProducts();
    setShowForm(false);
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="products-container">
      <Abanico
        onAgregar={handleAgregarClick}
        onEditar={() => {}}
        onEliminarModo={() => {}}
      />

      {showForm && (
        <AddProductForm
          categoryId={categoryId}
          onAdded={handleFormAdded}
        />
      )}

      {products.length > 0 ? (
        products.map((prod) => (
          <CardProduct
            key={prod.id}
            title={prod.nombre || prod.modelo}
            modelo={prod.modelo}
            price={prod.precio}
            image={prod.imagen}
            colors={prod.color || []}
            stock1={prod.stock1}
            stock2={prod.stock2}
            descripcion={prod.descripcion}
          />
        ))
      ) : (
        !showForm && <P404 />
      )}
    </div>
  );
};
