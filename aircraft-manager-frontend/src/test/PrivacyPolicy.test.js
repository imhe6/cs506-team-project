import React from 'react';
import { render, screen } from '@testing-library/react';
import PrivacyPolicy from '../components/PrivacyPolicy'; 


describe('PrivacyPolicy Component', () => {
    beforeEach(() => {
      // Render PrivacyPolicy component before each test
      render(<PrivacyPolicy />);
    });
  
    it('renders the main heading', () => {
      const mainHeading = screen.getByRole('heading', { name: 'Privacy Policy' });
      expect(mainHeading).toBeInTheDocument();
    });
  
    it('displays introductory text correctly', () => {
      expect(screen.getByText('Welcome to our Privacy Policy')).toBeInTheDocument();
    });
  
    it('confirms privacy importance statement', () => {
      expect(screen.getByText('Your privacy is important to us.')).toBeInTheDocument();
    });
  
    it('verifies information collection and consent statement', () => {
      expect(screen.getByText('We only ask for personal information when we truly need it to provide a service to you.')).toBeInTheDocument();
    });
  
    // Continue with other texts...
    it('mentions the non-sharing policy', () => {
      expect(screen.getByText("We don't share any personally identifying information publicly or with third-parties, except when required to by law.")).toBeInTheDocument();
    });
  
    it('addresses external links disclaimer', () => {
      expect(screen.getByText("Our website may link to external sites that are not operated by us.")).toBeInTheDocument();
    });
  
    it('discusses the right to refuse personal information', () => {
      expect(screen.getByText("You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.")).toBeInTheDocument();
    });
  
    it('covers the acceptance of privacy practices through continued use', () => {
      expect(screen.getByText("Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information.")).toBeInTheDocument();
    });
  
    it('includes the effective date of the policy', () => {
      expect(screen.getByText("This policy is effective as of 1 April 2024.")).toBeInTheDocument();
    });
  });