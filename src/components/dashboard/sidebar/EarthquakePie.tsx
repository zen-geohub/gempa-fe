import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTheme } from "@/components/theme-provider";
import { depthColor } from "@/styles/dataStyle";

ChartJS.register({
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
});

export interface MagnitudePie {
  "Gempa Kecil": number;
  "Gempa Menengah": number;
  "Gempa Besar": number;
  "Gempa Megathrust": number;
}

export interface DepthPie {
  "Gempa Dangkal": number;
  "Gempa Menengah": number;
  "Gempa Dalam": number;
}

type Props = {
  value: DepthPie | MagnitudePie;
  title: string;
};

function EarthquakePie({value, title}: Props) {
  const {theme} = useTheme()

  return (
    <>
      <Card className="h-fit lg:min-h-56 flex-grow">
        <CardHeader className="p-0 mt-1 text-center">
          <CardDescription className="text-xs">
            Klasifikasi Gempa
          </CardDescription>
          <CardTitle className="text-sm" style={{ marginTop: 0 }}>
            Berdasarkan {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2 mb-1 text-center">
          <Pie className=""
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                  position: "chartArea",
                  labels: {
                    boxWidth: 16,
                  },
                },
                datalabels: {
                  display: 'auto',
                  color: theme === 'light' ? 'black' : 'white',
                  font: {
                    weight: 'bold'
                  },
                }
              },
            }}
            data={{
              labels: Object.keys(value),
              datasets: [
                {
                  data: Object.values(value),
                  backgroundColor: depthColor,
                  borderWidth: 0
                },
              ],
            }}
          />
        </CardContent>
      </Card>
    </>
  )
}

export default EarthquakePie;