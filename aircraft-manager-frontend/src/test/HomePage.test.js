import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage'; 

// Mocking the Hero component and images import
jest.mock('../components/Hero', () => () => <div data-testid="hero">HeroMock</div>);
jest.mock('../images/planes.jpg', () => 'mocked-image-path');

describe('HomePage', () => {
  test('renders HomePage component', () => {
    render(
      <BrowserRouter>
        <ChakraProvider>
          <HomePage />
        </ChakraProvider>
      </BrowserRouter>
    );

    // Verify the Hero section is rendered
    expect(screen.getByTestId('hero')).toBeInTheDocument();

    // Check for main sections' headings
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    expect(screen.getByText('Why Choose Python Airways?')).toBeInTheDocument();
    expect(screen.getByText('Ready to elevate your aviation experience?')).toBeInTheDocument();

    // Check for a specific button text
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  // You can add more tests here to check for other elements or interactions
});