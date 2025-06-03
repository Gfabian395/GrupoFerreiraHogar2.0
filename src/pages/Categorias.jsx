// src/pages/Categorias.jsx
import { useState } from "react";
import { Abanico } from "../components/abanico/Abanico";
import { CardCategory } from "../components/categorias/CardCategory";
import { AddCategory } from "../components/categorias/AddCategory";

export const Categorias = () => {
  const [mostrarAddCategory, setMostrarAddCategory] = useState(false);

  const handleAgregar = () => {
    setMostrarAddCategory(true);
  };

  return (
    <>
      <CardCategory />
      {mostrarAddCategory && (
        <AddCategory onClose={() => setMostrarAddCategory(false)} />
      )}
      <Abanico onAgregar={handleAgregar} />
    </>
  );
};
