import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // for matchers like toBeInTheDocument
import Button from './Button';

describe('Button Component', () => {
  test('renders Button with default props', () => {
    render(<Button name='Click Me' variant='default' />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  test('renders Button with disabled prop', () => {
    render(<Button name='Click Me' variant='default' disabled />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('renders Button with correct variant styles', () => {
    const { container } = render(<Button name='Click Me' variant='white' />);
    expect(container.firstChild).toHaveClass('bg-var-white');
    expect(container.firstChild).toHaveClass('text-var-orange-600');
  });

  test('Button click event is handled correctly', () => {
    const handleClick = jest.fn();
    render(<Button name='Click Me' variant='default' onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('Button renders with correct type', () => {
    render(<Button name='Click Me' variant='default' type='submit' />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
