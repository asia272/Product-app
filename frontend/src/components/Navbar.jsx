import React from 'react'
import { Container, HStack, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { PlusSquareIcon, SunIcon ,MoonIcon} from '@chakra-ui/icons'



const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} p={4}>
      <Flex
        height={{base:"auto", sm:16}}
        alignItems={"center"}
        justify={{base:"space-evenly",sm:"space-between"}}
        flexDir={{
          base: "column",
          sm: "row"
        }}
      >
        <Text
          bgGradient='linear(to-r,cyan.400,blue.500)'
          bgClip='text'
          fontSize={{ base: "22", sm: "28" }}
          fontWeight='bold'
          textTransform={"uppercase"}
          textAlign={"center"}

        >
          <Link to={"/"}>Product Store</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"} >
            <Button>
              <PlusSquareIcon fontSize={{ base: 22, sm: 24 }} />
            </Button>

          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar
