import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./vehicleDealer.db', (err) => {
    if (err) {
        throw err.message;
    }
    console.log('Connected to the chat database.');
});

db.run(`
    CREATE TABLE
        IF NOT EXISTS
        formularios(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(20) NOT NULL,
            apellidos VARCHAR(20) NOT NULL,
            telefono DECIMAL(8) NOT NULL,
            consulta VARCHAR(200)
        )
`);

db.run(`
    CREATE TABLE
        IF NOT EXISTS
        usuariosConcesionarios(
            usuario DECIMAL(5) PRIMARY KEY,
            contraseña VARCHAR(20) NOT NULL
        )
`);

db.run(`
    CREATE TABLE
        IF NOT EXISTS
        clientes(
            id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
            DNI VARCHAR(8) NOT NULL UNIQUE,
            nombre VARCHAR(20) NOT NULL,
            apellidos VARCHAR(20) NOT NULL,
            telefono DECIMAL(8) NOT NULL,
            cpostal DECIMAL(5) NOT NULL,
            ciudad VARCHAR(20) NOT NULL
        )
`);
/*
Valores booleanos=> 0 (false), 1(true)
Los coches si están vendidos o alquilados están no disponibles=0.
Si son coches en alquiler. Alquiler=1, si son para ventas: Alquiler=0
Sin son coches en oferta. Oferta=1, si no están en Oferta=0.
*/ 
db.run(`
    CREATE TABLE
        IF NOT EXISTS
        coches(
            id_coche INTEGER PRIMARY KEY AUTOINCREMENT,
            matricula VARCHAR(50) UNIQUE NOT NULL,
            modelo VARCHAR(30),
            marca VARCHAR(30),
            km DECIMAL(9),
            precio DECIMAL(9),
            foto VARCHAR(30),
            cilindrada VARCHAR(30),
            combustible VARCHAR(30),
            disponible INTEGER DEFAULT 1 CHECK (disponible=0 OR disponible=1),
            alquiler VARCHAR(10) CHECK (alquiler='true' OR alquiler='false'),
            oferta VARCHAR(10) CHECK (oferta='true' OR oferta='false')
        )
`);


db.run(`
    CREATE TABLE
        IF NOT EXISTS
        alquileres(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha_entrega VARCHAR(30),
            fecha_devolucion VARCHAR(30),
            id_coche DECIMAL(5),
            id_cliente INT(10),
            precio DECIMAL(10),
            CONSTRAINT fk_cliente_alquiler FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente), 
            CONSTRAINT fk_coche_alquiler FOREIGN KEY (id_coche) REFERENCES coche(id_coche)
        )
`);

db.run(`
    CREATE TABLE
        IF NOT EXISTS
        ventas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha VARCHAR(30),
            id_coche DECIMAL(5),
            id_cliente INT(10),
            precio DECIMAL(10),
            CONSTRAINT fk_cliente_venta FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente), 
            CONSTRAINT fk_coche_venta FOREIGN KEY (id_coche) REFERENCES coche(id_coche)
        )
`);

