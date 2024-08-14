import { DeckGL } from "@deck.gl/react";
import Map from "react-map-gl/maplibre";
import { useEffect, useState } from "react";
import { LayersList } from "@deck.gl/core";
import { useTheme } from "@/components/theme-provider";
import { HeatmapLayer, HexagonLayer } from "@deck.gl/aggregation-layers";
import { useFilter } from "@/contexts/FilterContext";
import SeismicSensor from "./Map2D/SeismicSensor";
import Fault from "./Map2D/Fault";
import Megathrust from "./Map2D/Megathrust";
// import Earthquake from "./Map2D/Earthquake";
import { GeoJsonLayer } from "@deck.gl/layers";
import type { FeatureCollection, Feature, Geometry } from "geojson";
import { EarthquakeProperties, useData } from "@/contexts/DataContext";
import Loading from "@/components/Loading";

interface Map2DProps {
  earthquakeLayer: boolean;
  hexagonLayer: boolean;
  heatmapLayer: boolean;
  faultLayer: boolean;
  seismicLayer: boolean;
}

type DataPoint = [
  latitude: number,
  longitude: number,
  count: number,
  depth_class: string,
  magnitude_class: string
];

function Map2D({
  earthquakeLayer,
  heatmapLayer,
  hexagonLayer,
  faultLayer,
  seismicLayer,
}: Map2DProps) {
  const layers: LayersList = [];
  const { filteredEarthquake } = useFilter();
  const {loadingState} = useData()
  const { theme } = useTheme();
  const [filteredData, setFilteredData] = useState<DataPoint[]>([]);

  // const { earthquake } = useData();
  const [earthquakeFeature, setEarthquakeFeature] = useState<FeatureCollection>();
  
  useEffect(() => {
    setEarthquakeFeature({
      type: "FeatureCollection",
      features: filteredEarthquake.map((feature) => ({
        type: "Feature",
        properties: {
          date: feature.properties["date"],
          year: feature.properties["year"],
          latitude: feature.properties["latitude"],
          longitude: feature.properties["longitude"],
          magnitude: feature.properties["magnitude"],
          magnitude_class: feature.properties["magnitude_class"],
          depth_km: feature.properties["depth_km"],
          depth_class: feature.properties["depth_class"],
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
  }, [filteredEarthquake]);

  useEffect(() => {
    setFilteredData(
      filteredEarthquake.map((feature) => [
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1],
        1,
        feature.properties["depth_class"],
        feature.properties["magnitude_class"],
      ])
    );
  }, [filteredEarthquake]);

  if (heatmapLayer) {
    layers.push(
      new HeatmapLayer<DataPoint>({
        data: filteredData,
        id: "heatmap-layer",
        pickable: false,
        getPosition: (d) => [d[0], d[1]],
        getWeight: (d) => d[2] || 1,
      })
    );
  }

  if (hexagonLayer) {
    layers.push(
      new HexagonLayer<DataPoint>({
        data: filteredData,
        extruded: true,
        colorRange: [
          [1, 152, 189],
          [73, 227, 206],
          [216, 254, 181],
          [254, 237, 177],
          [254, 173, 84],
          [209, 55, 78],
        ],
        getPosition: (d) => [d[0], d[1]],
        elevationRange: [0, 3000],
        elevationScale: 100,
        radius: 50000,
        coverage: 0.95,
        material: {
          ambient: 0.64,
          diffuse: 0.6,
          shininess: 32,
          specularColor: [51, 51, 51],
        },
      })
    );
    console.log("hehee");
  }

  if (earthquakeLayer) {
    layers.push(
      new GeoJsonLayer({
        data: earthquakeFeature,
        filled: true,
        stroked: false,
        pointType: 'circle',

        getPointRadius: (f: Feature<Geometry, EarthquakeProperties>) => {
          if (f.properties.magnitude_class === 'Gempa Kecil') {
            return 4
          } else if (f.properties.magnitude_class === 'Gempa Menengah') {
            return 8
          } else if (f.properties.magnitude_class === 'Gempa Besar') {
            return 12
          }
          return 15
        },
        pointRadiusScale: 1000,
        pointRadiusUnits: 'meters',
        getFillColor: [255,255,255,255],
        pickable: true,
        autoHighlight: true,
      })
    )
  }

  return (
    <DeckGL
      initialViewState={{
        latitude: -1.5970319028936064,
        longitude: 116.90854467352956,
        zoom: 4,
      }}
      controller
      layers={layers}
      getTooltip={
        ({object}) => object && 
        `Tanggal: ${object.properties.date}
        Tahun: ${object.properties.year}
        Magnitudo: ${object.properties.magnitude}
        Kelas Magnitudo: ${object.properties.magnitude_class}
        Kedalaman (km): ${object.properties.depth_km}
        Kelas Kedalaman: ${object.properties.depth_class}
        `
      }
      onClick={({object}) => object && console.log(object)}
      
    >
      <Map
        reuseMaps
        attributionControl={false}
        mapStyle={
          theme === "light"
            ? "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            : "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        }
      >
        {seismicLayer && <SeismicSensor />}
        {faultLayer && <Fault />}
        {faultLayer && <Megathrust />}
        
        {/* {earthquakeLayer && <Earthquake />} */}
      </Map>
    </DeckGL>
  );
}

export default Map2D;
