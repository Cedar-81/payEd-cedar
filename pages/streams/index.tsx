import {
  Badge,
  Group,
  Paper,
  Stack,
  Text,
  SimpleGrid,
  Box,
  Flex,
  Anchor,
  Button,
  Modal,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import {
  IconDotsVertical,
  IconEye,
  IconArrowUp,
  IconArrowRight,
} from "@tabler/icons-react";
import StreamCard from "../../components/StreamCard";
import { StreamsTable } from "../../components/StreamsTable";
import Layout from "../../components/layout";
import { useDisclosure } from "@mantine/hooks";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getStreams, createStream } from "../../api/streams";
import getIncome from "../../api/income";
import { useState } from "react";
import { getAccountDetail } from "../../api/accounts";
import { StatsGridBudget } from "../../components/StatsGridBudgets";
import { abbreviateNumber } from "../../api/importantFunctions";

export default function Streams() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const streams = [
    {
      title: "Government grants",
      amount: "100,000,000($)",
    },
    {
      title: "Donation from alumni",
      amount: "25,000,000($)",
    },
    {
      title: "Revenue gotten from sales (recycled products)",
      amount: "10,000,000($)",
    },
    {
      title: "Schoolfees",
      amount: "5,000,000($)",
    },
  ];

  const createStreamMutation = useMutation({
    mutationFn: createStream,
    onSuccess: () => {
      setIsDone(true);
      setName("");
      setDescription("");
      close();
    },
  });

  const handleSubmit = () => {
    setIsDone(false);
    createStreamMutation.mutate({
      name,
      description,
      school: "1",
    });
  };

  const {
    data: Account,
    isLoading: loadingAccount,
    error: accountError,
  } = useQuery({
    queryKey: ["account"],
    queryFn: () => getAccountDetail("1"),
  });
  console.log("in account list", Account, accountError);

  const {
    data: Streams,
    isLoading: loadingStreams,
    error,
  } = useQuery({
    queryKey: ["streams"],
    queryFn: getStreams,
  });
  console.log("in streams list", Streams, error);

  const {
    data: Incomes,
    isLoading: loadingIncomes,
    error: incomeError,
  } = useQuery({
    queryKey: ["incomes"],
    enabled: !error,
    queryFn: getIncome,
  });
  console.log("in incomes list", Incomes, incomeError);

  const getStreamTotal = () => {
    let totalStream = 0;
    Streams &&
      Streams.data &&
      Streams.data.map((exp) => {
        totalStream += exp.amount;
      });

    console.log("expenses total", totalStream);

    return JSON.stringify(totalStream);
  };

  const main_balance =
    Account && Account.data && Account.data[0] && Account.data[0].balance;

  const data = [
    { title: "Main Balance", amount: abbreviateNumber(parseInt(main_balance)) },
    {
      title: "Stream Balance",
      amount: abbreviateNumber(parseInt(getStreamTotal())),
    },
  ];

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Create Stream"
        centered
        padding={"lg"}
      >
        <Stack>
          <TextInput
            onChange={(e) => setName(e.target.value)}
            value={name}
            label="Stream name"
            className="space-y-2"
          />
          <TextInput
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            label="Description"
            className="space-y-2"
          />
          <Button
            onClick={handleSubmit}
            className="bg-blue-400 text-white rounded w-fit ml-auto"
          >
            {!isDone ? "Create" : "Saving..."}
          </Button>
        </Stack>
      </Modal>
      <Layout>
        <Box className="space-y-10 py-6">
          <Box className="space-y-4">
            <Text className="text-xl">Stream Details</Text>
            <StatsGridBudget data={data} />
          </Box>

          <Box className="space-y-4">
            <Text className="text-xl">Income Streams</Text>
            <SimpleGrid
              cols={{ base: 1, sm: 2, lg: 4 }}
              className="flex-col md:flex-row"
            >
              <Paper
                className="!w-full h-full text-4xl text-gray-400 flex items-center justify-center hover:cursor-pointer"
                withBorder
                p="md"
                onClick={open}
                radius="md"
              >
                +
              </Paper>
              {Streams &&
                Streams.data &&
                Streams.data.map((stream, index) => {
                  return (
                    <Link key={index} href={"/streams/" + stream.id}>
                      <StreamCard detail={stream} />
                    </Link>
                  );
                })}
            </SimpleGrid>
          </Box>

          <Box>
            <Paper p="md" radius="md" className="bg-purple-800/20">
              <Group justify="start">
                <Text className="text-xl">Received payments</Text>
              </Group>
            </Paper>
            {Incomes && <StreamsTable incomes={Incomes} />}
          </Box>
        </Box>
      </Layout>
    </>
  );
}
