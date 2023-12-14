import { Flex, Image, Stack, Switch, Text, Tooltip } from "@mantine/core";
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
    name: "Drop Coordinates",
    selector: (row) => row.location.coordinates.join("-"),
    sortable: true,
    cell: (row) => (
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${row.location.coordinates.join(
          ","
        )}`}
        target="_blank"
        rel="noreferrer"
      >
        <Stack gap={0} p={6}>
          <Text p={0} m={0}>
            Lat: {row.location.coordinates[0]}
          </Text>
          <Text p={0} m={0}>
            Lng: {row.location.coordinates[1]}
          </Text>
        </Stack>
      </a>
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
