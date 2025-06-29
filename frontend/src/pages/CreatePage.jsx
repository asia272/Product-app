import {
  Container,
  VStack,
  Heading,
  useColorModeValue,
  Box,
  Input,
  Button,
  useToast
} from '@chakra-ui/react';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, fetchProducts } from '../store/productSlice';
import { useNavigate } from 'react-router-dom';



const CreatePage = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleAddProduct = async () => {
    if (newProduct.name.trim() && newProduct.price.trim() && newProduct.image.trim()) {
      setIsAdding(true);

      await dispatch(addProduct(newProduct));
      toast({
        title: 'Product Created',
        description: 'Your product has been added successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });

      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
    }
    setIsAdding(false);
    navigate('/');
  };

  return (

    <Container maxW={"Container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mt={8}>
          Create new Product
        </Heading>
        <Box
          w={{ base: "90%", sm: "80%", md: "60%" }}
          maxW="500px"
          mx="auto"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder='Product Price'
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder='Product Img'
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button
              colorScheme='blue'
              w="full"
              onClick={handleAddProduct}
              loadingText="Adding..."
              isDisabled={isAdding}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
