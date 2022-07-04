import { useContext } from "react";
import Table from "react-bootstrap/Table";
import { Context } from "../../SharedState";
import Button from "react-bootstrap/Button";
import { apiDelete } from "../../aux_api";
import { Link } from "react-router-dom";
import { host,api } from "../../defines";

function ClientTable() {
  const { states, actions } = useContext(Context);

  async function clickHandlerDelete(id_cliente) {
    let data = JSON.stringify({ id_cliente });
    await apiDelete(host+api + "/client", data);
    actions.getAllClients();
  }

  return (
    <>
      <div>
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
              <th>Eliminar</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {states.clients.map((element, index) => (
              <tr key={index}>
                <td>{element.id_cliente}</td>
                <td>{element.dni}</td>
                <td>{element.nombre}</td>
                <td>{element.apellidos}</td>
                <td>{element.telefono}</td>
                <td>{element.cpostal}</td>
                <td>{element.ciudad}</td>
                <td>
                  <Button
                    onClick={() => {
                      clickHandlerDelete(element.id_cliente);
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
    </>
  );
}

export default ClientTable;
