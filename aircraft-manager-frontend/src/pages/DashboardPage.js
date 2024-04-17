// DashboardPage.js
import React from 'react';
import AircraftTable from '../components/AircraftTable'; 
import AirportTable from '../components/AirportTable';
import MovementTable from '../components/MovementTable';
import { Box, Heading } from '@chakra-ui/react';


function DashboardPage() {
    return (
        <Box>
            <Heading as="h1" size="xl" textAlign="center" mb="4">Aircraft Talbe</Heading>
            <AircraftTable />
            <Heading as="h1" size="xl" textAlign="center" mb="4">Airport Table</Heading>
            <AirportTable />
            <Heading as="h1" size="xl" textAlign="center" mb="4">Movement Table</Heading>
            <MovementTable />
        </Box>
    );
}

export default DashboardPage;