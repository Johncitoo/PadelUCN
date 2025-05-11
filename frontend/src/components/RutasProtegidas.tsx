// src/components/RutasProtegidas.tsx
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

interface Props {
  rolEsperado: 'admin' | 'usuario';
  children: ReactNode;
}

export default function RutasProtegidas({ rolEsperado, children }: Props) {
  const { usuario, cargando } = useAuth();

  //  Logs de depuración
  console.log('🔍 RutasProtegidas:');
  console.log('Cargando:', cargando);
  console.log('Usuario:', usuario);
  console.log('Rol esperado:', rolEsperado);

  if (cargando) return null; 

  if (!usuario) return <Navigate to="/" />;

  const rolUsuario = usuario.rol; 
  if (rolUsuario !== rolEsperado) return <Navigate to="/" />;

  return <>{children}</>;
}




