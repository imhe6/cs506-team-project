import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Hero from '../components/Hero'; 

// Since your component uses images from local files, mock these imports
jest.mock('../images/planes.jpg', () => 'path/to/mockImage.jpg');

describe('Hero Component', () => {
  // Defines a reusable function to render the component with optional props
  const renderHeroComponent = (props = {}) => {
    render(
      <Router>
        <Hero {...props} />
      </Router>
    );
  };

  it('renders correctly with default props', () => {
    renderHeroComponent();
    expect(screen.getByText('Welcome to Python Airways')).toBeInTheDocument();
    expect(screen.getByText('Explore the world of aviation with us. Get real-time tracking, efficient fleet management, and more.')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'path/to/mockImage.jpg');
  });

  it('renders correctly with custom props', () => {
    const customProps = {
      title: 'Custom Title',
      subtitle: 'Custom subtitle content.',
      ctaText: 'Custom CTA',
      ctaLink: '/custom-link',
      image: 'path/to/customImage.jpg',
    };
    
    renderHeroComponent(customProps);
    expect(screen.getByText(customProps.title)).toBeInTheDocument();
    expect(screen.getByText(customProps.subtitle)).toBeInTheDocument();
    expect(screen.getByText(customProps.ctaText)).toBeInTheDocument();
 
  });

});