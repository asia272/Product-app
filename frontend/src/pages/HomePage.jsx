import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { editProduct, deleteProduct } from '../store/productSlice';
import { Box, VStack, Button, Container, Flex, Image, useColorModeValue, Spinner, Center } from '@chakra-ui/react';
import UpdateProduct from '../components/UpdateProduct';
import { useToast } from '@chakra-ui/react';

const HomePage = () => {
  const { data, isLoading, error } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const [productId, setProductId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (id) => {
    setProductId(id);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(fetchProducts());
    toast({
      title: 'Product Deleted',
      description: 'The product was successfully removed.',
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top-center',
    });
  };
  if (error) return <p>{error}</p>;
  return (
    <Container maxW="100%" p={0} m={0}>
      <Flex
        px={4}
        w="full"
        justifyContent={"center"}
        flexWrap={"wrap"}
        flexDirection={{ base: "column", sm: "row" }}
      >
        {data && [...data].reverse().map((el) => (
          <Box
            as="ul"
            key={el._id}
            listStyleType="none"
            p={2}

            width={{ base: "100%", sm: "48%", md: "30%" }}
            maxW="80vw"// es ko ma set karo gi baad ma
            margin={5}
            textAlign={"center"}
            bg={useColorModeValue("white", "gray.800")}
            rounded="md"
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            height={{ base: "300", sm: "250" }}
            minH={{ base: "350px", sm: "300px" }}
            minW={200}
            transition="all 0.3s ease"
            _hover={{
              boxShadow: "xl",
              transform: "scale(1.03)",
              cursor: "pointer",
            }}
          >
            <Box mb={3}>
              <Image
                src={el.image}
                fit="cover"
                borderRadius="md"
                display={"block"}
                maxH={170}
                alt={el.name}
                width="100%"
              />
            </Box>
            <Box as="li" fontWeight={"bold"}>
              {el.name}
            </Box>
            <Box as="li">{el.price} Rs</Box>
            <Flex mt={2} justify="center" gap={2}>
              <Button onClick={() => handleEdit(el._id)} size="sm" colorScheme="green">
                Edit
              </Button>
              <Button onClick={() => handleDelete(el._id)} size="sm" colorScheme="red">
                Delete
              </Button>
            </Flex>


          </Box>
        ))}
        {productId && (
          <UpdateProduct
            id={productId}
            setProductId={setProductId}
          />
        )}

      </Flex>
    </Container>
  );
};

export default HomePage;
