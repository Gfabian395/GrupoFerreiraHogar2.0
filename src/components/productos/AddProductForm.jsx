import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, doc, updateDoc, } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';
import './AddProductForm.css';

export const AddProductForm = ({ categoryId, productoEditando = null, onAdded, onUpdated, }) => {
  const [nombre, setNombre] = useState('');
  const [modelo, setModelo] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock1, setStock1] = useState('');
  const [stock2, setStock2] = useState('');
  const [color, setColor] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenFile, setImagenFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productoEditando) {
      setNombre(productoEditando.nombre || '');
      setModelo(productoEditando.modelo || '');
      setPrecio(productoEditando.precio || '');
      setStock1(productoEditando.stock1 || '');
      setStock2(productoEditando.stock2 || '');
      setColor((productoEditando.color || []).join(', '));
      setDescripcion(productoEditando.descripcion || '');
      setImagenFile(null);
      setPreviewUrl(productoEditando.imagen || null);
    } else {
      setNombre('');
      setModelo('');
      setPrecio('');
      setStock1('');
      setStock2('');
      setColor('');
      setDescripcion('');
      setImagenFile(null);
      setPreviewUrl(null);
    }
  }, [productoEditando]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imagenUrl = productoEditando ? productoEditando.imagen : null;

      if (imagenFile) {
        const storageRef = ref(storage, `images/${imagenFile.name}-${Date.now()}`);
        await uploadBytes(storageRef, imagenFile);
        imagenUrl = await getDownloadURL(storageRef);
      }

      const productoData = {
        nombre,
        modelo,
        precio: Number(precio),
        stock1: Number(stock1),
        stock2: Number(stock2),
        color: color.split(',').map(c => c.trim()),
        descripcion,
        imagen: imagenUrl,
        fecha: serverTimestamp(),
      };

      if (productoEditando) {
        const docRef = doc(db, 'categorias', categoryId, 'productos', productoEditando.id);
        await updateDoc(docRef, productoData);
        onUpdated && onUpdated();
      } else {
        const colRef = collection(db, 'categorias', categoryId, 'productos');
        await addDoc(colRef, productoData);
        onAdded && onAdded();
      }
    } catch (err) {
      console.error(err);
      setError('Error al guardar producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <label>Nombre:</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <label>Modelo:</label>
      <input
        type="text"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
        required
      />

      <label>Precio:</label>
      <input
        type="number"
        min="0"
        step="0.01"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />

      <label>Stock Los Andes 4320:</label>
      <input
        type="number"
        min="0"
        value={stock1}
        onChange={(e) => setStock1(e.target.value)}
        required
      />

      <label>Stock Los Andes 4034:</label>
      <input
        type="number"
        min="0"
        value={stock2}
        onChange={(e) => setStock2(e.target.value)}
        required
      />

      <label>Colores (separados por coma):</label>
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <label>Descripción:</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        rows="3"
      />

      <label>Imagen:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Vista previa"
          className="image-preview"
        />
      )}

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : productoEditando ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
};
