import { Button, Text, UnstyledButton } from "@mantine/core";
import { DiscountCheck } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "User",
    selector: (row) => row.user?.fullName,
    width: "240px",
    sortable: true,
  },
  {
    name: "Center",
    selector: (row) => row.centerLocation,
    cell: (row) => (
      <a href={row.centerLocationURL} target="_blank">
        {row.centerLocation}
      </a>
    ),
    sortable: true,
  },
  {
    name: "Request Type",
    selector: (row) => row.type,
    sortable: true,
    // center: true,
  },
  {
    name: "Created At",
    selector: (row) => row.createdAt,
    sortable: true,
    center: true,
    cell: (row) => <Text>{new Date(row.createdAt).toLocaleDateString()}</Text>,
  },
  {
    name: "Actions",
    center: true,
    cell: (row) => (
      <NavigateToAddDrop
        center={row.center}
        dropsCount={row.dropsCount}
        radius={row.radius}
      />
    ),
  },
];

const NavigateToAddDrop = ({
  center,
  radius,
  dropsCount,
  disabled,
  dropName,
}) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate("/add-drop", {
          state: {
            dropsCount: 20,
            center,
            dropName,
            radius,
          },
        });
      }}
      style={{ cursor: disabled ? "default" : "pointer", display: "flex" }}
      disabled={disabled}
      variant="outline"
      leftSection={<DiscountCheck color={disabled ? "grey" : "blue"} />}
    >
      Add
    </Button>
  );
};
