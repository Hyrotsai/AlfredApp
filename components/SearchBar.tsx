import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { useRef } from "react";

import { title } from "./primitives";

import useFlightStore, { useHistorialFlight } from "@/store/zustandStore";

export default function SearchBar({ isColumn = true }: { isColumn: boolean }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { flights, setSearchedFlights } = useFlightStore();

  const { historialFlight, setHistorialFlights } = useHistorialFlight();

  function searchFlights() {
    if (!flights.length) return;

    const inputValue = (
      document.querySelector("input") as HTMLInputElement
    )?.value.toLowerCase();

    const result = flights.filter(
      (flight: any) =>
        flight.iata_code.toLowerCase() === inputValue ||
        flight.icao_code.toLowerCase() === inputValue ||
        flight.airport_name.toLowerCase().includes(inputValue),
    );

    if (result.length > 0 && inputValue !== "") {
      if (historialFlight.includes(inputValue)) return;
      setHistorialFlights(inputValue);
    }

    setSearchedFlights(result);
  }

  return (
    <div
      className={`mt-16 lg:mt-8 flex items-center justify-center w-[90%] gap-8 ${
        isColumn ? "flex-col" : "flex-row"
      } `}
    >
      <div
        className={`max-w-xl text-center justify-center opacity-0 animate-fadeIn lg:block ${
          isColumn ? "mt-36 mb-20" : "hidden"
        } `}
      >
        <h1 className={title({ color: "blue" })}>SkyeConnect Explorer</h1>
      </div>

      <Input
        ref={inputRef}
        className="w-[80%] max-w-[780px]"
        color="primary"
        label="Buscar aeropuertos..."
        radius="full"
        type="text"
        variant="faded"
      />
      <Button
        className="w-[234px] h-[52.6px] bg-gradient-to-br from-[#0060FF] to-[#00FFE7] 
                 text-[19.5px] border border-white text-white dark:text-black"
        onPress={searchFlights}
      >
        <Image alt="Lupa" src="/Magnifer.png" width={31.2} />
        Buscar
      </Button>
    </div>
  );
}
