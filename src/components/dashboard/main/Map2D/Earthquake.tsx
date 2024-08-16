import { Source, Layer } from "react-map-gl/maplibre";
// import { FilterSpecification } from "maplibre-gl";
import type { FeatureCollection } from "geojson";
import { depthColor } from "@/styles/dataStyle";
import { useData } from "@/contexts/DataContext";
// import { useFilter } from "@/contexts/FilterContext";
import { useEffect, useState } from "react";

function Earthquake() {
  // const { dateFilter } = useFilter();
  const { earthquake } = useData();
  const [earthquakeFeature, setEarthquakeFeature] = useState<FeatureCollection>();
  
  useEffect(() => {
    setEarthquakeFeature({
      type: "FeatureCollection",
      features: earthquake.map((feature) => ({
        type: "Feature",
        properties: {
          date: feature.properties["date"],
          year: feature.properties["year"],
          latitude: feature.properties["latitude"],
          longitude: feature.properties["longitude"],
          magnitude: feature.properties["magnitude"],
          magnitudeClass: feature.properties["magnitude_class"],
          depth_km: feature.properties["depth_km"],
          depthClass: feature.properties["depth_class"],
        },
        geometry: {
          type: "Point",
          coordinates: [
            feature.geometry.coordinates[0],
            feature.geometry.coordinates[1],
          ],
        },
      })),
    });
  }, [earthquake]);

  // const {current: map} = useMap()
  // map?.on('click', () => {
  //   console.log('hehe')
  // })

  // const filter: FilterSpecification = [
  //   "all",
  //   [">=", ["get", "date"], dateFilter.startDate],
  //   ["<=", ["get", "date"], dateFilter.endDate || dateFilter.startDate],
  //   [">=", ["get", "latitude"], latitude.minLatitude],
  //   ["<=", ["get", "latitude"], latitude.maxLatitude],
  // ];

  return (
    <Source type="geojson" data={earthquakeFeature}>
      <Layer
        id="earthquake"
        type="circle"
        // filter={filter}
        paint={{
          "circle-color": [
            "case",
            ["==", ["get", "depthClass"], "Gempa Dangkal"],
            depthColor[0],
            ["==", ["get", "depthClass"], "Gempa Menengah"],
            depthColor[1],
            depthColor[2],
          ],
          "circle-radius": [
            "case",
            ["==", ["get", "magnitudeClass"], "Gempa Kecil"],
            5,
            ["==", ["get", "magnitudeClass"], "Gempa Menengah"],
            8,
            ["==", ["get", "magnitudeClass"], "Gempa Besar"],
            11,
            15,
          ],
        }}
      />
    </Source>
  );
}

export default Earthquake;
