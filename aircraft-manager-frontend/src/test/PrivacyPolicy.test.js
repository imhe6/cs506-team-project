import React from 'react';
import { render, screen } from '@testing-library/react';
import PrivacyPolicy from '../components/PrivacyPolicy';

describe('PrivacyPolicy Component', () => {
  beforeEach(() => {
    render(<PrivacyPolicy />);
  });

  it('renders the main heading', () => {
    const mainHeading = screen.getByRole('heading', { name: /privacy policy/i });
    expect(mainHeading).toBeInTheDocument();
  });

  it('displays introductory text correctly', () => {
    expect(screen.getByText(/welcome to our privacy policy/i)).toBeInTheDocument();
  });

  it('confirms privacy importance statement', () => {
    // Using a RegExp for partial match and flexibility
    expect(screen.getByText(/your privacy is important to us/i)).toBeInTheDocument();
  });

  it('verifies information collection and consent statement', () => {
    // Adjusting text match to be more flexible
    expect(screen.getByText(/we only ask for personal information when we truly need it/i)).toBeInTheDocument();
  });

  // Assuming more detailed tests continue here...
  it('mentions the non-sharing policy', () => {
    expect(screen.getByText(/we don't share any personally identifying information publicly/i)).toBeInTheDocument();
  });

  it('addresses external links disclaimer', () => {
    // Example of using a partial match for complex texts
    expect(screen.getByText(/our website may link to external sites that are not operated by us/i)).toBeInTheDocument();
  });

  it('discusses the right to refuse personal information', () => {
    expect(screen.getByText(/you are free to refuse our request for your personal information/i)).toBeInTheDocument();
  });

  it('covers the acceptance of privacy practices through continued use', () => {
    // Flexible text matching for longer statements
    expect(screen.getByText(/your continued use of our website will be regarded as acceptance/i)).toBeInTheDocument();
  });

  it('includes the effective date of the policy', () => {
    expect(screen.getByText(/this policy is effective as of 1 April 2024/i)).toBeInTheDocument();
  });
});