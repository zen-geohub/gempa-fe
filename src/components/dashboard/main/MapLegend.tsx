import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { depthColor } from "@/styles/dataStyle";
import { Cross1Icon, DotsVerticalIcon } from "@radix-ui/react-icons";
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
      <Card
        className={cn(isLegendOpen ? "translate-x-0" : "translate-x-[210%]",
          'absolute bottom-2 right-2 z-10 transition-transform'
        )}
      >
        <Button
          onClick={() => setIsLegendOpen(!isLegendOpen)}
          size="icon"
          variant="ghost"
          className="p-1 w-fit h-fit top-1 right-1 absolute"
        >
          <Cross1Icon />
        </Button>
        <CardContent className="p-2 flex gap-4">
          <table>
            <thead>
              <tr>
                <th colSpan={2}>Magnitudo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <svg height="20" width="20">
                    <circle r="3" cx="10" cy="10" fill="#808080" />
                  </svg>
                </td>
                <td>Gempa Kecil</td>
              </tr>
              <tr>
                <td>
                  <svg height="20" width="20">
                    <circle r="5" cx="10" cy="10" fill="#808080" />
                  </svg>
                </td>
                <td>Gempa Menengah</td>
              </tr>
              <tr>
                <td>
                  <svg height="20" width="20">
                    <circle r="7" cx="10" cy="10" fill="#808080" />
                  </svg>
                </td>
                <td>Gempa Besar</td>
              </tr>
              <tr>
                <td>
                  <svg height="20" width="20">
                    <circle r="9" cx="10" cy="10" fill="#808080" />
                  </svg>
                </td>
                <td>Gempa Megathrust</td>
              </tr>
            </tbody>
          </table>
          <div>
            <h1 className="text-center font-bold mb-1">Kedalaman</h1>
            <div className="flex items-center gap-1">
              <div className={cn(`bg-[${depthColor[0]}]`, 'w-5 h-5')}></div>
              <p>Gempa Dangkal</p>
            </div>
            <div className="flex items-center gap-1">
              <div className={cn(`bg-[${depthColor[1]}]`, 'w-5 h-5')}></div>
              <p>Gempa Menengah</p>
            </div>
            <div className="flex items-center gap-1">
              <div className={cn(`bg-[${depthColor[2]}]`, 'w-5 h-5')}></div>
              <p>Gempa Dalam</p>
            </div>
          </div>
          {/* <table>
            <thead>
              <th colSpan={2}>Kedalaman</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="w-5 h-5 bg-red-500"></div>
                </td>
                <td className="px-1">Gempa Dangkal</td>
              </tr>
              <tr>
                <td>
                  <div className="w-5 h-5 bg-red-500"></div>
                </td>
                <td className="px-1">Gempa Menengah</td>
              </tr>
              <tr>
                <td>
                  <div className="w-5 h-5 bg-red-500"></div>
                </td>
                <td className="px-1">Gempa Dalam</td>
              </tr>
            </tbody>
          </table> */}
        </CardContent>
      </Card>
    </>
  );
}

export default MapLegend;
