import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";

function NavBar() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to={"/rent"}>Alquilar</Link>
            </Nav>
            <Nav className="me-auto">
              <Link to={"/sale"}> Vender</Link>
            </Nav>
            <Nav className="me-auto">
              <Link to={"/uploads"}>Altas</Link>
            </Nav>
            <Nav className="me-auto">
              <Link to={"/carTable"}>Listar vehiculos</Link>
            </Nav>
            <Nav className="me-auto">
              <Link to={"/clientTable"}>Listar personas</Link>
            </Nav>
            <Nav className="me-auto">
              <Link to={"/formTable"}>Listar formularios</Link>
            </Nav>
            <Nav className="me-auto">
              <Link to={"/saleTable"}>Listar ventas</Link>
            </Nav>
            <Nav className="me-auto">
              <Link to={"/rentTable"}>Listar alquileres</Link>
            </Nav>
            <Nav className="me-auto">
              <Link to={"/searchFor"}>Buscar</Link>
            </Nav>
            <Nav className="me-auto">
              <Logout />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
