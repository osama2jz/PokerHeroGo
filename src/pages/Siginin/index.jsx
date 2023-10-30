import { Image, PasswordInput, Stack, Title } from "@mantine/core";
import Button from "../../components/general/Button";
import InputField from "../../components/general/InputField";
import logo from "/logo.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants";
import { useForm } from "@mantine/form";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../context";

const Signin = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value?.length > 0 ? null : "Enter Password"),
    },
  });

  const handleSignin = useMutation(
    async (values) => {
      return axios.post(backendUrl + `/auth/login?dashboard=true`, values);
    },
    {
      onSuccess: (response) => {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setUser(response.data.data);
        navigate("/");
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );
  if (user?.accessToken) return <Navigate to={"/"} />;
  return (
    <form onSubmit={form.onSubmit((values) => handleSignin.mutate(values))}>
      <Stack
        w={350}
        m="auto"
        style={{
          border: "1px solid rgb(0,0,0,0.2)",
          borderRadius: "20px",
          padding: "20px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image src={logo} w={120} m="auto" />
        <Title ta={"center"}>Sign In</Title>
        <InputField
          label={"Email"}
          required={true}
          form={form}
          validateName={"email"}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          size="md"
          withAsterisk
          {...form.getInputProps("password")}
        />
        <Button
          label={"Signin"}
          type={"submit"}
          loading={handleSignin.isLoading}
        />
      </Stack>
    </form>
  );
};

export default Signin;
