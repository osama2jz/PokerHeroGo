import { Box, Flex } from "@mantine/core";
import PageHeader from "../../components/general/PageHeader";
import DataGrid from "../../components/general/Table";
import { Columns } from "./TableHeader";
import InputField from "../../components/general/InputField";
import Button from "../../components/general/Button";
import { useState } from "react";
import AddOfferType from "./AddOfferType";

const OfferTypes = () => {
  const [open, setOpen] = useState(false);
  const data = [
    {
      serialNo: 1,
      name: "Abdullah Saad",
      email: "abdullahsaad5@gmail.com",
      totalCoins: 534,
      registerationDate: "2-dec-2023",
    },
    {
      serialNo: 2,
      name: "Abdullah Saad",
      email: "abdullahsaad5@gmail.com",
      totalCoins: 534,
      registerationDate: "2-dec-2023",
    },
    {
      serialNo: 3,
      name: "Abdullah Saad",
      email: "abdullahsaad5@gmail.com",
      totalCoins: 534,
      registerationDate: "2-dec-2023",
    },
    {
      serialNo: 4,
      name: "Abdullah Saad",
      email: "abdullahsaad5@gmail.com",
      totalCoins: 534,
      registerationDate: "2-dec-2023",
    },
  ];
  return (
    <Box>
      <PageHeader
        title={"Offer Types"}
        subTitle={"View all of your Offer Types"}
      />
      <Flex gap="xl" my="md" wrap={"wrap"}>
        <InputField
          placeholder={"Search here..."}
          style={{ flex: 1, minWidth: "200px" }}
          leftIcon={"search"}
        />
        <Button primary={false} label={"Clear"} />
        <Button label={"Add Offer Type"} onClick={() => setOpen(true)} />
      </Flex>
      <DataGrid data={data} columns={Columns} />
      <AddOfferType open={open} setOpen={setOpen} />
    </Box>
  );
};

export default OfferTypes;
