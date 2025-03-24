import { Tab, Tabs } from "@heroui/tabs";
import { useSearchParams } from "next/navigation";

import CardDescription from "@/components/CardDescription";
import Map from "@/components/Map";
import { useTabSize } from "@/hooks/useTabSize";
import useFlightStore from "@/store/zustandStore";

export default function FlightTabs() {
  const { flights } = useFlightStore();
  const searchParams = useSearchParams();
  const tabSize = useTabSize();

  const id = searchParams.get("id");

  if (!id) return <p>Cargando...</p>;

  const airport = flights.find((flight: any) => flight.iata_code === id);

  const datosGeneral = {
    "Código IATA": airport.iata_code,
    "Código ICAO": airport.icao_code,
    Pais: airport.country_iso2,
    "Ciudad IATA": airport.city_iata_code,
    Telefono: airport.phone_number ? airport.phone_number : "No disponible",
  };

  const datosUbicacion = {
    Latitud: airport.latitude,
    Longitud: airport.longitude,
    "ID Geoname": airport.id,
  };

  const datosZona = {
    "Zona horaria:": airport.timezone,
    GMT: airport.gmt,
  };

  const fecha = new Date().toLocaleDateString();
  const hora = new Date().toLocaleTimeString();
  const datosHora = {
    [fecha]: hora,
  };

  const datosEstadistica = {
    "ID del aeropuerto": airport.id,
  };

  return (
    <Tabs
      aria-label="Options"
      className="md:h-16"
      color="primary"
      fullWidth={true}
      size={tabSize}
    >
      <Tab key="general" className="md:h-16" title="General">
        <CardDescription
          datos={datosGeneral}
          icon="Info.svg"
          titulo="Información General"
        />
      </Tab>
      <Tab key="ubicacion" className="md:h-16" title="Ubicación">
        <CardDescription
          datos={datosUbicacion}
          icon="MapPoint.svg"
          titulo="Ubicación"
        />
        <Map />
      </Tab>
      <Tab key="zone" className="md:h-16" title="Zona horaria">
        <CardDescription
          datos={datosZona}
          icon="Global.svg"
          titulo="Zona horaria"
        />
        <CardDescription
          datos={datosHora}
          icon="ClockCircle.svg"
          titulo="Hora Local"
        />
      </Tab>
      <Tab key="estadisticas" className="md:h-16" title="Estadísticas">
        <CardDescription
          datos={datosEstadistica}
          icon="ClockCircle.svg"
          titulo="Estadísticas"
        />
      </Tab>
    </Tabs>
  );
}
