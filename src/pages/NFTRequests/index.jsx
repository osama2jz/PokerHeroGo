import { Box, Flex } from "@mantine/core";
import PageHeader from "../../components/general/PageHeader";
import DataGrid from "../../components/general/Table";
import { Columns } from "./TableHeader";
import InputField from "../../components/general/InputField";
import SelectMenu from "../../components/general/SelectMenu";
import Button from "../../components/general/Button";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { backendUrl } from "../../constants";
import axios from "axios";
import { UserContext } from "../../context";
import toast from "react-hot-toast";

const Requests = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const { status } = useQuery(
    "fetchRequests",
    () => {
      return axios.get(backendUrl + "/request?conversionType=NFT", {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        let index = 0;
        let newData = data.filter((obj, ind) => {
          if (obj.user !== null) {
            obj.serialNo = ++index;
            return true;
          }
          return false;
        });
        setData(newData);
        toast.dismiss();
      },
    }
  );
  const filteredItems = data.filter((item) => {
    return (
      item?.user?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      item?.user?.walletAddress?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Box>
      <PageHeader
        title={"NFT Requests"}
        subTitle={"View NFT Reward Requests of your players"}
      />
      <Flex gap="xl" my="md">
        <InputField
          placeholder={"Search Drop here..."}
          style={{ flex: 1 }}
          leftIcon={"search"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          primary={false}
          label={"Clear"}
          onClick={() => {
            setSearch("");
            setFilter("All");
          }}
        />
      </Flex>
      <DataGrid
        data={filteredItems}
        columns={Columns}
        progressLoading={status === "loading"}
      />
    </Box>
  );
};

export default Requests;
