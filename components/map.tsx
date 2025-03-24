import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { Airport } from "@/interface/Airport";
import useFlightStore from "@/store/zustandStore";

export default function Map() {
  const { flights } = useFlightStore();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const airport = flights.find((flight: Airport) => flight.iata_code === id);

  const { latitude, longitude } = airport || { latitude: 0, longitude: 0 };

  //INFO Evita que el mapa haga renderizados innecesarios
  useEffect(() => {
    const mapContainer: HTMLElement | null = document.getElementById("map");

    if ((mapContainer as any)?._leaflet_id) {
      return;
    }

    const map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: "/MapPoint.svg",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    L.marker([latitude, longitude], { icon: customIcon })
      .addTo(map)
      .bindPopup("Aquí estoy 📍")
      .openPopup();
  }, [latitude, longitude]);

  if (!id) return <p>Cargando...</p>;

  return (
    <div
      className="w-full h-60 md:h-96 mt-6 motion-safe:animate-slide-in"
      id="map"
    />
  );
}
