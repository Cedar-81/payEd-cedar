import {
  Flex,
  Stack,
  TextInput,
  Text,
  Button,
  PasswordInput,
  Box,
  Image,
} from "@mantine/core";
import { useState } from "react";

export default function Signup() {
  const [newUser, setNewUser] = useState({ email: "", password: "" });
  return (
    <main className="py-4">
      <Flex align={"center"} className="pl-10">
        <div className="bg-purple-200 p-6 rounded-md w-1/2 h-[90vh]">
          <Image src={"./payed.png"} w={"full"} className="h-full" />
        </div>
        <section className="w-1/2 h-screen flex justify-center items-center">
          <form action="" className="w-[472px] mx-auto">
            <Stack gap={"xl"}>
              <Text className="text-2xl text-center text-purple-600 font-[600]">
                Pay Ed
              </Text>
              <Box className="text-center">
                <Text className="text-center text-2xl font-[600]">
                  Welcome Aboard
                </Text>
                <small className="text-gray-400">
                  Let&apos;s get you set up
                </small>
              </Box>
              <Box>
                <TextInput
                  label="Enter Admin Email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="Damiloladeola12@gmail.com"
                />
                <small className="text-gray-400">
                  *enter admin email to send an invitation request to grant user
                  access
                </small>
              </Box>
              <Box>
                <PasswordInput
                  label="Set a Password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  placeholder="*********"
                />
                <small className="text-gray-400">
                  *passwords should be at least 8 characters and contain at
                  least one uppercase and one special character
                </small>
              </Box>
              <Button
                className="bg-purple-400 rounded text-white"
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
