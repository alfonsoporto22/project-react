//Ruta de las fotos
export const PATH = "/public/";
//Ruta de la API
export const loginEndpoint = '/login/'
export const secretsEndpoint = '/secretos/'

export let host;

switch (window.location.hostname) {
    case "localhost":
        host = "http://localhost:3000"
        break;

    case "127.0.0.1":
        host = "http://127.0.0.1:3000"
        break;

    default:
        host = ""
        break;
}