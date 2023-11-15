import { Badge, Text } from "@mantine/core";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "120px",
    sortable: true,
  },
  {
    name: "Request By",
    selector: (row) => row.user?.fullName,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Request Type",
    selector: (row) => row.conversionType,
    width: "200px",
    sortable: true,
  },
  {
    name: "Hand Name",
    selector: (row) => row?.handName,
    sortable: true,
    // center: true,
    width: "150px",
  },
  {
    name: "Coins",
    selector: (row) => row?.coins,
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
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    center: true,
    width: "200px",
    cell: (row) => <Badge>{row.status}</Badge>,
  },
];
