import SwapForm from '@/components/SwapForm';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen min-h-dvh bg-linear-to-br from-slate-100 via-purple-100 to-slate-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 flex items-center justify-center px-3 py-6 sm:p-4 transition-colors duration-300">
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
        <ThemeToggle />
      </div>
      <SwapForm />
    </main>
  );
}
