import { Token, TokenPrice } from '@/types';
import { API, UI } from './constants';

/**
 * Fetches and processes token prices from the API
 */
export async function fetchTokenPrices(): Promise<Token[]> {
  const response = await fetch(API.PRICES);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: TokenPrice[] = await response.json();

  // Get latest price for each currency
  const latestPrices = new Map<string, { price: number; date: Date }>();

  for (const item of data) {
    const existing = latestPrices.get(item.currency);
    const itemDate = new Date(item.date);

    if (!existing || itemDate > existing.date) {
      latestPrices.set(item.currency, { price: item.price, date: itemDate });
    }
  }

  // Convert to Token array with icons, filter out zero prices
  return Array.from(latestPrices.entries())
    .filter(([, { price }]) => price > 0)
    .map(([currency, { price }]) => ({
      currency,
      price,
      icon: `${API.TOKEN_ICONS_BASE}/${currency}.svg`,
    }))
    .sort((a, b) => a.currency.localeCompare(b.currency));
}

/**
 * Swap request payload
 */
export interface SwapRequest {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
}

/**
 * Swap response from API
 */
export interface SwapResponse {
  success: boolean;
  transactionId: string;
  fromAmount: string;
  toAmount: string;
  fromCurrency: string;
  toCurrency: string;
  timestamp: string;
}

/**
 * Simulates a token swap API call
 * In production, this would make an actual API request
 */
export async function executeSwap(request: SwapRequest): Promise<SwapResponse> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, UI.SWAP_SIMULATION_DELAY));

  // Simulate random failure (10% chance) for testing error handling
  if (Math.random() < 0.1) {
    throw new Error('Transaction failed. Please try again.');
  }

  // Return simulated successful response
  return {
    success: true,
    transactionId: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    fromAmount: request.fromAmount,
    toAmount: request.toAmount,
    fromCurrency: request.fromToken.currency,
    toCurrency: request.toToken.currency,
    timestamp: new Date().toISOString(),
  };
}
