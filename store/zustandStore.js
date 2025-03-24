import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFlightStore = create((set) => ({
  flights: [],
  setFlights: (newFlights) => set({ flights: newFlights }),

  searchedFlights: [],
  setSearchedFlights: (searchedFlights) => set({ searchedFlights }),

  isLoading: true,
  setIsLoading: () => set({ isLoading: false }),

  currentPage: 1,
  setCurrentPage: (newPage) => set({ currentPage: newPage }),
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  prevPage: () =>
    set((state) => ({ currentPage: Math.max(1, state.currentPage - 1) })),
}));

export default useFlightStore;

export const useHistorialFlight = create(
  persist(
    (set) => ({
      historialFlight: [],
      setHistorialFlights: (newData) =>
        set((state) => ({
          historialFlight: [...state.historialFlight, newData],
        })),
      updateNewHistorialFlight: (newData) => set({ historialFlight: newData }),
    }),
    { name: "historial-flight" },
  ),
);
