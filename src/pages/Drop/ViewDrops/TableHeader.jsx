import { Flex, Image, Switch, Text, Tooltip } from "@mantine/core";
import ActionIcons from "../../../components/general/ActionIcons";
import moment from "moment-timezone";

export const Columns = (setOpen, setEditData) => [
  {
    name: "Sr. No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "Drop Name",
    selector: (row) => row.dropName,
    grow: 1,
    sortable: true,
  },
  {
    name: "Drop Type",
    width: "140px",
    selector: (row) => row.cardType,
    grow: 1,
    sortable: true,
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
    cell: (row) => (
      <ActionIcons
        rowData={row}
        del={true}
        type="drops"
        blocked={row.claimedBy}
      />
    ),
  },
];
