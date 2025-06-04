import React, { useState } from "react";
import { CardProductDetail } from "../productos/CardProductDetail";
import { Loading } from "../load/Loading";
import { useSearchParams } from "react-router-dom";
import "./CardCategory.css";

export const CardCategory = ({
  categories,
  loading,
  error,
  editMode,
  deleteMode,
  onSelectCategory,
  onSelectCategoryForDelete,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("cat");
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryFromURL);
  const [selectedEditCategory, setSelectedEditCategory] = useState(null);
  const [selectedDeleteCategory, setSelectedDeleteCategory] = useState(null);

  const handleSelectCategory = (id) => {
    console.log("Seleccionar categoría:", id);
    setSelectedCategoryId(id);
    setSearchParams({ cat: id });
  };

  const handleBackToCategories = () => {
    console.log("Volver a listado de categorías");
    setSelectedCategoryId(null);
    setSearchParams({});
  };

  const handleCheckboxChange = (id) => {
    console.log("Checkbox cambio para id:", id);

    if (editMode) {
      const newSelected = id === selectedEditCategory ? null : id;
      console.log("Modo editar - selección edit:", newSelected);
      setSelectedEditCategory(newSelected);
      if (onSelectCategory) {
        console.log("Llamando onSelectCategory con:", newSelected);
        onSelectCategory(newSelected);
      }
      setSelectedDeleteCategory(null);
    }
    if (deleteMode) {
      const newSelected = id === selectedDeleteCategory ? null : id;
      console.log("Modo borrar - selección delete:", newSelected);
      setSelectedDeleteCategory(newSelected);
      if (onSelectCategoryForDelete) {
        console.log("Llamando onSelectCategoryForDelete con:", newSelected);
        onSelectCategoryForDelete(newSelected);
      }
      setSelectedEditCategory(null);
    }
  };

  if (loading) {
    console.log("Mostrando Loading...");
    return <Loading />;
  }
  if (error) {
    console.log("Error:", error);
    return <p>{error}</p>;
  }

  if (selectedCategoryId) {
    console.log("Mostrando detalles de la categoría:", selectedCategoryId);
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
            onClick={() => {
              if (!editMode && !deleteMode) {
                console.log("Click para seleccionar categoría:", id);
                handleSelectCategory(id);
              } else {
                console.log("Click ignorado por modo editar o borrar");
              }
            }}
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
