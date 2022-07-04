import express from "express";
import jwt from "jsonwebtoken";
import pg from "pg";
import { config } from "dotenv";
/*
import {
  getAllCars,
  postCarController,
  getOneCarController,
  putCarController,
  deleteCarController,
  getAllClients,
  postClientController,
  getOneClientController,
  putClientController,
  deleteClientController,
  postFormController,
  getAllForms,
  getAllSales,
  postSaleController,
  putSaleController,
  deleteSaleController,
  getAllRents,
  postRentController,
  putRentController,
  deleteRentController,
  deleteFormController,
} from "./controllers/Controllers.mjs";*/
import {
  getAllCars,
  getOneCarController,
  postCarController,
  putCarController,
  deleteCarController,
  getAllClients,
  postClientController,
  getOneClientController,
  putClientController,
  deleteClientController,
  postFormController,
  getAllForms,
  deleteFormController,
  getAllSales,
  postSaleController,
  putSaleController,
  deleteSaleController,
  getAllRents,
  postRentController,
  putRentController,
  deleteRentController,
} from "./controllers/Controllers.mjs";

import {
  createFormsTableSQL,
  createEmployeesTableSQL,
  createCustomersTableSQL,
  createCarsTableSQL,
  createRentsTableSQL,
  createSalesTableSQL,
  createCarNotAvailableTriggerSQL,
  createCarAvailableTriggerSQL,
  createNotAvailableRentsTriggerSQL,
  createAvailableRentsTriggerSQL,
} from "./models/db.mjs";

import multer from "multer";

const PATH_PREFIX = "/api";
const UPLOADS_FOLDER = "./uploads/";

// Usa .env si el servicio no está en producción
if (process.env.NODE_ENV !== "production") {
  config();
}

const upload = multer({ dest: UPLOADS_FOLDER });

/**
 * Initialize DB
 */
export const db = new pg.Client(process.env.PGURL);
db.connect();

/**
 * Table creation
 */
try {
  db.query(createFormsTableSQL);
  db.query(createEmployeesTableSQL);
  db.query(createCustomersTableSQL);
  db.query(createCarsTableSQL);
  db.query(createRentsTableSQL);
  db.query(createSalesTableSQL);
  //db.query(createCarNotAvailableTriggerSQL);
  //db.query(createCarAvailableTriggerSQL);
  //db.query(createNotAvailableRentsTriggerSQL);
  //db.query(createAvailableRentsTriggerSQL);
} catch (error) {
  console.error("Error trying to create tables");
  throw error;
}

const app = express();
try {
  const jsonParser = express.json();

  app.use(express.json());
  app.use(
    "/",
    express.static("../02_01_frontend_clientes/build", { index: "index.html" })
  );
  app.use(
    "/backoffice/",
    express.static("../02_02_frontend_empleados/build", { index: "index.html" })
  );
  app.use("/public/", express.static("./uploads/"));

  //Coches
  app.get(PATH_PREFIX + "/allCoches/", getAllCars);
  app.get(PATH_PREFIX + "/car/:id", getOneCarController);
  app.post(PATH_PREFIX + "/car/", upload.single("photo"), postCarController);
  app.put(PATH_PREFIX + "/car/", jsonParser, putCarController);
  app.delete(PATH_PREFIX + "/car/", jsonParser, deleteCarController);

  //Clientes
  app.get(PATH_PREFIX + "/allClients/", getAllClients);
  app.post(PATH_PREFIX + "/client/", jsonParser, postClientController);
  app.get(PATH_PREFIX + "/client/:id", getOneClientController);
  app.put(PATH_PREFIX + "/client/", jsonParser, putClientController);
  app.delete(PATH_PREFIX + "/client/", jsonParser, deleteClientController);

  //Formulario
  app.post(PATH_PREFIX + "/form/", jsonParser, postFormController);
  app.get(PATH_PREFIX + "/allForms/", getAllForms);
  app.delete(PATH_PREFIX + "/form/", jsonParser, deleteFormController);

  //Ventas
  app.get(PATH_PREFIX + "/allSales/", getAllSales);
  app.post(PATH_PREFIX + "/sale/", jsonParser, postSaleController);
  app.put(PATH_PREFIX + "/sale/", jsonParser, putSaleController);
  app.delete(PATH_PREFIX + "/sale/", jsonParser, deleteSaleController);
  
  //Alquileres
  app.get(PATH_PREFIX + "/allRents/", getAllRents);
  app.post(PATH_PREFIX + "/rent/", jsonParser, postRentController);
  app.put(PATH_PREFIX + "/rent/", jsonParser, putRentController);
  app.delete(PATH_PREFIX + "/rent/", jsonParser, deleteRentController);

  //Autorización
  const secret = process.env.SECRET;

  const user = {
    username: "Alfonso",
    password: "123",
    accessLevel: 0,
  };

  function decodeBasicToken(request) {
    const [authType, b64token] = request.headers.authorization.split(" ");
    const tokenBuffer = new Buffer.from(b64token, "base64");
    const token = tokenBuffer.toString();
    return token.split(":");
  }

  function authMiddleware(req, res, next) {
    try {
      const [method, token] = req.headers.authorization.split(" ");
      const { level } = jwt.verify(token, secret);
      res.locals.level = level;
      next();
    } catch (err) {
      res.sendStatus(401);
    }
  }

  //1. Endpoint Autenticación
  app.get(PATH_PREFIX + "/login/", (req, res) => {
    const [username, password] = decodeBasicToken(req);
    if (username === user.username && password === user.password) {
      //Creación de token/firma con un secret
      const token = jwt.sign(
        {
          level: user.accessLevel,
        },
        secret,
        {
          expiresIn: "1h",
        }
      );
      res.send(token);
    } else {
      res.sendStatus(401);
    }
  });

  /*
   //2. Uso del token
   app.get(PATH_PREFIX + "/secretos/", authMiddleware, (req, res) => {
     res.send(`El secreto de la vida, el universo y de todo: 42`)
   })
 
 
 
   
 
   //Imagenes Multer
   /* app.post(PATH_PREFIX + "/uploadOnePhoto/", upload.single('photo'), (req, res) => {
      console.log("File:", req.file)
      console.log("Body:", req.body)
      res.sendStatus(201)
    })
  */
  app.listen(process.env.PORT || 3000, () => {
    console.log("Express running...");
  });
} catch (err) {
  console.error(err);
}
