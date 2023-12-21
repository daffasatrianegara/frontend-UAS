import {
  HStack,
  VStack,
  Text,
  Image,
  Box,
  Card,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { validateToken } from "@/hooks/tokenValidation";
import { useState, useEffect } from "react";
import { getProfileById } from "@/modules/fetch";

const baseURL = process.env.API_URL || "http://localhost:3000/api/v1";

const DetailUser = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  const id = router.query.id;

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

    const getProfile = async () => {
      const response = await getProfileById(id);
      await setUser(response.data.dataUser);
      await setProfile(response.data.dataProfile);
    };
    checkToken();
    getProfile();
  }, []);
  return (
    <>
      <Link href={"/admin/data/users"}>
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
      <Box color={"white"} mt={"2em"} mb={"2em"}>
        <Card w={"50%"} ml={"auto"} mr={"auto"}>
          <CardHeader align="center" mb={'1em'}>
            <Heading>Detail data pengguna</Heading>
          </CardHeader>
          <HStack ml={"1em"} mb={"2em"}>
            {profile && (
              <>
                <Box w={"25%"}>
                  <Image
                    src={`${baseURL}/photo/${profile.photo_profile}`}
                    alt={profile.username}
                    borderRadius={'360px'}
                    w={'150px'}
                    h={'150px'}
                  />
                </Box>
                <VStack align={"left"}>
                  {user && (
                    <>
                      <HStack>
                        <VStack align={'left'} pr={'2em'}>
                            <Text fontSize={'xl'} fontWeight={'semibold'}>Email</Text>
                            <Text fontSize={'xl'} fontWeight={'semibold'}>Nama Lengkap</Text>
                            <Text fontSize={'xl'} fontWeight={'semibold'}>Jenis Kelamin</Text>
                            <Text fontSize={'xl'} fontWeight={'semibold'}>Nomor Telepon</Text>
                            <Text fontSize={'xl'} fontWeight={'semibold'}>Tempat Tinggal</Text>
                        </VStack>
                        <VStack align={'left'}>
                          <Text fontSize={"xl"}>: {user.email}</Text>
                          <Text fontSize={"xl"}>: {profile.username}</Text>
                          <Text fontSize={"xl"}>
                            : {profile.gender == "M" ? "Pria" : "Wanita"}
                          </Text>
                          <Text fontSize={"xl"}>: {profile.phone_number}</Text>
                          <Text fontSize={"xl"}>: {profile.place}</Text>
                        </VStack>
                      </HStack>
                    </>
                  )}
                </VStack>
              </>
            )}
          </HStack>
        </Card>
      </Box>
    </>
  );
};

export default DetailUser;
