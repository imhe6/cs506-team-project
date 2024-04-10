import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Heading,
  Link,
  useColorModeValue
} from "@chakra-ui/react";

const Login = () => {
  // Use color mode value to switch between light and dark mode colors if needed
  const formBackground = useColorModeValue("white", "gray.700");

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" bg={formBackground}>
      <Box p={8} maxWidth="400px" borderWidth="1px" borderRadius="lg" boxShadow="lg" borderColor="black">
        <Box textAlign="center">
          <Heading>Sign In</Heading>
        </Box>
        <Box my={4} textAlign="left" bg="white">
          <form>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="Enter email" />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter password" />
            </FormControl>
            <Checkbox mt={6} colorScheme="blue">Remember me</Checkbox>
            <Button width="full" mt={4} bg="blue.500" color="white" _hover={{ bg: "blue.600" }} type="submit">
              Submit
            </Button>
          </form>
        </Box>
        <Box textAlign="center" mt={6}>
          <Link color="blue.600" href="#">Forgot password?</Link>
        </Box>
        {/* Add any additional buttons for social login */}
      </Box>
    </Flex>
  );
};

export default Login;