import hello from '../src/hello'

describe('When calling hello', () => {
  it('returns "Hello world"', () => {
    expect(hello()).toEqual('Hello world')
  })
})
