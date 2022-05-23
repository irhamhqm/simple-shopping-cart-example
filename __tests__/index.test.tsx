
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Home from '../pages';

import store from '../redux/store';

const MockComponent = (props: { children: React.ReactNode }) => (
  <Provider store={store}>
    {props.children}
  </Provider>
);

describe('index page', () => {
  it('render correctly', () => {
    const homeElement = render(<MockComponent><Home items={[]}/></MockComponent>);

    expect(homeElement).toMatchSnapshot();
  });
});