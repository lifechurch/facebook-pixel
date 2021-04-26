import FacebookPixel from '../src';
import loadFacebookPixel from '../src/utils/loadFacebookPixel';

jest.mock('../src/utils/loadFacebookPixel');

describe('Init', () => {
  const warnSpy = jest
    .spyOn(global.console, 'warn')
    .mockImplementation(() => {});
  const fbqSpy = jest.fn();

  beforeEach(() => {
    global.window.fbq = fbqSpy;
    jest.resetAllMocks();
  });

  it('Warns without PixelID provided', () => {
    FacebookPixel.init('', { debug: true });

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      '[@lifechurch/facebook-pixel]',
      'pixelId is required in init()'
    );
  });

  it('Enables autoconfig and inits', () => {
    FacebookPixel.init('123456');

    expect(loadFacebookPixel).toHaveBeenCalledTimes(1);
    expect(fbqSpy).toHaveBeenCalledTimes(2);
    expect(fbqSpy).toHaveBeenCalledWith('set', 'autoConfig', false, '123456');
    expect(fbqSpy).toHaveBeenCalledWith('init', '123456', {});
  });

  it('Allows usage of your own script and inits', () => {
    FacebookPixel.init('123456', { useExistingPixel: true });

    expect(loadFacebookPixel).toHaveBeenCalledTimes(0);
    expect(fbqSpy).toHaveBeenCalledTimes(1);
    expect(fbqSpy).toHaveBeenCalledWith('init', '123456', {});
  });
});
