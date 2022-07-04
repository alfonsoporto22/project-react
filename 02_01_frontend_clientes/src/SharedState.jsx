import { get } from "./aux_api";
import { useState, createContext, useEffect } from "react";
import { host, loginEndpoint, secretsEndpoint } from "./defines";
export const Context = createContext();

/*Componente que se comparte en toda la aplicación. 
Hacemos un get de todos los coches para compartir en todos los componentes
*/
export function ContextProvider({ children }) {

  const [cars, setCars] = useState([]);


  const context = {
    states: { cars },
    actions: {
      getAllCars: function () {
        get(host + "/api" + "/allCoches/").then((data) => setCars(data));
      },
    },
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  )
}