import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddToCartButton from '../AddToCartButton';

test('renders button and the text', () => {
  render(<AddToCartButton id={1} />);
  const linkElement = screen.getByText(/Add to cart/i);
  const button = screen.getByRole('button');
  expect(linkElement).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

describe('Register component', () => {
  it('should add to localStorage on click', async () => {
    const key = 'OA_cart';
    ////////////////Hard cord id to check from 1 to 25
    const id = 1;
    render(<AddToCartButton id={id} />);
    const buttonElement = screen.getByText('Add to cart');
    await userEvent.click(buttonElement);
    const added = JSON.parse(localStorage.getItem(key) || '');
    expect(added[`${id}`]).toBeTruthy();
  });

  it('should change the button from add to cart => drop', async () => {
    const id = 1;
    render(<AddToCartButton id={id} />);
    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);
    const dropButton = await screen.findByText('Drop');
    expect(dropButton).toBeInTheDocument();
  });
});
