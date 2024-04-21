import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { Box, Input, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

function AircraftTable() {
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState('');

  useEffect(() => {
    // TODO: Replace with your actual fetch API logic if you have an API endpoint
    const fetchData = async () => {
      const fetchedData = [
        { aircraftId: 1, tailNumber: 'N12345', location: 'LAX', status: 'In Flight' },
        { aircraftId: 2, tailNumber: 'N67890', location: 'JFK', status: 'Landed' },
        { aircraftId: 3, tailNumber: 'N54321', location: 'ORD', status: 'Delayed' },
        { aircraftId: 4, tailNumber: 'N09876', location: 'SFO', status: 'On Time' },
      ];
      setData(fetchedData);
    };

    fetchData();
  }, []);

  const columns = useMemo(() => [
    { Header: 'Aircraft ID', accessor: 'aircraftId' },
    { Header: 'Tail Number', accessor: 'tailNumber' },
    { Header: 'Location', accessor: 'location' },
    { Header: 'Status', accessor: 'status' },
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
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value);
  };

  return (
    <Box width="100%">
      <Box mb="4">
        <Input
          value={filterInput}
          onChange={handleFilterChange}
          placeholder="Search all columns..."
        />
      </Box>
      <Table {...getTableProps()} variant="striped" colorScheme="teal">
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <Td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt="4">
        <Button onClick={() => previousPage()} isDisabled={!canPreviousPage}>
          Previous
        </Button>
        <Box>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </Box>
        <Button onClick={() => nextPage()} isDisabled={!canNextPage}>
          Next
        </Button>
        <Box>
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
      </Box>
    </Box>
  );
}

export default AircraftTable;