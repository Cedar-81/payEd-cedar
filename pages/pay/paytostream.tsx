import React, { useState } from "react";
import { Paper, Box, Text, TextInput, Stack, Button } from "@mantine/core";
import { useQuery, useMutation } from "@tanstack/react-query";
import { payStream } from "../../api/streams";

function Paytostream() {
  const [value, setValue] = useState({
    code: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [updateText, setUpdateText] = useState("Pay");

  const createPayStreamMutation = useMutation({
    mutationFn: payStream,
    onSuccess: () => {
      setValue({
        code: "",
        amount: "",
      });
      setLoading(false);
      setUpdateText("Paid");
      setTimeout(() => {
        setUpdateText("Pay");
      }, 3000);
    },
  });

  const handleSubmit = () => {
    setLoading(true);
    if (value.code.trim() == "" || value.amount.trim() == "") return;
    createPayStreamMutation.mutate({ ...value });
  };
  return (
    <Paper
      withBorder
      className="max-w-md px-4 py-6 mx-auto space-y-8 mt-[10rem]"
    >
      <Box>
        <Text className="text-lg ">Pay to PayEd Stream</Text>
      </Box>
      <Stack>
        <TextInput
          value={value.code}
          onChange={(e) => setValue({ ...value, code: e.target.value })}
          label="Stream Payment Id"
          className="space-y-2 "
        />
        <TextInput
          value={value.amount}
          onChange={(e) => setValue({ ...value, amount: e.target.value })}
          label="Enter Amount"
          className="space-y-2"
        />
        {!loading && (
          <Button
            onClick={handleSubmit}
            className="bg-purple-600 mt-4 w-24 text-white rounded ml-auto"
          >
            {updateText}
          </Button>
        )}
        {loading && (
          <Button
            onClick={handleSubmit}
            className="bg-purple-600 animate-pulse mt-4 w-24 text-white rounded ml-auto"
          >
            Paying...
          </Button>
        )}
      </Stack>
    </Paper>
  );
}

export default Paytostream;
