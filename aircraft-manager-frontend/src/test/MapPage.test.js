import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import MapPage from '../pages/MapPage'; // Adjust the import path according to your file structure

// Mocking the star icon import
jest.mock('../images/starIcon.png', () => 'mocked-starIcon-path');

// Mocking Leaflet's map and marker to simplify the test
jest.mock('react-leaflet', () => ({
    MapContainer: ({ children }) => <div>{children}</div>,
    TileLayer: () => <div></div>,
    Marker: () => <div></div>,
    Popup: ({ children }) => <div>{children}</div>,
  }));

describe('MapPage Component', () => {
  test('renders MapPage with the correct number of markers', () => {
    const { getAllByText } = render(
      <ChakraProvider>
        <MapPage />
      </ChakraProvider>
    );

    // Assuming your Popup component renders the airport name,
    // you can check if the correct number of markers/popups are rendered.

  });
});