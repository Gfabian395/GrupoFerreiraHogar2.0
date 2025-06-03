import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { CardProductDetail } from '../categorias/productos/CardProductDetail';
import { Loading } from '../load/Loading';
import { useSearchParams } from 'react-router-dom';  // <--- esta línea
import './CardCategory.css';


export const CardCategory = ({ categories, loading, error }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("cat");
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryFromURL);

  const handleSelectCategory = (id) => {
    setSelectedCategoryId(id);
    setSearchParams({ cat: id });
  };

  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setSearchParams({});
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  if (selectedCategoryId) {
    return (
      <div>
        <button onClick={handleBackToCategories}>
          <i className="bx bxs-left-arrow-circle bx-md"></i>
        </button>
        <CardProductDetail categoryId={selectedCategoryId} />
      </div>
    );
  }

  return (
    <div className="categories-container">
      {categories.map(({ id, nombre, image }) => (
        <div
          key={id}
          className="card-category"
          onClick={() => handleSelectCategory(id)}
          style={{ cursor: "pointer" }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSelectCategory(id);
          }}
          aria-label={`Ver productos de ${nombre}`}
        >
          <img
            src={image}
            alt={nombre}
            className="card-category-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/150x150";
            }}
          />
          <h3 className="card-category-title">{nombre}</h3>
        </div>
      ))}
    </div>
  );
};
