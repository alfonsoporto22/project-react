import { useContext, useState } from "react";
import Table from "react-bootstrap/Table";
import { Context } from "../../SharedState";
import Button from "react-bootstrap/Button";
import { apiDelete } from "../../aux_api";
import { Link } from "react-router-dom";
import {
  takeMatricula,
  takeModelo,
  takeMarca,
  takeDNI,
  takeNombre,
  takeApellidos,
  unoSiCeroNo,
  alquilerVenta,
} from "../../local/functions";
import { host, api } from "../../defines";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";

function SearchFor() {
  const { states, actions } = useContext(Context);

  //Clientes
  const [atributeClient, setAtributeClient] = useState("id_cliente");
  const [valueClient, setValueClient] = useState("");
  const [clients, setClient] = useState([{}]);

  //Coches
  const [atributeCar, setAtributeCar] = useState("id_coche");
  const [valueCar, setValueCar] = useState("");
  const [cars, setCars] = useState([{}]);

  //Ventas
  const [atributeSale, setAtributeSale] = useState("id");
  const [valueSale, setValueSale] = useState("");
  const [sales, setSales] = useState([{}]);

  //Alquileres
  const [atributeRent, setAtributeRent] = useState("id");
  const [valueRent, setValueRent] = useState("");
  const [rents, setRents] = useState([{}]);

  ////Handler borrado genérico
  async function clickHandlerDelete(id_cliente, prop) {
    let data = JSON.stringify({ id_cliente });
    await apiDelete(host + api + prop, data);
    actions.getAllClients();
  }

  //Handler buscar clientes
  async function clickHandlerSearchForClient(value, datos, valor) {
    if (!isNaN(valor)) {
      if (
        value === "id_cliente" ||
        value === "telefono" ||
        value === "cpostal"
      ) {
        let valorNumero = Number(valor);
        setClient(datos.filter((element) => element[value] === valorNumero));
      }
    } else {
      setClient(datos.filter((element) => element[value] === valor));
    }
  }

  //Handler buscar coches
  async function clickHandlerSearchForCar(value, datos, valor) {
    switch (valor) {
      case "Sí":
        valor = 1;
        break;
      case "No":
        valor = 0;
        break;
      case "Alquiler":
        valor = 1;
        break;
      case "Venta":
        valor = 0;
        break;
    }
    if (!isNaN(valor)) {
      if (
        value === "id_coche" ||
        value === "km" ||
        value === "cpostal" ||
        value === "precio" ||
        value === "disponible" ||
        value === "alquiler" ||
        value === "oferta"
      ) {
        let valorNumero = Number(valor);
        setCars(datos.filter((element) => element[value] === valorNumero));
      }
    } else {
      setCars(datos.filter((element) => element[value] === valor));
    }
  }

  //Handler buscar ventas
  async function clickHandlerSearchForSale(value, datos, valor) {
    if (!isNaN(valor)) {
      if (
        value === "id" ||
        value === "id_coche" ||
        value === "id_cliente" ||
        value === "precio"
      ) {
        let valorNumero = Number(valor);
        setSales(datos.filter((element) => element[value] === valorNumero));
      }
    } else {
      setSales(datos.filter((element) => element[value] === valor));
    }
  }

  //Handler buscar alquileres
  async function clickHandlerSearchForRent(value, datos, valor) {
    if (!isNaN(valor)) {
      if (
        value === "id" ||
        value === "id_coche" ||
        value === "id_cliente" ||
        value === "precio"
      ) {
        let valorNumero = Number(valor);
        setRents(datos.filter((element) => element[value] === valorNumero));
      }
    } else {
      setRents(datos.filter((element) => element[value] === valor));
    }
  }

  return (
    <>
      <Stack gap={1}>
        <h2 className="mx-auto">Buscar cliente</h2>
        <Stack direction="horizontal" gap={2}>
          <div className="col-9">
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>DNI</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Telefono</th>
                  <th>CP</th>
                  <th>Ciudad</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {clients.map((element, index) => (
                  <tr>
                    <td>{element.id_cliente}</td>
                    <td>{element.DNI}</td>
                    <td>{element.nombre}</td>
                    <td>{element.apellidos}</td>
                    <td>{element.telefono}</td>
                    <td>{element.cpostal}</td>
                    <td>{element.ciudad}</td>
                    <td>
                      <Button
                        onClick={() => {
                          clickHandlerDelete(element.id_cliente, "/client");
                        }}
                        variant="primary"
                        type="submit"
                      >
                        Eliminar
                      </Button>
                    </td>
                    <td>
                      {" "}
                      <Link to={"/client/" + element.id_cliente}>
                        <Button variant="primary" type="submit">
                          Modificar
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Form>
            <Stack direction="horizontal" gap={2}>
              <Form.Select
                aria-label="Default select example"
                value={atributeClient}
                onChange={(event) => setAtributeClient(event.target.value)}
              >
                <option value="id_cliente">ID</option>
                <option value="DNI">DNI</option>
                <option value="nombre">Nombre</option>
                <option value="apellidos">Apellidos</option>
                <option value="telefono">Teléfono</option>
                <option value="cpostal">CP</option>
                <option value="ciudad">Ciudad</option>
              </Form.Select>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  onChange={(event) => setValueClient(event.target.value)}
                />
              </Form.Group>
              <Button
                onClick={() => {
                  clickHandlerSearchForClient(
                    atributeClient,
                    states.clients,
                    valueClient
                  );
                }}
                variant="primary"
                type="button"
              >
                Buscar
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Stack>
      <Stack gap={1}>
        <h2 className="mx-auto">Buscar vehículos</h2>
        <Stack direction="horizontal" gap={2}>
          <div className="col-9">
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Matrícula</th>
                  <th>Modelo</th>
                  <th>Marca</th>
                  <th>Km</th>
                  <th>Precio</th>
                  <th>Cilindrada</th>
                  <th>Disponible</th>
                  <th>Alquiler</th>
                  <th>Oferta</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cars.map((element, index) => (
                  <tr>
                    <td>{element.id_coche}</td>
                    <td>{element.matricula}</td>
                    <td>{element.modelo}</td>
                    <td>{element.marca}</td>
                    <td>{element.km}</td>
                    <td>{element.precio}</td>
                    <td>{element.cilindrada}</td>
                    <td>{unoSiCeroNo(element.disponible)}</td>
                    <td>{alquilerVenta(element.alquiler)}</td>
                    <td>{unoSiCeroNo(element.oferta)}</td>
                    <td>
                      <Button
                        onClick={() => {
                          clickHandlerDelete(element.id_coche, "/car");
                        }}
                        variant="primary"
                        type="submit"
                      >
                        Eliminar
                      </Button>
                    </td>
                    <td>
                      {" "}
                      <Link to={"/vehiculo/" + element.id_coche}>
                        <Button variant="primary" type="submit">
                          Modificar
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Form>
            <Stack direction="horizontal" gap={2}>
              <Form.Select
                aria-label="Default select example"
                value={atributeCar}
                onChange={(event) => setAtributeCar(event.target.value)}
              >
                <option value="id_coche">ID</option>
                <option value="matricula">Matricula</option>
                <option value="modelo">Modelo</option>
                <option value="marca">Marca</option>
                <option value="km">Km</option>
                <option value="precio">Precio</option>
                <option value="cilindrada">Cilindrada</option>
                <option value="disponible">Disponible</option>
                <option value="alquiler">Alquiler</option>
                <option value="oferta">Oferta</option>
              </Form.Select>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  onChange={(event) => setValueCar(event.target.value)}
                />
              </Form.Group>
              <Button
                onClick={() => {
                  clickHandlerSearchForCar(atributeCar, states.cars, valueCar);
                }}
                variant="primary"
                type="button"
              >
                Buscar
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Stack>
      <Stack gap={1}>
        <h2 className="mx-auto">Buscar ventas</h2>
        <Stack direction="horizontal" gap={2}>
          <div className="col-9">
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>fecha</th>
                  <th>id_coche</th>
                  <th>id_cliente</th>
                  <th>Precio</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sales.map((element, index) => (
                  <tr>
                    <td>{element.id}</td>
                    <td>{element.fecha}</td>
                    <td>{element.id_coche}</td>
                    <td>{element.id_cliente}</td>
                    <td>{element.precio}</td>
                    <td>
                      <Button
                        onClick={() => {
                          clickHandlerDelete(element.id, "/sale");
                        }}
                        variant="primary"
                        type="submit"
                      >
                        Eliminar
                      </Button>
                    </td>
                    <td>
                      {" "}
                      <Link to={"/sale/" + element.id}>
                        <Button variant="primary" type="submit">
                          Modificar
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Form>
            <Stack direction="horizontal" gap={2}>
              <Form.Select
                aria-label="Default select example"
                value={atributeSale}
                onChange={(event) => setAtributeSale(event.target.value)}
              >
                <option value="id">ID</option>
                <option value="fecha">Fecha</option>
                <option value="id_coche">ID Coche</option>
                <option value="id_cliente">ID Cliente</option>
                <option value="precio">Precio</option>
              </Form.Select>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  onChange={(event) => setValueSale(event.target.value)}
                />
              </Form.Group>
              <Button
                onClick={() => {
                  clickHandlerSearchForSale(
                    atributeSale,
                    states.sales,
                    valueSale
                  );
                }}
                variant="primary"
                type="button"
              >
                Buscar
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Stack>
      <Stack gap={1}>
        <h2 className="mx-auto">Buscar alquileres</h2>
        <Stack direction="horizontal" gap={2}>
          <div className="col-9">
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>fecha entrega</th>
                  <th>fecha devolución</th>
                  <th>id_coche</th>
                  <th>id_cliente</th>
                  <th>Precio</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rents.map((element, index) => (
                  <tr>
                    <td>{element.id}</td>
                    <td>{element.fecha_entrega}</td>
                    <td>{element.fecha_devolucion}</td>
                    <td>{element.id_coche}</td>
                    <td>{element.id_cliente}</td>
                    <td>{element.precio}</td>
                    <td>
                      <Button
                        onClick={() => {
                          clickHandlerDelete(element.id, "/rent");
                        }}
                        variant="primary"
                        type="submit"
                      >
                        Eliminar
                      </Button>
                    </td>
                    <td>
                      {" "}
                      <Link to={"/rent/" + element.id}>
                        <Button variant="primary" type="submit">
                          Modificar
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Form>
            <Stack direction="horizontal" gap={2}>
              <Form.Select
                aria-label="Default select example"
                value={atributeRent}
                onChange={(event) => setAtributeRent(event.target.value)}
              >
                <option value="id">ID</option>
                <option value="fecha_entrega">Fecha Entrega</option>
                <option value="fecha_devolucion">Fecha Devolución</option>
                <option value="id_coche">ID Coche</option>
                <option value="id_cliente">ID Cliente</option>
                <option value="precio">Precio</option>
              </Form.Select>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  onChange={(event) => setValueRent(event.target.value)}
                />
              </Form.Group>
              <Button
                onClick={() => {
                  clickHandlerSearchForRent(
                    atributeRent,
                    states.rents,
                    valueRent
                  );
                }}
                variant="primary"
                type="button"
              >
                Buscar
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Stack>
    </>
  );
}

export default SearchFor;
