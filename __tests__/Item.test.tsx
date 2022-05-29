
import Item from '../components/Item';
import { Provider } from 'react-redux';
import { screen, render, fireEvent } from '../utils/test-utils';
import store from '../redux/store';

const mockData = {
  "uid": "0001",
  "productName": "orange",
  "image": {
    "url": "https://i.ibb.co/9vrDnYJ/19-orange-png-image-download.png",
    "altText": "Orange"
  },
  "price": 10000,
  "availableQuantity": 100
};

const preloadedState = {
  cart: {}
}

describe('Item component', () => {
  it('add to cart button on click: add to cart button disappear and item added to cart', () => {
    render(<Item data={mockData} />, { preloadedState });
    const addToCartBtn = screen.getByRole('button', { name: /add to cart/i });
    
    fireEvent.click(addToCartBtn);
    const inputEl = screen.getByTestId('input-el') as HTMLInputElement;
    expect(inputEl.value).toBe('1');
  });
  it('add item button on click: input value add by 1', () => {
    render(<Item data={mockData} />, { preloadedState });
    const addToCartBtn = screen.getByRole('button', { name: /add to cart/i });
    
    fireEvent.click(addToCartBtn);
    const addItemBtn = screen.getByTestId('add-btn');

    fireEvent.click(addItemBtn);
    const inputEl = screen.getByTestId('input-el') as HTMLInputElement;
    expect(inputEl.value).toBe('2');
  });
  it('decrease item button on click: input value decrease by 1 and input disappear', () => {
    render(<Item data={mockData} />, { preloadedState });
    const addToCartBtn = screen.getByRole('button', { name: /add to cart/i });
    
    fireEvent.click(addToCartBtn);
    const decItemBtn = screen.getByTestId('dec-btn');

    fireEvent.click(decItemBtn);
    const inputEl = screen.queryByTestId('input-el') as HTMLInputElement;
    expect(inputEl).not.toBeInTheDocument();
  });
  it('type on input element: input element change accordingly', () => {
    render(<Item data={mockData} />, { preloadedState });
    const addToCartBtn = screen.getByRole('button', { name: /add to cart/i });
    
    fireEvent.click(addToCartBtn);

    const inputEl = screen.queryByTestId('input-el') as HTMLInputElement;
    fireEvent.change(inputEl, { target: { value: '5' } });
    expect(inputEl.value).toBe('5');
  });
  it('delete value of input element: input element value change to 0', () => {
    render(<Item data={mockData} />, { preloadedState });
    const addToCartBtn = screen.getByRole('button', { name: /add to cart/i });
    
    fireEvent.click(addToCartBtn);

    const inputEl = screen.queryByTestId('input-el') as HTMLInputElement;
    fireEvent.change(inputEl, { target: { value: '' } });
    expect(inputEl.value).toBe('0');
  });
})