import FacebookPixel from '../src';

jest.mock('../src/utils/loadFacebookPixel');

describe('Revoke Consent', () => {
  const fbqSpy = jest.fn();

  jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  jest.spyOn(global.console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    global.window.fbq = fbqSpy;
    jest.resetAllMocks();
  });

  it('Revokes consent', () => {
    FacebookPixel.revokeConsent();

    expect(fbqSpy).toHaveBeenCalledTimes(1);
    expect(fbqSpy).toHaveBeenCalledWith('consent', 'revoke');
  });
});
