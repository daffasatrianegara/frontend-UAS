import { Text, Box, VStack, HStack, Button, Image } from "@chakra-ui/react"
import { useRouter } from "next/router"

const Content = () => {
    const router = useRouter()
    const handleLogin = async () => {
        await router.push('/auth/login')
    }
    return (
        <Box pt={'8em'} mx={'5em'}>
            <HStack align={'left'}>
                <VStack w={'50%'} mt={'2em'}>
                    <Text fontSize={'5xl'} fontWeight={'bold'} color={'#0F2167'}>Catatlah hal yang ingin anda lakukan dengan TodosNow!!</Text>
                    <Button mr={'auto'} colorScheme={'blue'} size={'lg'}
                    onClick={handleLogin}>Mulai</Button>
                </VStack>
                <Box w={'50%'}>
                <Image src="/todo-icon.jpg"/>
                </Box>
            </HStack>
        </Box>
    )
}

export default Content