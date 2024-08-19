import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import { useLayer } from "@/contexts/LayerContext";
import { cn } from "@/lib/utils";
import { Cross1Icon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function MapLegendCard() {
  const { heatmapLayer, hexagonLayer } = useLayer();

  return (
    <CardContent className="p-2">
      <ScrollArea className="w-[340px] lg:w-[450px]">
        <div className="w-max flex gap-2">
          {heatmapLayer && (
            <div className="text-xs lg:text-base">
              <h1 className="text-center text-base font-bold mb-1">Heatmap</h1>
              <div className="flex gap-2">
                <div className="bg-gradient-to-t from-[#ffffb2] from-0% via-[#fd8d3c] via-45% to-[#bd0026] to-100% w-4 h-20"></div>
                <div className="flex flex-col justify-between">
                  <p>Lebih banyak kejadian gempa</p>
                  <p>Lebih sedikit kejadian gempa</p>
                </div>
              </div>
            </div>
          )}
          {hexagonLayer && (
            <div className="text-xs lg:text-base">
              <h1 className="text-center text-base font-bold mb-1">
                Hexagon Grid
              </h1>
              <div className="flex gap-2">
                <div className="bg-gradient-to-t from-[#9ecae1] from-0% via-[#2171b5] via-55% to-[#08306b] to-100% w-4 h-20"></div>
                <div className="flex flex-col justify-between">
                  <p>Lebih banyak kejadian gempa</p>
                  <p>Lebih sedikit kejadian gempa</p>
                </div>
              </div>
            </div>
          )}
          <table>
            <thead>
              <tr>
                <th colSpan={2}>Magnitudo (M)</th>
              </tr>
            </thead>
            <tbody className="text-xs lg:text-base">
              <tr>
                <td>
                  <svg height="20" width="20">
                    <circle r="3" cx="10" cy="10" fill="#808080" />
                  </svg>
                </td>
                <td>Gempa Kecil (&le;5.9)</td>
              </tr>
              <tr>
                <td>
                  <svg height="20" width="20">
                    <circle r="5" cx="10" cy="10" fill="#808080" />
                  </svg>
                </td>
                <td>Gempa Menengah (6 - 6.9)</td>
              </tr>
              <tr>
                <td>
                  <svg height="20" width="20">
                    <circle r="7" cx="10" cy="10" fill="#808080" />
                  </svg>
                </td>
                <td>Gempa Besar (7 - 8.9)</td>
              </tr>
              <tr>
                <td>
                  <svg height="20" width="20">
                    <circle r="9" cx="10" cy="10" fill="#808080" />
                  </svg>
                </td>
                <td>Gempa Megathrust (&ge;9)</td>
              </tr>
            </tbody>
          </table>
          <div className="text-xs lg:text-base">
            <h1 className="text-center text-base font-bold mb-1">
              Kedalaman (km)
            </h1>
            <div className="flex items-center gap-1 mb-1">
              <div className={"w-5 h-5 bg-[#fcbba1]"}></div>
              <p>Gempa Dangkal (&le;70)</p>
            </div>
            <div className="flex items-center gap-1 mb-1">
              <div className={"w-5 h-5 bg-[#ef3b2c]"}></div>
              <p>Gempa Menengah (70 - 300)</p>
            </div>
            <div className="flex items-center gap-1 mb-1">
              <div className={"w-5 h-5 bg-[#67000d]"}></div>
              <p>Gempa Dalam (&ge;300)</p>
            </div>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </CardContent>
  );
}

export function MapLegend() {
  const [isLegendOpen, setIsLegendOpen] = useState<boolean>(false);

  return (
    <>
      {!isLegendOpen && (
        <Button
          size="icon"
          className="absolute bottom-2 right-2 z-10 hidden lg:flex"
          onClick={() => setIsLegendOpen(!isLegendOpen)}
        >
          <DotsVerticalIcon />
        </Button>
      )}
      <Card
        className={cn(
          isLegendOpen ? "translate-x-0" : "translate-x-[210%]",
          "absolute bottom-2 right-2 z-10 transition-transform"
        )}
      >
        <MapLegendCard />
        <Button
          onClick={() => setIsLegendOpen(!isLegendOpen)}
          size="icon"
          variant="ghost"
          className="p-1 w-fit h-fit top-1 right-1 absolute"
        >
          <Cross1Icon />
        </Button>
      </Card>
    </>
  );
}
