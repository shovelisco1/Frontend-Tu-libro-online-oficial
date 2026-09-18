import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Catalogo from './components/Catalogo';
import NuevoLibro from './components/NuevoLibro';
import EliminarLibro from './components/EliminarLibro';
import ConfirmarPrestamo from './components/ConfirmarPrestamo';
import Renovacion from './components/Renovacion';
import Login from './components/Login';

function App() {
  const [usuario, setUsuario] = useState(null);

  const iniciarSesion = () => {
    // Simulación de autenticación (posteriormente conectado con Azure AD/MSAL)
    setUsuario({ nombre: "Usuario Institucional", email: "usuario@duocuc.cl" });
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  if (!usuario) {
    return <Login onLogin={iniciarSesion} />;
  }

  return (
    <Router>
      <div className="container mt-4">
        <header className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
          <h1 className="text-primary fw-bold m-0">
            <i className="bi bi-book-half me-2"></i> Tu Libro Online
          </h1>
          <div className="d-flex align-items-center gap-2">
            <Link to="/" className="btn btn-outline-primary">Catálogo</Link>
            <Link to="/renovacion" className="btn btn-outline-warning">Mis Préstamos / Devolución</Link>
            <button className="btn btn-outline-danger ms-2" onClick={cerrarSesion}>
              <i className="bi bi-box-arrow-right"></i> Salir
            </button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/prestamo/:id" element={<ConfirmarPrestamo />} />
          <Route path="/renovacion" element={<Renovacion />} />
          <Route path="/admin/nuevo" element={<NuevoLibro />} />
          <Route path="/admin/eliminar" element={<EliminarLibro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;