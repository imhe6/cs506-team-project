import React, { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';

function AircraftListPage() {
  const [aircrafts, setAircrafts] = useState([]);

  useEffect(() => {
    fetchAircrafts(); // Fetch aircraft data on component mount
  }, []);

  const fetchAircrafts = async () => {
    try {
      const response = await axios.get('http://localhost:5500/api/aircraft/');
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

  return (
    <Box p={5}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Aircraft ID</Th>
            <Th>Tail Number</Th>
            <Th>Status</Th>
            <Th>Location</Th>
            <Th>Aircraft Type</Th>
            {/* Add more table headers if needed */}
          </Tr>
        </Thead>
        <Tbody>
          {aircrafts.map((aircraft) => (
            <Tr key={aircraft.aircraftId}>
              <Td>{aircraft.aircraftId}</Td>
              <Td>{aircraft.tailNumber}</Td>
              <Td>{aircraft.status}</Td>
              <Td>{aircraft.location}</Td>
              <Td>{aircraft.aircraftType}</Td>
              {/* Add more Td components for additional columns */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default AircraftListPage;
