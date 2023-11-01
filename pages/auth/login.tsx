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
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Database } from "../../supabase/supatypes";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });

  const supabaseClient = createPagesBrowserClient<Database>();

  const handleLogin = async () => {
    let { data, error } = await supabaseClient.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    if (!error) {
      console.log(data);
      router.push("/budgets");
    }
  };

  return (
    <main className="py-4">
      <Flex align={"center"} className="pl-10">
        <div className="hidden md:block bg-purple-200 p-6 rounded-md w-1/2 h-[90vh]">
          <Image src={"../payed.png"} w={"full"} className="h-full" />
        </div>
        <section className="w-1/2 h-screen flex justify-center items-center">
          <form action="" className="w-[472px] mx-auto">
            <Stack gap={"xl"}>
              <Text className="text-2xl text-center text-purple-600 font-[600]">
                Pay Ed
              </Text>
              <Box className="text-center">
                <Text className="text-center text-2xl font-[600]">Login</Text>
                <small className="text-gray-400">
                  Let&apos;s get you back in
                </small>
              </Box>
              <Box>
                <Text>
                Email:admin@admin.com 
                Password: admin1234 
                </Text>
                <TextInput
                  label="Enter Admin Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="Damiloladeola12@gmail.com"
                />
                <small className="text-gray-400">
                  *enter admin email to send an invitation request to grant user
                  access
                </small>
              </Box>
              <Box>
                <PasswordInput
                  label="Enter Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
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
                onClick={handleLogin}
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
