export const symbols = [
  {
    value: "ETHBTC",
    label: "ETHBTC",
  },
  {
    value: "LTCBTC",
    label: "LTCBTC",
  },
  {
    value: "BNBBTC",
    label: "BNBBTC",
  },
  {
    value: "NEOBTC",
    label: "NEOBTC",
  },
  {
    value: "QTUMETH",
    label: "QTUMETH",
  },
] as const;

export const lists = [
  {
    label: "List A",
    value: "list-a",
  },
  {
    label: "List B",
    value: "list-b",
  },
] as const;

export const listsItems = [
  {
    symbol: "ETHBTC",
    last_price: 0.0025,
    bid_price: 0.0024,
    ask_price: 0.0026,
    price_change: 250,
  },
  {
    symbol: "BNBBTC",
    last_price: 0.0025,
    bid_price: 0.0024,
    ask_price: 0.0026,
    price_change: 250,
  },
] as const;
