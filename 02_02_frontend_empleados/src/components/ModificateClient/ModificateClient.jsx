import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../SharedState";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { modify } from "../../aux_api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { host, api } from "../../defines";

function ModificateClient() {
  const { states, actions } = useContext(Context);

  //Variable para coger datos de la URL
  const parms = useParams();
  let id_client = parseInt(parms.id);

  //Buscamos el cliente en el state que coincida con el parametro de la url, para poder mostrarlo
  const client = states.clients.find(
    (element) => element.id_cliente === id_client
  );

  const [id_cliente, setId_cliente] = useState(client.id_cliente);
  const [DNI, setDNI] = useState(client.DNI);
  const [nombre, setNombre] = useState(client.nombre);
  const [apellidos, setApellidos] = useState(client.apellidos);
  const [telefono, setTelefono] = useState(client.telefono);
  const [cpostal, setCpostal] = useState(client.cpostal);
  const [ciudad, setCiudad] = useState(client.ciudad);

  function DNIInputChangeHandler(event) {
    setDNI(event.target.value);
  }
  function nombreInputChangeHandler(event) {
    setNombre(event.target.value);
  }
  function apellidosInputChangeHandler(event) {
    setApellidos(event.target.value);
  }
  function telefonoInputChangeHandler(event) {
    setTelefono(event.target.value);
  }
  function cpostalInputChangeHandler(event) {
    setCpostal(event.target.value);
  }
  function ciudadInputChangeHandler(event) {
    setCiudad(event.target.value);
  }

  async function clickHandler() {
    setId_cliente(client.id_cliente);
    const data = JSON.stringify({
      id_cliente,
      DNI,
      nombre,
      apellidos,
      telefono,
      cpostal,
      ciudad,
    });
    await modify(host + api + "/client", data);
    actions.getAllClients();
  }

  return (
    <>
      <Stack gap={1}>
        <h2 className="mx-auto">Cliente id: {id_cliente} </h2>
        <Container>
          <Form className="col-5 mx-auto">
            <Row>
              <Col>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Stack direction="horizontal" gap={2}>
                    <Form.Label>DNI</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={DNIInputChangeHandler}
                      defaultValue={client.DNI}
                    />
                  </Stack>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Stack direction="horizontal" gap={2}>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={nombreInputChangeHandler}
                      defaultValue={client.nombre}
                    />
                  </Stack>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Stack direction="horizontal" gap={2}>
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={apellidosInputChangeHandler}
                      defaultValue={client.apellidos}
                    />
                  </Stack>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Stack direction="horizontal" gap={2}>
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="number"
                      onChange={telefonoInputChangeHandler}
                      defaultValue={client.telefono}
                    />
                  </Stack>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Stack direction="horizontal" gap={2}>
                    <Form.Label>Código Postal</Form.Label>
                    <Form.Control
                      type="number"
                      onChange={cpostalInputChangeHandler}
                      defaultValue={client.cpostal}
                    />
                  </Stack>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Stack direction="horizontal" gap={2}>
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={ciudadInputChangeHandler}
                      defaultValue={client.ciudad}
                    />
                  </Stack>
                </Form.Group>
              </Col>
            </Row>
            <Stack>
              <div className="ms-auto">
                <Link to="/clientTable">
                  <Button
                    onClick={clickHandler}
                    variant="primary"
                    type="submit"
                  >
                    Modificar
                  </Button>
                </Link>
              </div>
            </Stack>
          </Form>
        </Container>
      </Stack>
    </>
  );
}

export default ModificateClient;
