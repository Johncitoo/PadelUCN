import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Credenciales incorrectas');
      }

      const data = await res.json();

      // Guardar en contexto global y en localStorage
      login(data);
      localStorage.setItem('rol', data.rol);
      localStorage.setItem('token', data.token || '');

      setMensaje(`✅ Bienvenido, ${data.nombre}`);
      console.log('Login:', data);

      if (data.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/usuario');
      }

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
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>

      {mensaje && (
        <p
          style={{
            marginTop: '10px',
            color: mensaje.startsWith('✅') ? 'green' : 'red',
          }}
        >
          {mensaje}
        </p>
      )}

      <p style={{ color: 'white', marginTop: '10px' }}>
        ¿No tienes cuenta?{' '}
        <Link to="/register" style={{ color: 'lightblue' }}>
          Regístrate aquí
        </Link>
      </p>
    </>
  );
}




