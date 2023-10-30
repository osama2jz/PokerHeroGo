import { Text } from "@mantine/core";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "120px",
    sortable: true,
  },
  {
    name: "Offer Name",
    selector: (row) => row.dropName,
    width: "200px",
    sortable: true,
  },
  {
    name: "Park Name",
    selector: (row) => row.park.name,
    width: "200px",
    sortable: true,
  },
  {
    name: "Request By",
    selector: (row) => row.claimedBy?.fullName,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Drop Coins",
    selector: (row) => row.dropCoins,
    sortable: true,
    // center: true,
    width: "150px",
  },
  {
    name: "Request Date",
    selector: (row) => row.createdAt,
    sortable: true,
    center: true,
    width: "200px",
    cell: (row) => <Text>{new Date(row.createdAt).toLocaleDateString()}</Text>,
  },
  {
    name: "Request Time",
    selector: (row) => row.createdAt,
    sortable: true,
    center: true,
    width: "200px",
    cell: (row) => <Text>{new Date(row.createdAt).toLocaleTimeString()}</Text>,
  },
];
