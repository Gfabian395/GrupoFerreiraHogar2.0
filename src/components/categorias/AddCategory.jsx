import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebaseConfig';
import './AddCategory.css'

export const AddCategory = ({ categoriaEditando, onGuardar, onCancelar }) => {
  const [nombre, setNombre] = useState('');
  const [imagenFile, setImagenFile] = useState(null);
  const [imagenUrl, setImagenUrl] = useState('');

  useEffect(() => {
    if (categoriaEditando) {
      setNombre(categoriaEditando.nombre || '');
      setImagenUrl(categoriaEditando.imagenUrl || '');
    } else {
      setNombre('');
      setImagenFile(null);
      setImagenUrl('');
    }
  }, [categoriaEditando]);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = imagenUrl;

    if (imagenFile && imagenFile instanceof File) {
      try {
        const storageRef = ref(storage, `categorias/${imagenFile.name}_${Date.now()}`);
        await uploadBytes(storageRef, imagenFile);
        url = await getDownloadURL(storageRef);
      } catch (error) {
        console.error('Error subiendo imagen:', error);
        alert('Error subiendo imagen');
        return;
      }
    }

    onGuardar({
      id: categoriaEditando ? categoriaEditando.id : null,
      nombre: nombre.trim(),
      imagenUrl: url,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>{categoriaEditando ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
        <form onSubmit={handleSubmit} className="form-category">
          <div className="form-group">
            <label>Nombre de la categoría:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Ej: Electrónica"
              autoFocus
              className="input-text"
            />
          </div>

          <div className="form-group" style={{ marginTop: '10px' }}>
            <label>Imagen:</label>
            <input type="file" accept="image/*" onChange={handleImagenChange} className="input-file" />
          </div>

          {imagenUrl && (
            <div className="image-preview">
              <img src={imagenUrl} alt="Preview" className="preview-img" />
            </div>
          )}

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">Guardar</button>
            <button type="button" onClick={onCancelar} className="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
