import { Text, Box } from "@chakra-ui/react";
import { validateToken } from "@/hooks/tokenValidation";
import { useState, useEffect } from "react";
import { getProfileById } from "@/modules/fetch";
import { useRouter } from "next/router";
import UpdateDataUser from "@/components/form-update";

const updateDataUser = () => {
  const [id, setId] = useState(null);
  const [email, setEmail] = useState(null);
  const [profile, setProfile] = useState(null);
  const router = useRouter()

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

    const getData = async () => {
      try {
        const response = await getProfileById(id);
        const result = response.data;

        if (result && result.dataUser && result.dataUser.email) {
          setEmail(result.dataUser.email);
        }

        setProfile(result.dataProfile);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchData = async () => {
      await checkToken();
      await getData();
    };

    fetchData();
  }, [id, email]);

  return (
    <>
      {profile && (
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
          <Box align="center">
            <UpdateDataUser dataUser={profile} email={email}/>
          </Box>
        </>
      )}
    </>
  );
};

export default updateDataUser;
