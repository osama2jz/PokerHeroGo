import {
  Box,
  Center,
  Group,
  Loader,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import PageHeader from "../../components/general/PageHeader";
import Card from "./Card";
import { useQuery } from "react-query";
import axios from "axios";
import Chart from "react-apexcharts";
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
  const [countries, setCountries] = useState({
    options: {},
    series: [44, 55, 41, 17, 15],
    chartOptions: {
      labels: ["USA", "UK", "Germany", "France", "Others"],
    },
  });
  const [drops, setDrops] = useState({
    options: {},
    series: [44, 55],
    chartOptions: {
      labels: ["Live", "Claimed"],
    },
  });
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
  if (false)
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
          value={data?.data?.data?.totalUsers}
          icon={<User2Icon />}
        />
        <Card
          title="Total Drops"
          value={data?.data?.data?.totalDrops}
          icon={<DropletIcon />}
        />
        <Card
          title="Claimed Drops"
          value={data?.data?.data?.claimedDrops}
          icon={<CheckCircle2Icon />}
        />
      </Group>
      <SimpleGrid cols={2} my="md">
        <Stack>
          <Chart
            options={countries.chartOptions}
            series={countries.series}
            type="pie"
            height="300px"
          />
          <Title order={3} ta={"center"}>
            Users Countries
          </Title>
        </Stack>
        <Stack>
          <Chart
            options={drops.chartOptions}
            series={drops.series}
            type="donut"
            height="300px"
          />
          <Title order={3} ta={"center"}>
            All Drops 
          </Title>
        </Stack>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
