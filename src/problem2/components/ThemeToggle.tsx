'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon } from './icons';

// Subscribe function for useSyncExternalStore (no-op for client state)
const subscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Use useSyncExternalStore to safely detect client-side mounting
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,  // Client snapshot
    () => false  // Server snapshot
  );

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 rounded-full bg-secondary/50 backdrop-blur-sm"
        aria-label="Toggle theme"
      >
        <span className="w-5 h-5" />
      </Button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-10 h-10 rounded-full bg-secondary/50 backdrop-blur-sm hover:bg-secondary transition-colors"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <SunIcon className="w-5 h-5 text-yellow-400" />
      ) : (
        <MoonIcon className="w-5 h-5 text-slate-700" />
      )}
    </Button>
  );
}
