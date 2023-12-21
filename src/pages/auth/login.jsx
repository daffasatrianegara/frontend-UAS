import {
  useToast,
  Box,
  Text,
  Card,
  CardHeader,
  Heading,
  Input,
  VStack,
  HStack,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { login } from "@/modules/fetch";
import { validateToken } from "@/hooks/tokenValidation";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const toast = useToast();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const checkToken = () => {
    const token = window.localStorage.getItem("token");
    const result = validateToken(token);
    const { id, role } = result;
    if (role === "user") {
      router.push("/users");
    } else if (role === "admin") {
      router.push("/admin");
    } else {
      window.localStorage.removeItem("token");
      throw new Error(error.response.data.message || "Something went wrong");
    }
  };

  const handleSubmit = async () => {
    try {
      const token = await login(email, password);
      window.localStorage.setItem("token", token.token);
      checkToken();
      toast({
        title: "success",
        description: "Login Berhasil.",
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Link href={"/"}>
        <Text
          fontWeight={"bold"}
          fontSize={"3xl"}
          ml={"1em"}
          mt={"0.5em"}
          color={"#B31312"}
          _hover={{
            color: "red",
          }}
        >
          Kembali
        </Text>
      </Link>
      <Box color={"white"} mt={"2em"}>
        <Card w={"50%"} ml={"auto"} mr={"auto"}>
          <CardHeader align="center">
            <Heading>Login</Heading>
          </CardHeader>
          <VStack align={"left"} ml={"1em"}>
            <Text fontSize={"xl"} fontWeight={"semibold"}>
              Email
            </Text>
            <Input
              type="email"
              w={"90%"}
              placeholder="masukkan email anda..."
              focusBorderColor="#0F2167"
              onChange={(e) => {
                const Email = e.target.value;
                setEmail(Email);
              }}
              required
            />
          </VStack>
          <VStack align={"left"} ml={"1em"} mt={"1em"}>
            <Text fontSize={"xl"} fontWeight={"semibold"}>
              Password
            </Text>
            <InputGroup>
              <Input
                w={"90%"}
                placeholder="masukkan password anda..."
                focusBorderColor="#0F2167"
                type={show ? "text" : "password"}
                onChange={(e) => {
                  const Password = e.target.value;
                  setPassword(Password);
                }}
                required
              />
              <InputRightElement width={"4.5rem"} mr={"4em"}>
                <Button colorScheme={"red"} size={"sm"} onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>
          <VStack mt={"2em"} mb={"2em"}>
            <Button colorScheme={"green"} w={"25%"} onClick={handleSubmit}>
              Login
            </Button>
            <HStack>
              <Text>Belum punya akun?</Text>
              <Link href={"/auth/register"}>
                <Text
                  fontWeight={"semibold"}
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  Daftar
                </Text>
              </Link>
            </HStack>
          </VStack>
        </Card>
      </Box>
    </>
  );
};

export default Login;
