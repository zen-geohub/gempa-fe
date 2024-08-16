import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import type { FeatureCollection } from "geojson";
import { toast } from "sonner";

export type EarthquakeProperties = {
  date: Date;
  year: number;
  latitude: number;
  longitude: number;
  magnitude: number;
  magnitude_class: string;
  depth_km: number;
  depth_class: string;
};

export type EarthquakeGeometry = {
  type: string;
  coordinates: Array<number>;
};

export type Earthquake = {
  // _id: string;
  type: string;
  properties: EarthquakeProperties;
  geometry: EarthquakeGeometry;
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
  loadingState: boolean;
  setLoadingState: Dispatch<SetStateAction<boolean>>;
  setEarthquake: Dispatch<SetStateAction<Earthquake[]>>;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
}

const EarthquakeData = createContext<EarthquakeContext>({
  indonesiaJSON: {
    type: "FeatureCollection",
    features: [],
  },
  earthquake: [],
  dateRange: {
    startDate: "",
  },
  loadingState: false,
  setLoadingState: () => {},
  setEarthquake: () => {},
  setDateRange: () => {},
});

export const DataContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [earthquake, setEarthquake] = useState<Earthquake[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: "",
  });
  const [indonesiaJSON, setIndonesiaJSON] = useState<IndonesiaJSON>({
    type: "FeatureCollection",
    features: [],
  });
  const [loadingState, setLoadingState] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia.geojson"
        );
        const data = await response.json();
        setIndonesiaJSON({
          type: "FeatureCollection",
          features: data.features.map((feature: Feature) => {
            return {
              type: "Feature",
              geometry: {
                type: "MultiPolygon",
                coordinates: feature.geometry.coordinates,
              },
            };
          }),
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    setEarthquake([]);

    const fetchData = async (startDate: string, endDate: string) => {
      setLoadingState(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND
          }/data?startDate=${startDate}&endDate=${endDate}`,
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        toast('Data berhasil ditambahkan 🎉')

        const data = await response.json();
        setEarthquake(data);
      } catch (err) {
        console.error("Failed to fetch earthquake data:", err);
        toast('Data gagal ditambahkan 😔')
      } finally {
        setLoadingState(false);
      }
    };
    
    dateRange.endDate && dateRange.startDate && fetchData(dateRange.startDate, dateRange.endDate);
  }, [dateRange]);

  return (
    <EarthquakeData.Provider
      value={{
        indonesiaJSON,
        earthquake,
        dateRange,
        loadingState,
        setLoadingState,
        setEarthquake,
        setDateRange,
      }}
    >
      {children}
    </EarthquakeData.Provider>
  );
};

export const useData = () => {
  const context = useContext(EarthquakeData);

  return context;
};
