import { Group, Stack, TextInput } from "@mantine/core";
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

const SocialMediaLinks = () => {
  const queryClient = new useQueryClient();
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const { status } = useQuery(
    "fetchSocialMediaLinks",
    () => {
      return axios.get(backendUrl + "/social-media-links", {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        form.setValues(data);
        form.resetTouched();
      },
    }
  );
  const handleSocialMediaLinksUpdate = useMutation(
    async (values) => {
      return axios.patch(backendUrl + `/social-media-links`, values, {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("fetchSocialMediaLinks");
        toast.success(res.data.message);
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      facebook: "facebook.com/",
      x: "twitter.com/",
      instagram: "instagram.com/",
    },

    validate: {
      facebook: (value) =>
        /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9.-]+\/?$/.test(value)
          ? null
          : "Please enter valid facebook url e.g. https://facebook.com/username",
      x: (value) =>
        /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9.-]+\/?$/.test(value)
          ? null
          : "Please enter valid twitter url e.g. https://twitter.com/username",
      instagram: (value) =>
        /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9.-]+\/?$/.test(value)
          ? null
          : "Please enter valid instagram url e.g. https://instagram.com/username",
    },
  });
  return (
    <form
      onSubmit={form.onSubmit((values) => {
        handleSocialMediaLinksUpdate.mutate(values);
      })}
    >
      <Stack w="100%">
        <PageHeader title={"Social Media Links"} />
        <TextInput
          label="Facebook"
          {...form.getInputProps("facebook")}
          size="md"
        />
        <TextInput
          label="Instagram"
          {...form.getInputProps("instagram")}
          size="md"
        />
        <TextInput label="X (Twitter)" {...form.getInputProps("x")} size="md" />
        <Group justify="flex-end" mt="lg">
          <Button
            label={"Cancel"}
            primary={false}
            onClick={() => navigate("/")}
          />
          <Button label={"Update Links"} type={"submit"} />
        </Group>
      </Stack>
    </form>
  );
};

export default SocialMediaLinks;
