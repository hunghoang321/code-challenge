# Copilot Instructions for 99Tech Code Challenge

## Project Overview
This is a technical assessment repository containing 5 independent coding problems. Each problem lives in its own isolated directory under `src/problem{1-5}/` with minimal cross-dependencies.

## Project Structure
- **Problem 1** (`src/problem1/`): JavaScript algorithm implementations - provides 3 approaches to the same problem with performance analysis
- **Problem 2** (`src/problem2/`): HTML/CSS/JS form interface - a "fancy form" implementation
- **Problem 3-5** (`src/problem3-5/`): Empty placeholders with `.keep` files

## Code Style & Conventions

### JavaScript Style
- Use `var` for function declarations (as seen in [problem1/main.js](../src/problem1/main.js))
- Prefer function expressions: `var funcName = function(param) { ... }`
- Include comprehensive test cases and performance analysis comments
- Document time/space complexity for algorithmic solutions

### Testing Approach
Run code directly with Node.js rather than using test frameworks:
```bash
node src/problem1/main.js
```

Tests should include:
- Basic functionality verification
- Edge case handling (large numbers, limits)
- Performance characteristics demonstration
- Error handling with try-catch blocks

### HTML/CSS Projects
- Keep structure minimal and semantic (see [problem2/index.html](../src/problem2/index.html))
- Use inline event handlers sparingly: `onsubmit="return !1"`
- Load scripts at the end of body: `<script src="script.js"></script>`
- CSS follows flexbox-centered layout pattern with Arial fallback fonts

## Development Workflow

### Running Solutions
Each problem is self-contained. Execute JavaScript files directly:
```bash
# Problem 1
node src/problem1/main.js

# Problem 2 (open in browser)
open src/problem2/index.html
```

### Creating New Solutions
- Place all files for a problem in its respective `src/problem{N}/` directory
- Keep solutions independent - no shared utilities or cross-imports
- Include problem description as comments at the top of main file
- Add thorough inline comments explaining algorithmic choices

## Problem-Specific Context

### Problem 1: Algorithm Implementations
Demonstrates multiple approaches with different trade-offs:
- **Formula approach** (`sum_to_n_a`): O(1) time, mathematical solution
- **Iterative approach** (`sum_to_n_b`): O(n) time, simple loop
- **Recursive approach** (`sum_to_n_c`): O(n) time/space, demonstrates recursion limits (~10,000-15,000 on typical stacks)

All implementations must respect `Number.MAX_SAFE_INTEGER` constraint.

### Problem 2: Fancy Form
Simple swap interface with:
- Two input fields (amount to send/receive)
- Confirmation button
- Expected to add interactive behavior in `script.js`
- Styling should maintain centered, responsive layout

## Key Patterns
- **Self-documenting tests**: Tests serve as both verification and documentation
- **Performance awareness**: Include benchmarking and limit testing for algorithms
- **No dependencies**: Pure JavaScript/HTML/CSS - no npm packages or build tools
- **Console-driven**: Use `console.log()` extensively for output and debugging
