import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement } from "chart.js";
import { ModalProps } from "./EarthquakeDistibution";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SizeIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

ChartJS.register({
  LineElement,
});

function LineChart({ asModal }: ModalProps) {
  const { theme } = useTheme();

  const chartData = {
    "2004": 1877,
    "2005": 3312,
    "2006": 2556,
    "2007": 2472,
    "2008": 2105,
    "2009": 3470,
    "2010": 6120,
    "2011": 4429,
    "2012": 6525,
    "2013": 3842,
    "2014": 4593,
    "2015": 5250,
    "2016": 5541,
    "2017": 7057,
    "2018": 5323,
    "2019": 9968,
    "2020": 8941,
    "2021": 11038,
    "2022": 10299,
    "2023": 11138,
  };

  return (
<Line
  options={{
    maintainAspectRatio: asModal ? false : false,
    plugins: {
      legend: {
        display: asModal ? true : false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          display: asModal ? true : false,
        },
        title: {
          display: true,
          text: "Frekuensi",
        },
        grid: {
          color: theme === "light" ? "#dddddd" : "#18181A",
        },
      },
      x: {
        ticks: {
          display: asModal ? true : false,
          // callback: function (value, index, ticks) {
          //   const year = this.getLabelForValue(value);
          //   // Show labels for every 2 years
          //   if (year % 4 === 0) {
          //     return year;
          //   }
          //   return "";
          // },
        },
        grid: {
          color: theme === "light" ? "#dddddd" : "#18181A",
        },
        title: {
          display: true,
          text: "Tahun",
        },
      },
    },
  }}
  data={{
    labels: Object.keys(chartData),
    datasets: [
      {
        label: "Frekuensi Gempa",
        data: Object.values(chartData),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
    ],
  }}
/>
  );
}

function EarthquakeFrequency() {
  const { theme } = useTheme();

  return (
    <Dialog>
      <Card className="w-1/2 h-full relative">
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="p-1 h-fit w-fit absolute top-0 right-0"
          >
            <SizeIcon />
          </Button>
        </DialogTrigger>
        <CardHeader className="p-0 text-center">
          <CardTitle className="text-sm">Frekuensi Gempa per Tahun</CardTitle>
        </CardHeader>
        <CardContent className="p-0 mb-1 h-fit lg:max-h-16">
          <LineChart />
        </CardContent>
      </Card>
      <DialogContent className="w-4/5 py-2 px-1 h-5/6">
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle
            className={cn(
              theme === "light" ? "text-black" : "text-white",
              "text-sm"
            )}
          >
            Frekuensi Gempa per Tahun
          </DialogTitle>
        </DialogHeader>
        <div className="w-full h-full flex justify-center items-center">
          <LineChart asModal />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EarthquakeFrequency;
