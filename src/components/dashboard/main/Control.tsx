import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useData } from "@/contexts/DataContext";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  Cross1Icon,
  DashboardIcon,
  DotsVerticalIcon,
  GearIcon,
  LayersIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import Filter from "./Filter";
import { Card, CardContent } from "@/components/ui/card";
import { useFilter } from "@/contexts/FilterContext";
import { LayerControlCard } from "./LayerControl";
import { HomeIcon } from "@radix-ui/react-icons";
import ThemeChanger from "../../ThemeChanger";
import { MapLegendCard } from "./MapLegend";

type MapStatus = string;

type ControlProps = {
  mapStatus: MapStatus;
  setMapStatus: Dispatch<SetStateAction<MapStatus>>;
};

function Control({ mapStatus, setMapStatus }: ControlProps) {
  const { earthquake, dateRange, setDateRange } = useData();
  const { setDateFilter, setMagnitude, setDepth } = useFilter();

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [isControlOpen, setIsControlOpen] = useState<boolean>(true);

  useEffect(() => {
    setDateRange({
      startDate: date?.from
        ? new Date(
            Date.UTC(
              date?.from.getFullYear(),
              date?.from.getMonth(),
              date?.from.getDate()
            )
          ).toISOString()
        : "",
      endDate: date?.to
        ? new Date(
            Date.UTC(
              date?.to.getFullYear(),
              date?.to.getMonth(),
              date?.to.getDate(),
              23,
              59,
              59,
              999
            )
          ).toISOString()
        : "",
    });
  }, [date, setDateRange]);

  useEffect(() => {
    const magnitudes = earthquake.map(
      (feature) => feature.properties["magnitude"]
    );
    const depths = earthquake.map((feature) => feature.properties["depth_km"]);

    setDateFilter({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });

    setMagnitude({
      minMagnitude: Math.min(...magnitudes),
      maxMagnitude: Math.max(...magnitudes),
    });

    setDepth({
      minDepth: Math.min(...depths),
      maxDepth: Math.max(...depths),
    });
  }, [dateRange, earthquake]);

  function handleChange(value: string) {
    setMapStatus(value);
  }

  return (
    <>
      <Button
        size="icon"
        className={cn(isControlOpen && "hidden", "absolute top-2 left-2 z-10")}
        onClick={() => setIsControlOpen(!isControlOpen)}
      >
        <GearIcon />
      </Button>
      <Tabs
        defaultValue="control"
        className={cn(
          isControlOpen ? "translate-x-[0%]" : "translate-x-[-200%]",
          "absolute top-2 left-2 transition-transform z-10 max-w-max"
        )}
      >
        <Button
          className="p-1 h-fit w-fit absolute top-1 right-1"
          variant="ghost"
          onClick={() => setIsControlOpen(!isControlOpen)}
        >
          <Cross1Icon />
        </Button>
        <TabsList>
          <TabsTrigger value="control">
            <DashboardIcon className="lg:hidden" />
            <span className="hidden lg:inline-block">Kontrol</span>
          </TabsTrigger>
          <TabsTrigger value="filter">
            <MixerHorizontalIcon className="lg:hidden" />
            <span className="hidden lg:inline-block">Filter</span>
          </TabsTrigger>
          <TabsTrigger
            value="layer"
            className={cn(mapStatus === "3D" && "hidden", "lg:hidden")}
          >
            <LayersIcon />
          </TabsTrigger>
          <TabsTrigger
            value="legend"
            className={cn(mapStatus === "3D" && "hidden", "lg:hidden")}
          >
            <DotsVerticalIcon />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="control">
          <Card>
            <CardContent className="min-w-52 lg:min-w-64 p-2">
              <div className="w-full flex justify-end">
                <Button variant="ghost" className="w-fit h-fit p-1" size="icon">
                  <a href="/#/">
                    <HomeIcon />
                  </a>
                </Button>
                <ThemeChanger />
              </div>
              <h6 className="px-2 text-sm lg:text-base">Rentang Data</h6>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal text-xs lg:text-sm p-2",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pilih tanggal</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={(e) => {
                      setDate(e);
                    }}
                    max={1826}
                    fromYear={2004}
                    toYear={2023}
                    captionLayout="dropdown"
                    showOutsideDays
                  />
                </PopoverContent>
              </Popover>
              <h6 className="mt-2 px-2 text-sm lg:text-base">Tampilan Peta</h6>
              <Tabs
                value={mapStatus}
                className="w-full"
                onValueChange={handleChange}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="2D">2D</TabsTrigger>
                  <TabsTrigger value="3D">3D</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="filter">
          <Card>
            <CardContent className="min-w-64 p-2">
              <Filter />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="layer">
          <Card className="min-w-52">
            <LayerControlCard />
          </Card>
        </TabsContent>
        <TabsContent value="legend">
          <Card>
            <MapLegendCard />
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Control;
