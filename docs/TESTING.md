# Testing Guide

**Last Updated**: 2025-10-11
**Constitution Reference**: Article VI

## Overview

This document describes the testing strategy, standards, and practices for the Jira Clone project.

## Testing Philosophy

### Test-Driven Development (TDD)

**MANDATORY** workflow as defined in Constitution Article VI, Section 6.1:

1. **Write test that fails** (RED)
2. **Get user approval** on test scenarios
3. **Write minimal code to pass test** (GREEN)
4. **Refactor for quality** (REFACTOR)

**Tests MUST be written before implementation code.**

### Testing Pyramid

```
       /\
      /  \      E2E Tests (Few)
     /____\     - Complete user journeys
    /      \    - Critical paths only
   /________\   Integration Tests (Some)
  /          \  - API endpoints
 /____________\ - Service interactions
/              \ Unit Tests (Many)
________________ - Business logic
                 - Utilities
                 - Components
```

## Test Coverage Requirements

### Minimum Coverage (Constitution Article VI, Section 6.2)

**Blocks merge if not met:**

- **Backend**: 85% line coverage
- **Frontend**: 80% line coverage
- **Common**: 90% line coverage
- **Critical paths**: 100% coverage
  - Authentication flows
  - Data mutations
  - Payment processing (if applicable)

### Current Configuration Status

⚠️ **Note**: Coverage thresholds are NOT currently enforced in test runner configs. This is a P2 issue:

- Backend: Add coverage thresholds to `jest` config in `back/package.json`
- Frontend: Configure coverage thresholds in `vitest.config.ts`
- Common: Add Vitest config with 90% threshold requirement

## Test Categories

### Frontend Tests

#### 1. Component Tests (Vitest + Vue Test Utils)

**Purpose**: Test Vue component behavior

```typescript
// front/src/components/UserCard.spec.ts
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import UserCard from './UserCard.vue';

describe('UserCard', () => {
  it('renders user name correctly', () => {
    const wrapper = mount(UserCard, {
      props: {
        user: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com'
        }
      }
    });

    expect(wrapper.text()).toContain('John Doe');
  });

  it('emits delete event when delete button clicked', async () => {
    const wrapper = mount(UserCard, {
      props: { user: { id: '1', name: 'John' } }
    });

    await wrapper.find('[data-testid="delete-btn"]').trigger('click');

    expect(wrapper.emitted('delete')).toBeTruthy();
    expect(wrapper.emitted('delete')?.[0]).toEqual(['1']);
  });
});
```

#### 2. Store Tests (Pinia)

**Purpose**: Test state management

```typescript
// front/src/stores/user.spec.ts
import { setActivePinia, createPinia } from 'pinia';
import { useUserStore } from './user';

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('fetches user data', async () => {
    const store = useUserStore();
    await store.fetchUser('123');

    expect(store.currentUser).toBeDefined();
    expect(store.currentUser?.id).toBe('123');
  });
});
```

#### 3. Integration Tests

**Purpose**: Test API service interactions

```typescript
// front/src/services/api.spec.ts
import { describe, it, expect, vi } from 'vitest';
import { userService } from './api';

// Mock fetch
global.fetch = vi.fn();

describe('User API Service', () => {
  it('fetches user by ID', async () => {
    const mockUser = { id: '1', name: 'John' };
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockUser
    });

    const user = await userService.getUser('1');

    expect(user).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith('/api/users/1');
  });
});
```

#### 4. Accessibility Tests

**Purpose**: Ensure WCAG 2.1 AA compliance

```typescript
// front/src/components/Button.spec.ts
import { mount } from '@vue/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from './Button.vue';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('has no accessibility violations', async () => {
    const wrapper = mount(Button, {
      props: { label: 'Click me' }
    });

    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('is keyboard accessible', async () => {
    const wrapper = mount(Button);
    const button = wrapper.find('button');

    await button.trigger('keydown.enter');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
```

### Backend Tests

#### 1. Unit Tests (Jest)

**Purpose**: Test business logic

```typescript
// back/src/services/users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validates email format', () => {
    expect(service.isValidEmail('test@example.com')).toBe(true);
    expect(service.isValidEmail('invalid')).toBe(false);
  });
});
```

#### 2. Integration Tests

**Purpose**: Test API endpoints

```typescript
// back/src/modules/users/users.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './users.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
```

#### 3. Contract Tests

**Purpose**: Ensure API contracts match specification

```typescript
// back/src/modules/auth/auth.contract.spec.ts
describe('Auth API Contracts', () => {
  it('POST /auth/register returns correct response shape', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User'
      });

    expect(response.body).toMatchObject({
      user: {
        id: expect.any(String),
        email: 'test@example.com',
        name: 'Test User'
      },
      token: expect.any(String)
    });
  });
});
```

### E2E Tests (Playwright)

**Purpose**: Test complete user journeys

> **Note**: Playwright not yet installed. Install with: `npm install -D @playwright/test`

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
  test('user can register and login', async ({ page }) => {
    // Register
    await page.goto('/register');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');

    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard');

    // Logout
    await page.click('[data-testid="logout-btn"]');

    // Login
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');

    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });
});
```

## Running Tests

### Frontend Tests (Vitest)

```bash
# Run all tests
cd front && npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage

# Run specific file
npm test -- UserCard.spec.ts

# Run tests matching pattern
npm test -- --grep="authentication"
```

### Backend Tests (Jest)

```bash
# Run all tests
cd back && npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage

# Run specific file
npm test -- users.service.spec.ts

# Run tests matching pattern
npm test -- --testNamePattern="validates email"
```

### E2E Tests (Playwright)

```bash
# Run all E2E tests
npx playwright test

# Run in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test auth.spec.ts

# Debug mode
npx playwright test --debug
```

## Test Quality Standards

### All Tests Must (Constitution Article VI, Section 6.4)

- **Test behavior, not implementation details**
- **Be independent and isolated** (no shared state)
- **Have clear, descriptive names**
  - Good: `test('user can login with valid credentials')`
  - Bad: `test('test1')`
- **Follow AAA pattern** (Arrange, Act, Assert)
- **Run in under 5 minutes total** (suite execution time)
- **Use proper mocking** for external dependencies
- **Clean up after themselves** (no side effects)

### Flaky Tests

**Flaky tests MUST be fixed immediately or removed.**

Common causes of flakiness:
- Race conditions
- Time-dependent logic
- External API calls (use mocks)
- Shared state between tests
- Order-dependent tests

## Mocking Strategies

### Mocking Firebase

```typescript
// Mock Firebase Auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: { uid: 'test-user-id' }
  })),
  signInWithEmailAndPassword: vi.fn()
}));

// Mock Firestore
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  getDocs: vi.fn(() => Promise.resolve({ docs: [] }))
}));
```

### Mocking HTTP Requests

```typescript
// Vitest
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'test' })
  })
);

// Jest with supertest (backend)
import * as request from 'supertest';
// See integration test examples above
```

## CI/CD Integration

### GitHub Actions Configuration

Tests run automatically on:
- Pull request creation
- Pull request updates
- Push to `main` branch

```yaml
# .github/workflows/test.yml
name: Tests

on: [pull_request, push]

jobs:
  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test --workspace=front -- --coverage

  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test --workspace=back -- --coverage
```

## Debugging Tests

### Frontend (Vitest)

```bash
# Use browser UI
npm test -- --ui

# Debug specific test
npm test -- --reporter=verbose UserCard.spec.ts
```

### Backend (Jest)

```bash
# Enable verbose output
npm test -- --verbose

# Debug with Node inspector
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Best Practices

### DO ✅

- Write tests before code (TDD)
- Test one thing per test
- Use descriptive test names
- Mock external dependencies
- Clean up after tests
- Test error cases
- Test edge cases
- Keep tests simple and readable

### DON'T ❌

- Test implementation details
- Share state between tests
- Use real external APIs
- Ignore flaky tests
- Skip tests with `.skip()` without good reason
- Write tests that depend on execution order
- Make tests too complex

## Common Testing Patterns

### Testing Async Code

```typescript
it('fetches data asynchronously', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});
```

### Testing Errors

```typescript
it('throws error for invalid input', () => {
  expect(() => processInput('')).toThrow('Input required');
});
```

### Testing User Interactions

```typescript
it('handles button click', async () => {
  const wrapper = mount(Component);
  await wrapper.find('button').trigger('click');
  expect(wrapper.emitted('submit')).toBeTruthy();
});
```

---

**For Updates**: This document should be updated when:
- Testing tools change
- New testing patterns emerge
- Coverage requirements change
- E2E testing is fully configured
