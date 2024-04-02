import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

function HomePage() {
  return (
    <Box textAlign="center" p="5">
      <Heading as="h1" mb="2">Welcome to Aircraft Manager</Heading>
      <Text fontSize="xl">Explore the world of aviation with us.</Text>
    </Box>
  );
}

export default HomePage;
