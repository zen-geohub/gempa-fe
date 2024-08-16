import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useData } from "@/contexts/DataContext";
import { useFilter } from "@/contexts/FilterContext";
import { cn } from "@/lib/utils";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Dispatch, memo, SetStateAction, useState } from "react";
import { toast } from "sonner";

type FilterList = {
  id: string;
  deleted: boolean;
  selectedOption?: string;
};

type FilterListProps = {
  filterList: FilterList[];
  setFilterList: Dispatch<SetStateAction<FilterList[]>>;
};

const filter = {
  Tanggal: "date",
  // "Tahun": "integer",
  // "Lintang": "float",
  // "Bujur": "float",
  Magnitudo: "float",
  "Kelas Magnitudo": "string",
  "Kedalaman (km)": "float",
  "Kelas Kedalaman": "string",
};

function FilterDate() {
  const { dateRange } = useData();
  const { dateFilter, setDateFilter } = useFilter();

  function handleChange(value: number[]) {
    setDateFilter({
      startDate: new Date(value[0]).toISOString(),
      endDate: new Date(value[1]).toISOString(),
    });
  }

  return (
    <>
      <Slider
        step={86400}
        min={new Date(dateRange.startDate).getTime()}
        max={new Date(dateRange.endDate || dateRange.startDate).getTime()}
        defaultValue={[
          new Date(dateRange.startDate).getTime(),
          new Date(dateRange.endDate || dateRange.startDate).getTime(),
        ]}
        onValueChange={(value) => handleChange(value)}
      />
      <div className="flex justify-between text-xs mt-2">
        <p>
          {String(new Date(dateFilter.startDate).getDate()).padStart(2, "0")}/
          {String(new Date(dateFilter.startDate).getMonth() + 1).padStart(
            2,
            "0"
          )}
          /{String(new Date(dateFilter.startDate).getFullYear())}
        </p>
        <p>
          {String(
            new Date(dateFilter.endDate || dateFilter.startDate).getDate()
          ).padStart(2, "0")}
          /
          {String(
            new Date(dateFilter.endDate || dateFilter.startDate).getMonth() + 1
          ).padStart(2, "0")}
          /
          {String(
            new Date(dateFilter.endDate || dateFilter.startDate).getFullYear()
          )}
        </p>
      </div>
    </>
  );
}

function FilterMagnitude() {
  const { earthquake } = useData();
  const { magnitude, setMagnitude } = useFilter();

  const magnitudes = earthquake.map(
    (feature) => feature.properties["magnitude"]
  );

  function handleChange(value: number[]) {
    setMagnitude({
      minMagnitude: value[0],
      maxMagnitude: value[1],
    });
  }

  return (
    <>
      <Slider
        step={0.01}
        min={Math.min(...magnitudes)}
        max={Math.max(...magnitudes)}
        defaultValue={[Math.min(...magnitudes), Math.max(...magnitudes)]}
        onValueChange={(value) => handleChange(value)}
      />
      <div className="flex justify-between text-xs mt-2">
        <p>{magnitude.minMagnitude}</p>
        <p>{magnitude.maxMagnitude}</p>
      </div>
    </>
  );
}

function FilterMagnitudeClass() {
  const { magnitudeClass, setMagnitudeClass } = useFilter();

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <Select
          value={magnitudeClass}
          onValueChange={(value) => setMagnitudeClass(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih kelas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Gempa Kecil">Gempa Kecil</SelectItem>
            <SelectItem value="Gempa Menengah">Gempa Menengah</SelectItem>
            <SelectItem value="Gempa Besar">Gempa Besar</SelectItem>
            <SelectItem value="Gempa Megathrust">Gempa Megathrust</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

function FilterDepthClass() {
  const { depthClass, setDepthClass } = useFilter();

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <Select
          value={depthClass}
          onValueChange={(value) => setDepthClass(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih kelas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Gempa Dangkal">Gempa Dangkal</SelectItem>
            <SelectItem value="Gempa Menengah">Gempa Menengah</SelectItem>
            <SelectItem value="Gempa Dalam">Gempa Dalam</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

function FilterDepth() {
  const { earthquake } = useData();
  const { depth, setDepth } = useFilter();

  const depths = earthquake.map((feature) => feature.properties["depth_km"]);

  function handleChange(value: number[]) {
    setDepth({
      minDepth: value[0],
      maxDepth: value[1],
    });
  }

  return (
    <>
      <Slider
        step={0.01}
        min={Math.min(...depths)}
        max={Math.max(...depths)}
        defaultValue={[Math.min(...depths), Math.max(...depths)]}
        onValueChange={(value) => handleChange(value)}
      />
      <div className="flex justify-between text-xs mt-2">
        <p>{depth.minDepth}</p>
        <p>{depth.maxDepth}</p>
      </div>
    </>
  );
}

function FilterList({ filterList, setFilterList }: FilterListProps) {
  const { dateRange } = useData();
  const {
    setDateFilter,
    setMagnitude,
    setDepth,
    setMagnitudeClass,
    setDepthClass,
  } = useFilter();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  function deleteFilter(id: string, selected?: string) {
    setFilterList((currentFilter) => {
      const updatedFilterList = currentFilter.filter(
        (filter) => filter.id !== id
      );
      const remainingSelectedOptions = updatedFilterList
        .map((filter) => filter.selectedOption)
        .filter((option) => option);
      setSelectedOptions(remainingSelectedOptions as string[]);
      return updatedFilterList;
    });
    if (selected === "Tanggal") {
      setDateFilter({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      });
    } else if (selected === "Magnitudo") {
      setMagnitude({
        minMagnitude: 0,
        maxMagnitude: 0,
      });
    } else if (selected === "Kelas Magnitudo") {
      setMagnitudeClass("");
    } else if (selected === "Kedalaman (km)") {
      setDepth({
        minDepth: 0,
        maxDepth: 0,
      });
    } else if (selected === "Kelas Kedalaman") {
      setDepthClass("");
    }
  }

  function handleFilterChange(id: string, selectedOption: string) {
    setFilterList((currentFilter) => {
      const updatedFilterList = currentFilter.map((filter) =>
        filter.id === id ? { ...filter, selectedOption } : filter
      );
      const updatedSelectedOptions = updatedFilterList
        .map((filter) => filter.selectedOption)
        .filter((option) => option);
      setSelectedOptions(updatedSelectedOptions as string[]);
      return updatedFilterList;
    });
  }

  const availableOptions = (currentSelectedOption?: string) => {
    return Object.fromEntries(
      Object.entries(filter).filter(
        ([key]) =>
          !selectedOptions.includes(key) || key === currentSelectedOption
      )
    );
  };

  return (
    <ScrollArea className="h-48 lg:h-80">
      <ul className="flex flex-col gap-2">
        {filterList.map((item) => {
          const options = availableOptions(item.selectedOption);
          return (
            <li key={item.id}>
              <Card>
                <CardHeader className="min-w-[244px] px-2 py-2">
                  <CardTitle className="flex gap-2 justify-between items-center">
                    <Select
                      value={item.selectedOption || ""}
                      onValueChange={(value) =>
                        handleFilterChange(item.id, value)
                      }
                    >
                      <SelectTrigger className="min-w-44">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(options).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            <span
                              className={cn(
                                value === "float"
                                  ? "bg-yellow-500 border-yellow-500"
                                  : value === "string"
                                  ? "bg-green-500 border-green-500"
                                  : value === "integer"
                                  ? "bg-blue-500 border-blue-500"
                                  : "bg-orange-500 border-orange-500",
                                "p-1 border rounded mr-2 bg-opacity-50"
                              )}
                            >
                              {value}
                            </span>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteFilter(item.id, item.selectedOption)}
                    >
                      <TrashIcon />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {item.selectedOption === "Tanggal" && <FilterDate />}
                  {item.selectedOption === "Magnitudo" && <FilterMagnitude />}
                  {item.selectedOption === "Kedalaman (km)" && <FilterDepth />}
                  {item.selectedOption === "Kelas Magnitudo" && (
                    <FilterMagnitudeClass />
                  )}
                  {item.selectedOption === "Kelas Kedalaman" && (
                    <FilterDepthClass />
                  )}
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </ScrollArea>
  );
}

function Filter() {
  const { earthquake } = useData()
  const [filterList, setFilterList] = useState<FilterList[]>([]);

  function handleAddFilter() {
    if (earthquake.length > 0) {
      setFilterList([
        ...filterList,
        { id: crypto.randomUUID(), deleted: false, selectedOption: undefined },
      ]);
    } else {
      toast('Penambahan filter gagal.', {
        description: 'Tambahkan data terlebih dahulu!'
      })
    }
  }

  return (
    <>
      <div className="text-sm lg:text-base flex justify-between items-center mb-2">
        <h1>Filter</h1>
        <Button
          className="w-fit h-fit lg:p-2 p-1"
          size="icon"
          variant="outline"
          onClick={handleAddFilter}
        >
          <PlusIcon />
        </Button>
      </div>
      <FilterList filterList={filterList} setFilterList={setFilterList} />
    </>
  );
}

export default memo(Filter);
