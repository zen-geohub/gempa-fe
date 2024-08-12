import { HomeIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
import { useContext, useEffect, useState } from "react";
import { EarthquakeData } from "@/contexts/DataContext";
import type { DateRange } from "@/contexts/DataContext";
import { depthColor } from "@/styles/dataStyle";
import { useTheme } from "../theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register({
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
});

interface MagnitudePie {
  "Gempa Kecil": number;
  "Gempa Menengah": number;
  "Gempa Besar": number;
  "Gempa Megathrust": number;
}

interface DepthPie {
  "Gempa Dangkal": number;
  "Gempa Menengah": number;
  "Gempa Dalam": number;
}

function Infobar() {
  const { earthquake, dateRange } = useContext(EarthquakeData);
  const {theme} = useTheme()
  const [magnitudePie, setMagnitudePie] = useState<MagnitudePie>({
    "Gempa Kecil": 0,
    "Gempa Menengah": 0,
    "Gempa Besar": 0,
    "Gempa Megathrust": 0
  });
  const [depthPie, setDepthPie] = useState<DepthPie>({
    "Gempa Dangkal": 0,
    "Gempa Menengah": 0,
    "Gempa Dalam": 0,
  });
  const [date, setDate] = useState<DateRange>({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const startString = new Date(dateRange.startDate);
    const endString = dateRange.endDate
      ? new Date(dateRange.endDate)
      : startString;

    setMagnitudePie({
      "Gempa Kecil": earthquake.filter(
        (item) => item.properties.magnitude_class === "Gempa Kecil"
      ).length,
      "Gempa Menengah": earthquake.filter(
        (item) => item.properties.magnitude_class === "Gempa Menengah"
      ).length,
      "Gempa Besar": earthquake.filter(
        (item) => item.properties.magnitude_class === "Gempa Besar"
      ).length,
      "Gempa Megathrust": earthquake.filter(
        (item) => item.properties.magnitude_class === "Gempa Megathrust"
      ).length,
    });
    setDepthPie({
      "Gempa Dangkal": earthquake.filter(
        (item) => item.properties.depth_class === "Gempa Dangkal"
      ).length,
      "Gempa Menengah": earthquake.filter(
        (item) => item.properties.depth_class === "Gempa Menengah"
      ).length,
      "Gempa Dalam": earthquake.filter(
        (item) => item.properties.depth_class === "Gempa Dalam"
      ).length,
    });
    setDate({
      startDate: `${String(startString.getDate()).padStart(2, "0")}/${String(
        startString.getMonth() + 1
      ).padStart(2, "0")}/${String(startString.getFullYear())}`,
      endDate: `${String(endString.getDate()).padStart(2, "0")}/${String(
        endString.getMonth() + 1
      ).padStart(2, "0")}/${String(endString.getFullYear())}`,
    });
  }, [earthquake, dateRange]);

  return (
    <>
      <Card className="flex-grow flex flex-col justify-center">
        <CardHeader className="p-0 mt-1 text-center">
          <CardTitle className="text-sm">Akumulasi Gempa Bumi</CardTitle>
          <CardDescription className="text-xs" style={{ marginTop: 0 }}>
            {date.startDate} s.d. {date.endDate}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 mb-1 text-center">
          <p className="font-bold text-4xl">{earthquake.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="p-0 mt-1 text-center">
          <CardDescription className="text-xs">
            Klasifikasi Gempa
          </CardDescription>
          <CardTitle className="text-sm" style={{ marginTop: 0 }}>
            Berdasarkan Kedalaman
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2 mb-1 text-center">
          <Pie
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
              labels: Object.keys(depthPie),
              datasets: [
                {
                  data: Object.values(depthPie),
                  backgroundColor: depthColor,
                  borderWidth: 0
                },
              ],
            }}
          />
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="p-0 mt-1 text-center">
          <CardDescription className="text-xs">
            Klasifikasi Gempa
          </CardDescription>
          <CardTitle className="text-sm" style={{ marginTop: 0 }}>
            Berdasarkan Magnitudo
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2 mb-1 text-center">
          <Pie
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                  position: "bottom",
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
              labels: Object.keys(magnitudePie),
              datasets: [
                {
                  data: Object.values(magnitudePie),
                  backgroundColor: depthColor,
                  borderWidth: 0
                },
              ],
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}

function Sidebar() {
  const { earthquake } = useContext(EarthquakeData);
  const { setTheme } = useTheme();

  return (
    <aside className="w-2/12 h-screen p-1 gap-2 flex flex-col z-20">
      <Card className="">
        <CardContent className="p-1">
          <Button className="p-1 h-fit w-fit" variant="ghost">
            <a href="/#/">
              <HomeIcon />
            </a>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
      {earthquake.length > 0 ? (
        <Infobar />
      ) : (
        <Card className="flex-grow">
          <CardContent>Pilih Data</CardContent>
        </Card>
      )}
    </aside>
  );
}

export default Sidebar;
