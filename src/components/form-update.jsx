import {
  Text,
  useToast,
  Card,
  VStack,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { updateProfile } from "@/modules/fetch";

const UpdateDataUser = ({ dataUser, email }) => {
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const updateData = await updateProfile(
        dataUser.user_id,
        formData.get("email"),
        formData.get("username"),
        formData.get("phone_number"),
        formData.get("gender"),
        formData.get("place")
      );
      if (updateData) {
        toast({
          title: "success",
          description: "Data Berhasil terupdate.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        router.push('/users/profile')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card w={"80%"} mt={"2em"} p={"1em"} mb={"2em"}>
          <Text fontSize={"3xl"} fontWeight={"bold"}>
            Update Data Pengguna
          </Text>
          <VStack ml={"1em"} mr={"1em"} mt={"1em"}>
            <Text mr={"auto"} fontSize={"xl"} fontWeight={"semibold"}>
              Email
            </Text>
            <Input
              name="email"
              placeholder="masukkan email anda..."
              defaultValue={email}
              focusBorderColor="#0F2167"
              required
            />
            <Text
              mt={"1em"}
              mr={"auto"}
              fontSize={"xl"}
              fontWeight={"semibold"}
            >
              Nama Lengkap
            </Text>
            <Input
              name="username"
              placeholder="masukkan nama lengkap anda..."
              defaultValue={dataUser.username}
              focusBorderColor="#0F2167"
              required
            />
            <Text
              mt={"1em"}
              mr={"auto"}
              fontSize={"xl"}
              fontWeight={"semibold"}
            >
              Jenis Kelamin
            </Text>
            <Select
              name="gender"
              placeholder="masukkan jenis kelamin anda..."
              focusBorderColor="#0F2167"
              defaultValue={dataUser.gender}
              required
            >
              <option value="M">Pria</option>
              <option value="F">Wanita</option>
            </Select>
            <Text
              mt={"1em"}
              mr={"auto"}
              fontSize={"xl"}
              fontWeight={"semibold"}
            >
              Nomor Telepon
            </Text>
            <Input
              name="phone_number"
              placeholder="masukkan nomor telepon anda..."
              defaultValue={dataUser.phone_number}
              focusBorderColor="#0F2167"
              required
            />
            <Text
              mt={"1em"}
              mr={"auto"}
              fontSize={"xl"}
              fontWeight={"semibold"}
            >
              Tempat Tinggal
            </Text>
            <Input
              name="place"
              placeholder="masukkan tempat tinggal anda..."
              defaultValue={dataUser.place}
              focusBorderColor="#0F2167"
              required
            />
          </VStack>
          <Button mt={"2em"} colorScheme={"green"} w={"30%"} mx={"auto"} type="submit">
            Update Data Profile
          </Button>
        </Card>
      </form>
    </>
  );
};

export default UpdateDataUser;
