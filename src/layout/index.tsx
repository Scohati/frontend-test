import React, { useEffect, useState } from 'react';
import { useSymbolContext } from '../context/SymbolContext';
import { columns } from "../components/columns";
import { lists } from "../components/constants";
import { Button } from "@/components/ui/button";
import { SymbolsList } from "../components/SymbolsList";
import Toolbar from "../components/Toolbar";
import Datagrid from "../components/Datagrid";
import Stack from "../components/Stack";

export type Symbol = {
  value: string;
  symbol: string;
};

interface PriceUpdate {
  s: string;
  c: string;
  b: string;
  a: string;
  P: string;
}

const Layout: React.FC = () => {
  const { addSymbol, symbols } = useSymbolContext();
  const [prices, setPrices] = useState<PriceUpdate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (symbols.length === 0) return;

    setLoading(true);

    const streams = symbols.map((s) => `${s.toLowerCase()}@ticker`).join('/');
    const ws = new WebSocket(`wss://data-stream.binance.com/stream?streams=${streams}`);

    ws.onmessage = (event) => {
      setLoading(false);
        
      const data = JSON.parse(event.data).data as PriceUpdate;

      setPrices((prevPrices) => {
        const existingPriceIndex = prevPrices.findIndex(price => price.s === data.s);

        if (existingPriceIndex !== -1) {
          const updatedPrices = [...prevPrices];
          updatedPrices[existingPriceIndex] = data;
          return updatedPrices;
        } else {
          return [...prevPrices, data];
        }
      });
    };

    return () => {
      ws.close();
    };
  }, [symbols]);

  return (
    <div className="w-full h-dvh flex flex-wrap p-2 gap-4">
      <aside className="flex-1 border rounded-lg shadow-md p-2 flex flex-col justify-between py-8">
        <Stack>
          <SymbolsList />
        </Stack>
        <Button className="w-full py-6 bg-greenBlue hover:bg-[#4DC9D7]" onClick={() => addSymbol()}>
          Add to List
        </Button>
      </aside>
      <main className="flex-[3] border rounded-lg shadow-md p-4 py-8">
        <Stack>
          <Toolbar lists={lists} />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Datagrid columns={columns} data={prices} />
          )}
        </Stack>
      </main>
    </div>
  );
};

export default Layout;
