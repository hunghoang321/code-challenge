# Currency Swap Application - Problem 2

A modern, responsive currency swap interface built with Next.js 15, TypeScript, and Tailwind CSS for the 99Tech Code Challenge.

## Features

- 🔄 Token swapping with real-time exchange rates
- 🎨 Beautiful gradient UI with dark theme
- 🔍 Searchable token selector with icons
- 💱 Live USD value calculations
- ⚡ Fast performance with Next.js App Router
- 📱 Fully responsive design
- ✨ Loading states and error handling

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the swap interface.

## Data Sources

- **Token Prices**: [https://interview.switcheo.com/prices.json](https://interview.switcheo.com/prices.json)
- **Token Icons**: [Switcheo Token Icons Repository](https://github.com/Switcheo/token-icons)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Switcheo Token Icons

## Project Structure

```
problem2/
├── app/
│   ├── page.tsx          # Main page with swap form
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── SwapForm.tsx      # Main swap form component
│   └── TokenSelector.tsx # Token dropdown selector
├── lib/
│   └── tokens.ts         # Token data fetching and calculations
└── types/
    └── index.ts          # TypeScript type definitions
```

## Key Features

### Token Selection
- Dropdown with search functionality
- Token icons with fallback support
- Price display for each token

### Exchange Calculation
- Real-time conversion based on USD prices
- Exchange rate display
- USD value preview for both amounts

### User Experience
- Swap direction button (reverse from/to tokens)
- Form validation with error messages
- Loading state during submission
- Disabled state for invalid inputs
- Success feedback on swap completion

### Design
- Gradient background (purple/gray theme)
- Modern card-based UI
- Smooth animations and transitions
- Hover effects on interactive elements
- Fully responsive for all screen sizes
