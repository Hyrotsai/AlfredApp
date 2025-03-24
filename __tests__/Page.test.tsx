import { render, screen, fireEvent } from "@testing-library/react";
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
  }),
}));

jest.mock("@/utils/api", () => ({
  fetchFlights: jest.fn(),
}));

describe("Page Component", () => {
  it("Muestra el titulo principal", () => {
    render(<Page />);
    expect(screen.getByText("SkyeConnect Explorer")).toBeInTheDocument();
  });

  it("Ejecuta la busqueda cuando se escribe en el input", () => {
    render(<Page />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "JFK" } });

    expect(input.value).toBe("JFK");
  });

  it("Carga los vuelos al montar el componente", async () => {
    const mockFlights = [
      { iata_code: "JFK", icao_code: "KJFK", airport_name: "John F. Kennedy" },
    ];

    (fetchFlights as jest.Mock).mockResolvedValue(mockFlights);

    render(<Page />);

    expect(fetchFlights).toHaveBeenCalled();
  });
});
