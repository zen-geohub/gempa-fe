import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useData } from '@/contexts/DataContext';
import { useFilter } from '@/contexts/FilterContext';
import { cn } from '@/lib/utils';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { memo, useState } from 'react';

const filter = {
  "Tanggal": "date",
  "Tahun": "integer",
  "Lintang": "float",
  "Bujur": "float",
  "Magnitudo": "float",
  "Kelas Magnitudo": "string",
  "Kedalaman (km)": "float",
  "Kelas Kedalaman": "string",
};

function FilterDate() {
  const { dateRange } = useData()
  const {dateFilter, setDateFilter} = useFilter()

  function handleChange(value: number[]) {
    setDateFilter({
      startDate: new Date(value[0]).toISOString(),
      endDate: new Date(value[1]).toISOString(),
    })
  }

  return (
    <>
      <Slider step={86400} min={new Date(dateRange.startDate).getTime()} max={new Date(dateRange.endDate || dateRange.startDate).getTime()} defaultValue={[new Date(dateRange.startDate).getTime(), new Date(dateRange.endDate || dateRange.startDate).getTime()]} onValueChange={value => handleChange(value)}/>
      <div className='flex justify-between text-xs mt-2'>
        <p>{String(new Date(dateFilter.startDate).getDate()).padStart(2, "0")}/{String(new Date(dateFilter.startDate).getMonth() + 1).padStart(2, "0")}/{String(new Date(dateFilter.startDate).getFullYear())}</p>
        <p>{String(new Date(dateFilter.endDate || dateFilter.startDate).getDate()).padStart(2, "0")}/{String(new Date(dateFilter.endDate || dateFilter.startDate).getMonth() + 1).padStart(2, "0")}/{String(new Date(dateFilter.endDate || dateFilter.startDate).getFullYear())}</p>
      </div>
    </>
  )
}

function FilterLatitude() {
  const { earthquake } = useData()
  const {latitude, setLatitude} = useFilter()

  const latitudes = earthquake.map(feature => feature.properties['latitude'])

  function handleChange(value: number[]) {
    setLatitude({
      minLatitude: value[0],
      maxLatitude: value[1]
    })
  }

  return (
    <>
      <Slider step={0.01} min={Math.min(...latitudes)} max={Math.max(...latitudes)} defaultValue={[Math.min(...latitudes), Math.max(...latitudes)]} onValueChange={value => handleChange(value)}/>
      <div className='flex justify-between text-xs mt-2'>
        <p>{latitude.minLatitude}</p>
        <p>{latitude.maxLatitude}</p>
      </div>
    </>
  )
}

function Filter() {
  const [filterList, setFilterList] = useState<{ id: string; deleted: boolean; selectedOption?: string }[]>([]);

  // Track selected options across all filters
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  function handleAddFilter() {
    setFilterList([
      ...filterList,
      { id: crypto.randomUUID(), deleted: false, selectedOption: undefined },
    ]);
  }

  function deleteFilter(id: string) {
    setFilterList(currentFilter => {
      // Filter out the deleted filter
      const updatedFilterList = currentFilter.filter(filter => filter.id !== id);
      // Update the selected options state
      const remainingSelectedOptions = updatedFilterList.map(filter => filter.selectedOption).filter(option => option);
      setSelectedOptions(remainingSelectedOptions as string[]);
      return updatedFilterList;
    });
  }

  function handleFilterChange(id: string, selectedOption: string) {
    setFilterList(currentFilter => {
      const updatedFilterList = currentFilter.map(filter => 
        filter.id === id ? { ...filter, selectedOption } : filter
      );
      const updatedSelectedOptions = updatedFilterList.map(filter => filter.selectedOption).filter(option => option);
      setSelectedOptions(updatedSelectedOptions as string[]);
      return updatedFilterList;
    });
  }

  const availableOptions = (currentSelectedOption?: string) => {
    return Object.fromEntries(
      Object.entries(filter).filter(([key]) => 
        !selectedOptions.includes(key) || key === currentSelectedOption
      )
    );
  };

  return (
    <>
      <div className='flex justify-between items-center mb-2'>
        <h1>Filter</h1>
        <Button size="icon" onClick={handleAddFilter}><PlusIcon /></Button>
      </div>
      <ScrollArea className="h-80">
        <ul className="flex flex-col gap-2">
          {filterList.map((item) => {
            const options = availableOptions(item.selectedOption);
            return (
              <li key={item.id}>
                <Card>
                  <CardHeader className='min-w-[244px] px-2 py-2'>
                    <CardTitle className="flex gap-2 justify-between items-center">
                      <Select 
                        value={item.selectedOption || ""}
                        onValueChange={(value) => handleFilterChange(item.id, value)}
                      >
                        <SelectTrigger className='min-w-44'>
                          <SelectValue placeholder="Pilih field" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(options).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              <span className={cn(value === 'float' ? 'bg-yellow-500 border-yellow-500' : value === 'string' ? 'bg-green-500 border-green-500' : value === 'integer' ? 'bg-blue-500 border-blue-500' : 'bg-orange-500 border-orange-500',
                                'p-1 border rounded mr-2 bg-opacity-50'
                              )}>{value}</span>
                              {key}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button size="icon" variant="destructive" onClick={() => deleteFilter(item.id)}>
                        <TrashIcon />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {item.selectedOption === 'Tanggal' && <FilterDate />}
                    {item.selectedOption === 'latitude' && <FilterLatitude />}
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </>
  );
}

export default memo(Filter);
