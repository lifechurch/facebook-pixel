import FacebookPixel from '../src';

jest.mock('../src/utils/loadFacebookPixel');

describe('Grant Consent', () => {
  const fbqSpy = jest.fn();

  jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  jest.spyOn(global.console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    global.window.fbq = fbqSpy;
    jest.resetAllMocks();
  });

  it('Grants consent', () => {
    FacebookPixel.grantConsent();

    expect(fbqSpy).toHaveBeenCalledTimes(1);
    expect(fbqSpy).toHaveBeenCalledWith('consent', 'grant');
  });
});
