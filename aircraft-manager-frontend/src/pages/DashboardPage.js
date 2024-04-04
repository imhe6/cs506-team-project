import React from 'react';
import DataTable from '../components/DataTable';
import { Box, Heading } from '@chakra-ui/react';

function DashboardPage() {
    return (
        <Box>
            <Heading as="h1" size="xl" textAlign="center" mb="4">Dashboard</Heading>
            <DataTable />
        </Box>
    );
}

export default DashboardPage;
