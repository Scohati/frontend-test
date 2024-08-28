/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactTableProvider } from "./ReactTableProvider";
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import { ReactNode, useCallback, useState } from "react";
import Datatable from "./Datatable";

const allDefaultRowModels = {
  getPaginationRowModel: getPaginationRowModel<any>(),
  getFilteredRowModel: getFilteredRowModel<any>(),
  getSortedRowModel: getSortedRowModel<any>(),
  getGroupedRowModel: getGroupedRowModel<any>(),
  getExpandedRowModel: getExpandedRowModel<any>(),
  getCoreRowModel: getCoreRowModel<any>(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  getFacetedMinMaxValues: getFacetedMinMaxValues(),
  autoResetPageIndex: false,
};

export default function Table({
  children,
  columns,
  data,
}: Readonly<{
  children?: ReactNode;
  columns: any;
  data: any;
}>) {
  const initState = {
    pagination: { pageIndex: 0, pageSize: 10 },
    expanded: {},
  };

  const [state, setState] = useState(initState);

  const stateChange = useCallback((s: any) => setState(s), []);
  
  return (
    <ReactTableProvider
      columns={columns}
      data={data}
      initialState={initState}
      state={state}
      onStateChange={stateChange}
      {...allDefaultRowModels}
    >
      <div className="flex flex-col gap-2">
        {children}
        <Datatable />
      </div>
    </ReactTableProvider>
  );
}
