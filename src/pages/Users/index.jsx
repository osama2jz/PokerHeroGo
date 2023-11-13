import { Box, Flex } from "@mantine/core";
import PageHeader from "../../components/general/PageHeader";
import DataGrid from "../../components/general/Table";
import { Columns } from "./TableHeader";
import InputField from "../../components/general/InputField";
import Button from "../../components/general/Button";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../../context";

const Users = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const { status } = useQuery(
    "fetchUsers",
    () => {
      return axios.get(backendUrl + "/users", {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        let newData = data.map((obj, ind) => {
          return { ...obj, serialNo: ind + 1 };
        });
        setData(newData);
      },
    }
  );
  const onHandleStatus = useMutation(
    async (values) => {
      return axios.patch(backendUrl + `/users/change-status/${values.id}`, {
        status: values.status,
      });
    },
    {
      onSuccess: (response) => {
        toast.success(response.data.message);
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );
  const filteredItems = data.filter((item) => {
    return (
      item?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      item?.email?.name?.toLowerCase().includes(search.toLowerCase())
    );
  });
  return (
    <Box>
      <PageHeader title={"Users"} subTitle={"View all of your users"} />
      <Flex gap="xl" my="md">
        <InputField
          placeholder={"Search here..."}
          style={{ flex: 1 }}
          leftIcon={"search"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button primary={false} label={"Clear"} onClick={() => setSearch("")} />
      </Flex>
      <DataGrid
        data={filteredItems}
        columns={Columns(onHandleStatus)}
        progressPending={status === "loading"}
      />
    </Box>
  );
};

export default Users;
