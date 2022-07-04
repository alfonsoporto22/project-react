
/**
 * SQL quieries strings
 */
export const createFormsTableSQL = `
    CREATE TABLE
        IF NOT EXISTS
        formularios(
            id SERIAL,
            nombre VARCHAR(20) NOT NULL,
            apellidos VARCHAR(20) NOT NULL,
            telefono INTEGER NOT NULL,
            consulta VARCHAR(200),
            PRIMARY KEY(id)
        )
`;

export const createEmployeesTableSQL = `
    CREATE TABLE
        IF NOT EXISTS
        usuariosConcesionarios(
            usuario INTEGER PRIMARY KEY,
            contraseña VARCHAR(20) NOT NULL
        )
`;

export const createCustomersTableSQL = `
    CREATE TABLE
        IF NOT EXISTS
        clientes(
            id_cliente SERIAL,
            DNI VARCHAR(8) NOT NULL UNIQUE,
            nombre VARCHAR(20) NOT NULL,
            apellidos VARCHAR(20) NOT NULL,
            telefono INTEGER NOT NULL,
            cpostal INTEGER NOT NULL,
            ciudad VARCHAR(20) NOT NULL,
            PRIMARY KEY(id_cliente)
        )
`;

/*
Valores booleanos=> 0 (false), 1(true)
Los coches si están vendidos o alquilados están no disponibles=0.
Si son coches en alquiler. Alquiler=1, si son para ventas: Alquiler=0
Sin son coches en oferta. Oferta=1, si no están en Oferta=0.
*/

export const createCarsTableSQL = `
    CREATE TABLE
        IF NOT EXISTS
        coches(
            id_coche SERIAL,
            matricula VARCHAR(50) UNIQUE NOT NULL,
            modelo VARCHAR(30),
            marca VARCHAR(30),
            km DECIMAL(9),
            precio DECIMAL(9),
            foto CHAR(33),
            cilindrada VARCHAR(30),
            combustible VARCHAR(30),
            disponible INTEGER DEFAULT 1 CHECK (disponible=0 OR disponible=1),
            alquiler INTEGER DEFAULT 1 CHECK (alquiler=0 OR alquiler=1),
            oferta INTEGER DEFAULT 1 CHECK (oferta=0 OR oferta=1),
            PRIMARY KEY(id_coche)
        )
`;


export const createRentsTableSQL = `
    CREATE TABLE
        IF NOT EXISTS
        alquileres(
            id SERIAL,
            fecha_entrega VARCHAR(30),
            fecha_devolucion VARCHAR(30),
            id_coche INTEGER,
            id_cliente INTEGER,
            precio DECIMAL(10),
            CONSTRAINT fk_cliente_alquiler FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente), 
            CONSTRAINT fk_coche_alquiler FOREIGN KEY (id_coche) REFERENCES coches(id_coche),
            PRIMARY KEY(id)
        )
`;
export const createSalesTableSQL = `
    CREATE TABLE
        IF NOT EXISTS
        ventas(
            id SERIAL,
            fecha VARCHAR(30),
            id_coche INTEGER,
            id_cliente INTEGER,
            precio DECIMAL(10),
            CONSTRAINT fk_cliente_venta FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente), 
            CONSTRAINT fk_coche_venta FOREIGN KEY (id_coche) REFERENCES coches(id_coche),
            PRIMARY KEY(id)
        )
`;

//Trigger para que después de insertar un coche en la tabla ventas lo asigne como no disponible
/*
//En SQL
export const createCarNotAvailableTriggerpSQL = `
CREATE TRIGGER car_not_available_ventas AFTER INSERT ON ventas
BEGIN
    UPDATE coches
    SET disponible = 0
    WHERE id_coche = NEW.id_coche;
END;
`;*/

export const createCarNotAvailableTriggerSQL =`
CREATE OR REPLACE FUNCTION auditlogfunc() RETURNS TRIGGER AS $example_table$
   BEGIN
        UPDATE coches
        SET disponible = 0
        WHERE id_coche = NEW.id_coche;
      RETURN NEW;
   END;
$example_table$ LANGUAGE plpgsql;

CREATE  TRIGGER  car_not_available_ventas AFTER INSERT ON ventas
FOR EACH ROW EXECUTE PROCEDURE auditlogfunc();
`;

//Trigger para que después de borrar un coche en la tabla ventas lo asigne como disponible
/*
//En SQL
client.query(`
CREATE TRIGGER IF NOT EXISTS car_available_ventas BEFORE DELETE ON ventas
BEGIN
    UPDATE coches
    SET disponible = 1
    WHERE id_coche = OLD.id_coche;
END;
`)
*/

export const createCarAvailableTriggerSQL =`
CREATE OR REPLACE FUNCTION auditlogfunc2() RETURNS TRIGGER AS $example_table$
   BEGIN
        UPDATE coches
        SET disponible = 1
        WHERE id_coche = OLD.id_coche;
      RETURN OLD;
   END;
$example_table$ LANGUAGE plpgsql;

CREATE TRIGGER car_available_ventas BEFORE DELETE ON ventas
FOR EACH ROW EXECUTE PROCEDURE auditlogfunc2();
`;

//Trigger para que después de insertar un coche en la tabla alquileres lo asigne como no disponible
/*
//En SQL
client.query(`
CREATE TRIGGER IF NOT EXISTS car_not_available_alquileres AFTER INSERT ON alquileres
BEGIN
    UPDATE coches
    SET disponible = 0
    WHERE id_coche = NEW.id_coche;
END;
`)
*/

export const createNotAvailableRentsTriggerSQL =`
CREATE OR REPLACE FUNCTION auditlogfunc3() RETURNS TRIGGER AS $example_table$
   BEGIN
        UPDATE coches
        SET disponible = 0
        WHERE id_coche = NEW.id_coche;
      RETURN NEW;
   END;
$example_table$ LANGUAGE plpgsql;

CREATE TRIGGER car_not_available_alquileres AFTER INSERT ON alquileres
FOR EACH ROW EXECUTE PROCEDURE auditlogfunc3();
`;

//Trigger para que después de borrar un coche en la tabla alquileres lo asigne como disponible
/*
//En SQL
client.query(`
CREATE TRIGGER IF NOT EXISTS car_available_alquileres BEFORE DELETE ON alquileres
BEGIN
    UPDATE coches
    SET disponible = 1
    WHERE id_coche = OLD.id_coche;
END;
`)
*/

export const createAvailableRentsTriggerSQL =`
CREATE OR REPLACE FUNCTION auditlogfunc4() RETURNS TRIGGER AS $example_table$
   BEGIN
        UPDATE coches
        SET disponible = 1
        WHERE id_coche = OLD.id_coche;
      RETURN OLD;
   END;
$example_table$ LANGUAGE plpgsql;

CREATE TRIGGER car_available_alquileres BEFORE DELETE ON alquileres
FOR EACH ROW EXECUTE PROCEDURE auditlogfunc4();
`;
