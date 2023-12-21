import { Card, VStack, Text, HStack, Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getDetailTodoById, deleteTodo } from "@/modules/fetch";
import { validateToken } from "@/hooks/tokenValidation";
import Link from "next/link";

const detailTodo = () => {
  const [todo, setTodo] = useState(null);
  const router = useRouter();
  const id = router.query.id;
  const toast = useToast()

  useEffect(() => {
    const checkToken = async () => {
      const token = await window.localStorage.getItem("token");
      if (!token) {
        router.push("/");
      }
      try {
        const check = await validateToken(token);
        const { id, role } = check;
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
    const getDetail = async () => {
      const response = await getDetailTodoById(id);
      setTodo(response.data);
    };

    const fetchData = async () => {
      await checkToken();
      await getDetail();
    };
    fetchData();
  }, [id]);

  const directUpdateTodo = (idTodo) => {
    router.push(`/users/data/todo/${idTodo}`);
  };

  const handleDelete = async (idTodo) => {
    await deleteTodo(idTodo);
    toast({
      title: "success",
      description: "Data todo berhasil dihapus.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    router.push("/users/data/todos");
  };
  return (
    <>
      {todo && (
        <>
          <Link href={"/users/data/todos"}>
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
          <VStack>
            <Card w={"50%"}>
              <VStack>
                <Text
                  align={"center"}
                  fontSize={"2xl"}
                  fontWeight={"bold"}
                  my={"1em"}
                >
                  Detail data todo
                </Text>
                <HStack mr={"auto"} ml={"2em"}>
                  <Text fontSize={"xl"} fontWeight={"semibold"}>
                    Todo :
                  </Text>
                  <Text fontSize={"xl"}>{todo.todo}</Text>
                </HStack>
                <HStack mr={"auto"} ml={"2em"}>
                  <Text fontSize={"xl"} fontWeight={"semibold"}>
                    Deskripsi :
                  </Text>
                  <Text fontSize={"xl"}>{todo.description}</Text>
                </HStack>
                <HStack mr={"auto"} ml={"2em"} mt={"1em"} mb={"1em"}>
                  <Button
                    size={"md"}
                    colorScheme="orange"
                    onClick={() => directUpdateTodo(todo.id)}
                  >
                    Update Data
                  </Button>
                  <Button size={"md"} colorScheme="red" onClick={() => handleDelete(todo.id)}>
                    Delete Data
                  </Button>
                </HStack>
              </VStack>
            </Card>
          </VStack>
        </>
      )}
    </>
  );
};

export default detailTodo;
