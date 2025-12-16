import { Token } from '@/types';
import { VALIDATION } from './constants';

/**
 * Calculates the exchange amount from one token to another
 * @param fromAmount - Amount of source token
 * @param fromToken - Source token
 * @param toToken - Destination token
 * @returns Calculated amount of destination token
 */
export function calculateExchangeAmount(
  fromAmount: number,
  fromToken: Token,
  toToken: Token
): number {
  if (!fromAmount || fromAmount <= VALIDATION.MIN_AMOUNT) return 0;
  if (!fromToken?.price || !toToken?.price) return 0;
  if (toToken.price === 0) return 0; // Prevent division by zero

  const usdValue = fromAmount * fromToken.price;
  return usdValue / toToken.price;
}

/**
 * Formats a number to a fixed decimal string
 * @param value - Number to format
 * @param decimals - Number of decimal places
 */
export function formatAmount(value: number, decimals: number = VALIDATION.PRICE_DECIMALS): string {
  return value.toFixed(decimals);
}

/**
 * Formats a USD value
 * @param value - USD amount
 */
export function formatUSD(value: number): string {
  return value.toFixed(VALIDATION.USD_DECIMALS);
}
