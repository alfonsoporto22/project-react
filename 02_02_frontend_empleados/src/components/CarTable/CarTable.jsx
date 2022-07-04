import { useContext } from "react";
import Table from "react-bootstrap/Table";
import { Context } from "../../SharedState";
import Button from "react-bootstrap/Button";
import { apiDelete } from "../../aux_api";
import { Link } from "react-router-dom";
import { host, api } from "../../defines";
import { unoSiCeroNo, alquilerVenta } from "../../local/functions";

function CarTable() {
  const { states, actions } = useContext(Context);

  async function clickHandlerDelete(id_coche) {
    let data = JSON.stringify({ id_coche });
    await apiDelete(host + api + "/car", data);
    actions.getAllCars();
  }

  return (
    <>
      <div>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Matrícula</th>
              <th>Modelo</th>
              <th>Marca</th>
              <th>Km</th>
              <th>Precio</th>
              <th>Cilindrada</th>
              <th>Disponible</th>
              <th>Alquiler</th>
              <th>Oferta</th>
              <th>Eliminar</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {states.cars.map((element, index) => (
              <tr key={index}>
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
                      clickHandlerDelete(element.id_coche);
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
    </>
  );
}

export default CarTable;
