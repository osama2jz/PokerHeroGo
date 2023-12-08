import { Button, Text } from "@mantine/core";
import { Repeat } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "Center",
    selector: (row) => row.centerLocation,
    width: "200px",
    cell: (row) => (
      <a href={row.centerLocationURL} target="_blank">
        {row.centerLocation}
      </a>
    ),
    sortable: true,
  },
  {
    name: "Drop Name",
    selector: (row) => row.dropName,
    sortable: true,
    // center: true,
    width: "140px",
  },
  {
    name: "Drop Type",
    selector: (row) => row.cardType,
    sortable: true,
    // center: true,
    width: "140px",
  },
  {
    name: "Drops",
    selector: (row) => row.dropsCount,
    sortable: true,
    // center: true,
    width: "100px",
  },
  {
    name: "Expiry",
    selector: (row) => row.expiry,
    sortable: true,
    center: true,
    width: "160px",
    cell: (row) => (
      <Text>
        {moment(row.expiry).tz("Asia/Shanghai").format("DD-MM-YYYY - hh:mm A")}
      </Text>
    ),
  },
  {
    name: "Is Expired",
    selector: (row) => row.expiry,
    sortable: true,
    center: true,
    width: "160px",
    cell: (row) => (
      <Text>
        {moment(row.expiry).tz("Asia/Shanghai") < moment().tz("Asia/Shanghai")
          ? "Yes"
          : "No"}
      </Text>
    ),
  },
  {
    name: "Created At",
    selector: (row) => row.createdAt,
    sortable: true,
    center: true,
    width: "160px",
    cell: (row) => (
      <Text>
        {moment(row.createdAt)
          .tz("Asia/Shanghai")
          .format("DD-MM-YYYY - hh:mm A")}
      </Text>
    ),
  },
  {
    name: "Actions",
    center: true,
    width: "140px",
    cell: (row) => {
      console.log("ALERT", row.cardType);
      return (
        <NavigateToAddDrop
          // disabled={
          // moment(row.expiry).tz("Asia/Shanghai") > moment().tz("Asia/Shanghai")
          // }
          center={row.center}
          dropsCount={row.dropsCount}
          radius={row.radius}
          dropName={row.dropName}
          cardType={row.cardType}
        />
      );
    },
  },
];

const NavigateToAddDrop = ({
  center,
  radius,
  dropsCount,
  disabled,
  dropName,
  cardType,
}) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate("/add-drop", {
          state: {
            dropsCount: dropsCount || 20,
            center,
            dropName,
            radius,
            cardType,
          },
        });
      }}
      style={{ cursor: disabled ? "default" : "pointer", display: "flex" }}
      disabled={disabled}
      variant="outline"
      leftSection={<Repeat color={disabled ? "grey" : "blue"} />}
    >
      Re-drop
    </Button>
  );
};
