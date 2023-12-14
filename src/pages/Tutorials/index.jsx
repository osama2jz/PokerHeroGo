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
import ImageUpload from "../../components/general/ImageUpload";
import uuid from "react-uuid";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const Tutorials = () => {
  const queryClient = new useQueryClient();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { status } = useQuery(
    "fetchTutorials",
    () => {
      return axios.get(backendUrl + "/tutorial", {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        let newData = data.map((obj, ind) => {
          let linkURL = obj.link;
          // if obj.link is an iframe
          if (linkURL.includes("iframe")) {
            let link = linkURL.split("src=");
            let newLink = link[1].split(" ");
            linkURL = newLink[0].replace(/"/g, "");
          }
          return { ...obj, serialNo: ind + 1, linkURL };
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
    },

    validate: {
      title: (value) =>
        value?.length > 2
          ? null
          : "Please enter title greater than 2 characters",
      link: (value) =>
        value?.length > 0
          ? null
          : "Please enter link greater than 0 characters",
      coverImage: (value) => (value ? null : "Please upload cover image"),
    },
  });
  const handleAddTutorial = useMutation(
    async (values) => {
      let coverImage = values.coverImage;
      // upload image to firebase
      const storageRef = ref(storage, `tutorials/${uuid()}`);
      const uploadTask = uploadBytesResumable(storageRef, coverImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          toast.loading(`Uploading Cover Image to Firebase`);
          switch (snapshot.state) {
            case "paused":
              toast.error("Upload is paused");
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            values.coverImage = downloadURL;
            let response = await axios.post(backendUrl + `/tutorial`, values, {
              headers: {
                authorization: `${user.accessToken}`,
              },
            });
            toast.success(response.data.message);
            queryClient.invalidateQueries("fetchTutorials");
            form.reset();
          });
        }
      );
    },
    {
      onSuccess: (res) => {},
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );
  return (
    <form
      onSubmit={form.onSubmit((values) => {
        handleAddTutorial.mutate(values);
      })}
    >
      <Stack w="100%">
        <PageHeader title={"Tutorials"} />
        <Accordion
          defaultValue="addTutorial"
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
          <Accordion.Item value="addTutorial">
            <Accordion.Control>
              <Title order={3}>Add Tutorial</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <TextInput
                label="Title"
                {...form.getInputProps("title")}
                size="md"
              />
              <TextInput
                label="Tutorial Link"
                {...form.getInputProps("link")}
                size="md"
              />
              <TextInput
                label="Description"
                {...form.getInputProps("description")}
                size="md"
              />

              <ImageUpload form={form} name="coverImage" />
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
            title={"Tutorials Table"}
            subTitle={"View all of tutorials"}
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

export default Tutorials;
