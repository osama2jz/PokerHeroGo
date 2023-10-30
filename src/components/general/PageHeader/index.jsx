import { Box, Divider, Text, Title } from "@mantine/core";
import React from "react";

const PageHeader = ({ title, subTitle }) => {
  return (
    <Box>
      <Title order={2}>{title}</Title>
      <Text fz={"sm"} c={"gray"}>
        {subTitle}
      </Text>
      <Divider w={"100%"} my="md" />
    </Box>
  );
};

export default PageHeader;
