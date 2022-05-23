
import Item from '@/components/Item';
import { Provider } from 'react-redux';
import { screen, render } from '@testing-library/react';

const mockData = {
  "uid": "0001",
  "productName": "orange",
  "image": {
    "url": "https://i.ibb.co/9vrDnYJ/19-orange-png-image-download.png",
    "altText": "Orange"
  },
  "price": 10000,
  "availableQuantity": 100
}

import store from '../redux/store';

const MockComponent = (props: { children: React.ReactNode }) => (
  <Provider store={store}>
    {props.children}
  </Provider>
);

describe('Item component', () => {
  it('render correctly', () => {
    const el = render(<MockComponent><Item data={mockData} /></MockComponent>);

    expect(el).toMatchSnapshot();
  })
})