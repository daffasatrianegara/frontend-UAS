import { HStack, VStack, Box, useToast, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

const baseURL = process.env.API_URL || "http://localhost:3000/api/v1";

const Sidebar = ({ dataProfile }) => {
  const toast = useToast();
  const router = useRouter();

  const directHome = () => {
    router.push("/users");
  };

  const directDataTodos = () => {
    router.push("/users/data/todos");
  };

  const directProfile = () => {
    router.push("/users/profile");
  };

  const handleLogout = async () => {
    await window.localStorage.removeItem("token");
    toast({
      title: "success",
      description: "Logout Berhasil.",
      status: "success",
      duration: 5000,
      position: "top",
      isClosable: true,
    });
    router.push("/");
  };

  return (
    <>
      {dataProfile && (
        <Box
          w={"25%"}
          h={"100%"}
          bgColor={"#200E3A"}
          color={"white"}
          pos={"fixed"}
        >
          <VStack align={"left"} mt={"2em"} gap={0} w={"100%"}>
            <VStack align={"center"} gap={0}>
              <Image
                w={"150px"}
                h={"150px"}
                borderRadius={"360px"}
                src={`${baseURL}/photo/${dataProfile.photo_profile}`}
                alt={dataProfile.username}
              />
              <Text
                align={"center"}
                fontSize={"xl"}
                fontWeight={"semibold"}
                mt={"0.5em"}
                maxWidth={"80%"}
              >
                {dataProfile.username}
              </Text>
            </VStack>
            <VStack align={"left"} mt={"1em"} gap={0}>
              <HStack
                w={"100%"}
                align={"left"}
                cursor={"pointer"}
                onClick={directHome}
                _hover={{
                  bgColor: "#38419D",
                }}
              >
                <Text
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                  pt={"0.5em"}
                  pb={"0.5em"}
                  pl={"1em"}
                >
                  Halaman Utama
                </Text>
              </HStack>
              <HStack
                w={"100%"}
                align={"left"}
                cursor={"pointer"}
                onClick={directDataTodos}
                _hover={{
                  bgColor: "#38419D",
                }}
              >
                <Text
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                  pt={"0.5em"}
                  pb={"0.5em"}
                  pl={"1em"}
                >
                  Data Todo
                </Text>
              </HStack>
              <HStack
                w={"100%"}
                align={"left"}
                cursor={"pointer"}
                onClick={directProfile}
                _hover={{
                  bgColor: "#38419D",
                }}
              >
                <Text
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                  pt={"0.5em"}
                  pb={"0.5em"}
                  pl={"1em"}
                >
                  Profile Saya
                </Text>
              </HStack>
              <HStack
                w={"100%"}
                align={"left"}
                onClick={handleLogout}
                cursor={"pointer"}
                _hover={{
                  bgColor: "#872341",
                }}
              >
                <Text
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                  pt={"0.5em"}
                  pb={"0.5em"}
                  pl={"1em"}
                >
                  Logout
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
