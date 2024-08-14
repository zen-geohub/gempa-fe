import { useEffect, useState } from "react";
import { useData } from "@/contexts/DataContext";
import EarthquakePie, { DepthPie, MagnitudePie } from "./EarthquakePie";
import EarthquakeAccumulation from "./EarthquakeAccumulation";

function Infobar() {
  const { earthquake, dateRange } = useData();
  const [magnitudePie, setMagnitudePie] = useState<MagnitudePie>({
    "Gempa Kecil": 0,
    "Gempa Menengah": 0,
    "Gempa Besar": 0,
    "Gempa Megathrust": 0,
  });
  const [depthPie, setDepthPie] = useState<DepthPie>({
    "Gempa Dangkal": 0,
    "Gempa Menengah": 0,
    "Gempa Dalam": 0,
  });

  useEffect(() => {
    setMagnitudePie({
      "Gempa Kecil": earthquake.filter(
        (item) => item.properties.magnitude_class === "Gempa Kecil"
      ).length,
      "Gempa Menengah": earthquake.filter(
        (item) => item.properties.magnitude_class === "Gempa Menengah"
      ).length,
      "Gempa Besar": earthquake.filter(
        (item) => item.properties.magnitude_class === "Gempa Besar"
      ).length,
      "Gempa Megathrust": earthquake.filter(
        (item) => item.properties.magnitude_class === "Gempa Megathrust"
      ).length,
    });
    setDepthPie({
      "Gempa Dangkal": earthquake.filter(
        (item) => item.properties.depth_class === "Gempa Dangkal"
      ).length,
      "Gempa Menengah": earthquake.filter(
        (item) => item.properties.depth_class === "Gempa Menengah"
      ).length,
      "Gempa Dalam": earthquake.filter(
        (item) => item.properties.depth_class === "Gempa Dalam"
      ).length,
    });
  }, [earthquake, dateRange]);

  return (
    <>
      <EarthquakeAccumulation />
      <EarthquakePie value={depthPie} title="Kedalaman" />
      <EarthquakePie value={magnitudePie} title="Magnitudo" />
    </>
  );
}

export default Infobar;
