import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../../SharedState";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { modify } from "../../aux_api";
import Stack from "react-bootstrap/Stack";
import { URL } from "../../defines";
import { useParams } from "react-router-dom";
import {
  takeMatricula,
  takeModelo,
  takeMarca,
  takeDNI,
  takeNombre,
  takeApellidos,
} from "../../local/functions";

function ModificateRent() {
  const { states, actions } = useContext(Context);

  //Variable para coger datos de la URL
  const parms = useParams();
  let id_alquiler = parseInt(parms.id);

  //Buscamos el alquiler en el state que coincida con el parametro de la url, para poder mostrarlo
  const alquiler = states.rents.find((element) => element.id === id_alquiler);

  //Mediante el método filter, segrego los coches que están disponibles
  const cochesDisponibles = states.cars.filter(
    (element) => element.disponible === 1
  );

  const [id, setIdVenta] = useState(alquiler.id);
  const [fecha_entrega, setFechaEntrega] = useState(alquiler.fecha_entrega);
  const [fecha_devolucion, setFechaDevolucion] = useState(alquiler.fecha_devolucion);
  const [id_coche, setIdcoche] = useState(alquiler.id_coche);
  const [id_cliente, setIdCliente] = useState(alquiler.id_cliente);
  const [precio, setPrecio] = useState(alquiler.precio);

  function fechaEntregaInputChangeHandler(event) {
    setFechaEntrega(event.target.value);
  }
  function fechaDevolucionInputChangeHandler(event) {
    setFechaDevolucion(event.target.value);
  }
  function idCocheInputChangeHandler(event) {
    setIdcoche(event.target.value);
  }
  function idClienteChangeHandler(event) {
    setIdCliente(event.target.value);
  }
  function precioInputChangeHandler(event) {
    setPrecio(event.target.value);
  }

  async function clickHandler() {
    actions.getAllCars();
    actions.getAllClients();
    const data = JSON.stringify({ id, fecha_entrega, fecha_devolucion, id_coche, id_cliente, precio });
    await modify(URL + "/rent", data);
    actions.getAllRents();
    actions.getAllClients();
    actions.getAllCars();
  }

  let listadoCoches = cochesDisponibles.map((element, index) => (
    <option value={element.id_coche}>
      Id: {element.id_coche} - Matricula: {element.id_coche} - Modelo:{" "}
      {element.modelo} - Marca: {element.marca}
    </option>
  ));

  let listadoCLientes = states.clients.map((element, index) => (
    <option value={element.id_cliente}>
      Id: {element.id_cliente} - DNI: {element.DNI} - Nombre: {element.nombre} -
      Apellidos: {element.apellidos}
    </option>
  ));
  return (
    <>
      <Stack gap={1}>
        <h2 className="mx-auto">Venta id: {id}</h2>
        <Form className="col-8 mx-auto">
          <Form.Group className="col-8 mb-3" controlId="formBasicEmail">
            <Stack direction="horizontal" gap={2}>
              <Form.Label>Fecha entrega</Form.Label>
              <Form.Control
                type="date"
                onChange={fechaEntregaInputChangeHandler}
                defaultValue={alquiler.fecha_entrega}
              />
              <Form.Label>Fecha devolución</Form.Label>
              <Form.Control
                type="date"
                onChange={fechaDevolucionInputChangeHandler}
                defaultValue={alquiler.fecha_devolucion}
              />
            </Stack>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Stack direction="horizontal" gap={2}>
              <Form.Label>Coche</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={idCocheInputChangeHandler}
              >
                <option value={alquiler.id_coche}>
                  Id: {alquiler.id_coche} -
                  Matricula: {takeMatricula(alquiler.id_coche, states.cars)} -
                  Modelo: {takeModelo(alquiler.id_coche, states.cars)} -
                  Marca: {takeMarca(alquiler.id_coche, states.cars)}
                </option>
                {listadoCoches}
              </Form.Select>
            </Stack>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Stack direction="horizontal" gap={2}>
              <Form.Label>Cliente</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={idClienteChangeHandler}
              >
                <option value={alquiler.id_cliente}>
                  Id: {alquiler.id_cliente} -
                  DNI: {takeDNI(alquiler.id_cliente, states.clients)} -
                  Nombre: {takeNombre(alquiler.id_cliente, states.clients)} -
                  Apellidos: {takeApellidos(alquiler.id_cliente, states.clients)}
                </option>
                {listadoCLientes}
              </Form.Select>
            </Stack>
          </Form.Group>
          <Form.Group className="col-3 mb-3" controlId="formBasicEmail">
            <Stack direction="horizontal" gap={2}>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                onChange={precioInputChangeHandler}
                defaultValue={alquiler.precio}
              />
            </Stack>
          </Form.Group>
          <Stack>
            <div className="ms-auto">
              <Link to="/rentTable">
                <Button onClick={clickHandler} variant="primary" type="submit">
                  Registrar
                </Button>
              </Link>
            </div>
          </Stack>
        </Form>
      </Stack>
    </>
  );
}

export default ModificateRent;
