import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Cancha {
  id: number;
  nombre: string;
  disponible: boolean;
}

export default function CanchaList() {
  const [canchas, setCanchas] = useState<Cancha[]>([]);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const fetchCanchas = () => {
    fetch('http://localhost:3000/canchas')
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener las canchas');
        return res.json();
      })
      .then((data) => {
        setCanchas(data);
        setMensaje('');
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    fetchCanchas();
  }, []);

  const eliminarCancha = (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar esta cancha?')) return;

    fetch(`http://localhost:3000/canchas/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al eliminar la cancha');
        setMensaje('✅ Cancha eliminada correctamente');
        fetchCanchas();
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>Listado de Canchas</h2>

      <Link to="/admin/canchas/crear">
        <button
          style={{
            marginBottom: '1rem',
            background: 'green',
            color: 'white',
            border: 'none',
            padding: '0.4rem 0.8rem',
            cursor: 'pointer',
          }}
        >
          ➕ Nueva Cancha
        </button>
      </Link>

      {mensaje && <p style={{ color: 'lightgreen' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      <ul>
        {canchas.map((cancha) => (
          <li key={cancha.id} style={{ marginBottom: '1rem' }}>
            {cancha.nombre} - {cancha.disponible ? '✅ Disponible' : '❌ No disponible'}

            <button
              onClick={() => eliminarCancha(cancha.id)}
              style={{
                marginLeft: '1rem',
                background: 'red',
                color: 'white',
                border: 'none',
                padding: '0.3rem 0.6rem',
                cursor: 'pointer',
              }}
            >
              Eliminar
            </button>

            <button
              onClick={() => navigate(`/admin/canchas/editar/${cancha.id}`)}
              style={{
                marginLeft: '0.5rem',
                background: 'orange',
                color: 'white',
                border: 'none',
                padding: '0.3rem 0.6rem',
                cursor: 'pointer',
              }}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}



