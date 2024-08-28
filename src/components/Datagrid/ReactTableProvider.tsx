import {
  RowData,
  Table,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

const ReactTableContext = React.createContext<Table<RowData> | undefined>(
  undefined
);

export interface ReactTableProviderProps<D> extends TableOptions<D> {
  children: React.ReactNode;
}

export const ReactTableProvider = <D extends RowData>({
  children,
  ...options
}: ReactTableProviderProps<D>) => {
  const table = useReactTable(options);

  return (
    // @ts-ignore
    <ReactTableContext.Provider value={table}>
      {children}
    </ReactTableContext.Provider>
  );
};

export const TanStackTableProvider = ReactTableProvider;

export const useReactTableContext = () => {
  const context = React.useContext<Table<RowData> | undefined>(
    ReactTableContext
  );
  if (!context) {
    throw new Error(
      "useReactTableContext must be used under ReactTableContext"
    );
  }
  return context;
};

export const useTanStackTableContext = useReactTableContext;
