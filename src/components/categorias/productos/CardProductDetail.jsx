// src/components/CardProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { CardProduct } from './CardProduct';
import { Loading } from '../../load/Loading';
import {P404} from '../../404/P404'
import './CardProductDetail.css';

export const CardProductDetail = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const productsCol = collection(db, 'categorias', categoryId, 'productos');
        const productsSnapshot = await getDocs(productsCol);
        const prods = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(prods);
      } catch (err) {
        setError('Error al cargar productos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!products.length) return <P404/>;

  return (
    <div className="products-container">
      {products.map((prod) => (
        <CardProduct
          key={prod.id}
          title={prod.nombre}
          price={prod.precio}
          image={prod.imagen}
          colors={prod.color || []}
          stock1={prod.stock1}
          stock2={prod.stock2}
          descripcion={prod.descripcion}
        />
      ))}
    </div>
  );
};
