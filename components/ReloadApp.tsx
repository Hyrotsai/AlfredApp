import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Switch } from "@heroui/switch";

import { title } from "./primitives";

import useFlightStore, { useHistorialFlight } from "@/store/zustandStore";

export default function ReloadApp() {
  const { setIsLoading, setRefreshKey } = useFlightStore();
  const { apiLocal, setApiLocal, timeApiLocal, setTimeApiLocal } =
    useHistorialFlight();

  function handleRefresh() {
    setRefreshKey();
    setIsLoading();
  }

  return (
    <div className="container h-screen flex flex-col items-center m-auto mt-48 ">
      <h1 className={title({ color: "blue" })}>
        {" "}
        El API ha fallado, probablemente se llego al limite del consumo, se
        puede simular una llamada en local el cual esta en public/data.json
      </h1>
      <div className="flex flex-col gap-2 mt-8 h-[200px] w-[400px]">
        <Switch isSelected={apiLocal} onValueChange={setApiLocal}>
          {apiLocal
            ? "Simular llamada de API en Local"
            : "Llamar al endpoint real"}
        </Switch>

        <p className="h-8">
          {apiLocal ? "Vamos a simular tiempo de espera" : null}
        </p>

        <div className="flex items-center">
          {apiLocal ? (
            <>
              <Input
                className="w-24"
                defaultValue={timeApiLocal.toString()}
                max={10}
                minLength={1}
                type="number"
                onChange={(e) => setTimeApiLocal(Number(e.target.value))}
              />
              <p className="ml-2">Tiempo en segundos</p>
            </>
          ) : null}
        </div>
      </div>
      <Button color="primary" onPress={handleRefresh}>
        Reintentar
      </Button>
    </div>
  );
}
