import { Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { validateToken } from "@/hooks/tokenValidation";
import FormTodo from "@/components/form-todo";

const addTodo = () => {
  const [id, setId] = useState(null);
  const router = useRouter();

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

    const fetchData = async () => {
      await checkToken();
    };
    fetchData();
  }, [id]);

  return (
    <>
      {id && (
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
            <FormTodo/>
          </Box>
        </>
      )}
    </>
  );
};

export default addTodo;
