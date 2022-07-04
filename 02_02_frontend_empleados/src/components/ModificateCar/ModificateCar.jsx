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
import { host,api } from "../../defines";

function ModificateCar() {
  const { states, actions } = useContext(Context);

  //Variable para coger datos de la URL
  const parms = useParams();
  let id_coche = parseInt(parms.id);

  //Buscamos el coche en el state que coincida con el parametro de la url, para poder mostrarlo
  const coche = states.cars.find((element) => element.id_coche === id_coche);

  const [matricula, setMatricula] = useState(coche.matricula);
  const [modelo, setModelo] = useState(coche.modelo);
  const [marca, setMarca] = useState(coche.marca);
  const [km, setKm] = useState(coche.km);
  const [precio, setPrecio] = useState(coche.precio);
  const [foto, setFoto] = useState(coche.foto);
  const [cilindrada, setCilindrada] = useState(coche.cilindrada);
  const [combustible, setCombustible] = useState(coche.combustible);
  const [id_cliente, setId_cliente] = useState("");
  const [disponible, setDisponible] = useState(coche.disponible);
  const [alquiler, setAlquiler] = useState(coche.alquiler);
  const [oferta, setOferta] = useState(coche.oferta);

  function matriculaInputChangeHandler(event) {
    setMatricula(event.target.value);
  }
  function modeloInputChangeHandler(event) {
    setModelo(event.target.value);
  }
  function marcaInputChangeHandler(event) {
    setMarca(event.target.value);
  }
  function kmInputChangeHandler(event) {
    setKm(event.target.value);
  }
  function precioInputChangeHandler(event) {
    setPrecio(event.target.value);
  }
  function cilindradaInputChangeHandler(event) {
    setCilindrada(event.target.value);
  }
  function disponibleInputChangeHandler(event) {
    setDisponible(event.target.value);
  }
  function alquilerInputChangeHandler(event) {
    setAlquiler(event.target.value);
  }
  function ofertaInputChangeHandler(event) {
    setOferta(event.target.value);
  }

  async function clickHandler() {
    setFoto(coche.foto);
    setCombustible(coche.combustible);
    setId_cliente(coche.id_cliente);
    const data = JSON.stringify({
      id_coche,
      matricula,
      modelo,
      marca,
      km,
      precio,
      foto,
      cilindrada,
      combustible,
      disponible,
      alquiler,
      oferta,
    });
    await modify(host + api + "/car", data);
    actions.getAllCars();
  }

  function alquilerVenta(numero) {
    let texto = "";
    if (numero === 1) {
      texto = "Alquiler";
    } else {
      texto = "Venta";
    }
    return texto;
  }

  return (
    <>
      <Stack gap={1}>
        <h2 className="mx-auto">Vehiculo id: {id_coche} </h2>
        <Container>
          <Form className="col-5 mx-auto">
            <Row>
              <Col>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Stack direction="horizontal" gap={2}>
                    <Form.Label>Matricula</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={matriculaInputChangeHandler}
                      defaultValue={coche.matricula}
                    />
                  </Stack>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Stack direction="horizontal" gap={2}>
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={modeloInputChangeHandler}
                      defaultValue={coche.modelo}
                    />
                  </Stack>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Stack direction="horizontal" gap={2}>
                    <Form.Label>Marca</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={marcaInputChangeHandler}
                      defaultValue={coche.marca}
                    />
                  </Stack>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Stack direction="horizontal" gap={2}>
                    <Form.Label>Km</Form.Label>
                    <Form.Control
                      type="number"
                      onChange={kmInputChangeHandler}
                      defaultValue={coche.km}
                    />
                  </Stack>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Stack direction="horizontal" gap={2}>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                      type="number"
                      onChange={precioInputChangeHandler}
                      defaultValue={coche.precio}
                    />
                  </Stack>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Stack direction="horizontal" gap={2}>
                    <Form.Label>Cilindrada</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={cilindradaInputChangeHandler}
                      defaultValue={coche.cilindrada}
                    />
                  </Stack>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Stack direction="horizontal" gap={2}>
                    <Form.Label>Disponible</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={disponibleInputChangeHandler}
                      defaultValue={coche.disponible}
                    >
                      <option value="0">No</option>
                      <option value="1">Sí</option>
                    </Form.Select>
                  </Stack>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Stack direction="horizontal" gap={2}>
                    <Form.Label>Alquiler</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={alquilerInputChangeHandler}
                      defaultValue={alquilerVenta(coche.alquiler)}
                    >
                      <option value="0">Venta</option>
                      <option value="1">Alquiler</option>
                    </Form.Select>
                  </Stack>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Stack direction="horizontal" gap={2}>
                    <Form.Label>Oferta</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={ofertaInputChangeHandler}
                      defaultValue={coche.oferta}
                    >
                      <option value="0">No</option>
                      <option value="1">Si</option>
                    </Form.Select>
                  </Stack>
                </Form.Group>
              </Col>
              <Col>
                <Stack>
                  <div className="mx-auto">
                    <Link to="/carTable">
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
              </Col>
            </Row>
          </Form>
        </Container>
      </Stack>
    </>
  );
}

export default ModificateCar;
