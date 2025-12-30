# sample-test

Playwright E2E test automation project.

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests with UI
npm run test:ui

# Debug tests
npm run test:debug
```

## Project Structure

```
sample-test/
├── src/
│   ├── pages/           # Page Object classes
│   ├── fixtures/        # Test fixtures
│   └── utils/           # Utility functions
├── tests/               # Test specifications
├── playwright.config.ts # Playwright configuration
└── package.json
```

## Configuration

- Base URL: `https://example.com`
- Browsers: Chromium, Firefox, WebKit

## Reports

After running tests, view the HTML report:

```bash
npm run test:report
```
