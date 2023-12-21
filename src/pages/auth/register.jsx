import {
  useToast,
  Text,
  Input,
  Box,
  Card,
  CardHeader,
  Heading,
  HStack,
  VStack,
  InputGroup,
  InputRightElement,
  Button,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { register } from "@/modules/fetch";

const Register = () => {
  const toast = useToast();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const registerUser = await register(
        formData.get("email"),
        formData.get("password"),
        formData.get("username"),
        formData.get("phone_number"),
        formData.get("gender"),
        formData.get("place")
      );
      if (registerUser) {
        toast({
          title: "success",
          description: "Register Berhasil.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        router.push("/auth/login");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
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
      <form onSubmit={handleSubmit}>
        <Box color={"white"} mt={"2em"} mb={"2em"}>
          <Card w={"80%"} ml={"auto"} mr={"auto"}>
            <CardHeader align="center">
              <Heading>Register</Heading>
            </CardHeader>
            <HStack ml={"1em"}>
              <VStack align={"left"} w={"50%"}>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  Email
                </Text>
                <Input
                  name="email"
                  placeholder="masukkan email anda..."
                  focusBorderColor="#0F2167"
                  required
                />
              </VStack>
              <VStack align={"left"} w={"50%"} mr={"1em"}>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  Password
                </Text>
                <InputGroup>
                  <Input
                    name="password"
                    type={show ? "text" : "password"}
                    placeholder="masukkan password anda..."
                    focusBorderColor="#0F2167"
                    required
                  />
                  <InputRightElement width={"4.5rem"}>
                    <Button
                      colorScheme={"red"}
                      size={"sm"}
                      onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </VStack>
            </HStack>
            <HStack ml={"1em"} mt={"1em"}>
              <VStack align={"left"} w={"50%"}>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  Nama Lengkap
                </Text>
                <Input
                  name="username"
                  placeholder="masukkan nama anda..."
                  focusBorderColor="#0F2167"
                  required
                />
              </VStack>
              <VStack align={"left"} w={"50%"} mr={"1em"}>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  Tempat Tinggal
                </Text>
                <Input
                  name="place"
                  placeholder="masukkan tempat tinggal anda..."
                  focusBorderColor="#0F2167"
                  required
                />
              </VStack>
            </HStack>
            <HStack ml={"1em"} mt={"1em"}>
              <VStack align={"left"} w={"50%"}>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  Jenis Kelamin
                </Text>
                <Select
                  name="gender"
                  placeholder="masukkan jenis kelamin anda..."
                  focusBorderColor="#0F2167"
                  required
                >
                  <option value="M">Pria</option>
                  <option value="F">Wanita</option>
                </Select>
              </VStack>
              <VStack align={"left"} w={"50%"} mr={"1em"}>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  Nomor Telepon
                </Text>
                <Input
                  name="phone_number"
                  type="number"
                  placeholder="masukkan nomor telepon anda..."
                  focusBorderColor="#0F2167"
                  required
                />
              </VStack>
            </HStack>
            <VStack align={"center"} mt={"2em"} mb={"2em"}>
              <Button type="submit" colorScheme={"green"} w={"25%"}>
                Register
              </Button>
              <HStack>
                <Text>Sudah punya akun?</Text>
                <Link href={"/auth/login"}>
                  <Text fontWeight={"semibold"}>Login</Text>
                </Link>
              </HStack>
            </VStack>
          </Card>
        </Box>
      </form>
    </>
  );
};

export default Register;
