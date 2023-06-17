import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Dashboard from './Dashboard';

test('initial data state is an empty array', () => {
    render(<Dashboard />);
    expect(screen.queryByTestId('data-array')).toBeNull();
  });
  
  test('clicking "All" button resets selectedYear state', () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText('All'));
    expect(screen.queryByTestId('selected-year')).toBeNull();
  });
  
  