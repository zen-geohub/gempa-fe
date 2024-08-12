import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useState } from "react";

function MapLegend() {
  const [isLegendOpen, setIsLegendOpen] = useState<boolean>(false);

  return (
    <>
      <Button
          size="icon"
          className={cn(
            isLegendOpen && "hidden",
            "absolute bottom-2 right-2 z-10"
          )}
          onClick={() => setIsLegendOpen(!isLegendOpen)}
        >
          <DotsVerticalIcon />
        </Button>
    </>
  )
}

export default MapLegend;