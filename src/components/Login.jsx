import React from 'react';

function Login({ onLogin }) {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
      <div className="card shadow-lg p-5 text-center border-0" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="mb-4">
          <i className="bi bi-book-half text-primary display-1"></i>
          <h2 className="fw-bold text-primary mt-3">Tu Libro Online</h2>
          <p className="text-muted">Portal de Acceso Bibliotecario</p>
        </div>
        <hr className="my-4" />
        <p className="small text-secondary mb-4">Inicia sesión con tu cuenta institucional para acceder al catálogo y tus préstamos.</p>
        <button className="btn btn-primary btn-lg w-100 shadow-sm" onClick={onLogin}>
          <i className="bi bi-microsoft me-2"></i>
          Iniciar Sesión con Microsoft
        </button>
      </div>
    </div>
  );
}

export default Login;