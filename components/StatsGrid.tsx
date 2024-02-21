import { Group, Paper, SimpleGrid, Text, Badge, Flex } from "@mantine/core";
import { IconEye, IconArrowUp, IconDotsVertical } from "@tabler/icons-react";
import classes from "../styles/StatsGrid.module.css";

const data = [
  { title: "Total Balance", amount: "100,635.15" },
  { title: "Last Income", amount: "+15,000" },
  { title: "Expenses", amount: "-10,000" },
] as const;

export function StatsGrid() {
  const stats = data.map((stat) => {
    return (
      <Paper
        className="w-full md:w-60"
        withBorder
        p="md"
        radius="md"
        key={stat.title}
      >
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <IconDotsVertical />
        </Group>
        <Group className="pt-8" justify="space-between">
          <Text>{stat.amount}</Text>
          <IconEye />
          <Badge leftSection={<IconArrowUp size={12} />}>10%</Badge>
        </Group>
      </Paper>
    );
  });
  return (
    <Paper withBorder className={" !p-6 md:!mx-6 !space-y-6"}>
      <Text className="text-xl">Total Income</Text>
      <Flex wrap={"wrap"} align={"center"} gap={"md"}>
        {stats}
      </Flex>
      {/* <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>{stats}</SimpleGrid> */}
    </Paper>
  );
}
