import { Box, Flex, Text, Title } from "@mantine/core";
import React from "react";

const Card = ({ title, description, value, icon }) => {
  return (
    <Flex
      w={300}
      h={150}
      p={20}
      justify="space-between"
      direction={"column"}
      style={{ border: "1px solid rgb(0,0,0,0.2)", borderRadius: "20px" }}
    >
      <Flex justify={"space-between"}>
        <Text>{title}</Text>
        {icon}
      </Flex>
      <Title>{value}</Title>
      <Text c="gray">{description}</Text>
    </Flex>
  );
};

export default Card;
