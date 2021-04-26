import FacebookPixel from '../src';

jest.mock('../src/utils/loadFacebookPixel');

describe('Track', () => {
  const fbqSpy = jest.fn();

  jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  jest.spyOn(global.console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    global.window.fbq = fbqSpy;
    jest.resetAllMocks();
  });

  it('Tracks an event with data', () => {
    FacebookPixel.track('EventTitle', { id: '1' });

    expect(fbqSpy).toHaveBeenCalledTimes(1);
    expect(fbqSpy).toHaveBeenCalledWith('track', 'EventTitle', { id: '1' });
  });

  it('Tracks an event without data', () => {
    FacebookPixel.track('EventTitle');

    expect(fbqSpy).toHaveBeenCalledTimes(1);
    expect(fbqSpy).toHaveBeenCalledWith('track', 'EventTitle', undefined);
  });
});
