import { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from "../../SharedState"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { post } from "../../aux_api";

function MainForm() {

  const { state } = useContext(Context);

  const [nombre, setName] = useState("");
  const [apellidos, setSurname] = useState("");
  const [telefono, setPhone] = useState("");
  const [consulta, setQuery] = useState("");

  function nameInputChangeHandler(event) {
    setName(event.target.value)
  }
  function surnameInputChangeHandler(event) {
    setSurname(event.target.value)
  }
  function phoneInputChangeHandler(event) {
    setPhone(event.target.value)
  }
  function queryInputChangeHandler(event) {
    setQuery(event.target.value)
  }

  async function clickHandler() {
    const data = JSON.stringify({ nombre, apellidos , telefono, consulta});
    await post("http://localhost:3000/api" + "/form", data);
  }

  return (
    <><Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control onChange={nameInputChangeHandler} type="text" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>Apellidos</Form.Label>
        <Form.Control onChange={surnameInputChangeHandler} type="text" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>Telefono</Form.Label>
        <Form.Control onChange={phoneInputChangeHandler} type="number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>Consulta</Form.Label>
        <Form.Control onChange={queryInputChangeHandler} type="text" />
      </Form.Group>
      <Button onClick={clickHandler} variant="primary" type="submit">
        Enviar
      </Button>
    </Form>

    </>

  );
}

export default MainForm;