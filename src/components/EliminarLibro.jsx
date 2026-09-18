import { useState, useEffect } from 'react';
import axios from 'axios';

function EliminarLibro() {
  const [libros, setLibros] = useState([]);

  // Cargar los libros al abrir la pantalla
  useEffect(() => {
    cargarLibros();
  }, []);

  const cargarLibros = async () => {
    try {
      const respuesta = await axios.get(import.meta.env.VITE_BACKEND_URL);
      setLibros(respuesta.data);
    } catch (error) {
      console.error("Error al cargar los libros:", error);
    }
  };

  const borrarLibro = async (id, titulo) => {
    // Preguntamos antes de disparar la acción irreversible
    const confirmar = window.confirm(`¿Estás seguro de que quieres eliminar "${titulo}"?`);
    if (!confirmar) return;

    try {
      // Llamamos al método DELETE de tu Spring Boot
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/${id}`);
      alert('Libro eliminado con éxito de la base de datos.');
      
      // Actualizamos la tabla en pantalla quitando el libro que acabamos de borrar
      setLibros(libros.filter(libro => libro.id !== id));
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
      alert('Hubo un error. Revisa la consola o tu backend.');
    }
  };

  return (
    <div className="mt-4 card shadow p-4 border-danger">
      <h3 className="text-danger mb-3">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        Panel de Eliminación
      </h3>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {libros.map(libro => (
            <tr key={libro.id}>
              <td>{libro.id}</td>
              <td>{libro.titulo}</td>
              <td>{libro.autor}</td>
              <td>
                <button 
                  className="btn btn-sm btn-danger" 
                  onClick={() => borrarLibro(libro.id, libro.titulo)}
                >
                  <i className="bi bi-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EliminarLibro;