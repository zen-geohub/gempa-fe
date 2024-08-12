import Control from "./main/Control";
import LayerControl from "./main/LayerControl";
import MapLegend from "./main/MapLegend";
import EarthquakeFrequency from "./main/EarthquakeFrequency";
import EarthquakeDistribution from "./main/EarthquakeDistibution";
import Map2D from "./main/Map2D";
import { useContext, useEffect, useState } from "react";
import Map3D from "./main/Map3D";
import { EarthquakeData } from "@/contexts/DataContext";
import { Card, CardContent } from "../ui/card";

function Main() {
  const { earthquake } = useContext(EarthquakeData);
  const [mapStatus, setMapStatus] = useState<string>("2D");

  const [earthquakeLayer, setEarthquakeLayer] = useState<boolean>(true);
  const [heatmapLayer, setHeatmapLayer] = useState<boolean>(false);
  const [hexagonLayer, setHexagonLayer] = useState<boolean>(false);

  useEffect(() => {
    console.log(earthquakeLayer);
    
  }, [earthquakeLayer])

  return (
    <main className="w-10/12 h-screen flex flex-col overflow-hidden">
      <section className="w-full flex-grow pr-1 pb-1 relative">
        <Control mapStatus={mapStatus} setMapStatus={setMapStatus} />
        {mapStatus === "2D" && (
          <LayerControl
            earthquake={earthquakeLayer}
            setEarthquake={setEarthquakeLayer}
            heatmap={heatmapLayer}
            setHeatmap={setHeatmapLayer}
            hexagon={hexagonLayer}
            setHexagon={setHexagonLayer}
          />
        )}
        {mapStatus === "2D" && <MapLegend />}
        {mapStatus === "2D" ? <Map2D earthquakeLayer={earthquakeLayer} heatmapLayer={heatmapLayer} hexagonLayer={hexagonLayer} /> : <Map3D />}
      </section>
      {earthquake.length > 0 ? (
        <footer className="w-full h-[15%] p-1 flex gap-2">
          <EarthquakeFrequency />
          <EarthquakeDistribution />
        </footer>
      ) : (
        <footer className="w-full h-[15%] p-1 flex gap-2">
          <Card className="flex-grow">
            <CardContent className="p-0 h-full flex justify-center items-center">
              <h1>Pilih Data</h1>
            </CardContent>
          </Card>
        </footer>
      )}
    </main>
  );
}

export default Main;
