import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button, Input } from '@chakra-ui/react';

function DataTable1() {
    const [data, setData] = useState([]);
    const [filterInput, setFilterInput] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = [
                { airportId: 1, airportCode: "LAX", latitude: 33.941, longitude: -118.408, numAircraft: 10 },
                { airportId: 2, airportCode: "JFK", latitude: 40.641, longitude: -73.778, numAircraft: 15 },
                { airportId: 3, airportCode: "ORD", latitude: 41.974, longitude: -87.907, numAircraft: 20 },
                { airportId: 4, airportCode: "SFO", latitude: 37.621, longitude: -122.379, numAircraft: 12 }
            ];
            setData(fetchedData);
        };
        
        fetchData();
    }, []);

    const columns = useMemo(() => [
        {
            Header: 'Airport ID',
            accessor: 'airportId',
        },
        {
            Header: 'Airport Code',
            accessor: 'airportCode',
        },
        {
            Header: 'Latitude',
            accessor: 'latitude',
        },
        {
            Header: 'Longitude',
            accessor: 'longitude',
        },
        {
            Header: 'Number of Aircraft',
            accessor: 'numAircraft',
        }
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

export default DataTable1;