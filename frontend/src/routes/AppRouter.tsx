// src/routes/AppRouter.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import CanchaList from '../components/CanchaList';
import EditarCancha from '../components/EditarCancha';
import CrearCancha from '../components/CrearCancha';
import AdminDashboard from '../components/AdminDashboard';
import UsuarioDashboard from '../components/UsuarioDashboard';
import ReservasUsuario from '../components/ReservasUsuario';
import RutasProtegidas from '../components/RutasProtegidas'; // Protege rutas según el rol

export default function AppRouter() {
  console.log('🧭 AppRouter cargado'); 
  
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard del usuario  */}
        <Route path="/usuario" element={<UsuarioDashboard />} />

        {/* Rutas protegidas para administradores */}
        <Route
          path="/admin"
          element={
            <RutasProtegidas rolEsperado="admin">
              <AdminDashboard />
            </RutasProtegidas>
          }
        />
        <Route
          path="/admin/canchas"
          element={
            <RutasProtegidas rolEsperado="admin">
              <CanchaList />
            </RutasProtegidas>
          }
        />
        <Route
          path="/admin/canchas/crear"
          element={
            <RutasProtegidas rolEsperado="admin">
              <CrearCancha />
            </RutasProtegidas>
          }
        />
        <Route
          path="/admin/canchas/editar/:id"
          element={
            <RutasProtegidas rolEsperado="admin">
              <EditarCancha />
            </RutasProtegidas>
          }
        />

        {/* Rutas protegidas para usuarios normales */}
        <Route
          path="/usuario/reservas"
          element={
            <RutasProtegidas rolEsperado="usuario">
              <ReservasUsuario />
            </RutasProtegidas>
          }
        />
      </Routes>
    </Router>
  );
}


