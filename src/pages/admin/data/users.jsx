import {
  Flex,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import Sidebar from "@/components/sidebar-admin";
import { getAllDataUsers, deleteUser } from "@/modules/fetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { validateToken } from "@/hooks/tokenValidation";

const DataUsers = () => {
  const [dataUser, setDataUser] = useState(null);
  const toast = useToast();
  const router = useRouter()

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


    const getDataUser = async () => {
      const result = await getAllDataUsers();
      setDataUser(result.data);
    };

    checkToken()
    getDataUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (id) {
        const response = await deleteUser(id);
        if (response) {
          toast({
            title: "success",
            description: "Data pengguna berhasil dihapus.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setTimeout(() => {
            router.reload()
          }, 1000)
        }
      }
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

  const handleDetail = (id) => {
    router.push(`/admin/data/detail/user/${id}`)
  }
  return (
    <>
      <Flex>
        <Sidebar />
        <VStack ml={"20%"} mt={"3em"}>
          <Text fontSize={"3xl"} fontWeight={"bold"}>
            Data Pengguna
          </Text>
          <TableContainer w={'80%'}>
            <Table variant={"simple"}>
              <TableCaption>Data Pengguna yang Terdaftar</TableCaption>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Email</Th>
                  <Th>Nama Lengkap</Th>
                  <Th>Jenis Kelamin</Th>
                  <Th>nomor telepon</Th>
                  <Th>Tempat Tinggal</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataUser?.dataUser.map((userData, index) => {
                  const profileData = dataUser.dataProfile.find(
                    (profile) => profile.user_id === userData.id
                  );

                  return (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{userData.email}</Td>
                      <Td>{profileData ? profileData.username : "N/A"}</Td>
                      <Td>{profileData ? profileData.gender : "N/A"} ({profileData?.gender == 'M' ? 'Pria' : 'Wanita'})</Td>
                      <Td>{profileData ? profileData.phone_number : "N/A"}</Td>
                      <Td>{profileData ? profileData.place : "N/A"}</Td>
                      <Td>
                        <Button mr={"1em"} colorScheme="orange" onClick={() => handleDetail(userData.id)}>
                          Detail
                        </Button>
                        <Button colorScheme="red" onClick={() => handleDelete(userData.id)}>Delete</Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </Flex>
    </>
  );
};

export default DataUsers;
