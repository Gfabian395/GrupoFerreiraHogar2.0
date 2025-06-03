import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './AddCategory.css';
import {Upload} from '../../components/botones/Upload';

export const AddCategory = ({ onClose, onCategoryAdded }) => {
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setError('');

    if (!nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    if (!imagen) {
      setError('Debe seleccionar una imagen');
      return;
    }

    setSubiendo(true);

    try {
      const nombreArchivo = `${imagen.name}-${Date.now()}`;
      const storageRef = ref(storage, `categorias/${nombreArchivo}`);
      const snapshot = await uploadBytes(storageRef, imagen);
      const urlDescarga = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "categorias"), {
        nombre: nombre.trim(),
        imagenUrl: urlDescarga,
        creadoEn: new Date()
      });

      setNombre('');
      setImagen(null);

      if (onCategoryAdded) {
        onCategoryAdded();
      }

      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 2500);
    } catch (err) {
      setError('Error al subir categoría: ' + err.message);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="add-category-form">
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ×
          </button>
          <h2>Agregar Categoría</h2>

          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={subiendo}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={subiendo}
          />

          {/* Reemplazo del botón por el componente animado */}
          <Upload onUpload={handleSubmit} />

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};
