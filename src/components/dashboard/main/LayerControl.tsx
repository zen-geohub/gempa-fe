import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useLayer } from "@/contexts/LayerContext";
import { cn } from "@/lib/utils";
import { Cross1Icon, LayersIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction, useState } from "react";
import sensor from "../../../assets/sensor.png";
import { MapViewState } from "@deck.gl/core";

export function LayerControlCard({
  initialViewState,
  setInitialViewState,
}: {
  initialViewState: MapViewState;
  setInitialViewState: Dispatch<SetStateAction<MapViewState>>;
}) {
  const {
    earthquakeLayer,
    faultLayer,
    heatmapLayer,
    hexagonLayer,
    megathrustLayer,
    seismicLayer,
    setEarthquakeLayer,
    setFaultLayer,
    setHeatmapLayer,
    setHexagonLayer,
    setMegathrustLayer,
    setSeismicLayer,
  } = useLayer();

  return (
    <CardContent className="flex flex-col gap-1 p-2">
      <h1 className="font-semibold">Data</h1>
      <Separator />
      <div className="flex items-center gap-2 text-sm lg:text-base">
        <Checkbox
          checked={megathrustLayer}
          onCheckedChange={() => setMegathrustLayer(!megathrustLayer)}
          id="megathrust"
        />
        <label
          htmlFor="megathrust"
          className="flex items-center justify-between w-full gap-2"
        >
          Zona Megathrust
          <div className="w-4 lg:w-5 h-4 lg:h-5 bg-[#edf8b15a] border border-[#edf8b1]"></div>
        </label>
      </div>
      <div className="flex items-center gap-2 text-sm lg:text-base">
        <Checkbox
          checked={faultLayer}
          onCheckedChange={() => setFaultLayer(!faultLayer)}
          id="fault"
        />
        <label
          htmlFor="fault"
          className="flex items-center justify-between w-full"
        >
          Patahan
          <div className="w-4 lg:w-5 h-[2px] bg-yellow-500"></div>
        </label>
      </div>
      <div className="flex items-center gap-2 text-sm lg:text-base">
        <Checkbox
          checked={seismicLayer}
          onCheckedChange={() => setSeismicLayer(!seismicLayer)}
          id="seismic"
        />
        <label
          htmlFor="seismic"
          className="flex items-center justify-between w-full"
        >
          Stasiun Seismik
          <img src={sensor} className="w-4 h-4 lg:w-5 lg:h-5" />
        </label>
      </div>
      <div className="flex items-center gap-2 text-sm lg:text-base">
        <Checkbox
          onCheckedChange={() => setEarthquakeLayer(!earthquakeLayer)}
          defaultChecked
          id="earthquake"
        />
        <label
          htmlFor="earthquake"
          className="flex items-center justify-between w-full"
        >
          Gempa Bumi
          <div className="rounded-full bg-[#808080] w-4 h-4"></div>
        </label>
      </div>

      <h1 className="mt-2 font-semibold">Agregasi visual</h1>
      <Separator />
      <div className="flex items-center gap-2 text-sm lg:text-base">
        <Checkbox
          checked={heatmapLayer}
          onCheckedChange={() => setHeatmapLayer(!heatmapLayer)}
          id="heatmap"
        />
        <label htmlFor="heatmap">Heatmap</label>
      </div>
      <div className="flex items-center gap-2 text-sm lg:text-base">
        <Checkbox
          checked={hexagonLayer}
          onCheckedChange={() => {
            setHexagonLayer(!hexagonLayer);
            hexagonLayer
              ? setInitialViewState({
                  ...initialViewState,
                  pitch: 0,
                  transitionDuration: 300,
                })
              : setInitialViewState({
                  ...initialViewState,
                  pitch: 60,
                  transitionDuration: 300,
                });
          }}
          id="hexagon"
        />
        <label htmlFor="hexagon">Hexagon Grid</label>
      </div>
    </CardContent>
  );
}

export function LayerControl({
  initialViewState,
  setInitialViewState,
}: {
  initialViewState: MapViewState;
  setInitialViewState: Dispatch<SetStateAction<MapViewState>>;
}) {
  const [isLayerControlOpen, setIsLayerControlOpen] = useState<boolean>(false);

  return (
    <>
      {!isLayerControlOpen && (
        <Button
          size="icon"
          className="absolute top-2 right-2 z-10 hidden lg:flex"
          onClick={() => setIsLayerControlOpen(!isLayerControlOpen)}
        >
          <LayersIcon />
        </Button>
      )}
      <Card
        className={cn(
          isLayerControlOpen ? "translate-x-0" : "translate-x-[210%]",
          "absolute top-2 right-2 z-10 transition-transform"
        )}
      >
        <Button
          onClick={() => setIsLayerControlOpen(!isLayerControlOpen)}
          size="icon"
          variant="ghost"
          className="p-1 w-fit h-fit top-1 right-1 absolute"
        >
          <Cross1Icon />
        </Button>
        <LayerControlCard
          initialViewState={initialViewState}
          setInitialViewState={setInitialViewState}
        />
      </Card>
    </>
  );
}
