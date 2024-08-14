import { useTheme } from "@/components/theme-provider";
import { Source, Layer } from "react-map-gl/maplibre";

function Fault() {
  const { theme } = useTheme();

  return (
    <Source
      type="vector"
      scheme="tms"
      tiles={[
        `${
          import.meta.env.VITE_GEOSERVER
        }/gwc/service/tms/1.0.0/ppids:fault_indo@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
      ]}
    >
      <Layer
        type="line"
        source-layer="fault_indo"
        paint={{
          "line-color": "#e6cc00",
          "line-width": 1,
        }}
      />
      <Layer
        type="symbol"
        source-layer="fault_indo"
        layout={{
          "text-field": ["get", "fault"],
          "text-size": 12,
          "text-font": ["Open Sans Regular"],
          "symbol-placement": "line-center",
        }}
        paint={{
          "text-color": theme === "light" ? "#000" : "#FFF",
        }}
      />
    </Source>
  );
}

export default Fault;
