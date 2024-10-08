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
import { DateRange, Earthquake, useData } from "./DataContext";

// type Year = number;
// type Latitude = {
//   minLatitude: number;
//   maxLatitude: number;
// };
// type Longitude = number;
type Magnitude = {
  minMagnitude: number;
  maxMagnitude: number;
};
type Depth = {
  minDepth: number;
  maxDepth: number;
};
type MagnitudeClass = string;
type DepthClass = string;

interface Filter {
  dateFilter: DateRange;
  setDateFilter: Dispatch<SetStateAction<DateRange>>;
  // year: Year;
  // setYear: Dispatch<SetStateAction<Year>>;
  // latitude: Latitude;
  // setLatitude: Dispatch<SetStateAction<Latitude>>;
  // longitude: Longitude;
  // setLongitude: Dispatch<SetStateAction<Longitude>>;
  magnitude: Magnitude;
  setMagnitude: Dispatch<SetStateAction<Magnitude>>;
  magnitudeClass: MagnitudeClass;
  setMagnitudeClass: Dispatch<SetStateAction<MagnitudeClass>>;
  depth: Depth;
  setDepth: Dispatch<SetStateAction<Depth>>;
  depthClass: DepthClass;
  setDepthClass: Dispatch<SetStateAction<DepthClass>>;
  filteredEarthquake: Earthquake[];
  setFilteredEarthquake: Dispatch<SetStateAction<Earthquake[]>>;
}

const EarthquakeFilter = createContext<Filter>({
  dateFilter: {
    startDate: "",
    endDate: "",
  },
  setDateFilter: () => {},
  // year: 0,
  // setYear: () => {},
  // latitude: {
  //   minLatitude: 0,
  //   maxLatitude: 0,
  // },
  // setLatitude: () => {},
  // longitude: 0,
  // setLongitude: () => {},
  magnitude: {
    minMagnitude: 0,
    maxMagnitude: 0
  },
  setMagnitude: () => {},
  magnitudeClass: "",
  setMagnitudeClass: () => {},
  depth: {
    minDepth: 0,
    maxDepth: 0
  },
  setDepth: () => {},
  depthClass: "",
  setDepthClass: () => {},
  filteredEarthquake: [],
  setFilteredEarthquake: () => {},
});

export const FilterContext: FC<{ children: ReactNode }> = ({ children }) => {
  const {earthquake} = useData()

  const [dateFilter, setDateFilter] = useState<DateRange>({
    startDate: "",
    endDate: "",
  });
  // const [year, setYear] = useState<Year>(0);
  // const [latitude, setLatitude] = useState<Latitude>({
  //   minLatitude: 0,
  //   maxLatitude: 0,
  // });
  // const [longitude, setLongitude] = useState<Longitude>(0);
  const [magnitude, setMagnitude] = useState<Magnitude>({
    minMagnitude: 0,
    maxMagnitude: 0
  });
  const [depth, setDepth] = useState<Depth>({
    minDepth: 0,
    maxDepth: 0
  });
  const [magnitudeClass, setMagnitudeClass] = useState<MagnitudeClass>("");
  const [depthClass, setDepthClass] = useState<DepthClass>("");

  const [filteredEarthquake, setFilteredEarthquake] = useState<Earthquake[]>(
    []
  );

  useEffect(() => {
    setFilteredEarthquake(() => {
      return earthquake.filter((feature) => {
        return (
          new Date(feature.properties.date) >= new Date(dateFilter.startDate) &&
          new Date(feature.properties.date) <= new Date(dateFilter.endDate || dateFilter.startDate) &&
          // (year === 0 || feature.properties.year === year) &&
          // ((latitude.minLatitude === 0 && latitude.maxLatitude === 0) ||
          //   (feature.properties.latitude >= latitude.minLatitude &&
          //     feature.properties.latitude <= latitude.maxLatitude)) &&
          // (longitude === 0 || feature.properties.longitude === longitude) &&
          ((magnitude.minMagnitude === 0 && magnitude.maxMagnitude === 0) ||
            (feature.properties.magnitude >= magnitude.minMagnitude &&
              feature.properties.magnitude <= magnitude.maxMagnitude)) &&
          ((depth.minDepth === 0 && depth.maxDepth === 0) ||
            (feature.properties.depth_km >= depth.minDepth &&
              feature.properties.depth_km <= depth.maxDepth)) &&
          (magnitudeClass === "" ||
            feature.properties.magnitude_class === magnitudeClass) &&
          (depthClass === "" || feature.properties.depth_class === depthClass)
        );
      });
    });
  }, [
    earthquake,
    dateFilter,
    // year,
    // latitude,
    // longitude,
    magnitude,
    depth,
    magnitudeClass,
    depthClass,
  ]);

  return (
    <EarthquakeFilter.Provider
      value={{
        dateFilter,
        setDateFilter,
        // year,
        // setYear,
        // latitude,
        // setLatitude,
        // longitude,
        // setLongitude,
        magnitude,
        setMagnitude,
        magnitudeClass,
        setMagnitudeClass,
        depth,
        setDepth,
        depthClass,
        setDepthClass,
        filteredEarthquake,
        setFilteredEarthquake,
      }}
    >
      {children}
    </EarthquakeFilter.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(EarthquakeFilter)

  return context
}
