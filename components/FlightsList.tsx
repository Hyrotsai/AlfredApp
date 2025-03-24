import CardAir from "./CardAir";
import PaginationApp from "./Pagination";

import { Airport } from "@/interface/Airport";
import useFlightStore from "@/store/zustandStore";
import { itemPerPage } from "@/utils/variables";

export default function FlightsList() {
  const { searchedFlights, currentPage } = useFlightStore();
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentFlights = searchedFlights.slice(startIndex, endIndex);

  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 xl:grid-cols-2 place-items-center gap-3 mt-4 w-[90%] 2xl:w-4/5 h-[500px] xl:h-[750px] overflow-auto scrollbar-hide">
        {currentFlights.map((flight: Airport) => (
          <CardAir key={flight.airport_id} flight={flight} />
        ))}
      </div>

      {searchedFlights.length === 0 && <p>No hay Aeropuertos encontrados</p>}

      <div className="mt-4 relative flex justify-center flex-col">
        <p className="text-center mb-2 text-white">
          Total Aeropuertos encontrados: {searchedFlights.length}
        </p>
        <PaginationApp />
      </div>
    </div>
  );
}
