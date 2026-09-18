import { useState, useEffect } from 'react';
import axios from 'axios';

function Renovacion() {
  const [librosPrestados, setLibrosPrestados] = useState([]);

  useEffect(() => {
    cargarPrestados();
  }, []);

  const cargarPrestados = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BACKEND_URL);
      setLibrosPrestados(res.data.filter(libro => !libro.disponible));
    } catch (error) {
      console.error("Error al cargar prestados:", error);
    }
  };

  const devolverLibro = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/${id}/devolver`);
      alert("¡Libro devuelto con éxito!");
      cargarPrestados();
    } catch (error) {
      alert("Error al devolver el libro.");
    }
  };

  const renovarSemana = (titulo) => {
    alert(`¡Renovación exitosa para "${titulo}"! Se han añadido 7 días adicionales a tu plazo.`);
  };

  // Calcula la fecha límite sumando 7 días
  const obtenerFechaLimite = () => {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 7);
    return hoy.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary fw-bold mb-4">
        <i className="bi bi-clock-history me-2"></i>
        Gestión de Préstamos y Devoluciones
      </h2>

      {librosPrestados.length === 0 ? (
        <div className="alert alert-success shadow-sm">
          <i className="bi bi-check-circle-fill me-2"></i>
          No tienes libros pendientes de devolución ni renovación actualmente.
        </div>
      ) : (
        <div className="row g-3">
          {librosPrestados.map(libro => (
            <div key={libro.id} className="col-12">
              <div className="card shadow-sm border-0 border-start border-warning border-4 p-3">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                  <div>
                    <h5 className="fw-bold text-dark mb-1">{libro.titulo}</h5>
                    <p className="text-muted mb-2">Autor: {libro.autor} | ISBN: {libro.isbn}</p>
                    <span className="badge bg-warning text-dark p-2 fs-6">
                      <i className="bi bi-calendar-event me-1"></i> 
                      Fecha límite: <strong>{obtenerFechaLimite()}</strong>
                    </span>
                  </div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-warning" onClick={() => renovarSemana(libro.titulo)}>
                      <i className="bi bi-calendar-plus me-1"></i> Renovar +7 Días
                    </button>
                    <button className="btn btn-success" onClick={() => devolverLibro(libro.id)}>
                      <i className="bi bi-box-arrow-in-left me-1"></i> Devolver Libro
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Renovacion;