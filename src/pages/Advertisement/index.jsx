import {
  Accordion,
  Box,
  Flex,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import Button from "../../components/general/Button";
import PageHeader from "../../components/general/PageHeader";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { backendUrl } from "../../constants";
import axios from "axios";
import { UserContext } from "../../context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DataGrid from "../../components/general/Table";
import InputField from "../../components/general/InputField";
import { Columns } from "./TableHeader";

const Advertisements = () => {
  const queryClient = new useQueryClient();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { status } = useQuery(
    "fetchAdvertisements",
    () => {
      return axios.get(backendUrl + "/advertisement", {
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

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      link: "",
      description: "",
      coverImage: "",
    },

    validate: {
      title: (value) =>
        value?.length > 2
          ? null
          : "Please enter title greater than 2 characters",
      coverImage: (value) =>
        value?.length > 0
          ? null
          : "Please enter coverimage link greater than 0 characters",
      link: (value) =>
        value?.length > 0
          ? null
          : "Please enter link greater than 0 characters",
    },
  });
  const handleAddAdvertisement = useMutation(
    async (values) => {
      return axios.post(backendUrl + `/advertisement`, values, {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("fetchAdvertisements");
        toast.success(res.data.message);
        form.reset();
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );
  return (
    <form
      onSubmit={form.onSubmit((values) => {
        handleAddAdvertisement.mutate(values);
      })}
    >
      <Stack w="100%">
        <PageHeader title={"Advertisements"} />
        <Accordion
          defaultValue="addAdvertisement"
          styles={{
            item: {
              // styles added to all items
              backgroundColor: "#fff",
              border: "1px solid #ededed",

              // styles added to expanded item
              "&[data-active]": {
                backgroundColor: "#ccc",
              },
            },
          }}
        >
          <Accordion.Item value="addAdvertisement">
            <Accordion.Control>
              <Title order={3}>Add Advertisement</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <TextInput
                label="Title"
                {...form.getInputProps("title")}
                size="md"
              />
              <TextInput
                label="Advertisement Cover Image URL"
                {...form.getInputProps("coverImage")}
                size="md"
              />
              <TextInput
                label="Advertisement Link"
                {...form.getInputProps("link")}
                size="md"
              />
              <TextInput
                label="Description"
                {...form.getInputProps("description")}
                size="md"
              />
              <Group justify="flex-end" mt="lg">
                <Button
                  label={"Cancel"}
                  primary={false}
                  onClick={() => navigate("/")}
                />
                <Button label={"Add"} type={"submit"} />
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <Box px="md">
          <PageHeader
            title={"Advertisements Table"}
            subTitle={"View all Advertisements"}
          />
          <DataGrid
            data={data}
            columns={Columns}
            progressLoading={status === "loading"}
          />
        </Box>
      </Stack>
    </form>
  );
};

export default Advertisements;
