import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddToCartButton from './AddToCartButton';

describe('Register component', () => {
  test('renders button and the text', () => {
    render(<AddToCartButton id={1} />);
    const linkElement = screen.getByText(/Add to cart/i);
    const button = screen.getByRole('button');
    expect(linkElement).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should add to localStorage on click', () => {
    const key = 'OA_cart';
    ////////////////Hard cord id to check from 1 to 25
    const id = 1;
    render(<AddToCartButton id={id} />);
    const buttonElement = screen.getByText('Add to cart');
    userEvent.click(buttonElement);
    const added = JSON.parse(localStorage.getItem(key) || '');
    expect(added[`${id}`]).toBeTruthy();
  });

  test('should change the button from add to cart => drop if item is in localStorage', () => {
    const id = 1;
    const key = 'OA_cart';
    localStorage.setItem(key, JSON.stringify({ [id]: 1 }));
    render(<AddToCartButton id={id} />);
    const dropButton = screen.getByText('Drop');
    expect(dropButton).toBeInTheDocument();
  });
});
