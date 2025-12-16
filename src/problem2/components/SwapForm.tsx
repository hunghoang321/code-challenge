'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Token } from '@/types';
import { fetchTokenPrices, executeSwap } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { formatUSD, calculateExchangeAmount } from '@/lib/tokens';
import { toast } from 'sonner';
import TokenSelector from './TokenSelector';
import { SwapIcon, SpinnerIcon } from './icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function SwapForm() {
  const {
    data: tokens = [],
    isLoading: isLoadingTokens,
    error: tokensError,
  } = useQuery({
    queryKey: QUERY_KEYS.TOKENS,
    queryFn: fetchTokenPrices,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
  });

  // Form state
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [errors, setErrors] = useState<{ fromToken?: string; toToken?: string; fromAmount?: string }>({});

  // Swap mutation
  const swapMutation = useMutation({
    mutationFn: executeSwap,
    onSuccess: (response) => {
      setFromToken(null);
      setToToken(null);
      setFromAmount('');
      setToAmount('');
      setErrors({});
      toast.success('Swap Successful!', {
        description: `${response.fromAmount} ${response.fromCurrency} → ${response.toAmount} ${response.toCurrency}`,
        duration: 5000,
      });
    },
    onError: (error: Error) => {
      toast.error('Swap Failed', {
        description: error.message || 'Please try again.',
        duration: 5000,
      });
    },
  });

  // Helper to recalculate toAmount
  const recalculateToAmount = (amount: string, from: Token | null, to: Token | null) => {
    if (amount && from && to) {
      const numAmount = parseFloat(amount);
      if (!isNaN(numAmount) && numAmount > 0) {
        return calculateExchangeAmount(numAmount, from, to).toFixed(6);
      }
    }
    return '';
  };

  // Handlers
  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setErrors((prev) => ({ ...prev, fromAmount: undefined }));
    setToAmount(recalculateToAmount(value, fromToken, toToken));
  };

  const handleFromTokenChange = (token: Token | null) => {
    setFromToken(token);
    setErrors((prev) => ({ ...prev, fromToken: undefined }));
    setToAmount(recalculateToAmount(fromAmount, token, toToken));
  };

  const handleToTokenChange = (token: Token | null) => {
    setToToken(token);
    setErrors((prev) => ({ ...prev, toToken: undefined }));
    setToAmount(recalculateToAmount(fromAmount, fromToken, token));
  };

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(recalculateToAmount(toAmount, toToken, fromToken));
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { fromToken?: string; toToken?: string; fromAmount?: string } = {};

    if (!fromToken) {
      newErrors.fromToken = 'Please select a token';
    }
    if (!toToken) {
      newErrors.toToken = 'Please select a token';
    }

    const amount = parseFloat(fromAmount);
    if (!fromAmount) {
      newErrors.fromAmount = 'Please enter an amount';
    } else if (isNaN(amount) || amount <= 0) {
      newErrors.fromAmount = 'Please enter a valid amount';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    swapMutation.mutate({ fromToken: fromToken!, toToken: toToken!, fromAmount, toAmount });
  };

  // Derived state
  const exchangeRate = fromToken && toToken
    ? (fromToken.price / toToken.price).toFixed(6)
    : null;

  const fromUsdValue = fromAmount && fromToken
    ? formatUSD(parseFloat(fromAmount) * fromToken.price)
    : null;

  const toUsdValue = toAmount && toToken
    ? formatUSD(parseFloat(toAmount) * toToken.price)
    : null;

  // Show loading state while fetching tokens
  if (isLoadingTokens) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="bg-white dark:bg-gray-900 shadow-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 transition-colors">
          <div className="flex items-center justify-center py-10 sm:py-12">
            <SpinnerIcon size={28} className="text-purple-500" />
            <span className="ml-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">Loading tokens...</span>
          </div>
        </Card>
      </div>
    );
  }

  // Show error state if token fetch failed
  if (tokensError) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="bg-white dark:bg-gray-900 shadow-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 transition-colors">
          <div className="text-center py-10 sm:py-12">
            <p className="text-red-500 mb-4 text-sm sm:text-base">Failed to load tokens</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-white dark:bg-gray-900 shadow-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 transition-colors">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Swap Tokens</h2>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* From Section */}
          <Card className={`bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 border transition-colors ${errors.fromToken || errors.fromAmount ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-gray-700'}`}>
            <TokenSelector
              tokens={tokens}
              selectedToken={fromToken}
              onSelect={handleFromTokenChange}
              excludeToken={toToken}
              label="From"
            />
            {errors.fromToken && (
              <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.fromToken}</p>
            )}
            <div className="mt-3 sm:mt-4">
              <Input
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                placeholder="0.00"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                aria-label="Amount to swap"
                aria-invalid={!!errors.fromAmount}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xl sm:text-2xl font-semibold placeholder-gray-400 dark:placeholder-gray-600 focus:border-purple-500 transition-colors ${errors.fromAmount ? 'border-red-400 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
              />
              {errors.fromAmount && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.fromAmount}</p>
              )}
            <div className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {fromUsdValue ? (
                <>≈ ${fromUsdValue} USD</>
              ) : (
                <span className="text-gray-400 dark:text-gray-600">-</span>
              )}
            </div>
            </div>
          </Card>

          {/* Swap Button */}
          <div className="flex justify-center -my-1.5 sm:-my-2 relative z-10">
            <Button
              type="button"
              onClick={handleSwapTokens}
              variant="ghost"
              size="icon"
              aria-label="Swap tokens"
              className="p-1.5 sm:p-2 bg-gray-200 dark:bg-gray-800 border-4 border-white dark:border-gray-900 rounded-full hover:bg-purple-600 active:bg-purple-700 transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <SwapIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-white" />
            </Button>
          </div>

          {/* To Section */}
          <Card className={`bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 border transition-colors ${errors.toToken ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-gray-700'}`}>
            <TokenSelector
              tokens={tokens}
              selectedToken={toToken}
              onSelect={handleToTokenChange}
              excludeToken={fromToken}
              label="To"
            />
            {errors.toToken && (
              <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.toToken}</p>
            )}
            <div className="mt-3 sm:mt-4">
              <Input
                type="number"
                inputMode="decimal"
                step="any"
                placeholder="0.00"
                value={toAmount}
                readOnly
                aria-label="Amount to receive"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-xl sm:text-2xl font-semibold placeholder-gray-400 dark:placeholder-gray-600 cursor-not-allowed transition-colors"
              />
            <div className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {toUsdValue ? (
                <>≈ ${toUsdValue} USD</>
              ) : (
                <span className="text-gray-400 dark:text-gray-600">-</span>
              )}
            </div>
            </div>
          </Card>

          {/* Exchange Rate */}
          <Card className="bg-gray-100 dark:bg-gray-800 p-2.5 sm:p-3 border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-600 dark:text-gray-400">Exchange Rate</span>
              <span className="text-gray-900 dark:text-white font-medium truncate ml-2">
                {exchangeRate && fromToken && toToken ? (
                  <>1 {fromToken.currency} = {exchangeRate} {toToken.currency}</>
                ) : (
                  <span className="text-gray-400 dark:text-gray-500">Select tokens</span>
                )}
              </span>
            </div>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={swapMutation.isPending}
            className="w-full py-3 sm:py-4 text-sm sm:text-base bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:from-purple-800 active:to-pink-800 disabled:from-gray-400 disabled:to-gray-400 dark:disabled:from-gray-700 dark:disabled:to-gray-700 text-white font-bold transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
          >
            {swapMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <SpinnerIcon size={18} />
                Swapping...
              </span>
            ) : (
              'CONFIRM SWAP'
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
