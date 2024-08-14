import { useEffect } from "react";
import { Source, Layer, useMap } from "react-map-gl/maplibre";

function SeismicSensor() {
  const { current: map } = useMap();

  useEffect(() => {
    (async () => {
      const image = await map?.loadImage(
        "https://inatews.bmkg.go.id/assets_inatews/img/sensor.png"
      );
      if (map && image && !map.hasImage("sensor"))
        map.addImage("sensor", image.data);
    })();
  });

  return (
    <Source
      type="vector"
      scheme="tms"
      tiles={[
        `${
          import.meta.env.VITE_GEOSERVER
        }/gwc/service/tms/1.0.0/ppids:sensorseismik_indonesia@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
      ]}
    >
      <Layer
        type="symbol"
        source-layer="sensorseismik_indonesia"
        layout={{
          "icon-image": "sensor",
          "icon-size": 0.05,
          "icon-allow-overlap": true,
        }}
      />
    </Source>
  );
}

export default SeismicSensor;
