import { Source, Layer } from "react-map-gl/maplibre";

function Megathrust() {
  return (
    <Source 
      type="vector"
      scheme="tms"
      tiles={[`${import.meta.env.VITE_GEOSERVER}/gwc/service/tms/1.0.0/ppids:megathrust@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`]}
    >
      <Layer type="fill" source-layer="megathrust" 
        paint={{
          "fill-color": '#edf8b1',
          "fill-opacity": 0.3
        }} 
      />
    </Source>
  )
}

export default Megathrust