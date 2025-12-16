# 99Tech Code Challenge #

Note that if you fork this repository, your responses may be publicly linked to this repo.
Please submit your application along with the solutions attached or linked.

It is important that you minimally attempt the problems, even if you do not arrive at a working solution.

## Submission ##
You can either provide a link to an online repository, attach the solution in your application, or whichever method you prefer.
We're cool as long as we can view your solution without any pain.

---

## Problem 1: Three Ways to Sum to N
**Location:** `src/problem1/main.js`

Three implementations with different trade-offs:

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| `sum_to_n_a` | O(1) | O(1) | Formula: `n(n+1)/2` - fastest |
| `sum_to_n_b` | O(n) | O(1) | Loop - simple & reliable |
| `sum_to_n_c` | O(n) | O(n) | Recursion - limited by call stack (~10k) |

```bash
node src/problem1/main.js
```

---

## Problem 2: Token Swap Form
**Location:** `src/problem2/`

A responsive React token swap interface with real-time price calculations.

**Tech Stack:** Next.js 16, React 19, TailwindCSS 4, React Query, shadcn/ui

**Features:**
- 🌓 Light/dark mode toggle
- 📱 Mobile-first (320px+)
- ⚡ Real API data with loading/error states
- ✅ Click-to-validate with inline errors
- 🖼️ Token icons from CDN with fallback

```bash
cd src/problem2 && npm install && npm run dev
```

---

## Problem 3: Code Review - WalletPage Component
**Location:** `src/problem3/`

**Files:** `old.tsx` (problematic) → `new.tsx` (refactored)

### Key Issues Found:
- ❌ `key={index}` instead of unique identifier
- ❌ Inverted filter logic (kept zero balances)
- ❌ `{...rest}` unsafe prop spreading
- ❌ `any` type, missing interface properties
- ❌ Double data processing, unused variables

### Fixes Applied:
- ✅ Strong TypeScript interfaces
- ✅ Single memoized data transformation
- ✅ Functions moved outside component
- ✅ Explicit prop handling (no spreading)
- ✅ Proper `useMemo` dependencies
