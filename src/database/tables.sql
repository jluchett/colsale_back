CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    codigo_verificacion VARCHAR(6),        
    activo BOOLEAN DEFAULT FALSE,           
    fecha_registro TIMESTAMP DEFAULT NOW()  
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(20) CHECK (estado IN ('nuevo', 'usado')), 
    imagen_url VARCHAR(255)                                    
);

CREATE TABLE sorteos (
    id SERIAL PRIMARY KEY,
    producto_id INT REFERENCES productos(id) ON DELETE SET NULL,
    fecha_inicio TIMESTAMP,
    fecha_fin TIMESTAMP,
    numero_ganador CHAR(2),                         
    estatus VARCHAR(20) DEFAULT 'activo',         
    fecha_loteria TIMESTAMP,                     
    responsable VARCHAR(100),                     
    loteria VARCHAR(100),                         
    valor_numero DECIMAL(10, 2)                      
);

CREATE TABLE participantes (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    sorteo_id INT REFERENCES sorteos(id) ON DELETE CASCADE,
    direccion_envio TEXT,                   
    fecha_participacion TIMESTAMP DEFAULT NOW()
);

CREATE TABLE numeros (
    id SERIAL PRIMARY KEY,
    sorteo_id INT REFERENCES sorteos(id) ON DELETE CASCADE, 
    participante_id INT REFERENCES participantes(id) ON DELETE CASCADE,
    numero CHAR(2) CHECK (numero BETWEEN '00' AND '99'),  
    reservado BOOLEAN DEFAULT TRUE,            
    fecha_reserva TIMESTAMP DEFAULT NOW(),
    fecha_pago_limite TIMESTAMP,      
    UNIQUE (sorteo_id, numero)                              
);

CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    participante_id INT REFERENCES participantes(id) ON DELETE CASCADE,
    metodo_pago VARCHAR(50) CHECK (metodo_pago IN ('Daviplata', 'Nequi')),
    estado_pago VARCHAR(20) DEFAULT 'pendiente',          
    fecha_iniciado TIMESTAMP DEFAULT NOW(),
    fecha_completado TIMESTAMP,
    monto DECIMAL(10, 2)                          
);

CREATE TABLE pagos_numeros (
    id SERIAL PRIMARY KEY,
    pago_id INT REFERENCES pagos(id) ON DELETE CASCADE,
    numero_id INT REFERENCES numeros(id) ON DELETE CASCADE,
    pagado BOOLEAN DEFAULT FALSE                     
);
