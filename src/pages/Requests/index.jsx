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
      return axios.get(backendUrl + "/request", {
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
        toast.dismiss();
      },
    }
  );
  const filteredItems = data.filter((item) => {
    const filterData =
      filter === "All" ? true : item?.conversionType === filter;
    return (
      filterData &&
      item?.user?.fullName?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Box>
      <PageHeader
        title={"Requests"}
        subTitle={"View Reward Requests of your players"}
      />
      <Flex gap="xl" my="md">
        <InputField
          placeholder={"Search Drop here..."}
          style={{ flex: 1 }}
          leftIcon={"search"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      <SelectMenu
          data={["All", "NFT", "Crypto", { label: "Pokerhand", value: "Coin" }]}
          placeholder="Filter"
          value={filter}
          onChange={setFilter}
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
