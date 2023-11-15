import { Text } from "@mantine/core";
import ActionIcons from "../../components/general/ActionIcons";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
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
    width: "140px",
  },
  {
    name: "Schedule Date",
    selector: (row) => row.createdAt,
    sortable: true,
    center: true,
    width: "160px",
    cell: (row) => <Text>{new Date(row.createdAt).toLocaleDateString()}</Text>,
  },
  {
    name: "Schedule Time",
    selector: (row) => row.createdAt,
    sortable: true,
    center: true,
    width: "160px",
    cell: (row) => <Text>{new Date(row.createdAt).toLocaleTimeString()}</Text>,
  },
  {
    name: "Expiry Date",
    selector: (row) => row.expirationDate,
    width: "150px",
    sortable: true,
    cell: (row) => (
      <Text>{new Date(row.expirationDate).toLocaleDateString()}</Text>
    ),
  },
  {
    name: "Expiry Time",
    selector: (row) => row.expirationTime,
    width:"150px",
    sortable: true,
  },
  {
    name: "Actions",
    center: true,
    width: "100px",
    cell: (row) => (
      <ActionIcons
        rowData={row}
        del={true}
        type="drops"
      />
    ),
  },
];
