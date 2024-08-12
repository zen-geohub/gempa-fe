import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EarthquakeData } from "@/contexts/DataContext";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  Cross1Icon,
  DashboardIcon,
  GearIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { DateRange } from "react-day-picker";
import Filter from "./Filter";
import { Card, CardContent } from "@/components/ui/card";
import { EarthquakeFilter } from "@/contexts/FilterContext";

type MapStatus = string;

type ControlProps = {
  mapStatus: MapStatus;
  setMapStatus: Dispatch<SetStateAction<MapStatus>>;
};

function Control({ mapStatus, setMapStatus }: ControlProps) {
  const {earthquake, dateRange, setDateRange } = useContext(EarthquakeData);
  const {setDateFilter, setLatitude} = useContext(EarthquakeFilter)

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [isControlOpen, setIsControlOpen] = useState<boolean>(false);

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
      const latitudes = earthquake.map(feature => feature.properties['latitude'])
  
      setDateFilter({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      })
  
      setLatitude({
        minLatitude: Math.min(...latitudes),
        maxLatitude: Math.max(...latitudes),
      })
    }, [dateRange, earthquake])

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
          "absolute top-2 left-2 transition-transform z-10"
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
            <DashboardIcon />
          </TabsTrigger>
          <TabsTrigger value="filter">
            <MixerHorizontalIcon />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="control">
          <Card>
            <CardContent className="min-w-64 p-2">
              <h6>Rentang Data</h6>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
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
                    fromYear={2004}
                    toYear={2023}
                    captionLayout="dropdown"
                    showOutsideDays
                  />
                </PopoverContent>
              </Popover>
              <h6>Tampilan</h6>
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
      </Tabs>
    </>
  );
}

export default Control;
