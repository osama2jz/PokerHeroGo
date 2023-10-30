import { Box, Center, Group, Loader } from "@mantine/core";
import React, { useContext } from "react";
import PageHeader from "../../components/general/PageHeader";
import Card from "./Card";
import { useQuery } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants";
import { UserContext } from "../../context";
import {
  Building2,
  CheckCircle2Icon,
  DropletIcon,
  Puzzle,
  TreePine,
  User2Icon,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { status, data } = useQuery(
    "fetchStats",
    () => {
      return axios.get(backendUrl + "/dashboard", {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
    },
    {
      onSuccess: (res) => {},
    }
  );
  if (status === "loading")
    return (
      <Center>
        <Loader />
      </Center>
    );
  return (
    <Box>
      <PageHeader
        title={"Dashboard"}
        subTitle={"Overview your application statistics"}
      />
      <Group justify="space-between">
        <Card
          title={"Total Users"}
          value={data?.data?.data.totalUsers}
          icon={<User2Icon />}
        />
        {/* <Card
          title={"Total Companies"}
          value={data?.data?.data.totalCompanies}
          icon={<Building2 />}
        /> */}
        <Card
          title="Total Parks"
          value={data?.data?.data.totalParks}
          icon={<TreePine />}
        />
        <Card
          title="Total Drops"
          value={data?.data?.data.totalDrops}
          icon={<DropletIcon />}
        />
        <Card
          title="Claimed Drops"
          value={data?.data?.data.claimedDrops}
          icon={<CheckCircle2Icon />}
        />
        {/* <Card
          title="Total Coupons"
          value={data?.data?.data.totalCoupons}
          icon={<Puzzle />}
        /> */}
      </Group>
    </Box>
  );
};

export default Dashboard;
