import { useState } from 'react';
import axios from 'axios';

function NuevoLibro() {
  const [libro, setLibro] = useState({ titulo: '', autor: '', isbn: '' });

  const manejarCambio = (e) => {
    setLibro({ ...libro, [e.target.name]: e.target.value });
  };

  const guardarLibro = async (e) => {
    e.preventDefault();
    try {
      // Enviamos los datos al backend de Spring Boot
      await axios.post(import.meta.env.VITE_BACKEND_URL, libro);
      alert('¡Libro guardado con éxito en la base de datos!');
      setLibro({ titulo: '', autor: '', isbn: '' }); // Limpiamos el formulario
    } catch (error) {
      console.error("Error guardando el libro:", error);
      alert('Hubo un error. Revisa que el backend esté encendido.');
    }
  };

  return (
    <div className="card shadow p-4 mt-4">
      <h3 className="text-primary mb-3">Registrar Nuevo Libro</h3>
      <form onSubmit={guardarLibro}>
        <div className="mb-3">
          <label className="form-label">Título del Libro</label>
          <input type="text" className="form-control" name="titulo" value={libro.titulo} onChange={manejarCambio} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Autor</label>
          <input type="text" className="form-control" name="autor" value={libro.autor} onChange={manejarCambio} required />
        </div>
        <div className="mb-3">
          <label className="form-label">ISBN</label>
          <input type="text" className="form-control" name="isbn" value={libro.isbn} onChange={manejarCambio} required />
        </div>
        <button type="submit" className="btn btn-success">
          <i className="bi bi-save"></i> Guardar Libro
        </button>
      </form>
    </div>
  );
}

export default NuevoLibro;