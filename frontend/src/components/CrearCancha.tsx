// src/components/CrearCancha.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CrearCancha() {
  const [nombre, setNombre] = useState('');
  const [disponible, setDisponible] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const res = await fetch('http://localhost:3000/canchas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, disponible }),
      });

      if (!res.ok) throw new Error('No se pudo crear la cancha');

      setMensaje('✅ Cancha creada correctamente');
      setTimeout(() => navigate('/admin/canchas'), 1500);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('❌ Error desconocido');
      }
    }
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>Crear Nueva Cancha</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Disponible:
          <input
            type="checkbox"
            checked={disponible}
            onChange={(e) => setDisponible(e.target.checked)}
          />
        </label>
        <br />
        <button type="submit">Crear</button>
      </form>

      {mensaje && <p style={{ color: 'lightgreen' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

