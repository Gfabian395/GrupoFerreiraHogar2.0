import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Abanico } from "../components/abanico/Abanico";
import { CardCategory } from "../components/categorias/CardCategory";
import { AddCategory } from "../components/categorias/AddCategory";

export const Categorias = () => {
  const [mostrarAddCategory, setMostrarAddCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    setErrorCategories(null);
    try {
      const colRef = collection(db, "categorias");
      const snapshot = await getDocs(colRef);
      const cats = snapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre || "Sin nombre",
        image:
          doc.data().imagenUrl || doc.data().imagen || "https://placehold.co/150x150",
      }));
      setCategories(cats);
    } catch (error) {
      setErrorCategories("Error al cargar categorías");
      console.error(error);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAgregar = () => {
    setMostrarAddCategory(true);
  };

  const handleCategoryAdded = () => {   
    fetchCategories(); // recarga sin refrescar página
  };

  return (
    <>
      <CardCategory
        categories={categories}
        loading={loadingCategories}
        error={errorCategories}
      />
      {mostrarAddCategory && (
        <AddCategory
          onClose={() => setMostrarAddCategory(false)}
          onCategoryAdded={handleCategoryAdded}
        />
      )}
      <Abanico onAgregar={handleAgregar} />
    </>
  );
};
