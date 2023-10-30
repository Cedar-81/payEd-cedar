import {
  Flex,
  Stack,
  Text,
  Button,
  FileInput,
  Paper,
  Box,
  Image,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";

export default function VerifySchool() {
  return (
    <main>
      <Flex align={"center"} className="pl-10">
        <div className="bg-purple-200 p-6 rounded-md w-1/2 h-[90vh]">
          <Image src={"./payed.png"} w={"full"} className="h-full" />
        </div>
        <section className="w-1/2 h-screen flex justify-center items-center">
          <form action="" className="w-[472px] mx-auto text-center">
            <Stack gap={"xl"}>
              <Text className="text-2xl text-center text-purple-600 font-[600]">
                Pay Ed
              </Text>
              <Box className="text-center">
                <Text className="text-center text-2xl font-[600]">
                  Verify School
                </Text>
                <small className="text-gray-400">
                  Let&apos;s get you set up
                </small>
              </Box>
              <small>
                Let&apos;s verify you&apos;re a registered institution. Please{" "}
                <span className="font-[500]">upload a verifiable document</span>{" "}
                e.g Registration certificate, tax id etc.
              </small>
              <Paper
                className="text-[96px] font-[400] flex justify-center items-center w-40 h-fit mx-auto"
                withBorder
                radius={"lg"}
                p={"md"}
              >
                +
              </Paper>
              <FileInput className="w-40 mx-auto" />
              <Button
                variant="default"
                className="w-40 mx-auto"
                rightSection={<IconUpload size={14} />}
              >
                Upload
              </Button>
              <Button
                className="bg-purple-400 rounded text-white w-56 mx-auto"
                color="black"
              >
                Next
              </Button>
            </Stack>
          </form>
        </section>
      </Flex>
    </main>
  );
}
