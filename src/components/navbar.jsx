import { useEffect, useState } from "react";
import { validateToken } from "@/hooks/tokenValidation";
import {
  VStack,
  HStack,
  Box,
  Text,
  Image,
  Center,
  Flex,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const handleLogin = async () => {
    await router.push('/auth/login')
  }

  const handleRegister = async () => {
    await router.push('/auth/register')
  }
  return (
    <>
      <Center mt={"1em"} pos={"fixed"} w={"100%"}>
        <Box
          w={"90%"}
          h={"4em"}
          bgColor={"#0F2167"}
          color={"white"}
          borderRadius={"10px"}
        >
          <Flex display={"flex"} alignItems={"center"} mt={"0.7em"} ml={"1em"}>
            <Link href={"/"}>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                TodosNow
              </Text>
            </Link>
            <Flex
              display={"flex"}
              alignItems={"center"}
              ml={"3em"}
              mt={"5px"}
              gap={3}
            >
              <Link href={"/"}>
                <Text
                  fontSize={"md"}
                  fontWeight={"semibold"}
                  _hover={{ color: "gray.300", paddingBottom: "5px" }}
                >
                  Home
                </Text>
              </Link>
              <Link href={"/fiture"}>
                <Text
                  fontSize={"md"}
                  fontWeight={"semibold"}
                  _hover={{ color: "gray.300", paddingBottom: "5px" }}
                >
                  Our Features
                </Text>
              </Link>
              <Link href={"/about"}>
                <Text
                  fontSize={"md"}
                  fontWeight={"semibold"}
                  _hover={{ color: "gray.300", paddingBottom: "5px" }}
                >
                  About Us
                </Text>
              </Link>
            </Flex>
            <Flex
              display={"flex"}
              alignItems={"center"}
              ml={"auto"}
              gap={3}
              mr={"1em"}
            >
              <Button colorScheme={"telegram"} color={"white"} onClick={handleRegister}>
                Register
              </Button>
              <Button colorScheme={"teal"} onClick={handleLogin}>Login</Button>
            </Flex>
          </Flex>
        </Box>
      </Center>
    </>
  );
};

export default Navbar;
