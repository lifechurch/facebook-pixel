import FacebookPixel from '../src';

jest.mock('../src/utils/loadFacebookPixel');

describe('Track Single Custom', () => {
  const fbqSpy = jest.fn();

  jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  jest.spyOn(global.console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    global.window.fbq = fbqSpy;
    jest.resetAllMocks();
  });

  it('Tracks an event for a specific pixel ID with data', () => {
    FacebookPixel.trackSingleCustom('7890', 'EventTitle', { id: '1' });

    expect(fbqSpy).toHaveBeenCalledTimes(1);
    expect(fbqSpy).toHaveBeenCalledWith(
      'trackSingleCustom',
      '7890',
      'EventTitle',
      { id: '1' }
    );
  });

  it('Tracks an event for a specific pixel ID without data', () => {
    FacebookPixel.trackSingleCustom('7890', 'EventTitle');

    expect(fbqSpy).toHaveBeenCalledTimes(1);
    expect(fbqSpy).toHaveBeenCalledWith(
      'trackSingleCustom',
      '7890',
      'EventTitle',
      undefined
    );
  });
});
