import { useDisclosure } from "@mantine/hooks";
import {
  Paper,
  Text,
  Box,
  Flex,
  Stack,
  Modal,
  Button,
  TextInput,
  SimpleGrid,
  Skeleton,
  Group,
} from "@mantine/core";
import { StatsGrid } from "../../components/StatsGrid";
import Layout from "../../components/layout";
import Link from "next/link";
import BudgetCard from "../../components/BudgetCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createBudget, getBudgets } from "../../api/budgets";
import { useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { StatsGridBudget } from "../../components/StatsGridBudgets";
import { getAccountDetail } from "../../api/accounts";
import { abbreviateNumber } from "../../api/importantFunctions";
import { TableScrollArea } from "../../components/TableScrollArea";
import { getAllExpenses } from "../../api/expenses";

export default function Budgets() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const {
    data: Budgets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });
  console.log("in budgets list", Budgets, error);

  const createStreamMutation = useMutation({
    mutationFn: createBudget,
    onSuccess: () => {
      setIsDone(true);
      setName("");
      setDescription("");
      close();
    },
  });

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
    data: Expenses,
    isLoading: loadingExpenses,
    error: expenseError,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: getAllExpenses,
  });
  console.log("in all expenses list", Expenses, expenseError);

  const handleSubmit = () => {
    setIsDone(false);
    createStreamMutation.mutate({
      name,
      description,
      school: "1",
    });
  };

  const main_balance =
    Account && Account.data && Account.data[0] && Account.data[0].balance;

  const getBudgetTotal = () => {
    let totalBudget = 0;
    Budgets &&
      Budgets.data &&
      Budgets.data.map((exp) => {
        totalBudget += exp.balance;
      });

    console.log("budgets total", totalBudget);

    return JSON.stringify(totalBudget);
  };

  const getExpenseTotal = () => {
    let totalExpense = 0;
    Expenses &&
      Expenses.data &&
      Expenses.data.map((exp) => {
        totalExpense += exp.amount;
      });

    console.log("expenses total", totalExpense);

    return JSON.stringify(totalExpense);
  };

  const data = [
    { title: "Main Balance", amount: abbreviateNumber(parseInt(main_balance)) },
    {
      title: "Budget Balance",
      amount: abbreviateNumber(parseInt(getBudgetTotal())),
    },
    {
      title: "Expense Balance",
      amount: abbreviateNumber(parseInt(getExpenseTotal())),
    },
  ];
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Create Budget"
        centered
        padding={"lg"}
      >
        <Stack>
          <TextInput
            onChange={(e) => setName(e.target.value)}
            value={name}
            label="Budget name"
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
        <Box className="space-y-10 py-8">
          <Box className="space-y-6">
            <Text className="text-xl">Budget Details</Text>
            <StatsGridBudget data={data} />
          </Box>
          <Box className="space-y-6">
            <Text className="text-xl">Budgets</Text>
            <SimpleGrid cols={4} className="flex-col md:flex-row">
              <Paper
                className=" h-[136px] text-4xl text-gray-400 flex items-center justify-center hover:cursor-pointer"
                withBorder
                onClick={open}
                p="md"
                radius="md"
              >
                +
              </Paper>
              {isLoading
                ? [...Array(6)].map((_, index) => (
                    <Skeleton key={index} radius={"lg"} />
                  ))
                : Budgets?.data?.map((item) => {
                    return (
                      <Link key={item.id} href={"/budgets/" + item.id}>
                        <BudgetCard detail={item} />
                      </Link>
                    );
                  })}
            </SimpleGrid>
          </Box>
          <Box>
            <Paper p="sm" radius="md" className="bg-purple-800/20">
              <Text>Expenses</Text>
            </Paper>
            <TableScrollArea expenses={Expenses?.data} />
          </Box>
        </Box>
      </Layout>
    </>
  );
}
