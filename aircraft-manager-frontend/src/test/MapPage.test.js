// Importing necessary React and testing utilities
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers like toBeInTheDocument
import { ChakraProvider } from '@chakra-ui/react'; // UI framework provider for Chakra UI components
import MapPage from '../pages/MapPage'; // Importing the MapPage component (adjust path as needed)

// Mocking static asset imports to bypass file path resolution in tests
jest.mock('../images/starIcon.png', () => 'mocked-starIcon-path');

// Mocking components from 'react-leaflet' to simplify the Map rendering in the test environment
// This avoids complex setup for Leaflet maps and focuses on testing component logic
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div>{children}</div>, // Mocks the container holding the map
  TileLayer: () => <div></div>, // Mocks the layer of the map typically showing the map imagery
  Marker: () => <div></div>, // Mocks map markers, simplifying to divs for testing purposes
  Popup: ({ children }) => <div>{children}</div>, // Mocks popups associated with markers
}));

// Describe block defines a test suite for the MapPage component
describe('MapPage Component', () => {
  // A test case checking if the MapPage component renders with the correct number of markers
  test('renders MapPage with the correct number of markers', () => {
    // Render the MapPage component wrapped in ChakraProvider for UI theme context
    const { getAllByText } = render(
      <ChakraProvider>
        <MapPage />
      </ChakraProvider>
    );

    // Placeholder for checking the number of rendered markers/popups.
    // Here you would add logic to verify that the MapPage component renders the correct number of markers.
    // For instance, you could use getAllByText to find elements by their text content if the popups include airport names or other identifiable text.
  });
});