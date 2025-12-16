/**
 * Application-wide constants
 */

// API Endpoints
export const API = {
  PRICES: 'https://interview.switcheo.com/prices.json',
  TOKEN_ICONS_BASE: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens',
} as const;

// UI Constants
export const UI = {
  /** Height of each token row in the virtualized list */
  TOKEN_ROW_HEIGHT: 56,
  /** Maximum number of visible items in token dropdown */
  MAX_VISIBLE_TOKENS: 6,
  /** Debounce delay for search input (ms) */
  SEARCH_DEBOUNCE_MS: 150,
  /** Simulated swap delay (ms) - replace with actual API call */
  SWAP_SIMULATION_DELAY: 1500,
} as const;

// Validation
export const VALIDATION = {
  /** Minimum amount for swap */
  MIN_AMOUNT: 0,
  /** Maximum decimal places for display */
  PRICE_DECIMALS: 6,
  /** Maximum decimal places for USD display */
  USD_DECIMALS: 2,
} as const;

// React Query Keys
export const QUERY_KEYS = {
  TOKENS: ['tokens'],
} as const;

// Fallback icon SVG data URI
export const FALLBACK_TOKEN_ICON =
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><circle cx="12" cy="12" r="10" fill="%236366f1"/></svg>';
