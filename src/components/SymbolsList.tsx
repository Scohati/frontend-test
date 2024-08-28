import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Symbol } from "@/App";
import { useSymbolContext } from '../context/SymbolContext';
import { Command, CommandItem, CommandList, CommandEmpty, CommandInput } from "./ui/command";

export const SymbolsList = () => {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const { selectSymbol } = useSymbolContext();

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/exchangeInfo')
      .then((response) => response.json())
      .then((data) => setSymbols(data.symbols))
      .catch((error) => console.error('Error fetching symbols:', error));      
  }, []);

  return (
    <Command className="border h-[300px] sm:h-[calc(100dvh_-_180px)] overflow-auto ">
      <CommandInput placeholder="Search for a symbol..." />
      <CommandList className="max-h-full">
        <label htmlFor="symbol" className="flex items-center h-[60px] bg-[#EBEBEB] px-2 gap-4 font-medium text-lg">
          <Checkbox id="symbol" className="bg-white w-[18px] h-[18px]"/>
          Symbol
        </label>
        <CommandEmpty>Loading...</CommandEmpty>
        {symbols?.map(({ symbol }) => (
          <CommandItem key={symbol} className="py-3 px-4 h-[50px] data-[selected=true]:bg-[#E9FDFF]">
            <label className="flex items-center gap-4 text-lg">
              <Checkbox
                id={symbol}
                onCheckedChange={() => selectSymbol(symbol)}
                className="w-[18px] h-[18px]"
              />
              {symbol}
            </label>
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
};
