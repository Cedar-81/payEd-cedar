import {
  Text,
  Paper,
  Stack,
  Group,
  Button,
  Modal,
  TextInput,
  Box,
  Flex,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { StatsGridBudget } from "../../components/StatsGridBudgets";
import { TableScrollArea } from "../../components/TableScrollArea";
import Layout from "../../components/layout";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getBudgetDetail } from "../../api/budgets";
import { useRouter } from "next/router";
import { getExpenses, createExpense, seedBudget } from "../../api/expenses";
import { abbreviateNumber } from "../../api/importantFunctions";

export default function BudgetDetail() {
  const { query } = useRouter();
  const { budget_id } = query;
  const id = budget_id as string;
  const [opened, { open, close }] = useDisclosure(false);
  const [seedOpened, seedAction] = useDisclosure(false);
  const [value, setValue] = useState<Date | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [seed, setSeed] = useState("0");
  const [expense, setExpense] = useState({
    title: "",
    description: "",
    amount: "",
  });

  const {
    data: Budget,
    isLoading: loadingBudget,
    error,
  } = useQuery({
    enabled: id != null && id.trim() != "",
    queryKey: ["budget", id],
    queryFn: () => getBudgetDetail(id),
  });
  console.log("inside budget id", Budget, error, id);
  const {
    data: Expenses,
    isLoading: loadingExpenses,
    error: expenseError,
  } = useQuery({
    enabled: !error && !Number.isNaN(parseInt(id)),
    queryKey: ["expenses", id],
    queryFn: () => getExpenses(id),
  });
  console.log("expense error", Expenses, error, id);
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["budget", id],
  //   enabled: budget_id && (budget_id as string).trim() != "",
  //   queryFn: () => getBudgetDetail(budget_id as string),
  // });

  const seedBudgetMutation = useMutation({
    mutationFn: seedBudget,
    onSuccess: () => {
      setSeed("");
      setIsDone(true);
      seedAction.close();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSeedSubmit = (data: { amount: string; budget_id: string }) => {
    console.log("seed data", data);
    setIsDone(false);
    seedBudgetMutation.mutate(data);
  };

  const getBudgetExpTotal = () => {
    let totalStream = 0;
    Expenses &&
      Expenses.data &&
      Expenses.data.map((exp) => {
        !exp.status ? (totalStream += exp.amount) : (totalStream += 0);
      });

    console.log("expenses total", totalStream);

    return JSON.stringify(totalStream);
  };

  const balance =
    Budget && Budget.data && Budget.data[0] && Budget.data[0].balance;
  const remBalance = parseInt(getBudgetExpTotal()) - parseInt(balance);
  const data = [
    {
      title: "Expense Total",
      amount: abbreviateNumber(parseInt(getBudgetExpTotal())),
    },
    { title: "Current Balance", amount: abbreviateNumber(parseInt(balance)) },
    {
      title: "Remaining Balance",
      amount: abbreviateNumber(
        parseInt(`${remBalance < 0 ? 0 : remBalance.toLocaleString()}`)
      ),
    },
  ];

  const createExpenseMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      setIsDone(true);
      setExpense({
        title: "",
        description: "",
        amount: "",
      });
      setValue(null);
      close();
    },
  });

  const handleSubmit = () => {
    setIsDone(false);
    createExpenseMutation.mutate({
      ...expense,
      date: value,
      budget_id: id,
    });
  };

  return (
    <>
      <Modal
        opened={seedOpened}
        onClose={seedAction.close}
        title="Add money to this budget from main account"
        centered
        padding={"lg"}
      >
        <Stack>
          <TextInput
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            label="Seed amount"
            type="number"
            className="space-y-2"
          />
          <Button
            onClick={() => handleSeedSubmit({ amount: seed, budget_id: id })}
            className="bg-blue-400 text-white rounded w-fit ml-auto"
          >
            Seed
          </Button>
        </Stack>
      </Modal>
      <Modal
        opened={opened}
        onClose={close}
        title="Add expense"
        centered
        padding={"lg"}
      >
        <Stack>
          <TextInput
            value={expense.title}
            onChange={(e) => setExpense({ ...expense, title: e.target.value })}
            label="Expense title"
            className="space-y-2"
          />
          <TextInput
            value={expense.description}
            onChange={(e) =>
              setExpense({ ...expense, description: e.target.value })
            }
            label="Description"
            className="space-y-2"
          />
          <TextInput
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            label="Amount"
            className="space-y-2"
          />
          <DateInput
            onChange={setValue}
            label="Date"
            placeholder="Date input"
            value={value}
            className="space-y-2"
          />
          <Button
            onClick={handleSubmit}
            className="bg-blue-400 text-white rounded w-fit ml-auto"
          >
            Add
          </Button>
        </Stack>
      </Modal>
      <Layout>
        <Box>
          <Stack className="space-y-10 py-6">
            <Stack>
              <Flex>
                <Text className="text-xl">
                  {Budget &&
                    Budget.data &&
                    Budget.data[0] &&
                    Budget.data[0].name}
                </Text>
                <Button onClick={seedAction.open} variant="default">
                  Seed Budget
                </Button>
              </Flex>
              <StatsGridBudget data={data} />
            </Stack>

            <Box>
              <Paper p="sm" radius="md" className="bg-purple-800/20">
                <Group justify="space-between">
                  <Text>Expenses</Text>
                  <Button
                    onClick={open}
                    className="bg-purple-800 rounded text-white"
                  >
                    + New Expense
                  </Button>
                </Group>
              </Paper>
              <TableScrollArea expenses={Expenses?.data} />
            </Box>
          </Stack>
        </Box>
      </Layout>
    </>
  );
}
