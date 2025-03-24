/* eslint-disable prettier/prettier */
const API_KEY = "181082e8d55056fe86e7854015ee14bf";
const API_URL = `http://api.aviationstack.com/v1/airports?access_key=${API_KEY}`;

export const fetchFlights = async () => {
    try {
        console.log("Comenzo la promesa")

        // await new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve("Tiempo completado: 3 segundos");
        //     }, 3000);
        // });
        // throw new Error("Error en la llamada")
        const response = await fetch("/data.json");
        const data = await response.json();
        console.log("Respuesta: ", data)

        return data;
    } catch (error) {
        console.error("Error al obtener los vuelos:", error);

        return [];
    }
};
