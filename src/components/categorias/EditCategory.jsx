import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./EditCategory.css";

export const EditCategory = ({ category, onClose, onCategoryUpdated }) => {
  const [nombre, setNombre] = useState(category?.nombre || "");
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSubiendo(true);

    try {
      await updateDoc(doc(db, "categorias", category.id), {
        nombre: nombre.trim(),
      });

      if (onCategoryUpdated) onCategoryUpdated();
      onClose();
    } catch (err) {
      setError("Error al actualizar la categoría: " + err.message);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">×</button>
        <h2>Editar Categoría</h2>

        <img src={category.image} alt={category.nombre} className="category-preview" />

        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={subiendo} />
        
        <button onClick={handleSubmit} disabled={subiendo}>Guardar Cambios</button>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};