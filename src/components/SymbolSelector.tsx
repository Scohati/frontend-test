import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSymbolContext } from '../context/SymbolContext';

interface Symbol {
  symbol: string;
}

const SymbolSelector: React.FC = () => {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addSymbol } = useSymbolContext();

  useEffect(() => {
    axios.get('https://api.binance.com/api/v3/exchangeInfo')
      .then((response) => setSymbols(response.data.symbols))
      .catch((error) => console.error('Error fetching symbols:', error));
  }, []);

  const filteredSymbols = symbols.filter(symbol =>
    symbol.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <ul className="space-y-2">
        {filteredSymbols.map((symbol) => (
          <li key={symbol.symbol} className="flex items-center justify-between">
            <span>{symbol.symbol}</span>
            <button
              onClick={() => addSymbol(symbol.symbol)}
              className="p-1 bg-teal-500 text-white rounded hover:bg-teal-600"
            >
              Add to List
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SymbolSelector;
