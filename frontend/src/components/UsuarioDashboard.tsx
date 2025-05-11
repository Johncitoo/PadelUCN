import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UsuarioDashboard() {
  const { logout } = useAuth();

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>Bienvenido al Panel de Usuario</h2>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '1rem' }}>
          <Link to="/usuario/reservas" style={{ color: 'lightblue', textDecoration: 'none' }}>
            📅 Ver mis Reservas
          </Link>
        </li>
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
