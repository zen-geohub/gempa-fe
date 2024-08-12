import { EarthquakeData } from "@/contexts/DataContext";
import { DeckGL } from "@deck.gl/react";
import Map, { Layer, Source, useMap } from "react-map-gl/maplibre";
import { useContext, useEffect, useState } from "react";
import { LayersList } from "@deck.gl/core";
import { useTheme } from "@/components/theme-provider";
import type { FeatureCollection } from "geojson";
import { FilterSpecification } from "maplibre-gl";
import { depthColor } from "@/styles/dataStyle";
import { HeatmapLayer, HexagonLayer } from "@deck.gl/aggregation-layers";
import { EarthquakeFilter } from "@/contexts/FilterContext";

interface Map2DProps {
  earthquakeLayer: boolean;
  hexagonLayer: boolean;
  heatmapLayer: boolean;
  faultLayer: boolean;
  seismicLayer: boolean;
}

type DataPoint = [latitude: number, longitude: number, count?: number];

function SensorSeismik() {
  const {current: map} = useMap();

  useEffect(() => {
    (async() => {
      const image = await map?.loadImage('https://inatews.bmkg.go.id/assets_inatews/img/sensor.png')
      if (map && image && !map.hasImage('sensor')) map.addImage('sensor', image.data);
    })()
  })

  return (
    <Source
      type="vector"
      scheme="tms"
      tiles={[`${import.meta.env.VITE_GEOSERVER}/gwc/service/tms/1.0.0/ppids:sensorseismik_indonesia@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`]}
    >
      <Layer type="symbol" source-layer="sensorseismik_indonesia" layout={{"icon-image": 'sensor', "icon-size": 0.05, "icon-allow-overlap": true}}/>
    </Source>
  )
}

function FaultWorld() {
  return (
    <Source
      type="vector"
      scheme="tms"
      tiles={[`${import.meta.env.VITE_GEOSERVER}/gwc/service/tms/1.0.0/ppids:fault_world@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`]}
    >
      <Layer type="line" source-layer="fault_world" paint={{"line-color": "#e6cc00", "line-width": 1, }}/>
    </Source>
  )
}

function Map2D({ earthquakeLayer, heatmapLayer, hexagonLayer, faultLayer, seismicLayer }: Map2DProps) {
  const { earthquake } = useContext(EarthquakeData);
  const { dateFilter, latitude, filteredEarthquake } = useContext(EarthquakeFilter);
  const { theme } = useTheme();
  const [earthquakeFeature, setEarthquakeFeature] = useState<FeatureCollection>();

  const [filteredData, setFilteredData] = useState<DataPoint[]>([]);

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
  }, [earthquake]);

  const layers: LayersList = [];

  useEffect(() => {
    setFilteredData(
      filteredEarthquake.map((feature) => [
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1],
        1,
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
  }

  const filter: FilterSpecification = [
    "all",
    [">=", ["get", "date"], dateFilter.startDate],
    ["<=", ["get", "date"], dateFilter.endDate || dateFilter.startDate],
    [">=", ["get", "latitude"], latitude.minLatitude],
    ["<=", ["get", "latitude"], latitude.maxLatitude],
  ];

  return (
    <DeckGL
      initialViewState={{
        latitude: -1.5970319028936064,
        longitude: 116.90854467352956,
        zoom: 4,
      }}
      controller
      layers={layers}
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
        {seismicLayer && <SensorSeismik />}
        {faultLayer && <FaultWorld />}
        {earthquakeLayer && earthquakeFeature && (
          <Source type="geojson" data={earthquakeFeature}>
            <Layer
              type="circle"
              filter={filter}
              paint={{
                "circle-color": [
                  "case",
                  ["==", ["get", "depth_class"], "Gempa Dangkal"],
                  depthColor[0],
                  ["==", ["get", "depth_class"], "Gempa Menengah"],
                  depthColor[1],
                  depthColor[2],
                ],
                "circle-radius": [
                  "case",
                  ["==", ["get", "magnitude_class"], "Gempa Kecil"],
                  3,
                  ["==", ["get", "magnitude_class"], "Gempa Menengah"],
                  6,
                  ["==", ["get", "magnitude_class"], "Gempa Besar"],
                  9,
                  15,
                ],
              }}
            />
          </Source>
        )}
        
        
      </Map>
    </DeckGL>
  );
}

export default Map2D;
