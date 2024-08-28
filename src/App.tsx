import React from 'react';
import { SymbolProvider } from './context/SymbolContext';
import Layout from './layout';

export type Symbol = {
  value: string;
  symbol: string;
};

const App: React.FC = () => {
  return (
    <SymbolProvider>
      <Layout />
    </SymbolProvider>
  );
};

export default App;