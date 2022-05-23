
import { render, screen } from '@testing-library/react';
import Home from '../pages';

describe('index page', () => {
  it('render correctly', () => {
    render(<Home items={[]}/>);
  })
});