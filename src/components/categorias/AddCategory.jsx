import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
import { db, storage } from '../../firebaseConfig';
import './AddCategory.css';

export const AddCategory = ({ onClose }) => {
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');

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
      // Nombre único para evitar sobrescribir
      const nombreArchivo = `${imagen.name}-${Date.now()}`;
      const storageRef = ref(storage, `categorias/${nombreArchivo}`);

      // Subir imagen a Storage
      const snapshot = await uploadBytes(storageRef, imagen);
      const urlDescarga = await getDownloadURL(snapshot.ref);

      // Guardar categoría en Firestore
      await addDoc(collection(db, "categorias"), {
        nombre: nombre.trim(),
        imagenUrl: urlDescarga,
        creadoEn: new Date()
      });

      setExito('Categoría creada con éxito');
      setNombre('');
      setImagen(null);
      setSubiendo(false);
      if (onClose) onClose(); // para cerrar modal si usás uno
    } catch (err) {
      setError('Error al subir categoría: ' + err.message);
      setSubiendo(false);
    }
  };

  return (
    <form className="add-category-form" onSubmit={handleSubmit}>
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
      <button type="submit" disabled={subiendo}>Guardar</button>
      {subiendo && <p className="info">Subiendo categoría...</p>}
      {error && <p className="error">{error}</p>}
      {exito && <p className="success">{exito}</p>}
    </form>
  );
};
