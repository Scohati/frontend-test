import React, { createContext, useState, ReactNode, useContext } from 'react';

interface SymbolContextType {
  symbols: string[];
  selectSymbol: (symbol: string) => void;
  addSymbol: () => void;
  removeSymbol: (symbol: string) => void;
}

const SymbolContext = createContext<SymbolContextType | undefined>(undefined);

export const SymbolProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

  const selectSymbol = (symbol: string) => {
    setSelectedSymbols((prev) => [...prev, symbol]);
  };

  const addSymbol = () => {
    setSymbols(() => [...selectedSymbols]);
  };

  const removeSymbol = (symbol: string) => {
    setSymbols((prev) => prev.filter((s) => s !== symbol));
  };

  return (
    <SymbolContext.Provider value={{ symbols, selectSymbol, addSymbol, removeSymbol }}>
      {children}
    </SymbolContext.Provider>
  );
};

export const useSymbolContext = (): SymbolContextType => {
  const context = useContext(SymbolContext);
  if (!context) throw new Error('useSymbolContext must be used within a SymbolProvider');
  return context;
};
