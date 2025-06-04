import React, { useState } from "react";
import { CardProductDetail } from "./productos/CardProductDetail";
import { Loading } from "../load/Loading";
import { useSearchParams } from "react-router-dom";
import "./CardCategory.css";

export const CardCategory = ({ categories, loading, error, editMode, deleteMode, onSelectCategory, onSelectCategoryForDelete }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("cat");
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryFromURL);
  const [selectedEditCategory, setSelectedEditCategory] = useState(null);
  const [selectedDeleteCategory, setSelectedDeleteCategory] = useState(null);

  const handleSelectCategory = (id) => {
    setSelectedCategoryId(id);
    setSearchParams({ cat: id });
  };

  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setSearchParams({});
  };

  const handleCheckboxChange = (id) => {
    if (editMode) {
      setSelectedEditCategory(id === selectedEditCategory ? null : id);
      onSelectCategory(id === selectedEditCategory ? null : id);
      setSelectedDeleteCategory(null); // Desactiva la selección en deleteMode
    }
    if (deleteMode) {
      setSelectedDeleteCategory(id === selectedDeleteCategory ? null : id);
      onSelectCategoryForDelete(id === selectedDeleteCategory ? null : id);
      setSelectedEditCategory(null); // Desactiva la selección en editMode
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  if (selectedCategoryId) {
    return (
      <div>
        <button onClick={handleBackToCategories} className="back">
          <i className="bx bxs-left-arrow-circle bx-md"></i>
        </button>
        <CardProductDetail categoryId={selectedCategoryId} />
      </div>
    );
  }

  return (
    <div className="categories-container">
      {categories.map(({ id, nombre, image }) => (
        <div key={id} className="card-category">
          {(editMode || deleteMode) && (
            <input
              type="checkbox"
              checked={selectedEditCategory === id || selectedDeleteCategory === id}
              onChange={() => handleCheckboxChange(id)}
            />
          )}
          <div
            onClick={() => !editMode && !deleteMode && handleSelectCategory(id)}
            style={{ cursor: editMode || deleteMode ? "default" : "pointer" }}
            role="button"
            tabIndex={0}
            aria-label={`Ver productos de ${nombre}`}
          >
            <img src={image} alt={nombre} className="card-category-image" />
            <h3 className="card-category-title">{nombre}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};