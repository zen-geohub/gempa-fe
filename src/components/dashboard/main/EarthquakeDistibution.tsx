import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  PointElement,
} from "chart.js";
import "chartjs-adapter-moment";
import { DateRange, useData } from "@/contexts/DataContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SizeIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { depthColor } from "@/styles/dataStyle";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

ChartJS.register({
  TimeScale,
  PointElement,
});

export type ModalProps = { asModal?: boolean };

function ScatterChart({ asModal }: ModalProps) {
  const { earthquake, dateRange } = useData();
  const {theme} = useTheme()
  const [date, setDate] = useState<DateRange>({
    startDate: '',
    endDate: ''
  })

  useEffect(() => {
    const startString = new Date(dateRange.startDate)
    const endString = dateRange.endDate ? new Date(dateRange.endDate) : startString

    setDate({
      startDate: `${String(startString.getDate()).padStart(2, '0')}/${String(startString.getMonth() + 1).padStart(2, '0')}/${String(startString.getFullYear())}`,
      endDate: `${String(endString.getDate()).padStart(2, '0')}/${String(endString.getMonth() + 1).padStart(2, '0')}/${String(endString.getFullYear())}`,
    })
  }, [dateRange])

  return (
    <Bubble
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
              text: "Magnitude",
            },
            grid: {
              color: theme === 'light' ? '#dddddd' : '#18181A'
            },
          },
          x: {
            type: "time",
            time: {
              parser: "YYYY-M-D",
              unit: "day",
              displayFormats: {
                day: "D MMM YYYY",
              },
              tooltipFormat: "D MMM YYYY",
            },
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
              text: `${date.startDate} s.d. ${date.endDate}`,
            },
          },
        },
      }}
      data={{
        datasets: [
          {
            label: "Gempa Dangkal",
            data: earthquake.filter(feature => feature.properties['depth_class'] === 'Gempa Dangkal').map((feature) => {
              return {
                x: new Date(feature.properties["date"]).toISOString(),
                y: feature.properties["magnitude"],
                r: feature.properties['magnitude_class'] === 'Gempa Kecil' ? 3 : feature.properties['magnitude_class'] === 'Gempa Menengah' ? 5 : feature.properties['magnitude_class'] === 'Gempa Besar' ? 7 : 9
              };
            }),
            backgroundColor: depthColor[0],
            borderColor: depthColor[0],
          },
          {
            label: "Gempa Menengah",
            data: earthquake.filter(feature => feature.properties['depth_class'] === 'Gempa Menengah').map((feature) => {
              return {
                x: new Date(feature.properties["date"]).toISOString(),
                y: feature.properties["magnitude"],
                r: feature.properties['magnitude_class'] === 'Gempa Kecil' ? 3 : feature.properties['magnitude_class'] === 'Gempa Menengah' ? 5 : feature.properties['magnitude_class'] === 'Gempa Besar' ? 7 : 9
              };
            }),
            backgroundColor: depthColor[1],
            borderColor: depthColor[1],
          },
          {
            label: "Gempa Dalam",
            data: earthquake.filter(feature => feature.properties['depth_class'] === 'Gempa Dalam').map((feature) => {
              return {
                x: new Date(feature.properties["date"]).toISOString(),
                y: feature.properties["magnitude"],
                r: feature.properties['magnitude_class'] === 'Gempa Kecil' ? 3 : feature.properties['magnitude_class'] === 'Gempa Menengah' ? 5 : feature.properties['magnitude_class'] === 'Gempa Besar' ? 7 : 9
              };
            }),
            backgroundColor: depthColor[2],
            borderColor: depthColor[2],
          },
        ],
      }}
    />
  );
}

function EarthquakeDistribution() {
  const {theme} = useTheme()

  return (
    <Dialog >
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
          <CardTitle className="text-sm">Distribusi Gempa berdasarkan Magnitudo</CardTitle>
        </CardHeader>
        <CardContent className="p-0 mb-1 flex lg:max-h-16 h-max">
          <ScatterChart />
        </CardContent>
      </Card>
      <DialogContent className="w-4/5 py-2 px-1 h-5/6">
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle className={cn(theme === 'light' ? 'text-black' : 'text-white', 'text-sm text-wrap')}>Distribusi Gempa berdasarkan Magnitudo</DialogTitle>
        </DialogHeader>
        <div className=" flex justify-center items-center">
          <ScatterChart asModal />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EarthquakeDistribution;
