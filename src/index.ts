import loadFacebookPixel from './utils/loadFacebookPixel';
import { AdvancedMatching } from '../types';

let _debug = false;
const _isNotBrowser =
  typeof window === 'undefined' || typeof document === 'undefined';

const _log = (message: any, ...optionalParams: any[]): void => {
  if (!_debug) {
    return;
  }
  console.log('[@lifechurch/facebook-pixel]', message, ...optionalParams);
};

const _warn = (message: any, ...optionalParams: any[]): void => {
  if (!_debug) {
    return;
  }
  console.warn('[@lifechurch/facebook-pixel]', message, ...optionalParams);
};

const internalFb = (...args: Array<unknown>): void => {
  if (_isNotBrowser) return;
  if (!window.fbq) {
    return _warn(
      'FacebookPixel.init must be called first or FacebookPixel should be loaded manually.'
    );
  }
  return window.fbq(...args);
};

interface InitializeOptions {
  debug?: boolean;
  useExistingPixel?: boolean;
  autoConfig?: boolean;
}

const defaultOptions: InitializeOptions = {
  debug: false,
  useExistingPixel: false,
  autoConfig: true,
};

const defaultAdvancedMatching: AdvancedMatching = {};

function init(
  pixelId: string,
  options: InitializeOptions = defaultOptions,
  advancedMatching = defaultAdvancedMatching
): void {
  _debug = options?.debug ?? false;

  if (!pixelId) {
    _warn('pixelId is required in init()');
    return;
  }

  if (_isNotBrowser) {
    return;
  }

  if (!options.useExistingPixel) {
    loadFacebookPixel(options);
  }

  if (options.autoConfig) {
    internalFb('set', 'autoConfig', false, pixelId);
  }

  internalFb('init', pixelId, advancedMatching);
}

function pageView(): void {
  internalFb('track', 'PageView');
  if (_debug) {
    _log("called fbq('track', 'PageView')");
  }
}

function track(title: string, data?: unknown): void {
  internalFb('track', title, data);
  if (_debug) {
    _log(`called fbq('track', '${title}')`);
    if (data) {
      _log('with data', data);
    }
  }
}

function trackSingle(pixel: string, title: string, data?: unknown): void {
  internalFb('trackSingle', pixel, title, data);
  if (_debug) {
    _log(`called fbq('trackSingle', '${pixel}', '${title}')`);
    if (data) {
      _log('with data', data);
    }
  }
}

function trackCustom(event: string, data?: unknown): void {
  internalFb('trackCustom', event, data);
  if (_debug) {
    _log(`called fbq('trackCustom', '${event}')`);
    if (data) {
      _log('with data', data);
    }
  }
}

function trackSingleCustom(pixel: string, event: string, data?: unknown): void {
  internalFb('trackSingleCustom', pixel, event, data);
  if (_debug) {
    _log(`called fbq('trackSingleCustom', '${pixel}', '${event}')`);
    if (data) {
      _log('with data', data);
    }
  }
}

function grantConsent(): void {
  internalFb('consent', 'grant');
  if (_debug) {
    _log(`called fbq('consent', 'grant')`);
  }
}

function revokeConsent(): void {
  internalFb('consent', 'revoke');
  if (_debug) {
    _log(`called fbq('consent', 'revoke')`);
  }
}

export default {
  init,
  pageView,
  track,
  trackSingle,
  trackCustom,
  trackSingleCustom,
  grantConsent,
  revokeConsent,
  fbq: internalFb,
};
