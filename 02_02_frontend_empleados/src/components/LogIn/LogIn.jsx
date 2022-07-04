import { useState, useContext } from "react";
import { Context } from "../../SharedState";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

function Login() {
  const { actions } = useContext(Context);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function usernameInputChangeHandler(event) {
    setUsername(event.target.value);
  }
  function passwordInputChangeHandler(event) {
    setPassword(event.target.value);
  }

  function loginHandler(event) {
    event.preventDefault();
    actions.getAPIToken(username, password);
  }

  return (
    <>
      <Form className="col-3 mx-auto">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Stack direction="horizontal" gap={2}>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" onChange={usernameInputChangeHandler} />
          </Stack>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Stack direction="horizontal" gap={2}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={passwordInputChangeHandler}
            />
          </Stack>
        </Form.Group>

        <Stack>
        <div className="ms-auto">
            <Button onClick={loginHandler} variant="primary" type="submit">
              Menu inicial
            </Button>
          </div>
          <div className="ms-auto">
            <Button onClick={loginHandler} variant="primary" type="submit">
              Registrar
            </Button>
          </div>
        </Stack>
      </Form>
    </>
  );
}

export default Login;
