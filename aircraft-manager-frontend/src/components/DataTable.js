import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

function DataTable() {
    const data = [
        { aircraftId: 1, tailNumber: "N12345", location: "LAX", status: "In Flight" },
        { aircraftId: 2, tailNumber: "N67890", location: "JFK", status: "Landed" },
        { aircraftId: 3, tailNumber: "N54321", location: "ORD", status: "Delayed" },
        { aircraftId: 4, tailNumber: "N09876", location: "SFO", status: "On Time" }
    ];

    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Aircraft ID</Th>
                    <Th>Tail Number</Th>
                    <Th>Location</Th>
                    <Th>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.map((item, index) => (
                    <Tr key={index}>
                        <Td>{item.aircraftId}</Td>
                        <Td>{item.tailNumber}</Td>
                        <Td>{item.location}</Td>
                        <Td>{item.status}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

export default DataTable;
