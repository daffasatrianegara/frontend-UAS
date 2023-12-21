import {
  Flex,
  Box,
  Image,
  useToast,
  HStack,
  Input,
  VStack,
  Text,
  Card,
  Button
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/sidebar-user";
import { validateToken } from "@/hooks/tokenValidation";
import { getProfileById, updatePhoto } from "@/modules/fetch";

const baseURL = process.env.API_URL || "http://localhost:3000/api/v1";

const ProfileUser = () => {
  const [id, setId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState(null);
  const [image, setImage] = useState(null);

  const toast = useToast();
  const router = useRouter();

  const handleUpdatePhoto = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      try {
        const response = await updatePhoto(id, formData);
        if (response) {
          toast({
            title: "success",
            description: "Foto profile berhasil diupload.",
            status: "success",
            position: "top",
            duration: 5000,
            isClosable: true,
          });

          setTimeout(() => {
            router.reload();
          }, 1000);
        }
      } catch (error) {
        console.error("Error updating photo:", error);
      }
    }
  };
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

    if (image) {
      handleUpdatePhoto();
    }
    fetchData();
  }, [id, email, image]);

  return (
    <>
      {profile && (
        <>
          <Flex>
            <Sidebar dataProfile={profile} />
            <Box ml={"30%"} mt={"2em"} w={"90%"}>
              <Card
                p={"1em"}
                w={"90%"}
                color={"white"}
                bgColor={"#392467"}
                h={"auto"}
              >
                <Text align={'center'} fontWeight={'bold'} fontSize={'3xl'}>Profile Saya</Text>
                <HStack gap={0}>
                  <Image
                    src={`${baseURL}/photo/${profile.photo_profile}`}
                    alt={profile.username}
                    borderRadius={"360px"}
                    w={"150px"}
                    h={"148px"}
                  />
                  <Box
                    bgColor={"#200E3A"}
                    w={"4em"}
                    borderRadius={"360px"}
                    align={"center"}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    pos={"absolute"}
                    cursor={"pointer"}
                    ml={"6em"}
                    mt={"5.5em"}
                    _hover={{
                      bgColor: "#5D3587",
                    }}
                    onClick={() => {
                      const inputFile = document.getElementById("fileInput");
                      inputFile.click();
                    }}
                  >
                    <Input
                      name="image"
                      type="file"
                      accept="image/*"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setImage(file);
                      }}
                    />
                    <Image src="/camera.png" p={"1em"} filter="invert(1)" />
                  </Box>
                  <VStack align={"left"} ml={"2em"} gap={0}>
                    <Text fontSize={"3xl"} fontWeight={"semibold"}>
                      {profile.username}
                    </Text>
                    <Text fontSize={"2xl"} fontWeight={"semibold"}>
                      {email}
                    </Text>
                  </VStack>
                </HStack>
                <VStack align={"left"} mt={"2em"}>
                  <Text fontSize={"2xl"} fontWeight={"bold"}>
                    Data Profile
                  </Text>
                  <Text
                    gap={0}
                    borderBottom={"2px solid white"}
                    mt={0}
                    width={"100%"}
                  />
                  <HStack gap={0}>
                    <VStack align={"left"} gap={0}>
                      <Text fontWeight={"semibold"} fontSize={"xl"}>
                        Jenis Kelamin
                      </Text>
                      <Text fontWeight={"semibold"} fontSize={"xl"}>
                        Nomor Telepon
                      </Text>
                      <Text fontWeight={"semibold"} fontSize={"xl"}>
                        Tempat Tinggal
                      </Text>
                    </VStack>
                    <VStack align={"left"} gap={0} ml={'2em'}>
                      <Text fontWeight={"semibold"} fontSize={"xl"}>
                        : {profile.gender == "M" ? "Pria" : "Wanita"}
                      </Text>
                      <Text fontWeight={"semibold"} fontSize={"xl"}>
                        : {profile.phone_number}
                      </Text>
                      <Text fontWeight={"semibold"} fontSize={"xl"}>
                        : {profile.place}
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack mt={'2em'} mb={'2em'}>
                    <Button colorScheme={'green'} onClick={() => router.push('/users/profile/update')}>Update Data Profile</Button>
                  </HStack>
                </VStack>
              </Card>
            </Box>
          </Flex>
        </>
      )}
    </>
  );
};

export default ProfileUser;
