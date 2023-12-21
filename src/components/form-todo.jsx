import {
  Text,
  useToast,
  VStack,
  Card,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { updateTodo, addTodo } from "@/modules/fetch";
import { useRouter } from "next/router";
import { validateToken } from "@/hooks/tokenValidation";

const FormTodo = ({ dataTodo }) => {
  const [id, setId] = useState(null);
  const router = useRouter();
  const toast = useToast();

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
    checkToken();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (dataTodo) {
      await updateTodo(
        dataTodo.id,
        formData.get("todo"),
        formData.get("description")
      );
      toast({
        title: "success",
        description: "Update Todo Berhasil.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      router.back();
    } else {
      await addTodo(id, formData.get("todo"), formData.get("description"));
      toast({
        title: "success",
        description: "Data Todo Berhasil ditambahkan.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      router.push('/users/data/todos');
    }
  };
  
  return (
    <>
      <Box mt={"1em"}>
        <Card w={"60%"}>
          <Text
            align={"center"}
            fontSize={"2xl"}
            fontWeight={"bold"}
            my={"1em"}
          >
            {dataTodo != null ? "Update Todo" : "Tambah Todo"}
          </Text>
          <form onSubmit={handleSubmit}>
            <VStack ml={"1em"} mb={"2em"}>
              <VStack w={"100%"} gap={0}>
                <Text mr={"auto"} fontSize={"xl"} fontWeight={"semibold"}>
                  Todo
                </Text>
                <Input
                  w={"80%"}
                  mr={"auto"}
                  name="todo"
                  placeholder="masukkan data todo anda..."
                  defaultValue={dataTodo?.todo}
                  focusBorderColor="#0F2167"
                  required
                />
              </VStack>
              <VStack w={"100%"} gap={0}>
                <Text mr={"auto"} fontSize={"xl"} fontWeight={"semibold"}>
                  Deskripsi
                </Text>
                <Input
                  w={"80%"}
                  mr={"auto"}
                  name="description"
                  placeholder="masukkan deskripsi todo anda..."
                  defaultValue={dataTodo?.description}
                  focusBorderColor="#0F2167"
                  required
                />
              </VStack>
              <Button type="submit" mt={"2em"} colorScheme={"green"}>
                {dataTodo != null ? "Update Data" : "Tambah Data"}
              </Button>
            </VStack>
          </form>
        </Card>
      </Box>
    </>
  );
};

export default FormTodo;
