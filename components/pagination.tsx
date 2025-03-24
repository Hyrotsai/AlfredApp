import React from "react";
import { Pagination } from "@heroui/pagination";
import { Button } from "@heroui/button";

import useFlightStore from "@/store/zustandStore";
import { itemPerPage } from "@/utils/variables";

export default function PaginationApp() {
  const { searchedFlights, currentPage, setCurrentPage, nextPage, prevPage } =
    useFlightStore();

  const totalPages =
    searchedFlights.length > 0
      ? Math.ceil(searchedFlights.length / itemPerPage)
      : 0;

  if (totalPages <= 1) return null;

  function handleNextPage() {
    if (currentPage == totalPages) return;
    nextPage();
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 justify-center">
        <Button
          className="hidden md:block"
          color="primary"
          size="md"
          onPress={prevPage}
        >
          Anterior
        </Button>
        <Pagination
          color="primary"
          page={currentPage}
          total={totalPages}
          onChange={(e: number) => setCurrentPage(e)}
        />
        <Button
          className="hidden md:block"
          color="primary"
          size="md"
          onPress={handleNextPage}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
