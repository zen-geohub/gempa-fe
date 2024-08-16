import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRange, useData } from "@/contexts/DataContext";
import { useEffect, useState } from "react";

function EarthquakeAccumulation() {
  const { earthquake, dateRange } = useData();
  const [date, setDate] = useState<DateRange>({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const startString = new Date(dateRange.startDate);
    const endString = dateRange.endDate
      ? new Date(dateRange.endDate)
      : startString;

    setDate({
      startDate: `${String(startString.getDate()).padStart(2, "0")}/${String(
        startString.getMonth() + 1
      ).padStart(2, "0")}/${String(startString.getFullYear())}`,
      endDate: `${String(endString.getDate()).padStart(2, "0")}/${String(
        endString.getMonth() + 1
      ).padStart(2, "0")}/${String(endString.getFullYear())}`,
    });
  }, [dateRange]);

  return (
    <>
      <Card className="flex flex-col justify-center py-2">
        <CardHeader className="px-2 py-0 mt-1 text-center">
          <CardTitle className="text-sm">Akumulasi Gempa Bumi</CardTitle>
          <CardDescription className="text-xs text-wrap" style={{ marginTop: 0 }}>
            {date.startDate} s.d. {date.endDate}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 mb-1 text-center">
          <p className="font-bold text-4xl">{earthquake.length}</p>
        </CardContent>
      </Card>
    </>
  );
}

export default EarthquakeAccumulation;
