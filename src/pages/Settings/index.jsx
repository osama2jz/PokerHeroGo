import { Box, Group, PasswordInput, Stack } from "@mantine/core";
import React, { useContext } from "react";
import Button from "../../components/general/Button";
import PageHeader from "../../components/general/PageHeader";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { backendUrl } from "../../constants";
import axios from "axios";
import { UserContext } from "../../context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPass: "",
    },

    validate: {
      oldPassword: (value) =>
        value?.length > 0 ? null : "Please enter old password",
      newPassword: (value) =>
        value?.length > 7
          ? null
          : "Please enter new password containing at least 8 characters",
      confirmPass: (value, values) =>
        value?.length > 0 && values?.newPassword === value
          ? null
          : "Please enter confirm password",
    },
  });
  const handleChangePassword = useMutation(
    async (values) => {
      return axios.patch(backendUrl + `/auth/change-password`, values, {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        toast.success(res.data.message);
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );
  return (
    <form
      onSubmit={form.onSubmit((values) => handleChangePassword.mutate(values))}
    >
      <Stack>
        <PageHeader
          title={"Settings"}
          subTitle={"Update your profile settings"}
        />
        <PasswordInput
          label="Old Password"
          {...form.getInputProps("oldPassword")}
          size="md"
        />
        <PasswordInput
          label="New Password"
          {...form.getInputProps("newPassword")}
          size="md"
        />
        <PasswordInput
          label="Confirm Password"
          {...form.getInputProps("confirmPass")}
          size="md"
        />
        <Group justify="flex-end" mt="lg">
          <Button
            label={"Cancel"}
            primary={false}
            onClick={() => navigate("/")}
          />
          <Button label={"Update"} type={"submit"} />
        </Group>
      </Stack>
    </form>
  );
};

export default Settings;
