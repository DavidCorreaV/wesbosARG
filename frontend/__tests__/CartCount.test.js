import { render, screen, waitFor } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
  it('Renders', () => {
    render(<CartCount count={10} />);
  });
  it('Matches Snapshot', () => {
    const { container } = render(<CartCount count={11} />);
    expect(container).toMatchSnapshot();
  });
  it('Updates with props', async () => {
    const { container, rerender } = render(<CartCount count={11} />);
    expect(container.textContent).toEqual('11');
    rerender(<CartCount count={12} />);
    expect(container.textContent).toEqual('1211');
    await waitFor(() => {
      expect(container.textContent).toEqual('12');
    });
    expect(container).toMatchSnapshot();
  });
});
