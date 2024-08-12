import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Cross1Icon, LayersIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction, useState } from "react";

type LayerControlProps = {
  earthquake: boolean;
  heatmap: boolean;
  hexagon: boolean;
  fault: boolean;
  seismic: boolean;
  setEarthquake: Dispatch<SetStateAction<boolean>>;
  setHeatmap: Dispatch<SetStateAction<boolean>>;
  setHexagon: Dispatch<SetStateAction<boolean>>;
  setFault: Dispatch<SetStateAction<boolean>>;
  setSeismic: Dispatch<SetStateAction<boolean>>;
};

function LayerControl({
  earthquake,
  heatmap,
  hexagon,
  fault,
  seismic,
  setEarthquake,
  setHeatmap,
  setHexagon,
  setFault,
  setSeismic
}: LayerControlProps) {
  const [isLayerControlOpen, setIsLayerControlOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        size="icon"
        className={cn(
          isLayerControlOpen && "hidden",
          "absolute top-2 right-2 z-10"
        )}
        onClick={() => setIsLayerControlOpen(!isLayerControlOpen)}
      >
        <LayersIcon />
      </Button>
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
        <CardContent className="flex flex-col gap-1 p-2">
          <h1 className="font-semibold">Data</h1>
          <Separator />
          <div className="flex items-center gap-2">
            <Checkbox
              onCheckedChange={() => setFault(!fault)}
              id="fault"
            />
            <label htmlFor="fault">Patahan</label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              onCheckedChange={() => setSeismic(!seismic)}
              id="seismic"
            />
            <label htmlFor="seismic">Stasiun Seismik</label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              onCheckedChange={() => setEarthquake(!earthquake)}
              defaultChecked
              id="earthquake"
            />
            <label htmlFor="earthquake">Gempa Bumi</label>
          </div>
          
          <h1 className="mt-2 font-semibold">Agregasi visual</h1>
          <Separator />
          <div className="flex items-center gap-2">
            <Checkbox
              onCheckedChange={() => setHeatmap(!heatmap)}
              id="heatmap"
            />
            <label htmlFor="heatmap">Heatmap</label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              onCheckedChange={() => setHexagon(!hexagon)}
              id="hexagon"
            />
            <label htmlFor="hexagon">Hexagon</label>
          </div>
        </CardContent>
      </Card>
      {/* <div
        className={cn(
          isLayerControlOpen ? "translate-x-0" : "translate-x-[210%]",
          "w-fit h-fit absolute p-1 bg-white rounded flex flex-col top-2 right-2 z-10 transition-transform"
        )}
      >
        <div className="flex items-center gap-2">
          <Checkbox
            onCheckedChange={() => setEarthquake(!earthquake)}
            defaultChecked
            id="earthquake"
          />
          <label htmlFor="earthquake">Earthquake</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox onCheckedChange={() => setHeatmap(!heatmap)} id="heatmap" />
          <label htmlFor="heatmap">Heatmap</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox onCheckedChange={() => setHexagon(!hexagon)} id="hexagon" />
          <label htmlFor="hexagon">Hexagon</label>
        </div>
      </div> */}
    </>
  );
}

export default LayerControl;
