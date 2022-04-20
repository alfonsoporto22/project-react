import { useEffect, useState, useRef } from 'react';

import './CarCarrousel.css';
import Carousel from 'react-bootstrap/Carousel';
import '../../bootstrap-5.1.3-dist/css/bootstrap.min.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function CarCarrousel({ vehiculos }) {

    /*
    Constante que almacena un nuevo array con la lista de vehiculos a partir de un map
    */
    let contador = 0;
    const listCar = vehiculos.map(
        (element, index) =>
            <Carousel.Item key={contador++}>
                <Link to="IndividualPage">
                    <img
                        className="d-block w-100"
                        src={element.img}
                        alt="First slide"
                    />
                </Link>
                <Carousel.Caption>
                    <h3>{element.marca}</h3>
                    <p>{element.precio}</p>
                </Carousel.Caption>
            </Carousel.Item>
    );


    return (
        <>
            <Router>
                <Carousel className="carusel">
                    {listCar}
                </Carousel>
            </Router>
        </>
    );
}


export default CarCarrousel;