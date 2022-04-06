import { useEffect, useState, useRef } from 'react';

import './CarCarrousel.css';
import Carousel from 'react-bootstrap/Carousel';
import '../../bootstrap-5.1.3-dist/css/bootstrap.min.css';
import IndividualPage from '../IndividualPage/IndividualPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function CarCarrousel({ vehiculos }) {

    /*
    Constante que almacena un nuevo array con la lista de vehiculos a partir de un map
    */
    let contador = 0;
    const listCar = vehiculos.map(
        (element, index) =>

            <Carousel.Item key={contador++}>
                <BrowserRouter>
                    <Routes>
                            <Route path="../IndividualPage" element={<IndividualPage vehiculo={element} />} />
                    </Routes>
                </BrowserRouter>
                <img
                    className="d-block w-100"
                    src={element.img}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>{element.marca}</h3>
                    <p>{element.precio}</p>
                </Carousel.Caption>
            </Carousel.Item>
    );


    return (
        <>
            <Carousel className="carusel">
                {listCar}
            </Carousel>

        </>

    );
}

export default CarCarrousel;