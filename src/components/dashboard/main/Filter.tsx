import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { TrashIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

const filter = {
  date: "date",
  year: "integer",
  latitude: "float",
  longitude: "float",
  magnitude: "float",
  magnitude_class: "string",
  depth_km: "float",
  depth_class: "string",
};

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
      <Button onClick={handleAddFilter}>Add Filter</Button>
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
                            <SelectItem value={key}>
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
                    heheh
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

export default Filter;
