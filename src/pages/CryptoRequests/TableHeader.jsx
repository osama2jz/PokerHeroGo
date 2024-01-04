import { Badge, Group, HoverCard, Menu, Stack, Text } from "@mantine/core";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { UserContext } from "../../context";
import toast from "react-hot-toast";
import axios from "axios";
import { backendUrl } from "../../constants";

const HoverAddress = ({ walletAddres }) => {
  const cleanedWalletAddress =
    walletAddres === "" || walletAddres === "​" ? "N/A" : walletAddres;

  return (
    <Group justify="center">
      <HoverCard width={280} shadow="md">
        <HoverCard.Target>
          <Text>{cleanedWalletAddress}</Text>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text>{cleanedWalletAddress}</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
};
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
    cell: (row) => (
      <Stack gap={0} py="xs">
        <Text p={0} m={0}>
          {row.user?.fullName}
        </Text>
        <a size="xs" href={`mailto:${row.user?.email}`}>
          {row.user?.email}
        </a>
      </Stack>
    ),

    width: "250px",
  },
  {
    name: "Wallet Address",
    selector: (row) => row.user?.walletAddress,
    width: "220px",
    sortable: true,
    cell: (row) => (
      <HoverAddress walletAddres={row.user?.walletAddress?.trim()} />
    ),
  },
  {
    name: "Coins Used In Request",
    selector: (row) => Math.abs(row?.coins),
    width: "200px",
  },
  {
    name: "Request Date",
    selector: (row) => row.createdAt,
    sortable: true,
    center: true,
    width: "220px",
    cell: (row) => <Text>{new Date(row.createdAt).toLocaleString()}</Text>,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    center: true,
    width: "200px",
    cell: (row) => <StatusMenu status={row.status} id={row._id} />,
  },
];

const StatusMenu = ({ status, id }) => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const handleUpdateRequestStatus = useMutation(
    async ({ status }) => {
      if (status) {
        return axios.patch(
          backendUrl + `/request/change-status/${id}`,
          { status },
          {
            headers: {
              authorization: `${user.accessToken}`,
            },
          }
        );
      }
    },
    {
      onSuccess: (response) => {
        toast.loading("Updating Table Please Wait");
        toast.success(response.data.message);
        queryClient.invalidateQueries("fetchRequests");
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );
  return (
    <Menu>
      <Menu.Target>
        <Badge
          style={{ cursor: status === "Pending" ? "pointer" : "default" }}
          rightSection={status === "Pending" ? <span>▼</span> : null}
          color={
            status === "Pending"
              ? "orange"
              : status === "Accepted"
              ? "green"
              : "red"
          }
          variant="light"
        >
          {status}
        </Badge>
      </Menu.Target>

      {status === "Pending" ? (
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => {
              handleUpdateRequestStatus.mutate({ id, status: "Accepted" });
            }}
          >
            <StatusBadge status={"Accepted"} />
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              handleUpdateRequestStatus.mutate({ id, status: "Denied" });
            }}
          >
            <StatusBadge status={"Denied"} />
          </Menu.Item>
        </Menu.Dropdown>
      ) : null}
    </Menu>
  );
};

const StatusBadge = ({ status }) => {
  return (
    <Badge
      color={
        status === "Pending"
          ? "orange"
          : status === "Accepted"
          ? "green"
          : "red"
      }
      variant="light"
      w="100%"
    >
      {status}
    </Badge>
  );
};
