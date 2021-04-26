import FacebookPixel from '../src';

jest.mock('../src/utils/loadFacebookPixel');

describe('Track Custom', () => {
  const fbqSpy = jest.fn();

  jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  jest.spyOn(global.console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    global.window.fbq = fbqSpy;
    jest.resetAllMocks();
  });

  it('Tracks an event with data', () => {
    FacebookPixel.trackCustom('EventTitle', { id: '1' });

    expect(fbqSpy).toHaveBeenCalledTimes(1);
    expect(fbqSpy).toHaveBeenCalledWith('trackCustom', 'EventTitle', {
      id: '1',
    });
  });

  it('Tracks an event without data', () => {
    FacebookPixel.trackCustom('EventTitle');

    expect(fbqSpy).toHaveBeenCalledTimes(1);
    expect(fbqSpy).toHaveBeenCalledWith('trackCustom', 'EventTitle', undefined);
  });
});
