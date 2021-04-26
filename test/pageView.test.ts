import FacebookPixel from '../src';

jest.mock('../src/utils/loadFacebookPixel');

describe('Page View', () => {
  const fbqSpy = jest.fn();

  jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  jest.spyOn(global.console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    global.window.fbq = fbqSpy;
    jest.resetAllMocks();
  });

  it('Logs a PaveView', () => {
    FacebookPixel.pageView();

    expect(fbqSpy).toHaveBeenCalledTimes(1);
    expect(fbqSpy).toHaveBeenCalledWith('track', 'PageView');
  });
});
