import {
  Flex,
  Text,
  Box,
  HStack,
  VStack,
  Card,
  Button,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar-user";
import { useRouter } from "next/router";
import { validateToken } from "@/hooks/tokenValidation";
import { getProfileById, getDataTodosByUserId, deleteTodo } from "@/modules/fetch";

const dataTodos = () => {
  const router = useRouter();
  const toast = useToast()
  const [id, setId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await window.localStorage.getItem("token");
      if (!token) {
        router.push("/");
      }
      try {
        const check = await validateToken(token);
        const { id, role } = check;
        setId(id);
        if (role !== "user") {
          if (role == "admin") {
            router.push("/admin");
          } else {
            router.push("/");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getProfile = async () => {
      const response = await getProfileById(id);
      const getData = response.data;
      if (getData && getData.dataProfile) {
        setProfile(getData.dataProfile);
      }
    };
    const getTodos = async () => {
      const response = await getDataTodosByUserId(id);
      setTodos(response.data);
    };
    const fetchData = async () => {
      await checkToken();
      await getProfile();
    };
    fetchData();
    getTodos();
  }, [id, todos]);

  const directAddTodo = () => {
    router.push(`/users/data/todo/add`)
  }

  const directUpdateTodo = (idTodo) => {
    router.push(`/users/data/todo/${idTodo}`)
  }

  const handleDelete = async (idTodo) => {
    await deleteTodo(idTodo)
    toast({
      title: "success",
      description: "Data todo berhasil dihapus.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    router.push('/users/data/todos')
  }
  return (
    <>
      <Flex>{profile && <Sidebar dataProfile={profile} />}</Flex>
      {todos && (
        <Box ml={"30%"} mb={'2em'}>
          <VStack w={"100%"} mt={"2em"}>
            <Text fontSize={"3xl"} fontWeight={"bold"} align={"center"}>
              Data Todo Anda
            </Text>
            <Button mt={"1em"} mr={"auto"} ml={"1em"} colorScheme="blue" onClick={directAddTodo}>
              Tambah Data Todo
            </Button>
            <Text
              gap={0}
              borderBottom={"1.5px solid black"}
              mt={0}
              mb={"1em"}
              width={"90%"}
              mr={"4em"}
            />
            {todos?.map((todo, index) => {
              return (
                <>
                  <Card
                    key={index}
                    mr={"auto"}
                    ml={"1em"}
                    w={"85%"}
                    mb={"1em"}
                    bgColor={"#200E3A"}
                    color={"white"}
                  >
                    <HStack my={"1em"}>
                      <VStack align={"left"} gap={0} ml={"1em"}>
                        <Text fontSize={"2xl"} fontWeight={"semibold"}>
                          {todo.todo}
                        </Text>
                        <Text fontSize={"xl"}>{todo.description}</Text>
                      </VStack>
                      <HStack ml={"auto"} mt={"2em"} mr={"1em"}>
                        <Button
                          size={"sm"}
                          colorScheme="yellow"
                          onClick={() =>
                            router.push(`/users/data/detail/${todo.id}`)
                          }
                        >
                          Detail Todo
                        </Button>
                        <Button size={"sm"} colorScheme="orange" onClick={() => directUpdateTodo(todo.id)}>
                          Update Todo
                        </Button>
                        <Button size={"sm"} colorScheme="red" onClick={() => handleDelete(todo.id)}>
                          Delete Todo
                        </Button>
                      </HStack>
                    </HStack>
                  </Card>
                </>
              );
            })}
          </VStack>
        </Box>
      )}
    </>
  );
};

export default dataTodos;
