import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarCancha() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [disponible, setDisponible] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/canchas/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo obtener la cancha');
        return res.json();
      })
      .then((data) => {
        setNombre(data.nombre);
        setDisponible(data.disponible);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error desconocido');
        }
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const res = await fetch(`http://localhost:3000/canchas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, disponible }),
      });

      if (!res.ok) throw new Error('Error al actualizar la cancha');

      setMensaje('✅ Cancha actualizada correctamente');
      setTimeout(() => navigate('/admin/canchas'), 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido');
      }
    }
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>Editar Cancha</h2>
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
        <button type="submit">Guardar cambios</button>
      </form>

      {mensaje && <p style={{ color: 'lightgreen' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

