"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import FlightTabs from "@/components/FlightTabs";
import { title } from "@/components/primitives";
import { Airport } from "@/interface/Airport";
import useFlightStore from "@/store/zustandStore";

function FlightPageContent() {
  const { flights } = useFlightStore();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  if (!id) return <p>Cargando...</p>;

  const airport = flights.find((flight: Airport) => flight.iata_code === id);

  if (!airport)
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
        <Button>
          <Link href="/">Reiniciar APP</Link>
        </Button>
      </div>
    );

  return (
    <div className="container mx-auto p-5 h-screen overflow-hidden">
      <div className="flex justify-center mb-3">
        <Button>
          <Link href="/">Regresar</Link>
        </Button>
      </div>
      <div className="inline-block w-full text-center justify-center mb-4">
        <h1 className={title({ color: "blue" })}>{airport.airport_name}</h1>
      </div>
      <div className="flex w-full flex-col">
        <FlightTabs />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <FlightPageContent />
    </Suspense>
  );
}
