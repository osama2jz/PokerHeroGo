import { Box, Checkbox, Flex, SimpleGrid, Stack } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { CircleF, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import Button from "../../components/general/Button";
import InputField from "../../components/general/InputField";
import PageHeader from "../../components/general/PageHeader";
import SelectMenu from "../../components/general/SelectMenu";
import { backendUrl, pokerCards } from "../../constants";
import { useNavigate } from "react-router-dom";

const Drop = () => {
  const navigate = useNavigate();
  const [center, setCenter] = useState({ lat: 30, lng: 70 });
  const [radius, setRadius] = useState(300);
  const [markers, setMarkers] = useState([]);

  // Use the Geolocation API to get the user's location by default
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const form = useForm({
    initialValues: {
      locations: [],
      card: "",
      expirationDate: "",
      expirationTime: "",
      dropName: "",
      dropCoins: 0,
      noOfOffers: "",
      schedule: false,
    },

    validate: {
      dropName: (value) => (value?.length > 0 ? null : "Enter Drop Name"),
      dropType: (value) => (value?.length > 0 ? null : "Enter Drop Type"),
      dropCoins: (value) => (value > 0 ? null : "Enter Drop Coins"),
      card: (value) => (value?.length > 0 ? null : "Select Card"),
      expirationDate: (value) => (value ? null : "Select Expiration Date"),
      expirationTime: (value) =>
        value?.length > 0 ? null : "Select Expiration Time",
    },
  });

  const handleAddDrop = useMutation(
    async (values) => {
      values.locations = values.locations.map((obj) => Object.values(obj));
      return axios.post(backendUrl + `/drops`, values);
    },
    {
      onSuccess: (response) => {
        toast.success(response.data.message);
        form.reset();
        navigate("/drop");
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );

  const generateOffers = () => {
    // An array to store the generated points
    var points = [];
    // A constant for converting degrees to radians
    var DEG_TO_RAD = Math.PI / 180;
    // A constant for the Earth's radius in meters
    var EARTH_RADIUS = 6378100;
    // Loop for each point
    for (var i = 0; i < form.values.noOfOffers; i++) {
      // Generate a random angle in radians
      var angle = Math.random() * Math.PI * 2;
      // Generate a random distance from the center in meters
      var distance = Math.random() * radius;
      // Calculate the offset in latitude and longitude using the haversine formula
      var latOffset = (distance * Math.cos(angle)) / EARTH_RADIUS / DEG_TO_RAD;
      var lngOffset =
        (distance * Math.sin(angle)) /
        EARTH_RADIUS /
        DEG_TO_RAD /
        Math.cos(center.lat * DEG_TO_RAD);
      // Add the offset to the center latitude and longitude
      var lat = center.lat + latOffset;
      var lng = center.lng + lngOffset; // Assuming the longitude is fixed at 123
      // Create an object with the latitude and longitude and push it to the array
      var point = { lat: lat, lng: lng };
      points.push(point);
    }
    // Return the array of points
    setMarkers(points);
    form.setFieldValue("locations", points);
  };
  return (
    <Box>
      <PageHeader title={"Drop"} subTitle={"Drop your offer like its hot"} />

      <Flex gap="lg" wrap={{ base: "wrap", lg: "nowrap" }}>
        <Stack w={{ base: "100%", lg: "75%" }}>
          <LoadScript
            id="script-loader"
            libraries={["places"]}
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}
          >
            <Box style={{ minHeight: "500px" }}>
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                }}
                center={center}
                zoom={14}
              >
                {markers.map((obj, ind) => (
                  <Marker position={obj} title="Location" key={ind} />
                ))}
                {center?.lat && (
                  <CircleF
                    center={center}
                    radius={parseInt(radius)}
                    options={{
                      fillColor: "blue",
                      fillOpacity: 0.2,
                      strokeColor: "blue",
                      strokeOpacity: 0.8,
                    }}
                  />
                )}
              </GoogleMap>
            </Box>
          </LoadScript>
        </Stack>
        <form
          style={{ flex: 1 }}
          onSubmit={form.onSubmit((values) => handleAddDrop.mutate(values))}
        >
          <Stack>
            <InputField
              label={"Drop Name"}
              required
              form={form}
              validateName="dropName"
            />
            <SelectMenu
              label={"Select Card"}
              required
              form={form}
              searchable
              data={pokerCards}
              validateName="park"
            />
            <InputField
              label={"Number of Offers"}
              required
              form={form}
              validateName={"noOfOffers"}
            />
            <InputField
              label={"Drop Coins"}
              required
              form={form}
              validateName={"dropCoins"}
            />
            <SelectMenu
              label={"Offer Type"}
              required
              data={[
                { label: "Video", value: "Video" },
                { label: "Quiz", value: "Quiz" },
              ]}
              form={form}
              validateName="dropType"
            />
            <Flex gap="md">
              <DateInput
                label="Expiry Date"
                placeholder="Expiry Date"
                withAsterisk
                style={{ width: "50%" }}
                {...form.getInputProps("expirationDate")}
              />
              <TimeInput
                label="Expiry Time"
                withAsterisk
                style={{ flex: 1 }}
                {...form.getInputProps("expirationTime")}
              />
            </Flex>
            <Checkbox
              label="Schedule Drop"
              {...form.getInputProps("schedule")}
            />
            {form.values.schedule && (
              <Flex gap="md">
                <DateInput
                  label="Schedule Date"
                  placeholder="Schedule Date"
                  withAsterisk
                  style={{ width: "50%" }}
                  {...form.getInputProps("expirationDate")}
                />
                <TimeInput
                  label="Schedule Time"
                  withAsterisk
                  style={{ flex: 1 }}
                  {...form.getInputProps("expirationTime")}
                />
              </Flex>
            )}
            <Flex justify={"space-between"} gap="md">
              <Button
                label={"Generate Offer"}
                primary={false}
                onClick={generateOffers}
                style={{ flex: 1 }}
              />
              <Button
                label={"Drop Offer"}
                style={{ flex: 1 }}
                type={"submit"}
              />
            </Flex>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
};

export default Drop;
