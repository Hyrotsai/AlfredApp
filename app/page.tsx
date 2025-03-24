"use client";

import { useEffect } from "react";

import useFlightStore from "../store/zustandStore";
import { fetchFlights } from "../utils/api";

import FlightsList from "@/components/FlightsList";
import HistorialFlights from "@/components/HistorialFlights";
import Loader from "@/components/Loader";
import SearchBar from "@/components/SearchBar";

export default function Page() {
  const { flights, setFlights, searchedFlights, isLoading, setIsLoading } =
    useFlightStore();

  useEffect(() => {
    async function getFlights() {
      const data = await fetchFlights();

      setIsLoading();

      setFlights(data);
    }
    getFlights();
  }, []);

  if (isLoading) return <Loader />;

  if (!isLoading && flights.length == 0)
    return <p className="text-white ">Componente de recarga aqui</p>;

  return (
    <section className="flex flex-col items-center justify-center">
      {searchedFlights.length === 0 ? (
        <>
          <SearchBar isColumn={true} />
          <HistorialFlights />
        </>
      ) : (
        <div className="w-screen flex flex-col justify-center items-center">
          <SearchBar isColumn={false} />
          <HistorialFlights />
          <FlightsList />
        </div>
      )}
    </section>
  );
}
