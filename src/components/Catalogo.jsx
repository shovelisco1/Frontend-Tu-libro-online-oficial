import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Catalogo() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    cargarLibros();
  }, []);

  const cargarLibros = async () => {
    try {
      const respuesta = await axios.get(import.meta.env.VITE_BACKEND_URL);
      setLibros(respuesta.data);
    } catch (error) {
      console.error("Error al cargar libros:", error);
    }
  };

  const devolverLibro = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/${id}/devolver`);
      cargarLibros();
    } catch (error) {
      alert("No se pudo devolver el libro.");
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">
          <i className="bi bi-journal-bookmark-fill me-2"></i>
          Explorar Catálogo
        </h2>
        <span className="badge bg-secondary fs-6">Total: {libros.length} libros</span>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {libros.map(libro => (
          <div className="col" key={libro.id}>
            <div className={`card h-100 shadow-sm border-0 ${!libro.disponible ? 'bg-light' : ''}`}>
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="text-muted small">ISBN: {libro.isbn}</span>
                  {libro.disponible ? (
                    <span className="badge rounded-pill bg-success-subtle text-success border border-success">
                      <i className="bi bi-check-circle me-1"></i> Disponible
                    </span>
                  ) : (
                    <span className="badge rounded-pill bg-danger-subtle text-danger border border-danger">
                      <i className="bi bi-x-circle me-1"></i> Prestado
                    </span>
                  )}
                </div>

                <h5 className="card-title fw-bold text-dark">{libro.titulo}</h5>
                <p className="card-text text-muted mb-4">
                  <i className="bi bi-person me-1"></i> {libro.autor}
                </p>

                <div className="mt-auto pt-3 border-top d-flex justify-content-between">
                  {libro.disponible ? (
                    <Link 
                      to={`/prestamo/${libro.id}`} 
                      className="btn btn-primary w-100 me-1"
                    >
                      <i className="bi bi-box-arrow-right me-1"></i> Solicitar Préstamo
                    </Link>
                  ) : (
                    <button 
                      className="btn btn-outline-secondary w-100" 
                      onClick={() => devolverLibro(libro.id)}
                    >
                      <i className="bi bi-box-arrow-in-left me-1"></i> Devolver Libro
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogo;