import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InformationCard from './InformationCard';

// Mock the icons used in the component
jest.mock('@/public/icons', () => ({
  IconCheckCircle: () => <div data-testid='IconCheckCircle' />,
  IconSaveActive: () => <div data-testid='IconSaveActive' />,
  IconSaveInactive: () => <div data-testid='IconSaveInactive' />,
}));

const MOCK_PARTICIPANTS = [
  { id: 1, name: 'John Doe', image: '/images/mock-image.png' },
  { id: 2, name: 'Jane Doe', image: '/images/mock-image.png' },
  { id: 3, name: 'Alice Smith', image: '/images/mock-image.png' },
  { id: 4, name: 'Bob Brown', image: '/images/mock-image.png' },
  { id: 5, name: 'Charlie Green', image: '/images/mock-image.png' },
];

const MOCK_DATA = {
  title: 'Sample Event',
  address: '1234 Test St',
  date: '2024-09-15',
  time: '12:00 PM',
  participants: MOCK_PARTICIPANTS,
  maxParticipants: 10,
};

// Test for rendering the InformationCard component
describe('InformationCard Component Tests', () => {
  test('renders InformationCard with title and address', () => {
    render(<InformationCard {...MOCK_DATA} />);
    expect(screen.getByText('Sample Event')).toBeInTheDocument();
    expect(screen.getByText('1234 Test St')).toBeInTheDocument();
  });
});
