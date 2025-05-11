import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { logout } = useAuth();

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>Panel de Administración</h2>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '1rem' }}>
          <Link to="/admin/canchas" style={{ color: 'lightblue', textDecoration: 'none' }}>
            🏟️ Ver Canchas
          </Link>
        </li>
        <li style={{ marginBottom: '1rem' }}>
          <Link to="/admin/canchas/crear" style={{ color: 'lightgreen', textDecoration: 'none' }}>
            ➕ Crear Nueva Cancha
          </Link>
        </li>
        {/* Puedes agregar más funcionalidades como usuarios, reservas, etc. */}
      </ul>

      <button
        onClick={logout}
        style={{
          marginTop: '2rem',
          background: 'crimson',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

