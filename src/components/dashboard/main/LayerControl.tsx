import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { LayersIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction, useState } from "react";

type Earthquake = boolean;
type Heatmap = boolean;
type Hexagon = boolean;

type LayerControlProps = {
  earthquake: Earthquake;
  heatmap: Heatmap;
  hexagon: Hexagon;
  setEarthquake: Dispatch<SetStateAction<Earthquake>>;
  setHeatmap: Dispatch<SetStateAction<Heatmap>>;
  setHexagon: Dispatch<SetStateAction<Hexagon>>;
};

function LayerControl({
  earthquake,
  heatmap,
  hexagon,
  setEarthquake,
  setHeatmap,
  setHexagon,
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
      <div
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
      </div>
    </>
  );
}

export default LayerControl;
