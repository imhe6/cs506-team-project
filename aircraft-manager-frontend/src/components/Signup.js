import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';

const Signup = () => {
  // Variables for creating user
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Coorporate');

  const sendPostRequest = (e) => {
    e.preventDefault();

  }

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="white">
      <Box px={8} py={6} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" borderColor="gray.300" bg="white">
        <Box textAlign="center">
          <Heading mb={6}>Sign Up</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={sendPostRequest}>
            <FormControl isRequired mb={3}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
              />
            </FormControl>
            <FormControl isRequired mb={3}> {/* Added margin-bottom here */}
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </FormControl>

            <RadioGroup onChange={setRole} value={role} isRequired  mb={6}>
              <Stack>
                <Radio value='Coorporate'>
                  Coorporate Manager
                </Radio>
                <Radio value='Facility'>
                  Facility Manager
                </Radio>
              </Stack>
                
            </RadioGroup>

            <Button type="submit" colorScheme="blue" size="lg" fontSize="md" width="full" mb={4}> {/* Added margin-bottom here */}
              Sign Up
            </Button>
          </form>
          <Text textAlign="center" mt={4}>
            Already registered? <ChakraLink as={RouterLink} to="/login" color="blue.600">Sign in</ChakraLink>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Signup;