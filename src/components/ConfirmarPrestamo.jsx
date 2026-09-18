import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ConfirmarPrestamo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cargarLibro = async () => {
      try {
        // Obtenemos la lista general y filtramos el libro localmente
        const respuesta = await axios.get(import.meta.env.VITE_BACKEND_URL);
        const libroEncontrado = respuesta.data.find(l => l.id === Number(id));
        
        if (libroEncontrado) {
          setLibro(libroEncontrado);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error al obtener libro:", err);
        setError(true);
      }
    };

    cargarLibro();
  }, [id]);

  const procesarPrestamo = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/${id}/prestar`);
      alert('¡Préstamo confirmado! Recuerda devolverlo a tiempo.');
      navigate('/');
    } catch (error) {
      alert('Hubo un error al procesar el préstamo.');
    }
  };

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger shadow">
          <h4><i className="bi bi-exclamation-triangle-fill me-2"></i>Libro no encontrado</h4>
          <p>No se pudo obtener la información del libro #{id}.</p>
          <button className="btn btn-primary mt-2" onClick={() => navigate('/')}>
            Volver al Catálogo
          </button>
        </div>
      </div>
    );
  }

  if (!libro) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Cargando datos del libro...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <div className="card shadow-lg p-4 border-primary">
        <h3 className="text-primary fw-bold mb-3">
          <i className="bi bi-file-earmark-check me-2"></i>
          Confirmar Solicitud de Préstamo
        </h3>
        <p className="text-muted">Revisa los detalles antes de confirmar tu reserva:</p>
        
        <div className="bg-light p-3 rounded mb-4">
          <p className="mb-1"><strong>Título:</strong> {libro.titulo}</p>
          <p className="mb-1"><strong>Autor:</strong> {libro.autor}</p>
          <p className="mb-0"><strong>ISBN:</strong> {libro.isbn}</p>
        </div>

        <div className="alert alert-info d-flex align-items-center mb-4">
          <i className="bi bi-info-circle-fill me-2 fs-5"></i>
          <div>El préstamo tiene una duración estándar de <strong>7 días</strong> a partir de hoy.</div>
        </div>

        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>
            Cancelar
          </button>
          <button className="btn btn-success" onClick={procesarPrestamo}>
            <i className="bi bi-check-lg me-1"></i> Confirmar Préstamo
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmarPrestamo;