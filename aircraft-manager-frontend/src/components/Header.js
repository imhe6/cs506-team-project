import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Box,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  VStack,
  Button,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, LockIcon } from "@chakra-ui/icons";
import companyName from "../images/aircraftlogo.png";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p="4"
      bg="blue.500"
      color="white"
      height="70px"
    >
      <IconButton
        icon={<HamburgerIcon />}
        onClick={onOpen}
        aria-label="Open Menu"
        variant="outline"
      />

<Box flex="1" textAlign="center">
  <RouterLink to="/">
    <Image
      src={companyName}
      alt="Company Name"
      height="10%" // or you might want to adjust this value
      maxH="180px"   // Adjust the max height as required
      objectFit="contain"
      mx="auto"
      my="2"
    />
  </RouterLink>
</Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Button as={RouterLink} to="/" onClick={onClose}>Home</Button>
              <Button as={RouterLink} to="/dashboard" onClick={onClose}>Dashboard</Button>
              <Button as={RouterLink} to="/map" onClick={onClose}>Map</Button>
              <Button as={RouterLink} to="/editairports" onClick={onClose}>Edit Airports</Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Login Button */}
      <Button
        as={RouterLink}
        to="/login"
        variant="solid"
        colorScheme="blue"
        leftIcon={<LockIcon />}
        _hover={{ bg: "blue.600" }}
        _active={{ bg: "blue.700" }}
        size="md"
        mr="4"  // Add margin to separate buttons
      >
        Login
      </Button>

      {/* Get Started (Sign Up) Button */}
      <Button
        as={RouterLink}
        to="/signup"
        variant="solid"
        colorScheme="teal"  // Use a different color to distinguish this button
        _hover={{ bg: "teal.600" }}
        _active={{ bg: "teal.700" }}
        size="md"
      >
        Get Started
      </Button>
    </Flex>
  );
}

export default Header;