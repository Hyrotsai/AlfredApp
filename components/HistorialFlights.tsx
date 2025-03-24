import { useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";

import useFlightStore, { useHistorialFlight } from "@/store/zustandStore";

export default function HistorialFlights() {
  const [currentHistorial, setCurrentHistorial] = useState("");
  const { flights, setSearchedFlights } = useFlightStore();

  const { historialFlight, updateNewHistorialFlight } = useHistorialFlight();

  function handlerHistorial(data: string) {
    setCurrentHistorial(data);
    searchFlights(data);
  }

  function searchFlights(value: string) {
    const result = flights.filter(
      (flight: any) =>
        flight.iata_code.toLowerCase() === value ||
        flight.icao_code.toLowerCase() === value ||
        flight.airport_name.toLowerCase().includes(value),
    );

    setSearchedFlights(result);
  }

  function handleDelete(indexToDelete: number) {
    const newHistorialFlight = historialFlight.filter(
      (_: any, index: number) => index !== indexToDelete,
    );

    updateNewHistorialFlight(newHistorialFlight);
  }

  const lastFiveFlights = historialFlight.slice(-5);

  return (
    <div className="mt-8 xl:mt-0 2xl:mt-8">
      <Breadcrumbs
        classNames={{
          list: "gap-2",
        }}
        itemClasses={{
          item: [
            "px-2 py-0.5 border-small border-default-400 rounded-small",
            "data-[current=true]:border-foreground data-[current=true]:bg-foreground data-[current=true]:text-background transition-colors",
            "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100",
          ],
          separator: "hidden",
        }}
        size="lg"
        onAction={(key: any) => handlerHistorial(key)}
      >
        {lastFiveFlights.map((data: string, index: number) => (
          <BreadcrumbItem key={data} isCurrent={currentHistorial == data}>
            {data}
            <button onClick={() => handleDelete(index)}>
              <svg
                fill="white"
                height={24}
                viewBox="0 0 24 24"
                width={24}
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" fill="black" r="10" />
                <path
                  d="M8 8L16 16M8 16L16 8"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
}
