import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ModalProps } from "./EarthquakeDistibution";
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SizeIcon } from "@radix-ui/react-icons";

ChartJS.register({
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
});

function LineChart({ asModal }: ModalProps) {
  const chartData = {
    '2004': 2958,
    '2005': 5904,
    '2006': 3507,
    '2007': 3391,
    '2008': 3065,
    '2009': 1226,
    '2010': 5053,
    '2011': 4441,
    '2012': 5205,
    '2013': 1569,
    '2014': 849,
    '2015': 862,
    '2016': 833,
    '2017': 797,
    '2018': 1881,
    '2019': 6165,
    '2020': 8846,
    '2021': 11199,
    '2022': 10163,
    '2023': 3990,
  }
  
  return (
    <Line
      options={{
        maintainAspectRatio: asModal ? true : false,
        plugins: {
          legend: {
            display: asModal ? true : false,
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
            label: 'Frekuensi Gempa',
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
        <CardContent className="p-0 mb-1 max-h-16">
          <LineChart />
        </CardContent>
      </Card>
      <DialogContent className="w-full h-4/5">
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle>Frekuensi Gempa per Tahun</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full flex justify-center items-center">
          <LineChart asModal />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EarthquakeFrequency;
