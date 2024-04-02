import React from 'react';
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';

function HomePage() {
  return (
    <Box p="5">
      <Flex
        align="center"
        justify="center"
        height="400px"
        bg="blue.500"
        color="white"
        textAlign="center"
        pt="5"
      >
        <Box maxWidth="600px">
          <Heading as="h1" size="2xl" mb="4">
            Welcome to Python Airways
          </Heading>
          <Text fontSize="xl" mb="6">
            Explore the world of aviation with us.
          </Text>
          <Button colorScheme="orange" size="lg">
            Get Started
          </Button>
        </Box>
      </Flex>

      <Box p="5">
        <Heading as="h2" size="xl" mb="5" textAlign="center">
          Our Services
        </Heading>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-around"
          align="center"
        >
          <Box p="4" shadow="md" borderWidth="1px" borderRadius="lg">
            <Heading as="h3" size="md" mb="2">
              Real-time Tracking
            </Heading>
            <Text mb="2">
              Monitor your fleet in real-time with our advanced tracking
              system.
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default HomePage;
