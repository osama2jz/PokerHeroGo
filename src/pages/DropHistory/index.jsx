import { Box, Flex } from "@mantine/core";
import PageHeader from "../../components/general/PageHeader";
import DataGrid from "../../components/general/Table";
import { Columns } from "./TableHeader";
import InputField from "../../components/general/InputField";
import Button from "../../components/general/Button";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { backendUrl } from "../../constants";
import axios from "axios";
import { UserContext } from "../../context";

const DropHistory = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
    libraries: ["places", "geometry", "drawing"],
  });

  const { status } = useQuery(
    "fetchDropHistory",
    () => {
      return axios.get(backendUrl + "/drop-history", {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
    },
    {
      onSuccess: async (res) => {
        const data = res.data.data;
        let newData = data.map(async (obj, ind) => {
          const geocoder = new window.google.maps.Geocoder();
          const latlng = {
            lat: parseFloat(obj.center.lat),
            lng: parseFloat(obj.center.lng),
          };
          let result = await geocoder.geocode({ location: latlng });
          if (result.results[0]) {
            result = result.results[0];
          }

          return {
            ...obj,
            serialNo: ind + 1,
            centerLocation: result.formatted_address,
            centerLocationURL: `https://www.google.com/maps/search/?api=1&query=${obj.center.lat},${obj.center.lng}`,
          };
        });

        await Promise.all(newData).then((res) => {
          newData = res;
        });

        setData(newData);
      },
      enabled: isLoaded,
    }
  );
  const filteredItems = data.filter((item) => {
    if (!search) return true;
    return (
      item?.dropName?.toLowerCase().includes(search.toLowerCase()) ||
      item?.centerLocation?.toLowerCase().includes(search.toLowerCase())
    );
  });
  return (
    <Box>
      <PageHeader
        title={"Drop History"}
        subTitle={"View all of your Drop History"}
      />
      <Flex gap="xl" my="md">
        <InputField
          placeholder={"Search Drop..."}
          style={{ flex: 1 }}
          leftIcon={"search"}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button primary={false} label={"Clear"} onClick={() => setOpen(true)} />
      </Flex>
      <DataGrid
        data={filteredItems}
        columns={Columns}
        progressLoading={status === "loading"}
      />
    </Box>
  );
};

export default DropHistory;
