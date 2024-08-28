"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

type SymbolInfo = {
  symbol: string;
  last_price: number;
  bid_price: number;
  ask_price: number;
  price_change: number;
};

const ColumnHeader = ({ title }: { title: string }) => (
  <span className="font-bold text-black">{title}</span>
);

export const columns: ColumnDef<SymbolInfo>[] = [
  {
    accessorKey: "s",
    header: () => <ColumnHeader title="Symbol" />,
  },
  {
    accessorKey: "C",
    header: () => <ColumnHeader title="Last Price" />,
  },
  {
    accessorKey: "B",
    header: () => <ColumnHeader title="Bid Price" />,
  },
  {
    accessorKey: "A",
    header: () => <ColumnHeader title="Ask Price" />,
  },
  {
    accessorKey: "P",
    header: () => <ColumnHeader title="Price Change(%)" />,
    cell: ({ cell }) => {
      const value = cell.getValue() as number;
      const isPositive = value >= 0;
  
      return (
        <Badge
          className={`rounded-full px-3 shadow-none py-1 ${
            isPositive
              ? "bg-green-100 border-green-500 text-green-700"
              : "bg-red-100 border-red-500 text-red-700"
          }`}
        >
          <span className="text-base">{value}%</span>
        </Badge>
      );
    },
  },
];
