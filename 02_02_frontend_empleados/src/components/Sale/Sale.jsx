import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../../SharedState";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { post } from "../../aux_api";
import Stack from "react-bootstrap/Stack";
import { host, api } from "../../defines";

function Sale() {
  const { states, actions } = useContext(Context);

  //Mediante el método filter, segrego los coches que están disponibles
  const cochesDisponibles = states.cars.filter(
    (element) => element.disponible === 1
  );

  //Variables para definir los useState con el primer dato de los arrays
  let idInicialCoche =
    cochesDisponibles.length > 0 ? cochesDisponibles[0].id_coche : 0;
  let idInicialCliente =
    states.clients.length > 0 ? states.clients[0].id_cliente : 0;

  const [fecha, setFecha] = useState("");
  const [id_coche, setIdcoche] = useState(idInicialCoche);
  const [id_cliente, setIdCliente] = useState(idInicialCliente);
  const [precio, setPrecio] = useState("");

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
    if (idInicialCoche != 0) {
      const data = JSON.stringify({ fecha, id_coche, id_cliente, precio });
      await post(host + api + "/sale", data);
    }
    actions.getAllSales();
    actions.getAllClients();
    actions.getAllCars();
  }

  /*Condicional para mapear en el select los coches disponibles en el caso de que los haya.
    Si no los hay, lo indicará*/
  let listadoCoches = "";
  if (idInicialCoche > 0) {
    listadoCoches = cochesDisponibles.map((element, index) => (
      <option value={element.id_coche}  key={index}>
        Id: {element.id_coche} - Matricula: {element.matricula} - Modelo:{" "}
        {element.modelo} - Marca: {element.marca}
      </option>
    ));
  } else {
    listadoCoches = <option>Coches no disponibles</option>;
  }

  return (
    <>
      <Stack gap={1}>
        <h2 className="mx-auto">Venta</h2>
        <Form className="col-8 mx-auto">
          <Form.Group className="col-3 mb-3" controlId="formBasicEmail">
            <Stack direction="horizontal" gap={2}>
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" onChange={fechaInputChangeHandler} />
            </Stack>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Stack direction="horizontal" gap={2}>
              <Form.Label>Coche</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={idCocheInputChangeHandler}
              >
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
                {states.clients.map((element, index) => (
                  <option value={element.id_cliente}  key={index}>
                    Id: {element.id_cliente} - DNI: {element.DNI} - Nombre:{" "}
                    {element.nombre} - Apellidos: {element.apellidos}
                  </option>
                ))}
              </Form.Select>
            </Stack>
          </Form.Group>
          <Form.Group className="col-3 mb-3" controlId="formBasicEmail">
            <Stack direction="horizontal" gap={2}>
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" onChange={precioInputChangeHandler} />
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

export default Sale;
