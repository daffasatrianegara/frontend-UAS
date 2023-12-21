import { HStack, VStack, Box, Text, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const toast = useToast()
  const directToHome = () => {
    router.push('/admin')
  }
  const directToUsers = () => {
    router.push("/admin/data/users");
  };
  const directToTodos = () => {
    router.push('/admin/data/todos')
  }
  const directToAddAdmin = () => {
    router.push('/auth/add/admin')
  }
  const handleLogout = async () => {
    await window.localStorage.removeItem('token')
    toast({
            title: 'success',
            description: 'Logout Berhasil.',
            status: 'success',
            duration: 5000,
            position: 'top',
            isClosable: true
    });
    router.push('/')
  }
  return (
    <>
      <Box w={"25%"} h={"100%"} bgColor={"black"} color={"white"} pos={"fixed"}>
        <VStack align={"left"} mt={"3em"} gap={0}>
          <Text ml={"0.5em"} fontSize={"2xl"} fontWeight={"bold"}>
            Menu Utama
          </Text>
          <Text
            gap={0}
            borderBottom={"1.5px solid white"}
            mt={0}
            mb={"1em"}
            width={"80%"}
            ml={"0.5em"}
          />
           <HStack
            w={"100%"}
            align={"left"}
            cursor={"pointer"}
            onClick={directToHome}
            _hover={{
                bgColor: '#445069'
            }}
          >
            <Text
              fontSize={"xl"}
              fontWeight={"semibold"}
              pt={"0.5em"}
              pb={"0.5em"}
              pl={'1em'}
            >
              Dashboard Admin
            </Text>
          </HStack>
          <HStack
            w={"100%"}
            align={"left"}
            cursor={"pointer"}
            onClick={directToUsers}
            _hover={{
                bgColor: '#445069'
            }}
          >
            <Text
              fontSize={"xl"}
              fontWeight={"semibold"}
              pt={"0.5em"}
              pb={"0.5em"}
              pl={'1em'}
            >
              Data Pengguna
            </Text>
          </HStack>
          <HStack
            w={"100%"}
            align={"left"}
            cursor={"pointer"}
            onClick={directToTodos}
            _hover={{
                bgColor: '#445069'
            }}
          >
            <Text
              fontSize={"xl"}
              fontWeight={"semibold"}
              pt={"0.5em"}
              pb={"0.5em"}
              pl={'1em'}
            >
              Data Todo
            </Text>
          </HStack>
          <HStack
            w={"100%"}
            align={"left"}
            cursor={"pointer"}
            onClick={directToAddAdmin}
            _hover={{
                bgColor: '#445069'
            }}
          >
            <Text
              fontSize={"xl"}
              fontWeight={"semibold"}
              pt={"0.5em"}
              pb={"0.5em"}
              pl={'1em'}
            >
              Tambah Admin
            </Text>
          </HStack>
          <HStack
            w={"100%"}
            align={"left"}
            cursor={"pointer"}
            onClick={handleLogout}
            _hover={{
                bgColor: '#872341'
            }}
          >
            <Text
              fontSize={"xl"}
              fontWeight={"semibold"}
              pt={"0.5em"}
              pb={"0.5em"}
              pl={'1em'}
            >
              Logout
            </Text>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default Sidebar;
