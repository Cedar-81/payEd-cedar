import {
  Flex,
  Stack,
  TextInput,
  Text,
  Button,
  PasswordInput,
  Box,
  Image,
  Overlay,
  AspectRatio,
  Container,
} from "@mantine/core";
import { useState } from "react";

export default function Signup() {
  const [visible, setVisible] = useState(false);
  const [newSchool, setNewSchool] = useState({
    school_name: "",
    school_email: "",
    password: "",
  });
  return (
    <>
      <main>
        <Flex align={"center"} gap={"xl"} className="pl-10">
          <div className="bg-purple-200 p-6 rounded-md w-1/2 h-[90vh]">
            <Image src={"./payed.png"} className="h-full" />
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
                <TextInput
                  label="Enter school name"
                  placeholder="University of Nigeria, Nsukka"
                  value={newSchool.school_name}
                  onChange={(e) =>
                    setNewSchool({
                      ...newSchool,
                      school_name: e.target.value,
                    })
                  }
                />
                <Box>
                  <TextInput
                    label="Enter school email"
                    value={newSchool.school_email}
                    onChange={(e) =>
                      setNewSchool({
                        ...newSchool,
                        school_email: e.target.value,
                      })
                    }
                    placeholder="Damiloladeola12@gmail.com"
                  />
                  <small className="text-gray-400">
                    *school email should be a custom email e.g
                    schoolemail@edu.ng
                  </small>
                </Box>
                <Box>
                  <PasswordInput
                    label="Set a Password"
                    value={newSchool.password}
                    onChange={(e) =>
                      setNewSchool({ ...newSchool, password: e.target.value })
                    }
                    placeholder="*********"
                  />
                  <small className="text-gray-400">
                    *passwords should be at least 8 characters and contain at
                    least one uppercase and one special character
                  </small>
                </Box>
                <Button
                  onClick={() => setVisible((v) => !v)}
                  fullWidth
                  maw={200}
                  mx="auto"
                  mt="xl"
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
      {visible && (
        <Overlay color="#000" backgroundOpacity={0.65}>
          <Container className="text-center">
            <AspectRatio ratio={16 / 9}>
              <Stack gap={"xl"}>
                <Box className="bg-white p-8 w-28 mx-auto rounded-full">
                  <Image src={"./check.svg"} />
                </Box>
                <Text className="text-3xl text-white font-[600]">
                  Verification successful
                </Text>
                <small className="text-white">
                  Account verified successfully
                </small>
                <Button
                  onClick={() => setVisible((v) => !v)}
                  variant="filled"
                  className="bg-purple-400 text-white rounded"
                >
                  Continue
                </Button>
              </Stack>
            </AspectRatio>
          </Container>
        </Overlay>
      )}
    </>
  );
}
