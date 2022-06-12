import { render } from "../utils/test-utils";
import Home from "../pages";

import store from '../redux/store';
import { Provider } from 'react-redux';
import Item from "../components/Item";

const mockItem = {
  "uid": "0001",
  "productName": "orange",
  "image": {
    "url": "https://i.ibb.co/9vrDnYJ/19-orange-png-image-download.png",
    "altText": "Orange"
  },
  "price": 10000,
  "availableQuantity": 100
};

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
},
{
  "uid": "0003",
  "productName": "Strawberry",
  "image": {
    "url": "https://i.ibb.co/S7xj0L5/1-strawberry-png-images.png",
    "altText": "Strawberry"
  },
  "price": 20000,
  "availableQuantity": 100
},
{
  "uid": "0004",
  "productName": "Mango",
  "image": {
    "url": "https://i.ibb.co/Pgr5xF0/7-2-mango-free-png-image.png",
    "altText": "Mango"
  },
  "price": 15000,
  "availableQuantity": 100
},
{
  "uid": "0005",
  "productName": "Apple",
  "image": {
    "url": "https://i.ibb.co/cC0Jd9D/9-apple-png-image.png",
    "altText": "Apple"
  },
  "price": 10000,
  "availableQuantity": 100
}];

const preloadedState = {
  cart: {}
}

describe('snapshot', () => {
  it('render home correctly', () => {
    const homeElement = render(<Home items={mockItemList}/>, { preloadedState });

    expect(homeElement).toMatchSnapshot();
  });

  it('render item correctly', () => {
    const itemEl = render(<Item data={mockItem} ></Item>, { preloadedState });

    expect(itemEl).toMatchSnapshot();
  });
});