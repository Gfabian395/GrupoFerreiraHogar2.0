import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Abanico } from "../components/abanico/Abanico";
import { CardCategory } from "../components/categorias/CardCategory";
import { AddCategory } from "../components/categorias/AddCategory";
import { EditCategory } from "../components/categorias/EditCategory";

export const Categorias = () => {
  const [mostrarAddCategory, setMostrarAddCategory] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedCategoryForEdit, setSelectedCategoryForEdit] = useState(null);
  const [selectedCategoryForDelete, setSelectedCategoryForDelete] = useState(null);
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
        image: doc.data().imagenUrl || doc.data().imagen || "https://placehold.co/150x150",
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
    setEditMode(false);
    setDeleteMode(false);
  };

  const handleEditar = () => {
    setEditMode(true);
    setDeleteMode(false);
    setSelectedCategoryForEdit(null);
  };

  const handleEliminarModo = () => {
    setDeleteMode(true);
    setEditMode(false);
    setSelectedCategoryForDelete(null);
  };

  const handleEliminarCategoria = async () => {
    if (!selectedCategoryForDelete) return;

    try {
      await deleteDoc(doc(db, "categorias", selectedCategoryForDelete));
      fetchCategories();
      setSelectedCategoryForDelete(null);
      setTimeout(() => setDeleteMode(false), 500); // Ahora los checkboxes desaparecen después de la acción
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  const handleCategorySelectedForDelete = (categoryId) => {
    if (deleteMode) {
      setSelectedCategoryForDelete(categoryId);
    }
  };

  return (
    <>
      <CardCategory
        categories={categories}
        loading={loadingCategories}
        error={errorCategories}
        editMode={editMode}
        deleteMode={deleteMode}
        onSelectCategory={setSelectedCategoryForEdit}
        onSelectCategoryForDelete={handleCategorySelectedForDelete}
      />

      {mostrarAddCategory && (
        <AddCategory
          onClose={() => setMostrarAddCategory(false)}
          onCategoryAdded={fetchCategories}
        />
      )}

      {selectedCategoryForEdit && (
        <EditCategory
          category={categories.find((cat) => cat.id === selectedCategoryForEdit)}
          onClose={() => {
            setSelectedCategoryForEdit(null);
            setTimeout(() => setEditMode(false), 500); // Los checkboxes se ocultan después de editar
          }}
          onCategoryUpdated={fetchCategories}
        />
      )}

      {deleteMode && selectedCategoryForDelete && (
        <button onClick={handleEliminarCategoria}>Eliminar Categoría Seleccionada</button>
      )}

      <Abanico onAgregar={handleAgregar} onEditar={handleEditar} onEliminarModo={handleEliminarModo} />
    </>
  );
};