import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-moment";
import { DateRange, EarthquakeData } from "@/contexts/DataContext";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SizeIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { depthColor } from "@/styles/dataStyle";

ChartJS.register({
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
});

export type ModalProps = { asModal?: boolean };

function ScatterChart({ asModal }: ModalProps) {
  const { earthquake, dateRange } = useContext(EarthquakeData);
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
              text: "Magnitude",
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
          <CardTitle className="text-sm">Distribusi Gempa</CardTitle>
        </CardHeader>
        <CardContent className="p-0 mb-1 flex h-16 max-h-28">
          <ScatterChart />
        </CardContent>
      </Card>
      <DialogContent className="w-full h-4/5">
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle>Distribusi Gempa</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full flex justify-center items-center">
          <ScatterChart asModal />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EarthquakeDistribution;
