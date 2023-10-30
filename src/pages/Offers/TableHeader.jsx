import { Switch } from "@mantine/core";
import ActionIcons from "../../components/general/ActionIcons";

export const Columns = [
  {
    name: "Serial No.",
    selector: (row) => row.serialNo,
    width: "120px",
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    grow:1,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    center: true,
    width: "200px",
    cell: (row) => <Switch />,
  },
  {
    name: "Actions",
    center: true,
    width: "100px",
    cell: (row) => <ActionIcons rowData={row} del={true} type="User" />,
  },
];
