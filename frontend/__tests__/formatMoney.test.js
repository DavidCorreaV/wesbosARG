import formatMoney from '../lib/formatMoney';

describe('Money formatting according to the currency', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1 / 100)).toEqual('$0.01');
    expect(formatMoney(10 / 100)).toEqual('$0.10');
    expect(formatMoney(9 / 100)).toEqual('$0.09');
    expect(formatMoney(40 / 100)).toEqual('$0.40');
    expect(formatMoney(99 / 100)).toEqual('$0.99');
    expect(formatMoney(140 / 100)).toEqual('$1.40');
  });

  it('removes extra zeroes', () => {
    expect(formatMoney(100 / 100)).toEqual('$1');
    expect(formatMoney(2)).toEqual('$2');
    expect(formatMoney(2.5)).toEqual('$2.50');
    expect(formatMoney(100)).toEqual('$100');
    expect(formatMoney(120.99)).toEqual('$120.99');
  });
});
