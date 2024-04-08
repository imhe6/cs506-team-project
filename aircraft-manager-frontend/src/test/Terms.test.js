import React from 'react';
import { render, screen } from '@testing-library/react';
import Terms from '../components/Terms';

describe('Terms Component Tests', () => {
    // Render the component before each test
    beforeEach(() => {
      render(<Terms />);
    });
  
    it('should display the main heading', () => {
      expect(
        screen.getByRole('heading', { name: 'Terms and Conditions' })
      ).toBeInTheDocument();
    });
  
    it('should include the introduction about website usage agreement', () => {
      expect(
        screen.getByText(
          /if you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use/i
        )
      ).toBeInTheDocument();
    });
  
    it('should mention the content change notice', () => {
      expect(
        screen.getByText(/It is subject to change without notice./i)
      ).toBeInTheDocument();
    });
  
    it('should clarify the absence of warranty or guarantee', () => {
      expect(
        screen.getByText(
          /Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose./i
        )
      ).toBeInTheDocument();
    });
  
    it('should state that website use is at the user\'s own risk', () => {
      expect(
        screen.getByText(
          /Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable./i
        )
      ).toBeInTheDocument();
    });
  
    it('should mention copyright and ownership of materials on the website', () => {
      expect(
        screen.getByText(
          /This website contains material which is owned by or licensed to us./i
        )
      ).toBeInTheDocument();
    });
  
    it('should acknowledge trademarks not owned or licensed to the operator', () => {
      expect(
        screen.getByText(
          /All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website./i
        )
      ).toBeInTheDocument();
    });
  
    it('should warn about unauthorized use of the website', () => {
      expect(
        screen.getByText(
          /Unauthorised use of this website may give rise to a claim for damages and\/or be a criminal offence./i
        )
      ).toBeInTheDocument();
    });
  
    // Additional assertions can be added here if there are more specific sections to test
  });