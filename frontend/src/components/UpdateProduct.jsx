import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, fetchProducts } from '../store/productSlice';
import { Box, Button, Input, useToast } from '@chakra-ui/react';

const UpdateProduct = ({ id, setProductId }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const product = useSelector((state) =>
    state.product.data.find((p) => p._id === id)
  );

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Promise.all([
      dispatch(editProduct({ id, updatedData: formData })),
      dispatch(fetchProducts()),
    ]);
    toast({
      title: 'Product updated.',
      description: 'The product was updated successfully.',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
    setProductId(null)
  };

  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex={999}
      p={6}
      bg="gray.100"
      rounded="md"
      boxShadow="lg"
      width="90%"
      maxW="400px"
    >
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          mb={3}
        />
        <Input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          mb={3}
        />
        <Input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          mb={3}
        />
        <Button type="submit" colorScheme="teal" mr={2}>
          Update
        </Button>
        <Button onClick={()=>setProductId(null)} colorScheme="gray">
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default UpdateProduct;
