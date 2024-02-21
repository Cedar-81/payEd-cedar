import { Box, Button, Group, Paper, Text } from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";

type Props = {
  item: {
    key: number;
    size: string;
    title: string;
    icon: (props: TablerIconsProps) => JSX.Element;
    color: string;
  };
};

export default function MarketplaceInfoCard({ item }: Props) {
  return (
    <Paper withBorder className={`bg-transparent border-gray-500 px-3 py-4 `}>
      <Group>
        <Paper
          withBorder
          className={`bg-transparent border-${item.color}-300 p-2`}
        >
          <item.icon className={`stroke-1 stroke-${item.color}-300`} />
        </Paper>
        <Box className="space-y-1">
          <Text size="xl" className="leading-4 font-medium">
            {item.size}
          </Text>
          <Text size="sm" className="">
            {item.title}
          </Text>
        </Box>
      </Group>
    </Paper>
  );
}
