"use client";

import { useEffect } from "react";

import useFlightStore, { useHistorialFlight } from "../store/zustandStore";
import { fetchFlights } from "../utils/api";

import FlightsList from "@/components/FlightsList";
import HistorialFlights from "@/components/HistorialFlights";
import Loader from "@/components/Loader";
import ReloadApp from "@/components/ReloadApp";
import SearchBar from "@/components/SearchBar";

export default function Page() {
  const {
    flights,
    setFlights,
    searchedFlights,
    isLoading,
    setIsLoadingFalse,
    refreshKey,
  } = useFlightStore();

  const { apiLocal, timeApiLocal } = useHistorialFlight();

  useEffect(() => {
    async function getFlights() {
      const data = await fetchFlights(apiLocal, timeApiLocal);

      setIsLoadingFalse();

      setFlights(data);
    }
    getFlights();
  }, [refreshKey]);

  if (isLoading) return <Loader />;

  //INFO Si la peticion falla me mostrara un componente de recarga
  if (!isLoading && flights.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <ReloadApp />
      </div>
    );
  }

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
