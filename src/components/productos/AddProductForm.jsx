import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';

export const AddProductForm = ({ categoryId, onAdded }) => {
  const [nombre, setNombre] = useState('');
  const [modelo, setModelo] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock1, setStock1] = useState('');
  const [stock2, setStock2] = useState('');
  const [color, setColor] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenFile, setImagenFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImagenFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imagenUrl = '';

      if (imagenFile) {
        const storageRef = ref(storage, `categorias/${categoryId}/${imagenFile.name}-${Date.now()}`);
        const snapshot = await uploadBytes(storageRef, imagenFile);
        imagenUrl = await getDownloadURL(snapshot.ref);
      }

      const colorsArray = color
        .split(',')
        .map(c => c.trim())
        .filter(c => c.length > 0);

      const productosRef = collection(db, 'categorias', categoryId, 'productos');
      await addDoc(productosRef, {
        nombre,
        modelo,
        precio: Number(precio),
        stock1: Number(stock1),
        stock2: Number(stock2),
        color: colorsArray,
        descripcion,
        imagen: imagenUrl,
        creadoEn: serverTimestamp()
      });

      // Reset form
      setNombre('');
      setModelo('');
      setPrecio('');
      setStock1('');
      setStock2('');
      setColor('');
      setDescripcion('');
      setImagenFile(null);

      if (onAdded) onAdded();

    } catch (err) {
      console.error(err);
      setError('Error al subir el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <h3>Agregar producto a la categoría</h3>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Modelo"
        value={modelo}
        onChange={e => setModelo(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={e => setPrecio(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Stock Los Andes 4320"
        value={stock1}
        onChange={e => setStock1(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Stock Los Andes 4034"
        value={stock2}
        onChange={e => setStock2(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Colores (separados por coma)"
        value={color}
        onChange={e => setColor(e.target.value)}
      />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Subiendo...' : 'Agregar Producto'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};
