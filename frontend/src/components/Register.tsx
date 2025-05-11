import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    saldo: 0,
    es_admin: false,
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');

    try {
        const res = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Error al registrar');

      const data = await res.json();
      setMensaje(`✅ Usuario ${data.nombre} registrado correctamente`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            setMensaje(`❌ Error: ${error.message}`);
          } else {
            setMensaje('❌ Ocurrió un error desconocido');
          }
        }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
        <input name="saldo" type="number" placeholder="Saldo" onChange={handleChange} />
        <label>
          Admin:
          <input name="es_admin" type="checkbox" onChange={handleChange} />
        </label>
        <button type="submit">Registrar</button>
      </form>

      {mensaje && <p style={{ marginTop: '10px', color: mensaje.startsWith('✅') ? 'green' : 'red' }}>{mensaje}</p>}

      <p style={{ color: 'white', marginTop: '10px' }}>
        ¿Ya tienes cuenta? <Link to="/" style={{ color: 'lightblue' }}>Inicia sesión</Link>
      </p>
    </>
  );
}
