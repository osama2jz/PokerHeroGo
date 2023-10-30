import { Box, NavLink, Text } from "@mantine/core";
import {
  CalendarCheck,
  CheckCircle2Icon,
  DropletIcon,
  GaugeCircleIcon,
  HelpCircle,
  Settings,
  StarIcon,
  User2Icon
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
export default function Sidebar({toggle}) {
  // State to keep track of active link
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();

  // Sidebar Links
  const content = useMemo(() => {
    return [
      {
        label: "Dashboard",
        icon: <GaugeCircleIcon size={18} />,
        isLink: true,
        to: "/",
      },
      {
        label: "Offers",
        icon: <DropletIcon size={18} />,
        isLink: false,
        children: [
          {
            label: "Drop",
            icon: <DropletIcon size={18} />,
            to: "/drop",
          },
          {
            label: "Scheduled",
            icon: <CalendarCheck size={18} />,
            to: "/scheduled",
          },
          {
            label: "Live",
            icon: <StarIcon size={18} />,
            to: "/live",
          },
          {
            label: "Claimed",
            icon: <CheckCircle2Icon size={18} />,
            to: "/claimed",
          },
          {
            label: "Requests",
            icon: <HelpCircle size={18} />,
            to: "/requests",
          },
        ],
      },
      {
        label: "Players",
        icon: <User2Icon size={18} />,
        isLink: false,
        children: [
          {
            label: "Users",
            icon: <User2Icon size={18} />,
            to: "/users",
          },
        ],
      },
      {
        label: "Settings",
        icon: <Settings size={18} />,
        isLink: false,
        children: [
          {
            label: "Settings",
            icon: <Settings size={18} />,
            to: "/settings",
          },
        ],
      },
    ];
  }, []);

  return (
    <Box className={styles["sidebar-container"]}>
      {content.map((item, ind) => {
        // If the item is a link, return a NavLink component
        if (item.isLink) {
          return (
            <NavLink
              key={ind}
              className={styles["navlink"]}
              active={active === item.label}
              label={item.label}
              leftSection={item.icon}
              onClick={() => {
                navigate(item.to);
                setActive(item.label);
                toggle()
              }}
            />
          );
        } else {
          return (
            // If the item is not a link, return a Text component
            <Box key={ind}>
              <Text
                className={styles["sidebar-section-title"]}
                c="gray"
                key={item.label}
              >
                {item.label}
              </Text>
              {item.children.map((child, i) => {
                return (
                  <NavLink
                    key={i}
                    className={styles["navlink"]}
                    label={child.label}
                    active={active === child.label}
                    leftSection={child.icon}
                    onClick={() => {
                      navigate(child.to);
                      setActive(child.label);
                      toggle()
                    }}
                  />
                );
              })}
            </Box>
          );
        }
      })}
    </Box>
  );
}
