import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Page from "@/app/page";
import { fetchFlights } from "@/utils/api";

// Mock de Zustand store
jest.mock("@/store/zustandStore", () => ({
  __esModule: true,
  default: () => ({
    flights: [],
    setFlights: jest.fn(),
    searchedFlights: [],
    setSearchedFlights: jest.fn(),
    isLoading: false,
    setIsLoadingFalse: jest.fn(),
    refreshKey: 0,
  }),
  useHistorialFlight: () => ({
    apiLocal: false,
    timeApiLocal: 1,
  }),
}));

// Mock de la API
jest.mock("@/utils/api", () => ({
  fetchFlights: jest.fn(),
}));

describe("Page Component - API Request", () => {
  it("Llama a fetchFlights al montar el componente", async () => {
    const mockFlights = [
      { iata_code: "JFK", icao_code: "KJFK", airport_name: "John F. Kennedy" },
    ];

    (fetchFlights as jest.Mock).mockResolvedValue(mockFlights);

    render(<Page />);

    expect(fetchFlights).toHaveBeenCalledWith(false, 1);
  });
});

it("Muestra un componente error si la peticion falla", () => {
  render(<Page />);

  expect(screen.getByTestId("error")).toBeInTheDocument();
});
