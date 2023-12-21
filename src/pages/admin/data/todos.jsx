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
import { getAllDataTodos, getAllDataUsers, deleteTodo } from "@/modules/fetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { validateToken } from "@/hooks/tokenValidation";

const DataTodos = () => {
  const [todos, setTodos] = useState(null);
  const [usernames, setUsernames] = useState([]);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await window.localStorage.getItem("token");
        if (!token) {
          router.push("/");
        }
        const result = await validateToken(token);
        const { id, role } = result;
        if (role !== "admin") {
          if (role === "user") {
            router.push("/users");
          } else {
            router.push("/");
          }
        }

        const [todosResult, usernamesResult] = await Promise.all([
          getAllDataTodos(),
          getAllDataUsers(),
        ]);

        const todosData = todosResult.data;
        const usernamesData = usernamesResult.data.dataProfile;

        const usernameMap = {};
        usernamesData.forEach((profile) => {
          usernameMap[profile.user_id] = profile.username;
        });

        const matchedTodos = todosData.map((todo) => ({
          ...todo,
          username: usernameMap[todo.user_id],
        }));

        setTodos(matchedTodos);
        setUsernames(usernamesData.map((profile) => profile.username));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (id) => {
    const response = await deleteTodo(id)
    if(response) {
        toast({
            title: "success",
            description: "Data todo berhasil dihapus.",
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
  return (
    <>
      <Flex>
        <Sidebar />
        <VStack ml={"30%"} mt={"3em"}>
          <Text fontSize={"3xl"} fontWeight={"bold"}>
            Data Todo
          </Text>
          <TableContainer>
            <Table variant={"simple"}>
              <TableCaption>Data Todo yang Terinput</TableCaption>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Nama</Th>
                  <Th>Todo</Th>
                  <Th>Deskripsi</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {todos?.map((data, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{data.username}</Td>
                      <Td>{data.todo}</Td>
                      <Td>{data.description}</Td>
                      <Td>
                        <Button colorScheme={'red'} onClick={() => handleDelete(data.id)}>Delete</Button>
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

export default DataTodos;
