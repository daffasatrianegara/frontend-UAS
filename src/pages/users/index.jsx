import { Flex, Box, HStack, Text, Button, VStack, Image } from "@chakra-ui/react";
import { validateToken } from "@/hooks/tokenValidation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProfileById } from "@/modules/fetch";
import Sidebar from "@/components/sidebar-user";

const User = () => {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [profile, setProfile] = useState(null);
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
    const fetchData = async () => {
      await checkToken();
      await getProfile();
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Flex>
        {profile && <Sidebar dataProfile={profile} />}
        <Box ml={"30%"} mt={"8em"}>
          <HStack>
            <VStack w={"50%"} align={"left"}>
              <Text fontSize={"5xl"} fontWeight={"bold"}>
                halo Dosers, ingin mencatat hal yang akan dilakukan nanti?
              </Text>
              <Button
                colorScheme="green"
                w={"80%"}
                size={"lg"}
                onClick={() => router.push("/users/data/todos")}
              >
                Mulai mencatat hal yang akan dilakukan
              </Button>
            </VStack>
            <Image src="/people.jpg" w={'40%'} borderRadius={'20px'}/>
          </HStack>
        </Box>
      </Flex>
    </>
  );
};

export default User;
