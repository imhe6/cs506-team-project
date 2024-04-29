import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Button,
  Flex,
  Select,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AircraftListPage() {
  const [aircrafts, setAircrafts] = useState([]);
  const { location } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchAircrafts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/aircraft/?location=${location}`
        );
        console.log('Aircraft API response:', response.data);
        if (response.data.success) {
          setAircrafts(response.data.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching aircrafts:', error);
      }
    };

    fetchAircrafts();
  }, [location]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when itemsPerPage changes
  }, [itemsPerPage]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = aircrafts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box p={5}>
      <Box borderBottom="1px" borderColor="gray.200" mb={4} textAlign="center">
        <Heading as="h2" fontSize="xl">
          Aircrafts at {location.toUpperCase()}
        </Heading>
      </Box>
      <Table variant="striped" colorScheme="blue">
        <Thead>
          <Tr>
            <Th>Aircraft ID</Th>
            <Th>Tail Number</Th>
            <Th>Status</Th>
            <Th>Location</Th>
            <Th>Aircraft Type</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentItems.map((aircraft) => (
            <Tr key={aircraft.aircraftId}>
              <Td>{aircraft.aircraftId}</Td>
              <Td>{aircraft.tailNumber}</Td>
              <Td>{aircraft.status}</Td>
              <Td>{aircraft.location}</Td>
              <Td>{aircraft.aircraftType}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Box flex="1"></Box>
        <Flex flex="1" justifyContent="center">
          <Button onClick={() => paginate(1)} disabled={currentPage === 1} size="sm">
            {'<<'}
          </Button>
          <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} size="sm" mx="2">
            Previous
          </Button>
          <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(aircrafts.length / itemsPerPage)} size="sm" mx="2">
            Next
          </Button>
          <Button onClick={() => paginate(Math.ceil(aircrafts.length / itemsPerPage))} disabled={currentPage === Math.ceil(aircrafts.length / itemsPerPage)} size="sm">
            {'>>'}
          </Button>
        </Flex>
        <Box flex="1" display="flex" justifyContent="flex-end">
          <Select
            size="sm"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            width="130px"
          >
            {[10, 20, 30, 40, 50].map((perPage) => (
              <option key={perPage} value={perPage}>
                {perPage} per page
              </option>
            ))}
          </Select>
        </Box>
      </Flex>
    </Box>
  );
}

export default AircraftListPage;
