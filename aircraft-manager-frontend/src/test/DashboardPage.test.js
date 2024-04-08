// Import necessary libraries and components for the test
import React from 'react';
import { render, screen } from '@testing-library/react';
// Import Jest-DOM for extended DOM matchers, such as `toBeInTheDocument`
import '@testing-library/jest-dom/extend-expect';
import DashboardPage from '../pages/DashboardPage';
// ChakraProvider is needed to wrap around Chakra UI components for styling
import { ChakraProvider } from '@chakra-ui/react';

// Mock the DataTable component since you only want to test the DashboardPage component in isolation
// This helps in focusing the test on the DashboardPage's behavior, not its child components
jest.mock('../components/DataTable', () => () => <div>DataTableMock</div>);

// Group tests for the DashboardPage component
describe('DashboardPage Component', () => {
  // Define a test case to verify if DashboardPage renders correctly
  test('renders with a heading and the data table', () => {
    // Render the DashboardPage component wrapped in ChakraProvider for styling context
    render(
      <ChakraProvider>
        <DashboardPage />
      </ChakraProvider>
    );

    // Check if the heading with the text 'Dashboard' is rendered
    // This verifies that the page displays its main heading correctly
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();

    // Check if the mock DataTable is rendered
    // This confirms that the DashboardPage includes the DataTable component in its output
    expect(screen.getByText('DataTableMock')).toBeInTheDocument();
  });
});