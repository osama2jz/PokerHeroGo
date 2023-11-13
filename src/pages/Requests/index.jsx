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
      },
    }
  );
  const filteredItems = data.filter((item) => {
    return (
      item?.dropName?.toLowerCase().includes(search.toLowerCase()) ||
      item?.park?.name?.toLowerCase().includes(search.toLowerCase())
    );
  });
  return (
    <Box>
      <PageHeader
        title={"Requests"}
        subTitle={"View all of your Requests drops"}
      />
      <Flex gap="xl" my="md">
        <InputField
          placeholder={"Search Drop or Park here..."}
          style={{ flex: 1 }}
          leftIcon={"search"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SelectMenu
          data={["All", "NFT", "Crypto", "Pokerhand"]}
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
