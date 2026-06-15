
# Advanced QA Training

## Day 1: Multiple Tabs and Windows

### Test Cases

- TC_001 Verify New Tab button opens a new tab. -
- TC_002 Verify content of newly opened tab ("This is a sample page").
- TC_003 Close child tab and switch back to parent.
- TC_004 Verify New Window Message functionality.

## Day 1: Network Mocking

### Tasks

### 1. Mock Books API with Custom Books

-   Intercept the Books API.
-   Return custom book data.
-   Verify that the UI displays the mocked books.

### 2. Mock Empty Response

-   Mock the API with an empty array.
-   Verify that the application handles the empty state gracefully.

### 3. Delay API Response

-   Add an artificial delay to the API response.
-   Verify that the loading indicator is displayed.
-   Ensure the UI updates correctly after the response arrives.

------------------------------------------------------------------------

## Day 2: Playwright Fixtures

### Tasks

### Page Object Fixtures

-   Create reusable fixtures for page objects.
-   Share page objects across multiple test files.

### Utility/Common Fixtures

-   Create fixtures for common utility classes.
-   Reuse helper methods across the test suite.

------------------------------------------------------------------------

## Day 2: Reports and Debugging

## 1. Simulate Failures

Document at least five unique failure categories.

## 2. Simulate Timeouts in Playwright

Document three different timeout scenarios.

------------------------------------------------------------------------

## Prerequisites

Before running the project, ensure the following are installed:

* Node.js (v18 or later recommended)
* npm (comes with Node.js)

Verify installation:

```bash
node -v
npm -v
```

---

## Project Setup

### Install Dependencies

```bash
npm install
```

### Install Playwright Browsers

```bash
npx playwright install
```

---

## Test Execution Commands

### Run All Tests

```bash
npx playwright test
```

### Run Tests in Headed Mode

```bash
npx playwright test --headed
```

### Run Tests in UI Mode

```bash
npx playwright test --ui
```

### Show HTML Report

```bash
npx playwright show-report
```

### Run Smoke Tests

```bash
npx playwright test --grep @smoke
```

### Run Negative Test Cases

```bash
npx playwright test --grep @negative
```

### Run a Specific Test File

```bash
npx playwright test tests/login.spec.ts
```

---

## Reporting

Generate and view the HTML report:

```bash
npx playwright show-report
```

---

## Deliverables

The following artifacts are included as part of the submission:

* Multiple Tab automation tests
* Network Mocking tests
* Custom Fixture implementation
* Fixture-based reusable tests
* HTML Report snippets
* Trace Viewer evidence
* Debugging document covering at least 8 failure categories
* Updated README 

---




