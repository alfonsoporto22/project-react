
/**
    * Función para obtener la matrícula a partir del id del coche
    * @param {*} id 
    * @returns matricula
    */
export function takeMatricula(id, coches) {
    let coche = coches.filter(element => element.id_coche == id);
    return coche[0].matricula;
}

/**
     * Función para obtener el modelo a partir del id del coche
     * @param {*} id id del coche
     * @returns modelo
     */
export function takeModelo(id, coches) {
    let coche = coches.filter(element => element.id_coche == id);
    return coche[0].modelo;
}

/**
 * Función para obtener la marca a partir del id del coche
 * @param {*} id id del coche
 * @returns marca
 */
export function takeMarca(id, coches) {
    let coche = coches.filter(element => element.id_coche == id);
    return coche[0].marca;
}



/**
 * Función para obtener el DNI a partir del id del cliente
 * @param {*} id id del cliente
 * @returns DNI
 */
export function takeDNI(id, clientes) {
    let cliente = clientes.filter(element => element.id_cliente == id);
    return cliente[0].dni;
}

/**
 * Función para obtener el nombre a partir del id del cliente
 * @param {*} id id del cliente
 * @returns nombre
 */
export function takeNombre(id, clientes) {
    let cliente = clientes.filter(element => element.id_cliente == id);
    return cliente[0].nombre;
}

/**
* Función para obtener los Apellidos a partir del id del cliente
* @param {*} id id del cliente
* @returns apellidos
*/
export function takeApellidos(id, clientes) {
    let cliente = clientes.filter(element => element.id_cliente == id);
    return cliente[0].apellidos;
}
/**
 * Función que devuelve "Sí" si recibe un 1 y "No" si recibe 0
 * @param {*} numero 
 * @returns Sí o No
 */
export function unoSiCeroNo(numero) {
    let texto = "";
    if (numero == 1) {
        texto = "Sí";
    } else {
        texto = "No";
    }
    return texto;
}
/**
 * Función que devuelve "Alquiler" si recibe un 1 y "Venta" si recibe 0
 * @param {*} numero 
 * @returns Alquiler o Venta
 */
 export function alquilerVenta(numero) {
    let texto = "";
    if (numero == 1) {
        texto = "Alquiler";
    } else {
        texto = "Venta";
    }
    return texto;
}
