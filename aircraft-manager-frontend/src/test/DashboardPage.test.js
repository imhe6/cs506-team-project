import React, { useState } from 'react';
import AircraftTable from '../components/AircraftTable';
import AirportTable from '../components/AirportTable';
import MovementTable from '../components/MovementTable';
import { Box, Button, Heading } from '@chakra-ui/react';

function DashboardPage() {
    const [activeTab, setActiveTab] = useState('aircraft'); 

    return (
        <Box p={5}>
            <Heading as="h1" size="xl" textAlign="center" mb="4">Dashboard</Heading>
            <Box display="flex" justifyContent="center" mb="4">

                <Button colorScheme="blue" onClick={() => setActiveTab('aircraft')} mr="2">
                    Aircraft
                </Button>
                <Button colorScheme="blue" onClick={() => setActiveTab('airports')} mr="2">
                    Airports
                </Button>
                <Button colorScheme="blue" onClick={() => setActiveTab('movements')}>
                    Movements
                </Button>
            </Box>
            <Box>

                {activeTab === 'aircraft' && <AircraftTable />}
                {activeTab === 'airports' && <AirportTable />}
                {activeTab === 'movements' && <MovementTable />}
            </Box>
        </Box>
    );
}

export default DashboardPage;