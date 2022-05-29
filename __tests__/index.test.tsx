
import { fireEvent, render, screen, within } from '../utils/test-utils';
import Home from '../pages';

const mockItemList = [{
  "uid": "0001",
  "productName": "orange",
  "image": {
    "url": "https://i.ibb.co/9vrDnYJ/19-orange-png-image-download.png",
    "altText": "Orange"
  },
  "price": 10000,
  "availableQuantity": 100
},
{
  "uid": "0002",
  "productName": "Juice",
  "image": {
    "url": "https://i.ibb.co/L0cBsT8/11-juice-png-image.png",
    "altText": "Juice"
  },
  "price": 15000,
  "availableQuantity": 100
}];

const preloadedState = {
  cart: {}
}

describe('index page', () => {
  it('item add to cart button clicked: render correct amount', () => {
    render(<Home items={mockItemList}/>, { preloadedState });
    const totalEl = screen.getByTestId('total-info');
    const itemEl = screen.getByTestId('item-0001');
    const { getByRole: getElementByRole } = within(itemEl);

    const addToCartBtn = getElementByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartBtn);

    expect(totalEl).toHaveTextContent(/10.000,00/i);
  });
  it('2 different items\' add to cart button clicked: render correct amount', () => {
    render(<Home items={mockItemList}/>, { preloadedState });
    const totalEl = screen.getByTestId('total-info');
    const itemEl = screen.getByTestId('item-0001');
    const itemEl2 = screen.getByTestId('item-0002');
    const itemArr = [ itemEl, itemEl2 ];

    itemArr.forEach((item) => {  
      const { getByRole: getElementByRole } = within(item);

      const addToCartBtn = getElementByRole('button', { name: /add to cart/i });
      fireEvent.click(addToCartBtn);
    });

    expect(totalEl).toHaveTextContent(/25.000,00/i);
  });
  it('reduce qty button clicked: render correct amount', () => {
    render(<Home items={mockItemList}/>, { preloadedState });
    const totalEl = screen.getByTestId('total-info');
    const itemEl = screen.getByTestId('item-0001');
    const { getByRole: getElementByRole, getByTestId: getElementByTestId } = within(itemEl);

    const addToCartBtn = getElementByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartBtn);
    const decBtn = getElementByTestId('dec-btn');
    fireEvent.click(decBtn);


    expect(totalEl).toHaveTextContent(/0/i);
  });
  it('2 different items\' add to cart button clicked and then reduce qty btn clicked: render correct amount', () => {
    render(<Home items={mockItemList}/>, { preloadedState });
    const totalEl = screen.getByTestId('total-info');
    const itemEl = screen.getByTestId('item-0001');
    const itemEl2 = screen.getByTestId('item-0002');
    const itemArr = [ itemEl, itemEl2 ];

    itemArr.forEach((item) => {  
      const { getByRole: getElementByRole } = within(item);

      const addToCartBtn = getElementByRole('button', { name: /add to cart/i });
      fireEvent.click(addToCartBtn);
    });
    const { getByTestId: getElementByTestId } = within(itemEl);
    const decBtn = getElementByTestId('dec-btn');
    fireEvent.click(decBtn);

    expect(totalEl).toHaveTextContent(/15.000,00/i);
  });
  it('item input qty value changed: render correct amount', () => {
    render(<Home items={mockItemList}/>, { preloadedState });
    const totalEl = screen.getByTestId('total-info');
    const itemEl = screen.getByTestId('item-0001');
    const { getByRole: getElementByRole, getByTestId: getElementByTestId } = within(itemEl);

    const addToCartBtn = getElementByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartBtn);
    const decBtn = getElementByTestId('input-el');
    fireEvent.change(decBtn, { target: { value: '5' } });

    expect(totalEl).toHaveTextContent(/50.000,00/i);
  });
});