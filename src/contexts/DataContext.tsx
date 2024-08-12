import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import type {FeatureCollection} from 'geojson'

export type Earthquake = {
  _id: string;
  type: string;
  properties: {
    date: Date;
    year: number;
    latitude: number;
    longitude: number;
    magnitude: number;
    magnitude_class: string;
    depth_km: number;
    depth_class: string;
  };
  geometry: {
    type: string;
    coordinates: Array<number>;
  };
};

export type DateRange = {
  startDate: string;
  endDate?: string;
};

export interface GeometryWithCoordinates {
  type: string;
  coordinates: number[][][];
}

export interface Feature {
  type: string;
  geometry: GeometryWithCoordinates;
}

type IndonesiaJSON = FeatureCollection;

interface EarthquakeContext {
  indonesiaJSON: IndonesiaJSON;
  earthquake: Earthquake[];
  dateRange: DateRange;
  setEarthquake: Dispatch<SetStateAction<Earthquake[]>>;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
}

export const EarthquakeData = createContext<EarthquakeContext>({
  indonesiaJSON: {
    type: 'FeatureCollection',
    features: []
  },
  earthquake: [],
  dateRange: {
    startDate: "",
  },
  setEarthquake: () => {},
  setDateRange: () => {},
});

const DataContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [earthquake, setEarthquake] = useState<Earthquake[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: "",
  });
  const [indonesiaJSON, setIndonesiaJSON] = useState<IndonesiaJSON>({
    'type': 'FeatureCollection',
    'features': []
  })

  useEffect(() => {
    (async() => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia.geojson')
        const data = await response.json()
        setIndonesiaJSON({
          'type': 'FeatureCollection',
          'features': data.features.map((feature: Feature) => {
            return {
              'type': 'Feature',
              'geometry': {
                'type': 'MultiPolygon',
                'coordinates': feature.geometry.coordinates
              }
            }
          })
        })
      } catch (error) {
        console.log(error);
      }
    })()
  },[])

  useEffect(() => {
    setEarthquake([])

    if (dateRange.endDate) {
      fetch(`${import.meta.env.VITE_BACKEND}/data?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`, {method: 'GET'})
      .then(response => response.json())
      .then(data => setEarthquake(data))
      .catch(err => console.log(err))
    } else if (dateRange.startDate) {
      fetch(`${import.meta.env.VITE_BACKEND}/data?startDate=${dateRange.startDate}&endDate=${dateRange.startDate}`, {method: 'GET'})
      .then(response => response.json())
      .then(data => setEarthquake(data))
      .catch(err => console.log(err))
    }
  }, [dateRange])

  return (
    <EarthquakeData.Provider
      value={{indonesiaJSON, earthquake, dateRange, setEarthquake, setDateRange }}
    >
      {children}
    </EarthquakeData.Provider>
  );
};

export default DataContext;
