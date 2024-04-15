import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button, Input } from '@chakra-ui/react';

function MovementTable() {
    const [data, setData] = useState([]);
    const [filterInput, setFilterInput] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = [
                { movementId: 1, arrivalAirportId: 1, originAirportId: 2, arrivalDate: "2024-04-20 12:30", departureDate: "2024-04-20 09:30", aircraftId: 1 },
                { movementId: 2, arrivalAirportId: 2, originAirportId: 1, arrivalDate: "2024-04-21 16:00", departureDate: "2024-04-21 13:00", aircraftId: 2 },
                // 추가 데이터 삽입
            ];
            setData(fetchedData);
        };

        fetchData();
    }, []);

    const columns = useMemo(() => [
        { Header: 'Movement ID', accessor: 'movementId' },
        { Header: 'Arrival Airport ID', accessor: 'arrivalAirportId' },
        { Header: 'Origin Airport ID', accessor: 'originAirportId' },
        { Header: 'Arrival Date', accessor: 'arrivalDate' },
        { Header: 'Departure Date', accessor: 'departureDate' },
        { Header: 'Aircraft ID', accessor: 'aircraftId' },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        setPageSize,
        state,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useGlobalFilter, // Use the useGlobalFilter hook to control a column-wide search filter
        useSortBy,
        usePagination
    );

    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setGlobalFilter(value);
        setFilterInput(value);
    };

    return (
        <>
            <Box mb="4">
                <Input
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder="Search all columns..."
                />
            </Box>
            <Table {...getTableProps()} variant="simple">
                <Thead>
                    {headerGroups.map(headerGroup => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
            <Box>
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </Button>
                <Button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </Button>
                <div>
                    Page{' '}
                    <strong>
                        {state.pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </div>
                <select
                    value={state.pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </Box>
        </>
    );
}

export default MovementTable;