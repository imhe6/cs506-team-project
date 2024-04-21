import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom'; // Removed 'Link' since it's unused
import AircraftTable from '../components/AircraftTable'; // Adjust the import path as necessary
import AirportTable from '../components/AirportTable'; // Adjust the import path as necessary
import MovementTable from '../components/MovementTable'; // Adjust the import path as necessary
import { Box, VStack } from '@chakra-ui/react';

function DashboardPage() {
    // Removed 'match' variable as it was unused

    return (
        <Box d="flex">
            {/* Sidebar Navigation */}
            <VStack alignItems="flex-start" p={5} bg="blue.100" h="100vh" w="200px">
                <NavLink to="/dashboard/aircraft" activeClassName="active">Aircrafts</NavLink>
                <NavLink to="/dashboard/airports" activeClassName="active">Airports</NavLink>
                <NavLink to="/dashboard/movements" activeClassName="active">Movements</NavLink>
            </VStack>

            {/* Routes for each table */}
            <Box flex="1" p={5}>
                <Routes>
                    <Route index element={<AircraftTable />} />
                    <Route path="aircraft" element={<AircraftTable />} />
                    <Route path="airports" element={<AirportTable />} />
                    <Route path="movements" element={<MovementTable />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default DashboardPage;