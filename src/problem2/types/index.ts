/**
 * Raw token price data from the API
 */
export interface TokenPrice {
  /** Token currency symbol (e.g., 'ETH', 'BTC') */
  currency: string;
  /** ISO date string of the price update */
  date: string;
  /** Price in USD */
  price: number;
}

/**
 * Processed token with price and icon URL
 */
export interface Token {
  /** Token currency symbol */
  currency: string;
  /** Current price in USD */
  price: number;
  /** URL to token icon */
  icon: string;
}

/**
 * Swap form state
 */
export interface SwapState {
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: string;
  toAmount: string;
  isLoading: boolean;
  error: string;
}
