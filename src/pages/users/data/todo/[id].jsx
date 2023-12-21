import { Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDetailTodoById } from "@/modules/fetch";
import { validateToken } from "@/hooks/tokenValidation";
import FormTodo from "@/components/form-todo";

const UpdateTodo = () => {
  const [todo, setTodo] = useState(null);
  const router = useRouter();
  const id = router.query.id;

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

    const getDataTodo = async () => {
      const response = await getDetailTodoById(id);
      setTodo(response.data);
    };

    const fetchData = async () => {
      await checkToken();
      await getDataTodo();
    };

    fetchData();
  }, [id]);

  return (
    <>
      {todo && (
        <>
          <Text
            fontWeight={"bold"}
            fontSize={"3xl"}
            ml={"1em"}
            mt={"0.5em"}
            color={"#B31312"}
            _hover={{
              color: "red",
            }}
            onClick={() => router.back()}
            cursor={"pointer"}
          >
            Kembali
          </Text>
          <Box align='center'>
            <FormTodo dataTodo={todo} />
          </Box>
        </>
      )}
    </>
  );
};

export default UpdateTodo;
