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
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { validateToken } from "@/hooks/tokenValidation";
import { addAdmin } from "@/modules/fetch";
import Link from "next/link";

const AddAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone_number, setNumber] = useState("");
  const [show, setShow] = useState(false);

  const router = useRouter();
  const toast = useToast();
  const handleClick = () => setShow(!show);

  useEffect(() => {
    const checkToken = async () => {
      const token = await window.localStorage.getItem("token");
      if (!token) {
        router.push("/");
      }
      const result = await validateToken(token);
      const { id, role } = result;
      if (role != "admin") {
        if (role == "user") {
          router.push("/users");
        } else {
          router.push("/");
        }
      }
    };

    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAdmin({
        email: email,
        password: password,
        username: username,
        phone_number: phone_number,
      });
      toast({
        title: "success",
        description: "Admin berhasil ditambahkan.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      router.push("/admin");
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

  console.log(email);
  console.log(password);
  console.log(username);
  console.log(phone_number);
  return (
    <>
      <Link href={"/admin"}>
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
      <Box color={"white"} mt={"2em"} mb={"2em"}>
        <Card w={"50%"} ml={"auto"} mr={"auto"}>
          <CardHeader align="center">
            <Heading>Tambah Data Admin</Heading>
          </CardHeader>
          <VStack ml={"1em"}>
            <VStack w={"100%"} align={"left"} ml={"1em"}>
              <Text fontWeight={"semibold"}>Email</Text>
              <Input
                w={"80%"}
                type="email"
                focusBorderColor="#0F2167"
                placeholder="Masukkan email anda..."
                required
                onChange={(e) => {
                  const valEmail = e.target.value;
                  setEmail(valEmail);
                }}
              />
            </VStack>
            <VStack w={"100%"} align={"left"} ml={"1em"}>
              <Text>Password</Text>
              <InputGroup>
                <Input
                  w={"80%"}
                  focusBorderColor="#0F2167"
                  type={show ? "text" : "password"}
                  placeholder="Masukkan password anda..."
                  required
                  onChange={(e) => {
                    const valPass = e.target.value;
                    setPassword(valPass);
                  }}
                />
                <InputRightElement width={"4.5rem"} mr={"7.5em"}>
                  <Button colorScheme={"red"} size={"sm"} onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </VStack>
            <VStack w={"100%"} align={"left"} ml={"1em"}>
              <Text>Nama Lengkap</Text>
              <Input
                w={"80%"}
                type="text"
                focusBorderColor="#0F2167"
                placeholder="Masukkan nama lengkap anda..."
                required
                onChange={(e) => {
                  const nama = e.target.value;
                  setUsername(nama);
                }}
              />
            </VStack>
            <VStack w={"100%"} align={"left"} ml={"1em"}>
              <Text>Nomor Telepon</Text>
              <Input
                w={"80%"}
                type="number"
                focusBorderColor="#0F2167"
                placeholder="Masukkan nomor telepon anda..."
                required
                onChange={(e) => {
                  const number = e.target.value;
                  setNumber(number);
                }}
              />
            </VStack>
            <Button
              colorScheme={"green"}
              mt={"2em"}
              mb={"2em"}
              onClick={handleSubmit}
            >
              Tambah Admin
            </Button>
          </VStack>
        </Card>
      </Box>
    </>
  );
};

export default AddAdmin;
