'use client';

import { Token } from '@/types';
import { useState, useMemo, useCallback } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatAmount } from '@/lib/tokens';
import { TokenIcon } from './TokenIcon';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

/** Maximum items to render for performance - search filters the rest */
const MAX_VISIBLE_ITEMS = 100;

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken: Token | null;
  onSelect: (token: Token) => void;
  label: string;
  /** Token to exclude from the list (e.g., the other selector's selection) */
  excludeToken?: Token | null;
  /** ID for accessibility */
  id?: string;
}

export default function TokenSelector({
  tokens,
  selectedToken,
  onSelect,
  label,
  excludeToken,
  id,
}: TokenSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const buttonId = id || `token-selector-${label.toLowerCase()}`;

  // Filter out excluded token and limit results for performance
  const availableTokens = useMemo(() => {
    let filtered = tokens.filter((token) => {
      if (excludeToken && token.currency === excludeToken.currency) {
        return false;
      }
      return true;
    });

    // When searching, filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((token) =>
        token.currency.toLowerCase().includes(searchLower)
      );
    }

    // Limit to MAX_VISIBLE_ITEMS for performance
    return filtered.slice(0, MAX_VISIBLE_ITEMS);
  }, [tokens, excludeToken, search]);

  // Check if there are more items than displayed
  const hasMoreItems = useMemo(() => {
    const totalFiltered = tokens.filter((token) => {
      if (excludeToken && token.currency === excludeToken.currency) return false;
      if (search) {
        return token.currency.toLowerCase().includes(search.toLowerCase());
      }
      return true;
    }).length;
    return totalFiltered > MAX_VISIBLE_ITEMS;
  }, [tokens, excludeToken, search]);

  const handleSelect = useCallback((currency: string) => {
    const token = availableTokens.find((t) => t.currency === currency);
    if (token) {
      onSelect(token);
      setOpen(false);
    }
  }, [availableTokens, onSelect]);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={buttonId} className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {label}
      </Label>
      <Popover open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setSearch(''); // Reset search when closing
      }}>
        <PopoverTrigger asChild>
          <Button
            id={buttonId}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between px-4 py-6 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-750 hover:border-purple-500 transition-colors"
          >
            {selectedToken ? (
              <div className="flex items-center gap-3">
                <TokenIcon src={selectedToken.icon} alt={selectedToken.currency} size={24} />
                <span className="text-gray-900 dark:text-white font-medium">{selectedToken.currency}</span>
              </div>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">Select token...</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          align="start"
        >
          <Command className="bg-transparent" shouldFilter={false}>
            <CommandInput
              placeholder="Search tokens..."
              className="border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-gray-300 dark:focus:border-gray-600"
              value={search}
              onValueChange={setSearch}
            />
            <CommandList className="max-h-[300px]">
              <CommandEmpty className="py-6 text-center text-gray-500 dark:text-gray-400">
                No token found.
              </CommandEmpty>
              <CommandGroup>
                {availableTokens.map((token) => (
                  <CommandItem
                    key={token.currency}
                    value={token.currency}
                    onSelect={handleSelect}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-700"
                  >
                    <TokenIcon src={token.icon} alt={token.currency} size={24} />
                    <div className="flex-1">
                      <div className="font-medium">{token.currency}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ${formatAmount(token.price)}
                      </div>
                    </div>
                    <Check
                      className={cn(
                        "h-4 w-4",
                        selectedToken?.currency === token.currency
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
              {hasMoreItems && (
                <div className="py-2 px-4 text-xs text-gray-500 dark:text-gray-400 text-center border-t border-gray-200 dark:border-gray-700">
                  Type to search for more tokens...
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
