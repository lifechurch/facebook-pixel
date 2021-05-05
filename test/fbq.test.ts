import FacebookPixel from '../src';

jest.mock('../src/utils/loadFacebookPixel');

describe('FBQ', () => {
  const fbqSpy = jest.fn();

  jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  jest.spyOn(global.console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    global.window.fbq = fbqSpy;
    jest.resetAllMocks();
  });

  it('Gives direct access to window.fbq()', () => {
    FacebookPixel.fbq('test', 'call');

    expect(fbqSpy).toHaveBeenCalledTimes(1);
    expect(fbqSpy).toHaveBeenCalledWith('test', 'call');
  });
});
