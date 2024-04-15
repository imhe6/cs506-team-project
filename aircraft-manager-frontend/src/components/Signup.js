import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';

const Signup = () => {
  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="white">
      <Box px={8} py={6} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" borderColor="gray.300" bg="white">
        <Box textAlign="center">
          <Heading mb={6}>Sign Up</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <FormControl isRequired mb={3}>
              <FormLabel>First name</FormLabel>
              <Input type="text" placeholder="First name" />
            </FormControl>
            <FormControl isRequired mb={3}>
              <FormLabel>Last name</FormLabel>
              <Input type="text" placeholder="Last name" />
            </FormControl>
            <FormControl isRequired mb={3}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="Enter email" />
            </FormControl>
            <FormControl isRequired mb={6}> {/* Added margin-bottom here */}
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter password" />
            </FormControl>
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