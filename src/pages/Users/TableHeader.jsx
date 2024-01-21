import { Group, HoverCard, Switch, Text } from "@mantine/core";
import ActionIcons from "../../components/general/ActionIcons";

const HoverAddress = ({ walletAddres }) => {
  const cleanedWalletAddress =
    walletAddres === "" || walletAddres === "​" ? "N/A" : walletAddres;

  return (
    <Group justify="center">
      <HoverCard shadow="md">
        <HoverCard.Target>
          <Text>{cleanedWalletAddress}</Text>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text>{cleanedWalletAddress}</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
};
export const Columns = (onHandleStatus) => [
  {
    name: "Serial No.",
    selector: (row) => row.serialNo,
    width: "120px",
    sortable: true,
  },
  {
    name: "Full Name",
    selector: (row) => row.fullName,
    width: "200px",
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    // center: true,
    width: "230px",
  },
  {
    name: "Wallet Address",
    selector: (row) => {
      const walletAddress = row.walletAddress.trim();
      const cleanedWalletAddress =
        walletAddress === "" || walletAddress === "​" ? "N/A" : walletAddress;
      return cleanedWalletAddress;
    },
    sortable: true,
    center: true,
    width: "220px",
    cell: (row) => <HoverAddress walletAddres={row.walletAddress?.trim()} />,
  },
  // Commented out because of client's request  Date 2024-01-16
  // {
  //   name: "Phone No.",
  //   selector: (row) => row.phone,
  //   sortable: true,
  //   // center: true,
  //   width: "160px",
  // },
  {
    name: "Crypto Earned",
    selector: (row) => row.cryptoEarnedOverLifetime || "--",
    sortable: true,
    center: true,
    width: "160px",
  },
  {
    name: "PRO NFT",
    selector: (row) => (row.proJokerNFTClaimed ? "Earned" : "--"),
    sortable: true,
    center: true,
    width: "120px",
  },
  {
    name: "PRO Joker Cards",
    selector: (row) => row.proJokerCount || "--",
    sortable: true,
    center: true,
    width: "180px",
  },
  {
    name: "P2E NFT",
    selector: (row) => (row.p2eJokerNFTClaimed ? "Earned" : "--"),
    sortable: true,
    center: true,
    width: "120px",
  },
  {
    name: "P2E Joker Cards",
    selector: (row) => row.p2eJokerCount || "--",
    sortable: true,
    center: true,
    width: "180px",
  },
  {
    name: "Poker Cards",
    selector: (row) => row.pokerCardCount || row.cardsEarned?.length || "--",
    sortable: true,
    center: true,
    width: "140px",
  },
  {
    name: "Game Coins Earned",
    selector: (row) => row.coinsEarnedOverLifetime,
    sortable: true,
    center: true,
    width: "180px",
  },
  {
    name: "Registration Date",
    selector: (row) => row.createdAt,
    sortable: true,
    center: true,
    width: "200px",
    cell: (row) => <Text>{new Date(row.createdAt).toLocaleDateString()}</Text>,
  },
  {
    name: "Active",
    selector: (row) => row.status,
    sortable: true,
    center: true,
    width: "200px",
    cell: (row) => (
      <Switch
        key={row.id}
        defaultChecked={row.status === "Active" ? true : false}
        onChange={(e) =>
          onHandleStatus.mutate({
            status: e.currentTarget.checked ? "Active" : "Blocked",
            id: row._id,
          })
        }
      />
    ),
  },
  {
    name: "Actions",
    center: true,
    width: "100px",
    cell: (row) => <ActionIcons rowData={row} del={true} type="Users" />,
  },
];
