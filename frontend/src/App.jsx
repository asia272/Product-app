import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreatePage from "./pages/CreatePage";
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import { Button, useColorModeValue } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react"
import "./App.css"



const App = () => {
  return (
    <>
      <Navbar />
      <Box minH={"100vh"}
        bg={useColorModeValue("gray.300", "gray.900")}>
        <Routes minH={"100vh"}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  )
}

export default App

