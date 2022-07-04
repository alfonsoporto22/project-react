import CarCarrousel from "../CarCarrousel/CarCarrousel";
import { useState, createContext, useEffect, useContext } from "react";
import { Context } from "../../SharedState"

function CarCarrousels({ vehiculos }) {

    const { states, actions } = useContext(Context);

    //Mediante el método filter, segrego los coches que están disponibles para mostrar en el carrusel
    const cochesDisponibles = states.cars.filter(element => element.disponible === 1);

    //Segrego solo los coches que estén de OFERTA
    const cochesOfertas = cochesDisponibles.filter(element => element.oferta === 1);

    //Mediante el método filter, segrego los coches que son de alquiler o venta
    let vehiculosArrayAlquiler = cochesOfertas.filter(coche => coche.alquiler === 1);
    let vehiculosArrayVenta = cochesOfertas.filter(coche => coche.alquiler === 0);

    return (
        <>
            <h3>Ofertas alquiler</h3>
            <CarCarrousel vehiculos={vehiculosArrayAlquiler} />
            <h3>Ofertas venta</h3>
            <CarCarrousel vehiculos={vehiculosArrayVenta} />
        </>
    )
}

export default CarCarrousels