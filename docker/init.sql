-- Archivo de inicialización de base de datos
-- Aún sin estructuras definitivas, en espera de confirmación del diseño
-- Tabla de usuarios
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  saldo INTEGER DEFAULT 0,
  es_admin BOOLEAN DEFAULT FALSE
);

-- Tabla de canchas
CREATE TABLE cancha (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  disponible BOOLEAN DEFAULT TRUE
);

-- Tabla de reservas
CREATE TABLE reserva (
  id SERIAL PRIMARY KEY,
  id_usuario INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  id_cancha INTEGER NOT NULL REFERENCES cancha(id) ON DELETE CASCADE,
  fecha DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  pagado BOOLEAN DEFAULT TRUE,
  cancelada BOOLEAN DEFAULT FALSE,
  fecha_creacion TIMESTAMP NOT NULL  -- CAMBIO: antes tenía DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de historial de reservas (auditoría de cambios)
CREATE TABLE historial_reserva (
  id SERIAL PRIMARY KEY,
  id_reserva INTEGER REFERENCES reserva(id) ON DELETE SET NULL,
  id_usuario INTEGER REFERENCES usuario(id) ON DELETE SET NULL,
  accion VARCHAR(50) NOT NULL,
  fecha TIMESTAMP NOT NULL  -- CAMBIO: antes tenía DEFAULT CURRENT_TIMESTAMP
);

-- Tipos de equipamiento (ej: raqueta, pelota)
CREATE TABLE tipo_equipamiento (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT
);

-- Equipamiento solicitado por reserva
CREATE TABLE reserva_equipamiento (
  id SERIAL PRIMARY KEY,
  id_reserva INTEGER REFERENCES reserva(id) ON DELETE CASCADE,
  id_tipo_equipamiento INTEGER REFERENCES tipo_equipamiento(id),
  cantidad INTEGER NOT NULL CHECK (cantidad > 0)
);
