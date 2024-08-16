import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface Layer {
  megathrustLayer: boolean;
  faultLayer: boolean;
  seismicLayer: boolean;
  earthquakeLayer: boolean;
  heatmapLayer: boolean;
  hexagonLayer: boolean;
  setMegathrustLayer: Dispatch<SetStateAction<boolean>>;
  setFaultLayer: Dispatch<SetStateAction<boolean>>;
  setSeismicLayer: Dispatch<SetStateAction<boolean>>;
  setEarthquakeLayer: Dispatch<SetStateAction<boolean>>;
  setHeatmapLayer: Dispatch<SetStateAction<boolean>>;
  setHexagonLayer: Dispatch<SetStateAction<boolean>>;
}

const Layer = createContext<Layer>({
  megathrustLayer: false,
  faultLayer: false,
  seismicLayer: false,
  earthquakeLayer: true,
  heatmapLayer: false,
  hexagonLayer: false,
  setMegathrustLayer: () => {},
  setFaultLayer: () => {},
  setSeismicLayer: () => {},
  setEarthquakeLayer: () => {},
  setHeatmapLayer: () => {},
  setHexagonLayer: () => {},
});

export const LayerContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [earthquakeLayer, setEarthquakeLayer] = useState<boolean>(true);
  const [heatmapLayer, setHeatmapLayer] = useState<boolean>(false);
  const [hexagonLayer, setHexagonLayer] = useState<boolean>(false);
  const [faultLayer, setFaultLayer] = useState<boolean>(false);
  const [megathrustLayer, setMegathrustLayer] = useState<boolean>(false);
  const [seismicLayer, setSeismicLayer] = useState<boolean>(false);

  return (
    <Layer.Provider
      value={{
        earthquakeLayer,
        faultLayer,
        heatmapLayer,
        hexagonLayer,
        megathrustLayer,
        seismicLayer,
        setEarthquakeLayer,
        setFaultLayer,
        setHeatmapLayer,
        setHexagonLayer,
        setMegathrustLayer,
        setSeismicLayer,
      }}
    >
      {children}
    </Layer.Provider>
  );
};

export const useLayer = () => {
  const context = useContext(Layer);

  return context;
};
