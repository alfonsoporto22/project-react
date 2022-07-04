import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../../SharedState";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { modify } from "../../aux_api";
import Stack from "react-bootstrap/Stack";
import { host, api } from "../../defines";
import { useParams } from "react-router-dom";
import {
  takeMatricula,
  takeModelo,
  takeMarca,
  takeDNI,
  takeNombre,
  takeApellidos,
} from "../../local/functions";

function ModificateSale() {
  const { states, actions } = useContext(Context);

  //Variable para coger datos de la URL
  const parms = useParams();
  let id_venta = parseInt(parms.id);

  //Buscamos el cliente en el state que coincida con el parametro de la url, para poder mostrarlo
  const venta = states.sales.find((element) => element.id === id_venta);

  //Mediante el método filter, segrego los coches que están disponibles
  const cochesDisponibles = states.cars.filter(
    (element) => element.disponible === 1
  );

  const [id, setIdVenta] = useState(venta.id);
  const [fecha, setFecha] = useState(venta.fecha);
  const [id_coche, setIdcoche] = useState(venta.id_coche);
  const [id_cliente, setIdCliente] = useState(venta.id_cliente);
  const [precio, setPrecio] = useState(venta.precio);

  function fechaInputChangeHandler(event) {
    setFecha(event.target.value);
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
    const data = JSON.stringify({ id, fecha, id_coche, id_cliente, precio });
    await modify(host + api + "/sale", data);
    actions.getAllSales();
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
          <Form.Group className="col-3 mb-3" controlId="formBasicEmail">
            <Stack direction="horizontal" gap={2}>
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                onChange={fechaInputChangeHandler}
                defaultValue={venta.fecha}
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
                <option value={venta.id_coche}>
                  Id: {venta.id_coche} - Matricula:
                  {takeMatricula(venta.id_coche, states.cars)} - Modelo:
                  {takeModelo(venta.id_coche, states.cars)} - Marca:
                  {takeMarca(venta.id_coche, states.cars)}
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
                <option value={venta.id_cliente}>
                  Id: {venta.id_cliente} - DNI:
                  {takeDNI(venta.id_cliente, states.clients)} - Nombre:
                  {takeNombre(venta.id_cliente, states.clients)} - Apellidos:
                  {takeApellidos(venta.id_cliente, states.clients)}
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
                defaultValue={venta.precio}
              />
            </Stack>
          </Form.Group>
          <Stack>
            <div className="ms-auto">
              <Link to="/saleTable">
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

export default ModificateSale;
