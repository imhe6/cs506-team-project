// DashboardPage.js
import React from 'react';
import DataTable from '../components/DataTable'; 
import DataTable1 from '../components/DataTable1';
import MovementTable from '../components/MovementTable';
import { Box, Heading } from '@chakra-ui/react';

function DashboardPage() {
    return (
        <Box>
            <Heading as="h1" size="xl" textAlign="center" mb="4">Dashboard</Heading>
            <DataTable />
            <DataTable1 />
            {/* MovementTable component rendering */}
            <MovementTable />
        </Box>
    );
}

export default DashboardPage;