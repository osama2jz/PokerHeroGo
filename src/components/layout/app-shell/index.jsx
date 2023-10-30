import { useDisclosure } from "@mantine/hooks";
import { AppShell, Container } from "@mantine/core";
import Sidebar from "../sidebar";
import styles from "./styles.module.css";
import Header from "../header";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context";

function CustomAppShell() {
  const [opened, { toggle }] = useDisclosure(false);
  const { user } = useContext(UserContext);
  return user?.accessToken ? (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: {
          mobile: !opened,
          // desktop: !opened,
        },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar className={styles["sidebar"]}>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main bg={"rgb(0,0,0,0.1)"}>
        <Container
          p={"md"}
          m={"auto"}
          maw={1200}
          bg={"white"}
          mih={"84vh"}
          style={{ borderRadius: "20px" }}
        >
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  ) : (
    <Navigate to={"/signin"} />
  );
}

export default CustomAppShell;
