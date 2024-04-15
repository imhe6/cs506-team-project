// DashboardPage.js
import React from 'react';
import DataTable from '../components/DataTable'; // 첫 번째 데이터 테이블
import DataTable1 from '../components/DataTable1'; // 수정된 두 번째 데이터 테이블
import { Box, Heading } from '@chakra-ui/react';

function DashboardPage() {
    return (
        <Box>
            <Heading as="h1" size="xl" textAlign="center" mb="4">Dashboard</Heading>
            <DataTable />
            <DataTable1 />
        </Box>
    );
}

export default DashboardPage;