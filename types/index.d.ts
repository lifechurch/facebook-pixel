declare global {
  interface Window {
    fbq?: (...args: Array<unknown>) => void;
  }
}

export interface AdvancedMatching {
  ct?: string;
  country?: string;
  db?: string;
  em?: string;
  fn?: string;
  ge?: string;
  ln?: string;
  ph?: string;
  st?: string;
  zp?: string;
}
