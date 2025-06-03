// Upload.jsx
import React, { useState } from 'react';
import './Upload.css';

export const Upload = ({ onUpload }) => {
  const [state, setState] = useState('idle'); // idle | running | done

  const handleClick = () => {
    if (state !== 'idle') return;

    setState('running');

    setTimeout(() => {
      setState('done');

      // Ejecutar función pasada por props
      if (typeof onUpload === 'function') {
        onUpload();
      }

      setTimeout(() => {
        setState('idle');
      }, 1500);
    }, 4000);
  };

  return (
    <button
      id="upload"
      className={`upload-btn ${
        state === 'running'
          ? 'upload-btn--running'
          : state === 'done'
          ? 'upload-btn--done'
          : ''
      }`}
      type="button"
      onClick={handleClick}
      disabled={state !== 'idle'}
    >
      {state === 'running'
        ? 'Subiendo...'
        : state === 'done'
        ? '¡Listo!'
        : 'Subir'}
    </button>
  );
};