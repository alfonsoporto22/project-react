import { useEffect, useState, useRef } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import '../../bootstrap-5.1.3-dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar({ vehiculos }) {


    //Mediante el método filter, segrego los coches que son de alquiler o venta
    let vehiculosArrayAlquiler = vehiculos.filter(coche => coche.venta == false);
    let vehiculosArrayVenta = vehiculos.filter(coche => coche.venta == true);


    /**
 * Función que permite agrupar un array por el atributo que queramos
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


    let arrayAgrupadoMarcas = groupBy("marca", vehiculosArrayAlquiler);

    let arrayMarcas = []
    let arrayMarcasIndividuales = [];
    let arrayMarcasMultiples = [];

    //Bucle que segrega el Map en 2 nuevos, según haya varios elementos o no
    for (const property in arrayAgrupadoMarcas) {
        console.log({ property });
        arrayMarcas = property;
        console.log(arrayAgrupadoMarcas[property].length);
        for (let i = 0; i < arrayAgrupadoMarcas[property].length; i++) {
            if (arrayAgrupadoMarcas[property].length == 1) {
                arrayMarcasIndividuales.push(arrayAgrupadoMarcas[property][i].marca);
            } else {
                arrayMarcasMultiples.push(arrayAgrupadoMarcas[property][i].marca);
            }
        }
    }
    let arrayMarcasMultiplesSinDuplicados = [];

    console.log(arrayMarcasMultiples);

    for (let i = 0; i < arrayMarcasMultiples.length; i++) {

        const elemento = arrayMarcasMultiples[i];

        if (!arrayMarcasMultiplesSinDuplicados.includes(arrayMarcasMultiples[i])) {
            arrayMarcasMultiplesSinDuplicados.push(elemento);
        }
    }

    console.log(arrayMarcasMultiplesSinDuplicados);
    console.log(arrayMarcasIndividuales);

    let arrayMarcasIndividualesCompleto = [];

    for (let i = 0; i < arrayMarcasIndividuales.length; i++) {
        for (let j = 0; j < vehiculos.length; j++) {
            if (arrayMarcasIndividuales[i] == vehiculos[j].marca) {
                arrayMarcasIndividualesCompleto.push(vehiculos[j])
            }
        }
    }

    console.log(arrayMarcasIndividualesCompleto);

    let arrayMarcasMultiplesCompleto = [];

    for (let i = 0; i < arrayMarcasMultiplesSinDuplicados.length; i++) {
        for (let j = 0; j < vehiculos.length; j++) {
            if (arrayMarcasMultiplesSinDuplicados[i] == vehiculos[j].marca) {
                arrayMarcasMultiplesCompleto.push(vehiculos[j])
            }
        }
    }

    console.log(arrayMarcasMultiplesCompleto);

    const vehiculosAlquilerMarcasIndividuales = arrayMarcasIndividualesCompleto.map(
        (element, index) =>
            <Nav className="me-auto">
                <NavDropdown title={element.marca} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">{element.modelo}</NavDropdown.Item>
                </NavDropdown>
            </Nav>
    );


    function segregar(elemento) {
        const arrayModelosSeleccionados = []
        for (let i = 0; i < arrayMarcasMultiplesCompleto.length; i++) {
            if (arrayMarcasMultiplesCompleto[i].marca === elemento) {
                arrayModelosSeleccionados.push(arrayMarcasMultiplesCompleto[i].modelo)
            }
        }
        const devolucion = arrayModelosSeleccionados.map(
            (element, index) =>
                <NavDropdown.Item href="#action/3.1">{element}</NavDropdown.Item>
        )
        return devolucion

    }
    const vehiculosAlquilerMarcasMultiples = arrayMarcasMultiplesSinDuplicados.map(
        (element, index) =>
            <Nav className="me-auto">
                <NavDropdown title={element} id="basic-nav-dropdown">
                    {segregar(element)}
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
                                {vehiculosAlquilerMarcasIndividuales}
                                {vehiculosAlquilerMarcasMultiples}
                            </NavDropdown>
                        </Nav>
                        <Nav className="me-auto">
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </>

    );
}

export default NavBar;