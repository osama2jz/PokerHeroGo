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
    name: "Tutorial Link",
    selector: (row) => row.link,
    sortable: true,
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
    cell: (row) => (
      <ActionIcons
        rowData={row}
        del={true}
        type="tutorial"
      />
    ),
  }
];
