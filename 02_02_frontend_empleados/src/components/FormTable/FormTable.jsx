import { useContext } from "react";
import Table from "react-bootstrap/Table";
import { Context } from "../../SharedState";
import Button from "react-bootstrap/Button";
import { apiDelete } from "../../aux_api";
import { host, api } from "../../defines";

function FormTable() {
  const { states, actions } = useContext(Context);

  async function clickHandlerDelete(id) {
    let data = JSON.stringify({ id });
    await apiDelete(host + api + "/form", data);
    actions.getAllForms();
  }

  return (
    <>
      <div>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>id</th>
              <th>nombre</th>
              <th>apellidos</th>
              <th>telefono</th>
              <th>consulta</th>
            </tr>
          </thead>
          <tbody>
            {states.forms.map((element, index) => (
              <tr key={index}>
                <td>{element.id}</td>
                <td>{element.nombre}</td>
                <td>{element.apellidos}</td>
                <td>{element.telefono}</td>
                <td>{element.consulta}</td>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default FormTable;
