import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { FlightStore, HistorialFlightStore } from "@/interface/Airport";

const useFlightStore = create<FlightStore>((set) => ({
  flights: [],
  setFlights: (newFlights) => set({ flights: newFlights }),

  searchedFlights: [],
  setSearchedFlights: (searchedFlights) => set({ searchedFlights }),

  isLoading: true,
  setIsLoading: () => set((state) => ({ isLoading: !state.isLoading })),
  setIsLoadingFalse: () => set({ isLoading: false }),

  currentPage: 1,
  setCurrentPage: (newPage) => set({ currentPage: newPage }),
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  prevPage: () =>
    set((state) => ({ currentPage: Math.max(1, state.currentPage - 1) })),

  refreshKey: 0,
  setRefreshKey: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),
}));

export default useFlightStore;

export const useHistorialFlight = create<HistorialFlightStore>(
  persist(
    (set) => ({
      historialFlight: [],
      setHistorialFlights: (newData: string) =>
        set((state: any) => ({
          historialFlight: [...state.historialFlight, newData],
        })),
      updateNewHistorialFlight: (newData: string[]) =>
        set({ historialFlight: newData }),

      apiLocal: false,
      setApiLocal: () => set((state: any) => ({ apiLocal: !state.apiLocal })),

      timeApiLocal: 1,
      setTimeApiLocal: (newTime: number) => set({ timeApiLocal: newTime }),
    }),
    { name: "historial-flight" },
  ) as unknown as StateCreator<HistorialFlightStore>,
);
