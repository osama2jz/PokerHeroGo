import { Text } from "@mantine/core";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "120px",
    sortable: true,
  },
  {
    name: "Drop Name",
    selector: (row) => row.dropName,
    width: "200px",
    sortable: true,
  },
  {
    name: "Drop Coins",
    selector: (row) => row.dropCoins,
    sortable: true,
    // center: true,
    width: "150px",
  },
  {
    name: "Schedule Date",
    selector: (row) => row.createdAt,
    sortable: true,
    center: true,
    width: "200px",
    cell: (row) => <Text>{new Date(row.createdAt).toLocaleDateString()}</Text>,
  },
  {
    name: "Schedule Time",
    selector: (row) => row.createdAt,
    sortable: true,
    center: true,
    width: "200px",
    cell: (row) => <Text>{new Date(row.createdAt).toLocaleTimeString()}</Text>,
  },
];
