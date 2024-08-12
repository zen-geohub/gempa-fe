import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

type DateFilter = {
  startDate: string;
  endDate: string;
};

type Year = number;
type Latitude = number;
type Longitude = number;
type Magnitude = number;
type Depth = number;
type MagnitudeClass = string
type DepthClass = string

interface Filter {
  date: DateFilter;
  setDate: Dispatch<SetStateAction<DateFilter>>;
  year: Year;
  setYear: Dispatch<SetStateAction<Year>>
  latitude: Latitude;
  setLatitude: Dispatch<SetStateAction<Latitude>>
  longitude: Longitude;
  setLongitude: Dispatch<SetStateAction<Longitude>>
  magnitude: Magnitude;
  setMagnitude: Dispatch<SetStateAction<Magnitude>>
  magnitudeClass: MagnitudeClass
  setMagnitudeClass: Dispatch<SetStateAction<MagnitudeClass>>
  depth: Depth;
  setDepth: Dispatch<SetStateAction<Depth>>
  depthClass: DepthClass
  setDepthClass: Dispatch<SetStateAction<DepthClass>>
}

export const EarthquakeFilter = createContext<Filter>({
  date: {
    startDate: "",
    endDate: "",
  },
  setDate: () => {},
  year: 0,
  setYear: () => {},
  latitude: 0,
  setLatitude: () => {},
  longitude: 0,
  setLongitude: () => {},
  magnitude: 0,
  setMagnitude: () => {},
  magnitudeClass: '',
  setMagnitudeClass: () => {},
  depth: 0,
  setDepth: () => {},
  depthClass: '',
  setDepthClass: () => {},
});

const FilterContext: FC<{children: ReactNode}> = ({children}) => {
  const [date, setDate] = useState<DateFilter>({
    startDate: '',
    endDate: ''
  })
  const [year, setYear] = useState<Year>(0)
  const [latitude, setLatitude] = useState<Latitude>(0)
  const [longitude, setLongitude] = useState<Longitude>(0)
  const [magnitude, setMagnitude] = useState<Magnitude>(0)
  const [depth, setDepth] = useState<Depth>(0)
  const [magnitudeClass, setMagnitudeClass] = useState<MagnitudeClass>('')
  const [depthClass, setDepthClass] = useState<DepthClass>('')

  return (
    <EarthquakeFilter.Provider value={{date, setDate, year, setYear, latitude, setLatitude, longitude, setLongitude, magnitude, setMagnitude, magnitudeClass, setMagnitudeClass, depth, setDepth, depthClass, setDepthClass}}>
      {children}
    </EarthquakeFilter.Provider>
  )
}

export default FilterContext;