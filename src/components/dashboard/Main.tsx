import Control from "./main/Control";
import { LayerControl } from "./main/LayerControl";
import { MapLegend } from "./main/MapLegend";
import EarthquakeFrequency from "./main/EarthquakeFrequency";
import EarthquakeDistribution from "./main/EarthquakeDistibution";
import Map2D from "./main/Map2D";
import { useState } from "react";
import Map3D from "./main/Map3D";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Infobar from "./sidebar/Infobar";
import { ScrollBar, ScrollArea } from "../ui/scroll-area";
import BrandCard from "./main/BrandCard";

function Main() {
  const { earthquake } = useData();
  const [mapStatus, setMapStatus] = useState<string>("2D");
  const [isFooterOpen, setIsFooterOpen] = useState<boolean>(false);

  return (
    <main className="w-dvw lg:w-[85%] h-dvh flex flex-col overflow-hidden relative">
      <section className="w-full flex-grow pr-1 pb-1 relative">
        <Control mapStatus={mapStatus} setMapStatus={setMapStatus} />
        {mapStatus === "2D" && <LayerControl />}
        {mapStatus === "2D" && <MapLegend />}
        {mapStatus === "2D" ? <Map2D /> : <Map3D />}
      </section>
      {earthquake.length > 0 ? (
        <footer className="hidden lg:w-full lg:h-[15%] lg:p-1 lg:flex lg:gap-2">
          <EarthquakeFrequency />
          <EarthquakeDistribution />
        </footer>
      ) : (
        <footer className="hidden lg:w-full lg:h-[15%] lg:p-1 lg:flex lg:gap-2">
          <Card className="flex-grow">
            <CardContent className="p-0 h-full flex justify-center items-center">
              <h1>Pilih Data</h1>
            </CardContent>
          </Card>
        </footer>
      )}
      <Button
        size="icon"
        className={cn(
          isFooterOpen && "hidden",
          "absolute bottom-2 right-2 lg:hidden"
        )}
        onClick={() => setIsFooterOpen(!isFooterOpen)}
      >
        <HamburgerMenuIcon />
      </Button>

      <Card
        className={cn(
          isFooterOpen ? "translate-y-0" : "translate-y-[210%]",
          "absolute bottom-2 z-10 transition-transform max-w-full m-2 flex lg:hidden"
        )}
      >
        <CardContent className="relative p-2 flex-grow">
          <Button
            size="icon"
            className="absolute h-fit w-fit p-1 top-2 right-2 z-10"
            onClick={() => setIsFooterOpen(!isFooterOpen)}
          >
            <Cross1Icon />
          </Button>
          {earthquake.length > 0 ? (
            <ScrollArea className="h-36 w-[340px]">
              <div className="flex gap-2 w-max mb-2">
                <Infobar />
              </div>
              <div className="flex gap-2 w-full">
                <EarthquakeDistribution />
                <EarthquakeFrequency />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          ) : (
            <BrandCard />
          )}
        </CardContent>
      </Card>
    </main>
  );
}

export default Main;
