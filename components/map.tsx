import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import useFlightStore from "@/store/zustandStore";

export default function Map() {
  const { flights } = useFlightStore();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const airport = flights.find((flight: any) => flight.iata_code === id);

  const { latitude, longitude } = airport;

  useEffect(() => {
    const mapContainer: any = document.getElementById("map");

    if (mapContainer?._leaflet_id) {
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
