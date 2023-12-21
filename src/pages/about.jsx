import {
    Text,
    VStack,
    HStack,
    Flex,
    Heading,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
  } from "@chakra-ui/react";
  import Navbar from "@/components/navbar";
  
  const About = () => {
    return (
      <>
        <Navbar />
        <VStack align={"center"} pt={"7.5em"} color={"#0F2167"}>
          <Heading size={"xl"} fontWeight={"bold"} textTransform="uppercase">
            Tentang Kami
          </Heading>
          <HStack gap={3}>
            <Card maxW="sm">
              <CardBody>
                <HStack>
                  <Image src="/daffa.jpg" w={"50%"} />
                  <VStack mb={'auto'}>
                  <Text fontSize={'xl'} fontWeight={'semibold'}>Muhammad Daffa Satria Negara</Text>
                  <Text fontSize={'xl'} mr={'auto'}>21537144027</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card maxW="sm">
              <CardBody>
                <HStack>
                  <Image src="/faris.jpg" w={"140px"} />
                  <VStack mb={'auto'}>
                  <Text fontSize={'xl'} fontWeight={'semibold'}>Faris Ali Naufal</Text>
                  <Text fontSize={'xl'} mr={'auto'}>21537144031</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card maxW="sm">
              <CardBody>
                <HStack>
                  <Image src="/rehan.jpg" w={"50%"} />
                  <VStack mb={'auto'}>
                  <Text fontSize={'xl'} fontWeight={'semibold'}>Rayhans Danendra</Text>
                  <Text fontSize={'xl'} mr={'auto'}>21537144029</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
          </HStack>
        </VStack>
      </>
    );
  };
  
  export default About;
  