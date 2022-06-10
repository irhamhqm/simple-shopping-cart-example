
import { screen, render } from '../utils/test-utils';
import Checkout from '../pages/checkout';

const preloadedState = {
  cart: {
    '0002': {
      uid: '0002',
      productName: 'Juice',
      img: 'https://i.ibb.co/L0cBsT8/11-juice-png-image.png',
      price: 15000,
      qty: 0
    },
    '0001': {
      uid: '0001',
      productName: 'orange',
      img: 'https://i.ibb.co/9vrDnYJ/19-orange-png-image-download.png',
      price: 10000,
      qty: 7
    }
  }
}

describe('Checkout Page', () => {
  it('show item if qty >= 1', () => {
    render(<Checkout />, { preloadedState });
    const item = screen.getByTestId('item-0001');
    expect(item).toBeInTheDocument();

  });
  it('don\'t show item if qty = 0', () => {
    render(<Checkout />, { preloadedState });
    const item = screen.queryByTestId('item-0002');
    expect(item).not.toBeInTheDocument();

  });
  it('show correct total amount = 70000', () => {
    render(<Checkout />, { preloadedState });
    const total = screen.getByTestId('total');
    expect(total).toHaveTextContent(/70.000,00/i);
  })
});