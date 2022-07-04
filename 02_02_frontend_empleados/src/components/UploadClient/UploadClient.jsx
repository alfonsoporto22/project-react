import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../../SharedState";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { post } from "../../aux_api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { host, api } from "../../defines";

function UploadClient() {
  const { states, actions } = useContext(Context);

  const [id_cliente, setId_cliente] = useState("");
  const [DNI, setDNI] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cpostal, setCpostal] = useState("");
  const [ciudad, setCiudad] = useState("");

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
    const data = JSON.stringify({
      DNI,
      nombre,
      apellidos,
      telefono,
      cpostal,
      ciudad,
    });
    await post(host + api + "/client", data);
    actions.getAllClients();
  }

  return (
    <>
      <h2 className="mx-auto">Cliente</h2>
      <Container>
        <Form className="col-5 mx-auto">
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Stack direction="horizontal" gap={2}>
                  <Form.Label>DNI</Form.Label>
                  <Form.Control type="text" onChange={DNIInputChangeHandler} />
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
                  />
                </Stack>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Stack direction="horizontal" gap={2}>
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={telefonoInputChangeHandler}
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
                  />
                </Stack>
              </Form.Group>
            </Col>
          </Row>
          <Stack>
            <div className="ms-auto">
              <Link to="/clientTable">
                <Button onClick={clickHandler} variant="primary" type="submit">
                  Registrar
                </Button>
              </Link>
            </div>
          </Stack>
        </Form>
      </Container>
    </>
  );
}

export default UploadClient;
