import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination, useFilters } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Input, Button } from '@chakra-ui/react';

function DataTable() {
    const [data, setData] = useState([]);

    // example data
    useEffect(() => {
        const fetchData = async () => {
            // Backend API call
            const fetchedData = [
                { aircraftId: 1, tailNumber: "N12345", location: "LAX", status: "In Flight" },
                { aircraftId: 2, tailNumber: "N67890", location: "JFK", status: "Landed" },
                { aircraftId: 3, tailNumber: "N54321", location: "ORD", status: "Delayed" },
                { aircraftId: 4, tailNumber: "N09876", location: "SFO", status: "On Time" }
            ];
            setData(fetchedData);
        };
        
        fetchData();
    }, []);

    const columns = useMemo(() => [
        {
            Header: 'Aircraft ID',
            accessor: 'aircraftId',
        
            Filter: DefaultColumnFilter
        },
        {
            Header: 'Tail Number',
            accessor: 'tailNumber',
            Filter: DefaultColumnFilter
        },
        {
            Header: 'Location',
            accessor: 'location',
            Filter: DefaultColumnFilter
        },
        {
            Header: 'Status',
            accessor: 'status',
            Filter: DefaultColumnFilter
        }
    ], []);


    function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter },
    }) {
        return (
            <Input
                value={filterValue || ''}
                onChange={e => {
                    setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                }}
                placeholder={`Search...`}
            />
        );
    }

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
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, // 첫 페이지 설정
        },
        useFilters,
        useSortBy,
        usePagination
    );

    return (
        <>
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
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
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
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </div>
                <select
                    value={pageSize}
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

export default DataTable;