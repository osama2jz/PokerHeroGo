import { Group, HoverCard, Switch, Text } from "@mantine/core";
import ActionIcons from "../../components/general/ActionIcons";

const HoverAddress = ({ walletAddres }) => {
  const cleanedWalletAddress =
    walletAddres === "" || walletAddres === "​" ? "N/A" : walletAddres;

  return (
    <Group justify="center">
      <HoverCard width={280} shadow="md">
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
  {
    name: "Phone No.",
    selector: (row) => row.phone,
    sortable: true,
    // center: true,
    width: "160px",
  },
  {
    name: "Crypto Earned",
    selector: (row) => row.cryptoEarnedOverLifetime ||"--",
    sortable: true,
    center: true,
    width: "160px",
  },
  {
    name: "NFTs Earned",
    selector: (row) => row.proJokerNFTClaimed+row.p2eJokerNFTClaimed || "--",
    sortable: true,
    center: true,
    width: "140px",
  },
  {
    name: "Poker Cards",
    selector: (row) => row.cardsEarned?.length || "--",
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
