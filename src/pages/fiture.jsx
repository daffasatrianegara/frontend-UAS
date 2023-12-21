import Navbar from "@/components/navbar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Box,
  Heading,
} from "@chakra-ui/react";

const Fiture = () => {
  return (
    <>
      <Navbar />
      <Box pt={"6em"}>
        <Card w={"90%"} ml={"auto"} mr={"auto"} color={"#0F2167"}>
          <CardHeader align={"center"}>
            <Heading size={"xl"} fontWeight={"bold"} textTransform="uppercase">
              Fitur Kami
            </Heading>
          </CardHeader>
          <CardBody>
            <Box>
              <Heading size="md" textTransform="uppercase">
                membuat daftar tugas untuk anda
              </Heading>
              <Text fontSize="lg">
                Mudah membuat dan mengorganisir tugas-tugas harianmu. Tambahkan,
                edit, dan hapus item dengan antarmuka yang sederhana dan
                intuitif.
              </Text>
            </Box>
            <Box mt={"1em"}>
              <Heading size="md" textTransform="uppercase">
                Deskripsi detail untuk tugas anda
              </Heading>
              <Text fontSize="lg">
                Berikan deskripsi detail untuk setiap tugas agar informasi
                penting selalu ada di ujung jari. Jangan pernah lupakan
                detail-detail penting.
              </Text>
            </Box>
            <Box mt={"1em"}>
              <Heading size="md" textTransform="uppercase">
                Tingkatkan produktivitas anda
              </Heading>
              <Text fontSize="lg">
                Aplikasi TodosNow tidak hanya membantu Anda mengelola
                tugas-tugas sehari-hari, tetapi juga dirancang untuk
                meningkatkan produktivitas Anda secara keseluruhan.
              </Text>
            </Box>
            <Box mt={"1em"}>
              <Heading size="md" textTransform="uppercase">
                mengelola daftar tugas untuk anda
              </Heading>
              <Text fontSize="lg">
                Aplikasi TodosNow tidak hanya membantu Anda mengelola
                tugas-tugas sehari-hari, tetapi juga dirancang untuk
                meningkatkan produktivitas Anda secara keseluruhan.
              </Text>
            </Box>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default Fiture;
