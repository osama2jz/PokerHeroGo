import { Avatar, HoverCard, Text } from "@mantine/core";
import ActionIcons from "../../components/general/ActionIcons";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "120px",
    sortable: true,
  },
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Cover Image",
    width: "150px",
    selector: (row) => row.coverImage,
    cell: (row) => (
      <HoverCard>
        <HoverCard.Target>
          <Avatar
            p={10}
            src={row.coverImage}
            alt={row.title}
              size={80}
         />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <img
            src={row.coverImage}
            alt={row.title}
            width="300px"
            height="149.61px"
          />
        </HoverCard.Dropdown>
      </HoverCard>
    ),
  },
  {
    name: "Tutorial Link",
    selector: (row) => row.link,
    cell: (row) => (
      <a href={row.linkURL} target="_blank">
        {row.link}
      </a>
    ),
  },
  {
    name: "Description",
    selector: (row) => row.description,
    maxWidth: "400px",
    sortable: true,
  },
  {
    name: "Actions",
    center: true,
    width: "100px",
    cell: (row) => <ActionIcons rowData={row} del={true} type="tutorial" />,
  },
];
