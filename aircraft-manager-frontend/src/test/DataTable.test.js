// Import necessary libraries and React component for the test
import React from 'react';
import { render, screen } from '@testing-library/react';
// Import Jest-DOM for extended DOM matchers, such as `toBeInTheDocument`
import '@testing-library/jest-dom';
import DataTable from '../components/DataTable'; 

// Group tests for the DataTable component
describe('DataTable Component', () => {
    // Define a test case to verify if DataTable renders correctly
    test('renders correctly', () => {
        // Render the DataTable component
        render(<DataTable />);
        // Find an element with the role of 'table'
        const tableElement = screen.getByRole('table');
        // Assert that the found table element is present in the document
        expect(tableElement).toBeInTheDocument();
    });

    // Define another test case to check if DataTable displays the correct data
    test('displays correct data', () => {
        // Render the DataTable component
        render(<DataTable />);
        // Assert that specific text content is found within the rendered component
        // This is to check if the expected data values are displayed
        expect(screen.getByText('N12345')).toBeInTheDocument();
        expect(screen.getByText('LAX')).toBeInTheDocument();
        expect(screen.getByText('In Flight')).toBeInTheDocument();
        
        // Retrieve all elements that have a role of 'row' to count the rows in the table
        // This includes both data rows and the header row
        const rows = screen.getAllByRole('row');
        // Assert the number of rows is correct, considering one header row plus data rows
        // The expected number of rows is the number of data rows + 1 header row
        expect(rows.length).toBe(5); // 4 data rows + 1 header row
    });
});