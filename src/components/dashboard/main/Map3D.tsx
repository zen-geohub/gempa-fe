import { useData } from "@/contexts/DataContext";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { depthColor } from "@/styles/dataStyle";
import { useFilter } from "@/contexts/FilterContext";
import { useTheme } from "@/components/theme-provider";

interface CustomGeometry {
  latitudes: number[];
  longitudes: number[];
  depth?: number[];
}

function Map3D() {
  const {theme} = useTheme()
  const {indonesiaJSON} = useData()
  const {filteredEarthquake} = useFilter()
  const [earthquakeData, setEarthquakeData] = useState<CustomGeometry>({
    latitudes: [],
    longitudes: [],
    depth: []
  })

  const idLatitude: Array<number | null> = []
  const idLongitude: Array<number | null> = []

  indonesiaJSON.features.forEach(feature => {
    feature.geometry.type === 'MultiPolygon' &&
    feature.geometry.coordinates.forEach(polyg => {
      polyg[0].forEach(point => {
          idLongitude.push(point[0]);
          idLatitude.push(point[1]);
      });
      idLongitude.push(null);
      idLatitude.push(null);
    });
  })

  useEffect(() => {
    setEarthquakeData({
      latitudes: [],
      longitudes: [],
      depth: []
    })

    setEarthquakeData({
      latitudes: filteredEarthquake.map(feature => feature.geometry.coordinates[1]),
      longitudes: filteredEarthquake.map(feature => feature.geometry.coordinates[0]),
      depth: filteredEarthquake.map(feature => feature.properties.depth_km * -1)
    })
  }, [filteredEarthquake])

  return (
    <Plot 
      data={[
        {
          type: 'scatter3d',
          mode: 'lines',
          x: idLongitude,
          y: idLatitude,
          z: idLatitude.map(item => item !== null ? item * 0 : null),
          line: { color: '#4292c6' },
          name: 'Indonesia Map',
          hoverinfo: 'skip',
        },
        {
          type: 'scatter3d',
          mode: 'markers',
          x: earthquakeData.longitudes,
          y: earthquakeData.latitudes,
          z: earthquakeData.depth,
          marker: {
            size: filteredEarthquake.map(feature => {
              if (feature.properties.magnitude_class === 'Gempa Kecil') {
                return 5
              } else if (feature.properties.magnitude_class === 'Gempa Menengah') {
                return 8
              } else if (feature.properties.magnitude_class === 'Gempa Besar') {
                return 11
              } else {
                return 15
              }
            }),
            color: filteredEarthquake.map(feature => {
              if (feature.properties.depth_class === 'Gempa Dangkal') {
                return depthColor[0]
              } else if (feature.properties.depth_class === 'Gempa Menengah') {
                return depthColor[1]
              } else {
                return depthColor[2]
              }
            }),
            line: {
              width: 0
            }
          }
        }
      ]}
      layout={{
        paper_bgcolor: theme === 'light' ? "#FFF" : "#020617",
        scene: {
          xaxis: { 
            title: 'Bujur', 
            range: [91.64043031, 141.3908] 
          },
          yaxis: { 
            title: 'Lintang', 
            range: [-13.9366, 7.78333452] 
          },
          zaxis: { title: 'Kedalaman (km)' },
          camera: {
            eye: {x: 0, y: -2, z: 1},
          },
          aspectratio: { x: 2, y: 1, z: 0.5 },
        },
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 0
        },
      }}
      config={{displayModeBar: false}}
      className="w-full h-full"
    />
  )
}

export default Map3D;