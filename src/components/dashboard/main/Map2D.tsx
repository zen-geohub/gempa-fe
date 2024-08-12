import { EarthquakeData } from '@/contexts/DataContext';
import {DeckGL} from '@deck.gl/react';
import Map, { Layer, Source } from 'react-map-gl/maplibre'
import { useContext, useEffect, useState } from 'react';
import { LayersList } from '@deck.gl/core';
import { useTheme } from '@/components/theme-provider';
import type {FeatureCollection} from 'geojson'
import { depthColor } from '@/styles/dataStyle';
import { HeatmapLayer, HexagonLayer } from '@deck.gl/aggregation-layers'

interface Map2DProps {
  earthquakeLayer: boolean;
  hexagonLayer: boolean;
  heatmapLayer: boolean;
}

type DataPoint = [latitude: number, longitude: number, count?: number]

function Map2D({earthquakeLayer, heatmapLayer, hexagonLayer}: Map2DProps) {
  const {earthquake} = useContext(EarthquakeData)
  const {theme} = useTheme()
  const [earthquakeFeature, setEarthquakeFeature] = useState<FeatureCollection>()

  useEffect(() => {
    setEarthquakeFeature({
      'type': 'FeatureCollection',
      'features': earthquake.map((feature) => ({
        'type': 'Feature',
        'properties': {
          'date': feature.properties['date'],
          'year': feature.properties['year'],
          'latitude': feature.properties['latitude'],
          'longitude': feature.properties['longitude'],
          'magnitude': feature.properties['magnitude'],
          'magnitude_class': feature.properties['magnitude_class'],
          'depth_km': feature.properties['depth_km'],
          'depth_class': feature.properties['depth_class']
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [feature.geometry.coordinates[0], feature.geometry.coordinates[1]]
        }
      }))
    })
  }, [earthquake])

  const layers: LayersList = []

  if (heatmapLayer) {
    const data: DataPoint[] = earthquake.map(feature => {
      return [
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1],
        1
      ]
    })

    layers.push(
      new HeatmapLayer<DataPoint>({
        data: data,
        id: 'heatmap-layer',
        pickable: false,
        getPosition: d => [d[0], d[1]],
        getWeight: d => d[2] || 1,
      })
    )
  }

  if (hexagonLayer) {
    const data: DataPoint[] = earthquake.map(feature => {
      return [
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1],
      ]
    })

    layers.push(
      new HexagonLayer<DataPoint>({
        data: data,
        extruded: true,
        colorRange: [
          [1, 152, 189],
          [73, 227, 206],
          [216, 254, 181],
          [254, 237, 177],
          [254, 173, 84],
          [209, 55, 78]
        ],
        getPosition: d => [d[0], d[1]],
        elevationRange: [0, 3000],
        elevationScale: 100,
        radius: 50000,
        coverage: 0.95,
        material: {
          ambient: 0.64,
          diffuse: 0.6,
          shininess: 32,
          specularColor: [51, 51, 51]
        },
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
    >
      <Map
        reuseMaps
        attributionControl={false}
        mapStyle={theme === 'light' ? 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json' : 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'}
      >
        {earthquakeLayer && earthquakeFeature &&
          <Source type='geojson' data={earthquakeFeature}>
            <Layer 
              type='circle'
              paint={{
                "circle-color": [
                  'case',
                  ['==', ['get', 'depth_class'], 'Gempa Dangkal'],
                  depthColor[0],
                  ['==', ['get', 'depth_class'], 'Gempa Menengah'],
                  depthColor[1],
                  depthColor[2],
                ],
                "circle-radius": [
                  'case',
                  ['==', ['get', 'magnitude_class'], 'Gempa Kecil'],
                  3,
                  ['==', ['get', 'magnitude_class'], 'Gempa Menengah'],
                  6,
                  ['==', ['get', 'magnitude_class'], 'Gempa Besar'],
                  9,
                  15
                ],
              }} 
            />
          </Source>
        }
      </Map>
    </DeckGL>
  )
}

export default Map2D;