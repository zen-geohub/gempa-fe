import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
} from "chart.js";
import { ModalProps } from "./EarthquakeDistibution";
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SizeIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

ChartJS.register({
  LineElement,
});

function LineChart({ asModal }: ModalProps) {
  const {theme} = useTheme()

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
        maintainAspectRatio: asModal ? false : false,
        plugins: {
          legend: {
            display: asModal ? true : false,
          },
          datalabels: {
            display: false
          }
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
              color: theme === 'light' ? '#dddddd' : '#18181A'
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
              color: theme === 'light' ? '#dddddd' : '#18181A'
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
  const {theme} = useTheme()

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
          <DialogTitle className={cn(theme === 'light' ? 'text-black' : 'text-white', 'text-sm')}>Frekuensi Gempa per Tahun</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full flex justify-center items-center">
          <LineChart asModal />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EarthquakeFrequency;
