import { TextInput, Button, Stack, Text, Box } from "@mantine/core";
import { DateInput } from "@mantine/dates";

export default function Register() {
  return (
    <section className="h-screen flex justify-center items-center">
      <Stack gap={"xl"}>
        <Text className="font-[600] text-3xl text-center">Pay Ed</Text>
        <Box className="text-center">
          <Text className="font-[600] text-3xl">
            Now {"let's"} create a division
          </Text>
          <small className="text-gray-400">
            A division is a part of a school cycle, e.g. first semester
          </small>
        </Box>
        <Box>
          <TextInput label="Division title" className="space-y-2" />
          <small className="text-gray-400">
            *this is a title that clearly identifies a school cycle E.g. first
            semester
          </small>
        </Box>
        <Box>
          <DateInput label="Division date" className="space-y-2" />
          <small className="text-gray-400">
            *this is the duration in which a school cycle would run
          </small>
        </Box>
        <Button className="bg-purple-400 text-white rounded">
          Get started
        </Button>
      </Stack>
    </section>
  );
}
