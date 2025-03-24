/* eslint-disable prettier/prettier */
export interface Airport {
    id: string;
    gmt: string;
    airport_id: string;
    iata_code: string;
    city_iata_code: string;
    icao_code: string;
    country_iso2: string;
    geoname_id: string;
    latitude: number;
    longitude: number;
    airport_name: string;
    country_name: string | null;
    phone_number: string | null;
    timezone: string;
}

export interface FlightStore {
    flights: Airport[]; // flights es un array de objetos tipo Airport
    setFlights: (newFlights: Airport[]) => void; // Recibe un array de Airport

    searchedFlights: Airport[];
    setSearchedFlights: (searchedFlights: Airport[]) => void; // También es un array

    isLoading: boolean;
    setIsLoading: () => void;
    setIsLoadingFalse: () => void;

    currentPage: number;
    setCurrentPage: (newPage: number) => void;
    nextPage: () => void;
    prevPage: () => void;

    refreshKey: number;
    setRefreshKey: () => void;
}

export interface HistorialFlightStore {
    historialFlight: string[];
    setHistorialFlights: (newData: string) => void;
    updateNewHistorialFlight: (newData: string[]) => void;

    apiLocal: boolean;
    setApiLocal: () => void;

    timeApiLocal: number;
    setTimeApiLocal: (newTime: number) => void;
}