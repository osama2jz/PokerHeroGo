import { Badge, Menu, Text } from "@mantine/core";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { UserContext } from "../../context";
import toast from "react-hot-toast";
import axios from "axios";
import { backendUrl } from "../../constants";

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
    name: "Wallet Address",
    selector: (row) => row.user?.walletAddress,
    width: "180px",
    sortable: true,
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
    selector: (row) => Math.abs(row?.coins),
    sortable: true,
    // center: true,
    width: "100px",
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
