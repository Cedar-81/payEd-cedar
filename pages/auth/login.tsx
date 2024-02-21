import { useState } from "react";
import { Flex, Stack, TextInput, Text, Button, PasswordInput, Box, Image } from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const supabaseClient = createPagesBrowserClient();

  const handleLogin = async () => {
    // Input validation
    if (!user.email || !user.password) {
      setError("Please enter both email and password.");
      return;
    }

    // Reset error message
    setError("");
    // Set loading state
    setIsLoading(true);

    let { data, error } = await supabaseClient.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    // Reset loading state
    setIsLoading(false);

    if (!error) {
      console.log(data);
      router.push("/budgets");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <main className="py-4">
      <Flex align={"center"} className="pl-10">
        <div className="hidden md:block bg-purple-200 p-6 rounded-md w-1/2 h-[90vh]">
          <Image src={`/payed.png`} w={"full"} className="h-full" />
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
              <Text size="sm" color="purple">for testing- email: admin@admin.com password: admin1234</Text>
              {error && <Text color="red">{error}</Text>}
              <Box>
                <TextInput
                  label="Enter Admin Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="Damiloladeola12@gmail.com"
                  onKeyDown={handleKeyPress}
                />
                <small className="text-gray-400">
                  *enter admin email to send an invitation request to grant user access
                </small>
              </Box>
              <Box>
                <PasswordInput
                  label="Enter Password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="*********"
                  onKeyDown={handleKeyPress}
                />
                <small className="text-gray-400">
                  *passwords should be at least 8 characters and contain at least one uppercase and one special character
                </small>
              </Box>
              <Button
                className="bg-purple-400 rounded text-white"
                color="black"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Next"}
              </Button>
            </Stack>
          </form>
        </section>
      </Flex>
    </main>
  );
}
