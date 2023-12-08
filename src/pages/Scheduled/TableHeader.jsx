import { Text } from "@mantine/core";
import ActionIcons from "../../components/general/ActionIcons";
import moment from "moment-timezone";

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
    cell: (row) => (
      <Text>
        {moment(row.scheduleDate)
          .tz("Asia/Shanghai")
          .format("DD-MM-YYYY - hh:mm A")}
      </Text>
    ),
  },

  {
    name: "Expiry Date",
    selector: (row) => row.expirationDate,
    sortable: true,
    cell: (row) => (
      <Text>
        {moment(row.expirationDate)
          .tz("Asia/Shanghai")
          .format("DD-MM-YYYY - hh:mm A")}
      </Text>
    ),
  },

  {
    name: "Actions",
    center: true,
    width: "100px",
    cell: (row) => <ActionIcons rowData={row} del={true} type="drops" />,
  },
];
