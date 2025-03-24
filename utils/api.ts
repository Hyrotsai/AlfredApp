/* eslint-disable prettier/prettier */
const API_KEY = "181082e8d55056fe86e7854015ee14bf";
const API_URL = `http://api.aviationstack.com/v1/airports?access_key=${API_KEY}`;

export const fetchFlights = async (apiLocal: boolean, timeApiLocal: number) => {
    try {

        if (apiLocal) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve('');
                }, timeApiLocal * 1000);
            });
            const response = await fetch("/data.json");
            const data = await response.json();

            return data
        }

        const response = await fetch(API_URL);
        // const response = await fetch("/data.json");
        const { data } = await response.json();

        return data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {

        return [];
    }
};
