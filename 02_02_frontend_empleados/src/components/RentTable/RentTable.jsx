import { useContext } from "react";
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
} from "../../local/functions";
import { URL } from "../../defines";

function RentTable() {
  const { states, actions } = useContext(Context);

  async function clickHandlerDelete(id) {
    let data = JSON.stringify({ id });
    await apiDelete(URL + "/rent", data);
    actions.getAllClients();
    actions.getAllRents();
    actions.getAllCars();
  }

  return (
    <>
      <div>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>id</th>
              <th>fecha entrega</th>
              <th>fecha devolucion</th>
              <th>id_coche</th>
              <th>Matricula</th>
              <th>Modelo</th>
              <th>Marca</th>
              <th>id_cliente</th>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Precio</th>
              <th>Eliminar</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {states.rents.map((element, index) => (
              <tr key={index}>
                <td>{element.id}</td>
                <td>{element.fecha_entrega}</td>
                <td>{element.fecha_devolucion}</td>
                <td>{element.id_coche}</td>
                <td>{takeMatricula(element.id_coche, states.cars)}</td>
                <td>{takeModelo(element.id_coche, states.cars)}</td>
                <td>{takeMarca(element.id_coche, states.cars)}</td>
                <td>{element.id_cliente}</td>
                <td>{takeDNI(element.id_cliente, states.clients)}</td>
                <td>{takeNombre(element.id_cliente, states.clients)}</td>
                <td>{takeApellidos(element.id_cliente, states.clients)}</td>
                <td>{element.precio}</td>
                <td>
                  <Button
                    onClick={() => {
                      clickHandlerDelete(element.id);
                    }}
                    variant="primary"
                    type="submit"
                  >
                    Eliminar
                  </Button>
                </td>
                <td>
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
    </>
  );
}

export default RentTable;
