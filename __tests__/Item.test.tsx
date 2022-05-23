
import Item from '@/components/Item';
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

describe('Item component', () => {
  it('render correctly', () => {
    const el = render(<Item data={mockData} />);

    expect(el).toMatchSnapshot();
  })
})