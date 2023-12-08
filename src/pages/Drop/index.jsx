import { Box, Checkbox, Flex, Stack } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  Autocomplete,
  CircleF,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import Button from "../../components/general/Button";
import InputField from "../../components/general/InputField";
import PageHeader from "../../components/general/PageHeader";
import { backendUrl } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import SelectMenu from "../../components/general/SelectMenu";
import moment from "moment-timezone";

const Drop = () => {
  // get dropsCount, passedCenter, passedRadius from location state
  const {
    dropsCount,
    center: passedCenter,
    radius: passedRadius,
    dropName,
  } = useLocation().state || {};

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [center, setCenter] = useState(passedCenter || { lat: 30, lng: 70 });
  const [radius, setRadius] = useState(passedRadius || 300);
  const [markers, setMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
    libraries: ["places", "geometry", "drawing"],
  });

  const dropTypes = ["Coin", "Joker", "Poker Card"];

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
      expirationDate: "",
      expirationTime: "",
      scheduleDate: "",
      scheduleTime: "",
      dropName: dropName ? `Re-${dropName}` : "",
      dropCoins: 0,
      // noOfCards:null,
      noOfOffers: dropsCount || "",
      schedule: false,
    },

    validate: {
      dropName: (value) => (value?.length > 0 ? null : "Enter Drop Name"),
      noOfOffers: (value) => (value ? null : "Select Number of Cards"),
      expirationDate: (value) => (value ? null : "Select Expiration Date"),
      expirationTime: (value) =>
        value?.length > 0 ? null : "Select Expiration Time",
    },
  });
  const onPlaceChanged = () => {
    if (selectedPlace != null) {
      const place = selectedPlace.getPlace();
      // const name = place.name;
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const onLoad = useCallback((autocomplete) => {
    setSelectedPlace(autocomplete);
  }, []);

  const handleAddDrop = useMutation(
    async (values) => {
      setLoading(true);
      const data = { ...values };

      data.locations = data.locations.map((obj) => Object.values(obj));
      data.center = center;
      data.radius = radius;

      // Get the current date in China
      let dateInChina = moment(data.expirationDate).tz("Asia/Shanghai");
      // Set the hours and minutes to match the input time
      dateInChina.hours(parseInt(data.expirationTime.split(":")[0]));
      dateInChina.minutes(data.expirationTime.split(":")[1]);

      data.expirationDate = dateInChina.toISOString();

      if (data.schedule) {
        // Get the current date in China
        let dateInChina = moment(data.scheduleDate).tz("Asia/Shanghai");
        // Set the hours and minutes to match the input time
        dateInChina.hours(parseInt(data.scheduleTime.split(":")[0]));
        dateInChina.minutes(data.scheduleTime.split(":")[1]);

        data.scheduleDate = dateInChina.toISOString();
      }

      return axios.post(backendUrl + `/drops`, data, {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
    },
    {
      onSuccess: (response) => {
        toast.success(response.data.message);
        form.reset();
        setLoading(false);
        navigate("/drop");
      },
      onError: (err) => {
        toast.error(err.response.data.message);
        setLoading(false);
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
          {isLoaded && (
            <>
              <Autocomplete
                types={["geocode"]}
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
              >
                <InputField placeholder="Search for a location" />
              </Autocomplete>
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
                    <Marker
                      draggable
                      position={obj}
                      title="Location"
                      key={ind}
                    />
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
                      draggable={true}
                      onDragEnd={(e) => {
                        setMarkers([]);
                        setCenter({
                          lat: e.latLng.lat(),
                          lng: e.latLng.lng(),
                        });
                      }}
                      onCenterChanged={() => {
                        setMarkers([]);
                      }}
                      onRadiusChanged={() => {
                        setMarkers([]);
                      }}
                    />
                  )}
                </GoogleMap>
              </Box>
            </>
          )}
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
              label={"Select Card Type"}
              required
              form={form}
              searchable
              data={dropTypes}
              validateName="cardType"
            />
            <InputField
              label={"Number Of Cards"}
              required
              form={form}
              validateName="noOfOffers"
            />
            <InputField
              label={"Area (Radius)"}
              value={radius}
              required
              type="number"
              onChange={(e) => setRadius(parseInt(e.target.value))}
            />
            {/* <InputField
              label={"Drop Coins"}
              form={form}
              validateName={"dropCoins"}
            /> */}
            <Flex gap="md">
              <DateInput
                label="Expiry Date"
                placeholder="Expiry Date"
                withAsterisk
                minDate={new Date()}
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
                  minDate={new Date()}
                  maxDate={form.values.expirationDate}
                  withAsterisk
                  style={{ width: "50%" }}
                  {...form.getInputProps("scheduleDate")}
                />
                <TimeInput
                  label="Schedule Time"
                  withAsterisk
                  style={{ flex: 1 }}
                  {...form.getInputProps("scheduleTime")}
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
                loading={loading}
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
