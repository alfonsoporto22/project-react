import { useEffect, useState, useRef, useContext } from 'react';
import './NavBar.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBBtn
} from 'mdb-react-ui-kit';
import { Context } from "../../SharedState"

function NavBar() {

    const { states, actions } = useContext(Context);

    //Segrego los coches que están disponibles
    let vehiculosDisponibles = states.cars.filter(coche => coche.disponible === 1);

    //Mediante el método filter, segrego los coches que son de alquiler o venta
    let vehiculosArrayAlquiler = vehiculosDisponibles.filter(coche => coche.alquiler === 1);
    let vehiculosArrayVenta = vehiculosDisponibles.filter(coche => coche.alquiler === 0);

    /**
 * Función flecha que permite agrupar un array por el atributo que queramos
 * devolviendonos un Map-Diccionario, donde el elemento por el que se agrupa 
 * es el index
 * @param {Parámetro por el que queremos agrupar} key 
 * @param {Array que queremos agrupar} arr 
 * @returns Map
 */
    let groupBy = (key, arr) =>
        arr.reduce((cache, product) => {
            const property = product[key];
            if (property in cache) {
                return { ...cache, [property]: cache[property].concat(product) };
            }
            return { ...cache, [property]: [product] };
        }, {});


    let mapaAgrupadoMarcasAlquiler = groupBy("marca", vehiculosArrayAlquiler);
    let mapaAgrupadoMarcasVenta = groupBy("marca", vehiculosArrayVenta);


    //Alquiler
    let arrayMarcasAlquiler = []
    let arrayMarcasIndividualesAlquiler = [];
    let arrayMarcasMultiplesAlquiler = [];

    //Bucle que segrega el Map en 2 nuevos, según haya varios elementos o no
    for (const property in mapaAgrupadoMarcasAlquiler) {
        arrayMarcasAlquiler = property;
        for (let i = 0; i < mapaAgrupadoMarcasAlquiler[property].length; i++) {
            if (mapaAgrupadoMarcasAlquiler[property].length == 1) {
                arrayMarcasIndividualesAlquiler.push(mapaAgrupadoMarcasAlquiler[property][i].marca);
            } else {
                arrayMarcasMultiplesAlquiler.push(mapaAgrupadoMarcasAlquiler[property][i].marca);
            }
        }
    }
    //Venta
    let arrayMarcasVenta = []
    let arrayMarcasIndividualesVenta = [];
    let arrayMarcasMultiplesVenta = [];

    //Bucle que segrega el Map en 2 nuevos, según haya varios elementos o no
    for (const property in mapaAgrupadoMarcasVenta) {
        arrayMarcasVenta = property;
        for (let i = 0; i < mapaAgrupadoMarcasVenta[property].length; i++) {
            if (mapaAgrupadoMarcasVenta[property].length == 1) {
                arrayMarcasIndividualesVenta.push(mapaAgrupadoMarcasVenta[property][i].marca);
            } else {
                arrayMarcasMultiplesVenta.push(mapaAgrupadoMarcasVenta[property][i].marca);
            }
        }
    }

    //Alquiler
    let arrayMarcasMultiplesSinDuplicadosAlquiler = [];
    //Bucle que genera un nuevo array con las marcas (sin duplicar) que tienen más de un modelo
    for (let i = 0; i < arrayMarcasMultiplesAlquiler.length; i++) {
        const elemento = arrayMarcasMultiplesAlquiler[i];
        if (!arrayMarcasMultiplesSinDuplicadosAlquiler.includes(arrayMarcasMultiplesAlquiler[i])) {
            arrayMarcasMultiplesSinDuplicadosAlquiler.push(elemento);
        }
    }

    //Venta
    let arrayMarcasMultiplesSinDuplicadosVenta = [];
    //Bucle que genera un nuevo array con las marcas (sin duplicar) que tienen más de un modelo
    for (let i = 0; i < arrayMarcasMultiplesVenta.length; i++) {
        const elemento = arrayMarcasMultiplesVenta[i];
        if (!arrayMarcasMultiplesSinDuplicadosVenta.includes(arrayMarcasMultiplesVenta[i])) {
            arrayMarcasMultiplesSinDuplicadosVenta.push(elemento);
        }
    }

    //Alquiler
    let arrayMarcasIndividualesCompletoAlquiler = [];
    /*Blucle que genera un nuevo array con los coches de las marcas que solo tienen un modelo
    con todos sus datos*/
    for (let i = 0; i < arrayMarcasIndividualesAlquiler.length; i++) {
        for (let j = 0; j < vehiculosDisponibles.length; j++) {
            if (arrayMarcasIndividualesAlquiler[i] == vehiculosDisponibles[j].marca && vehiculosDisponibles[j].alquiler == 1) {
                arrayMarcasIndividualesCompletoAlquiler.push(vehiculosDisponibles[j])
            }
        }
    }

    //Venta
    let arrayMarcasIndividualesCompletoVenta = [];
    /*Blucle que genera un nuevo array con los coches de las marcas que solo tienen un modelo
    con todos sus datos*/
    for (let i = 0; i < arrayMarcasIndividualesVenta.length; i++) {
        for (let j = 0; j < vehiculosDisponibles.length; j++) {
            if (arrayMarcasIndividualesVenta[i] == vehiculosDisponibles[j].marca && vehiculosDisponibles[j].alquiler == 0) {
                arrayMarcasIndividualesCompletoVenta.push(vehiculosDisponibles[j])
            }
        }
    }


    //Alquiler
    let arrayMarcasMultiplesCompletoAlquiler = [];
    /*Blucle que genera un nuevo array con los coches de las marcas que tienen más de un modelo
    con todos sus datos*/
    for (let i = 0; i < arrayMarcasMultiplesSinDuplicadosAlquiler.length; i++) {
        for (let j = 0; j < vehiculosDisponibles.length; j++) {
            //En el array se mete los coches que coincidan con la marca y que sean de alquiler
            if (arrayMarcasMultiplesSinDuplicadosAlquiler[i] == vehiculosDisponibles[j].marca && vehiculosDisponibles[j].alquiler == 1) {
                arrayMarcasMultiplesCompletoAlquiler.push(vehiculosDisponibles[j])
            }
        }
    }

    //Venta
    let arrayMarcasMultiplesCompletoVenta = [];
    /*Blucle que genera un nuevo array con los coches de las marcas que tienen más de un modelo
    con todos sus datos*/
    for (let i = 0; i < arrayMarcasMultiplesSinDuplicadosVenta.length; i++) {
        for (let j = 0; j < vehiculosDisponibles.length; j++) {
            if (arrayMarcasMultiplesSinDuplicadosVenta[i] == vehiculosDisponibles[j].marca && vehiculosDisponibles[j].alquiler == 0) {
                arrayMarcasMultiplesCompletoVenta.push(vehiculosDisponibles[j])
            }
        }
    }
    //Alquiler
    //Constante que genera los menús para las marcas que tienen solo un modelo
    const vehiculosMarcasIndividualesAlquiler = arrayMarcasIndividualesCompletoAlquiler.map(
        (element, index) =>
            <Nav className="me-auto" key={index}>
                <NavDropdown title={element.marca} id="basic-nav-dropdown" key={index}>
                    <Link to={"/vehiculo/" + element.id_coche}><NavDropdown.Item className="submenu" href="#action/3.1" key={index}>{element.modelo} - PVP: {element.precio}</NavDropdown.Item></Link>
                </NavDropdown>
            </Nav>
    );
    //Venta
    //Constante que genera los menús para las marcas que tienen solo un modelo
    const vehiculosMarcasIndividualesVenta = arrayMarcasIndividualesCompletoVenta.map(
        (element, index) =>
            <Nav className="me-auto" key={index}>
                <NavDropdown title={element.marca} id="basic-nav-dropdown" key={index}>
                    <Link to={"/vehiculo/" + element.id_coche} > <NavDropdown.Item className="submenu" href="#action/3.1" key={index}>{element.modelo} - PVP: {element.precio}</NavDropdown.Item></Link>
                </NavDropdown>
            </Nav>
    );


    //Alquiler
    /**
     * Función que devuelve un submenu con los modelos correspondientes con la marca 
     * introducida
     * @param {Marca de coche que nos interesa} elemento 
     * @returns Submenú con todos los modelos dependiendo de la marca introducida
     */
    function segregarAlquiler(elemento) {
        const arrayModelosSeleccionadosAlquiler = []
        for (let i = 0; i < arrayMarcasMultiplesCompletoAlquiler.length; i++) {
            if (arrayMarcasMultiplesCompletoAlquiler[i].marca === elemento) {
                arrayModelosSeleccionadosAlquiler.push(arrayMarcasMultiplesCompletoAlquiler[i])
            }
        }
        const devolucion = arrayModelosSeleccionadosAlquiler.map(
            (element, index) =>
                <Link to={"/vehiculo/" + element.id_coche}> <NavDropdown.Item href="#action/3.1" className="submenu" key={index}>{element.modelo} - PVP: {element.precio}</NavDropdown.Item></Link>
        )
        return devolucion

    }

    //Constante que genera los menús para las marcas que tienen múltiples modelos
    const vehiculosMarcasMultiplesAlquiler = arrayMarcasMultiplesSinDuplicadosAlquiler.map(
        (element, index) =>
            <Nav className="me-auto" key={index}>
                <NavDropdown title={element} id="basic-nav-dropdown" key={index}>
                    {segregarAlquiler(element)}
                </NavDropdown>
            </Nav>
    );


    //Venta
    /**
     * Función que devuelve un submenu con los modelos correspondientes con la marca 
     * introducida
     * @param {Marca de coche que nos interesa} elemento 
     * @returns Submenú con todos los modelos dependiendo de la marca introducida
     */
    function segregarVenta(elemento) {
        const arrayModelosSeleccionadosVenta = []
        for (let i = 0; i < arrayMarcasMultiplesCompletoVenta.length; i++) {
            if (arrayMarcasMultiplesCompletoVenta[i].marca === elemento) {
                arrayModelosSeleccionadosVenta.push(arrayMarcasMultiplesCompletoVenta[i])
            }
        }
        const devolucion = arrayModelosSeleccionadosVenta.map(
            (element, index) =>
                <Link to={"/vehiculo/" + element.id_coche}><NavDropdown.Item key={index} href="#action/3.1" className="submenu">{element.modelo} - PVP: {element.precio}</NavDropdown.Item></Link>
        )
        return devolucion
    }

    //Constante que genera los menús para las marcas que tienen múltiples modelos
    const vehiculosMarcasMultiplesVenta = arrayMarcasMultiplesSinDuplicadosVenta.map(
        (element, index) =>
            <Nav className="me-auto" key={index}>
                <NavDropdown title={element} id="basic-nav-dropdown" key={index}>
                    {segregarVenta(element)}
                </NavDropdown>
            </Nav>
    );


    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Alquiler" id="basic-nav-dropdown">
                                {vehiculosMarcasIndividualesAlquiler}
                                {vehiculosMarcasMultiplesAlquiler}
                            </NavDropdown>
                        </Nav>
                        <Nav className="me-auto">
                            <NavDropdown title="Venta" id="basic-nav-dropdown">
                                {vehiculosMarcasIndividualesVenta}
                                {vehiculosMarcasMultiplesVenta}
                            </NavDropdown>
                        </Nav>
                        <Nav className="me-auto">
                            <Link to={"/mainform"}>Formulario</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </>

    );
}

export default NavBar;