import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link as ChakraLink
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const formBackground = useColorModeValue("white", "gray.700");

  const handleLogin = async (event) => {
    event.preventDefault();
    // Here you would handle the login logic including validation, 
    // API calls etc. On success, you would redirect the user to their dashboard or home page
    // On failure, you would set an error message with setErrorMessage

    // Mock login condition: Fail if either field is empty (for demonstration purposes)
    if (email.trim() === "" || password.trim() === "") {
      setErrorMessage("Please enter both email and password.");
    } else {
      // Proceed with actual login...
      setErrorMessage(""); // Clear any existing error messages
      // Redirect to the user's dashboard or home page after successful login
    }
  };

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg={formBackground}>
      <Box p={8} maxWidth="400px" borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Stack spacing={4} align="center" marginBottom={6}>
          <Heading>Sign In</Heading>
          {errorMessage && <Text color="red.500">{errorMessage}</Text>}
        </Stack>
        <Box>
          <form onSubmit={handleLogin}>
            <FormControl isRequired mb={3}>
              <FormLabel>Email address</FormLabel>
              <Input 
                type="email" 
                placeholder="Enter email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </FormControl>
            <FormControl isRequired mb={3}>
              <FormLabel>Password</FormLabel>
              <Input 
                type="password" 
                placeholder="Enter password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </FormControl>
            <Stack spacing={6}>
              <Checkbox colorScheme="blue">Remember me</Checkbox>
              <Button 
                type="submit" 
                colorScheme="blue" 
                size="lg" 
                fontSize="md"
              >
                Sign In
              </Button>
            </Stack>
          </form>
          <Text mt={2} textAlign="center">
            Don't have an account?{" "}
            <ChakraLink as={RouterLink} to="/signup" color="blue.600">
              Sign up
            </ChakraLink>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;