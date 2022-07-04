import { db } from "../index.mjs";

//Controlador para devolver todos los coches
export async function getAllCars(request, response) {
  try {
    const data = await db.query(`SELECT * FROM coches`);
    response.json(data.rows);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para devolver un coche
export async function getOneCarController(request, response) {
  const car = parseInt(request.params.id);
  try {
    const data = await db.query(
      `SELECT id_coche, matricula, modelo, marca, km, precio
        , foto, cilindrada, combustible, alquiler, oferta FROM coches WHERE id_coche=${car}`
    );
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para insertar un coche
export async function postCarController(request, response) {
  const {
    matricula,
    modelo,
    marca,
    km,
    precio,
    cilindrada,
    combustible,
    disponible,
    alquiler,
    oferta,
  } = request.body;
  const foto = request.file.filename;
  try {
    const data = await db.query(
      `INSERT INTO coches(matricula, modelo, marca, km, precio
                , foto, cilindrada, combustible, disponible, alquiler, oferta) VALUES 
                ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [
        matricula,
        modelo,
        marca,
        km,
        precio,
        foto,
        cilindrada,
        combustible,
        disponible,
        alquiler,
        oferta,
      ]
    );
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para modificar un coche
export async function putCarController(request, response) {
  const {
    id_coche,
    matricula,
    modelo,
    marca,
    km,
    precio,
    foto,
    cilindrada,
    combustible,
    disponible,
    alquiler,
    oferta,
  } = request.body;

  try {
    const data = await db.query(
      `UPDATE coches SET matricula=$1,modelo=$2,marca=$3,
        km= $4,precio= $5,foto=$6,cilindrada=$7,
        combustible=$8,disponible=$9,alquiler=$10,oferta=$11 WHERE id_coche=$12`,
      [
        matricula,
        modelo,
        marca,
        km,
        precio,
        foto,
        cilindrada,
        combustible,
        disponible,
        alquiler,
        oferta,
        id_coche,
      ]
    );
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para eliminar un coche
export async function deleteCarController(request, response) {
  const { id_coche } = request.body;
  try {
    const data = await db.query(`DELETE FROM coches WHERE id_coche=$1`, [
      id_coche,
    ]);
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para devolver todos los clientes
export async function getAllClients(request, response) {
  try {
    const data = await db.query(`SELECT * FROM clientes`);
    response.json(data.rows);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para insertar un cliente
export async function postClientController(request, response) {
  const { DNI, nombre, apellidos, telefono, cpostal, ciudad } = request.body;
  try {
    const data = await db.query(
      `INSERT INTO clientes(DNI, nombre, apellidos, telefono, cpostal
            , ciudad) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [DNI, nombre, apellidos, telefono, cpostal, ciudad]
    );
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para devolver un cliente
export async function getOneClientController(request, response) {
  const client = parseInt(request.params.id);
  try {
    const data = await db.query(
      `SELECT * FROM clientes WHERE id_cliente=${client}`
    );
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para modificar un cliente
export async function putClientController(request, response) {
  const { id_cliente, DNI, nombre, apellidos, telefono, cpostal, ciudad } =
    request.body;
  try {
    const data = await db.query(
      `UPDATE clientes SET DNI=$1,nombre=$2,apellidos=$3,
        telefono= $4,cpostal= $5,ciudad=$6 WHERE id_cliente=$7`,
      [DNI, nombre, apellidos, telefono, cpostal, ciudad, id_cliente]
    );
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para eliminar un cliente
export async function deleteClientController(request, response) {
  const { id_cliente } = request.body;
  try {
    const data = await db.query(`DELETE FROM clientes WHERE id_cliente=$1`, [
      id_cliente,
    ]);
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para insertar un formulario
export async function postFormController(request, response) {
  const { nombre, apellidos, telefono, consulta } = request.body;
  try {
    const data = await db.query(
      `INSERT INTO formularios(nombre, apellidos, telefono, consulta) VALUES 
            ($1,$2,$3,$4) RETURNING *`,
      [nombre, apellidos, telefono, consulta]
    );
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}
//Controlador para devolver todos los formularios
export async function getAllForms(request, response) {
  try {
    const data = await db.query(`SELECT * FROM formularios`);
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para eliminar el formulario
export async function deleteFormController(request, response) {
  const { id } = request.body;
  try {
    const data = await db.query(`DELETE FROM formularios WHERE id=$1`, [id]);
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para devolver todos las ventas
export async function getAllSales(request, response) {
  try {
    const data = await db.query(`SELECT * FROM ventas`);
    response.json(data.rows);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para insertar una venta
export async function postSaleController(request, response) {
  const { fecha, id_coche, id_cliente, precio } = request.body;
  try {
    const data = await db.query(
      `INSERT INTO ventas(fecha, id_coche, id_cliente, precio) VALUES 
        ($1,$2,$3,$4) RETURNING *`,
      [fecha, id_coche, id_cliente, precio]
    );
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para modificar un venta
export async function putSaleController(request, response) {
  const { id, fecha, id_coche, id_cliente, precio } = request.body;
  try {
    const data = await db.query(
      `UPDATE ventas SET fecha=$1,id_coche=$2,id_cliente=$3,
        precio= $4 WHERE id=$5`,
      [fecha, id_coche, id_cliente, precio, id]
    );
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para eliminar una venta
export async function deleteSaleController(request, response) {
  const { id } = request.body;
  try {
    const data = await db.query(`DELETE FROM ventas WHERE id=$1`, [id]);
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para devolver todos los alquileres
export async function getAllRents(request, response) {
  try {
    const data = await db.query(`SELECT * FROM alquileres`);
    response.json(data.rows);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para insertar un alquiler
export async function postRentController(request, response) {
  const { fecha_entrega, fecha_devolucion, id_coche, id_cliente, precio } =
    request.body;
  try {
    const data = await db.query(
      `INSERT INTO alquileres(fecha_entrega,fecha_devolucion,id_coche, id_cliente, precio) VALUES 
        ($1,$2,$3,$4,$5) RETURNING *`,
      [fecha_entrega, fecha_devolucion, id_coche, id_cliente, precio]
    );
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}

//Controlador para modificar un alquiler
export async function putRentController(request, response) {
  const { id, fecha_entrega, fecha_devolucion, id_coche, id_cliente, precio } =
    request.body;
  try {
    const data = await db.query(
      `UPDATE alquileres SET fecha_entrega=$1,fecha_devolucion=$2,id_coche=$3,id_cliente=$4,
        precio= $5 WHERE id=$6`,
      [fecha_entrega, fecha_devolucion, id_coche, id_cliente, precio, id]
    );
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}
//Controlador para eliminar un alquiler
export async function deleteRentController(request, response) {
  const { id } = request.body;
  try {
    const data = await db.query(`DELETE FROM alquileres WHERE id=$1`, [id]);
    if (data.rowCount === 0) {
      response.sendStatus(404);
    } else {
      response.json(data.rows);
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}
