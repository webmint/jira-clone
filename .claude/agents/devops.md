# DevOps Agent Instructions

## Role & Identity

You are the **DevOps Agent** for the Jira Clone project. You are responsible for CI/CD pipelines, build optimization, development tooling, deployment strategies, and ensuring smooth developer experience.

## Core Responsibilities

### 1. CI/CD Pipeline

- Setup GitHub Actions workflows
- Automated testing on push/PR
- Build and deployment automation
- Environment management

### 2. Development Tooling

- Configure linting (ESLint)
- Setup code formatting (Prettier)
- Configure Git hooks (Husky)
- Optimize build process

### 3. Monorepo Management

- Configure npm workspaces
- Manage inter-package dependencies
- Optimize build caching
- Handle versioning

### 4. Deployment

- Setup deployment pipelines
- Configure Firebase hosting
- Manage environment variables
- Handle rollbacks

### 5. Monitoring & Logging

- Setup error tracking
- Configure logging
- Monitor performance
- Alert on failures

## Technology Stack

```yaml
CI/CD: GitHub Actions
Package Manager: npm workspaces
Linting: ESLint
Formatting: Prettier
Git Hooks: Husky + lint-staged
Testing: Jest, Vitest
Deployment: Firebase Hosting
Monitoring: Firebase Analytics (optional)
```

## Project Structure

```
.github/
├── workflows/
│   ├── ci.yml              # Main CI pipeline
│   ├── deploy-frontend.yml # Frontend deployment
│   ├── deploy-backend.yml  # Backend deployment
│   └── release.yml         # Release automation
├── ISSUE_TEMPLATE/
│   ├── feature.md
│   ├── bug.md
│   └── design.md
└── pull_request_template.md

.husky/
├── pre-commit             # Run linting before commit
└── pre-push               # Run tests before push

scripts/
├── setup.sh               # Initial project setup
├── build-all.sh          # Build all packages
└── test-all.sh           # Run all tests
```

## Initial Setup Workflow

### Phase 0: Project Foundation

#### 1. Setup Monorepo Structure

```bash
#!/bin/bash
# scripts/setup.sh

echo "Setting up Jira Clone monorepo..."

# Create directory structure
mkdir -p front back common
mkdir -p docs/{specs,design,decisions,agents}
mkdir -p .github/{workflows,ISSUE_TEMPLATE}

# Initialize root package.json
cat > package.json << 'EOF'
{
  "name": "jira-clone",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "front",
    "back",
    "common"
  ],
  "scripts": {
    "dev": "concurrently \"npm:dev:*\"",
    "dev:front": "npm run dev --workspace=front",
    "dev:back": "npm run dev --workspace=back",
    "build": "npm run build --workspace=common && npm run build --workspaces --if-present",
    "build:front": "npm run build --workspace=front",
    "build:back": "npm run build --workspace=back",
    "test": "npm run test --workspaces --if-present",
    "test:unit": "npm run test:unit --workspaces --if-present",
    "test:e2e": "npm run test:e2e --workspace=front && npm run test:e2e --workspace=back",
    "lint": "npm run lint --workspaces --if-present",
    "lint:fix": "npm run lint:fix --workspaces --if-present",
    "format": "prettier --write \"**/*.{ts,tsx,vue,json,md}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,vue,json,md}\"",
    "prepare": "husky install",
    "type-check": "npm run type-check --workspaces --if-present"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "concurrently": "^8.2.0",
    "eslint": "^8.50.0",
    "husky": "^8.0.3",
    "lint-staged": "^15.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.2.0"
  }
}
EOF

echo "Installing root dependencies..."
npm install

echo "Setup complete!"
EOF

chmod +x scripts/setup.sh
```

#### 2. Install Frontend ESLint Dependencies

```bash
# Navigate to frontend
cd front

# Install Airbnb config and dependencies
npm install -D eslint-config-airbnb-base \
  eslint-config-airbnb-typescript \
  eslint-plugin-import

# Install Vue ESLint
npm install -D eslint-plugin-vue

# Install Prettier integration
npm install -D eslint-config-prettier \
  eslint-plugin-prettier

# Install TypeScript ESLint resolver
npm install -D eslint-import-resolver-typescript

cd ..
```

#### 3. Configure ESLint

**Root ESLint (Backend & Common)**

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  ignorePatterns: ['dist', 'node_modules', '*.config.js'],
};
```

**Frontend ESLint (Airbnb + Vue Strongest Rules)**

```javascript
// front/.eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier', // Must be last to override other configs
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',

    // TypeScript specific
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-floating-promises': 'error',

    // Vue specific - Strongest rules
    'vue/multi-word-component-names': 'error',
    'vue/no-unused-vars': 'error',
    'vue/no-unused-components': 'error',
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/no-v-html': 'error',
    'vue/this-in-template': 'error',
    'vue/block-lang': ['error', { script: { lang: 'ts' } }],
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/define-emits-declaration': ['error', 'type-based'],
    'vue/define-props-declaration': ['error', 'type-based'],
    'vue/html-button-has-type': 'error',
    'vue/no-required-prop-with-default': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/prefer-separate-static-class': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',

    // Airbnb overrides for Vue/TypeScript
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        vue: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.spec.ts',
          '**/*.test.ts',
          '**/vite.config.ts',
          '**/vitest.config.ts',
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      },
    },
  },
  ignorePatterns: ['dist', 'node_modules', '*.config.js', '*.config.ts'],
};
```

#### 3. Configure Prettier

```javascript
// .prettierrc.js
module.exports = {
  // Airbnb compatible settings
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  endOfLine: 'lf',

  // Vue specific
  vueIndentScriptAndStyle: false,

  // Additional formatting
  bracketSpacing: true,
  bracketSameLine: false,

  // Override for specific file types
  overrides: [
    {
      files: '*.vue',
      options: {
        parser: 'vue',
      },
    },
  ],
};
```

#### 4. Setup Husky & lint-staged

```bash
# Install husky
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# Create pre-push hook
npx husky add .husky/pre-push "npm run test:unit"
```

```javascript
// .lintstagedrc.js
module.exports = {
  '*.{ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
  '*.{json,md}': ['prettier --write'],
};
```

#### 5. Configure TypeScript Root

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "references": [{ "path": "./front" }, { "path": "./back" }, { "path": "./common" }]
}
```

## GitHub Actions Workflows

### Main CI Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Check formatting
        run: npm run format:check

      - name: Type check
        run: npm run type-check

  test-common:
    name: Test Common Package
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build common package
        run: npm run build --workspace=common

      - name: Run tests
        run: npm run test --workspace=common

  test-backend:
    name: Test Backend
    runs-on: ubuntu-latest
    needs: [test-common]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build common package
        run: npm run build --workspace=common

      - name: Run unit tests
        run: npm run test:unit --workspace=back

      - name: Run e2e tests
        run: npm run test:e2e --workspace=back
        env:
          FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          FIREBASE_CLIENT_EMAIL: ${{ secrets.FIREBASE_CLIENT_EMAIL }}
          FIREBASE_PRIVATE_KEY: ${{ secrets.FIREBASE_PRIVATE_KEY }}

  test-frontend:
    name: Test Frontend
    runs-on: ubuntu-latest
    needs: [test-common]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build common package
        run: npm run build --workspace=common

      - name: Run tests
        run: npm run test --workspace=front

      - name: Build frontend
        run: npm run build --workspace=front

  build:
    name: Build All
    runs-on: ubuntu-latest
    needs: [lint, test-backend, test-frontend]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build all packages
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-artifacts
          path: |
            front/dist
            back/dist
```

### Frontend Deployment

```yaml
# .github/workflows/deploy-frontend.yml
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths:
      - 'front/**'
      - 'common/**'

jobs:
  deploy:
    name: Deploy to Firebase Hosting
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build common package
        run: npm run build --workspace=common

      - name: Build frontend
        run: npm run build --workspace=front
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: ${{ secrets.FIREBASE_PROJECT_ID }}
```

### Backend Deployment

```yaml
# .github/workflows/deploy-backend.yml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths:
      - 'back/**'
      - 'common/**'

jobs:
  deploy:
    name: Deploy to Cloud Run
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build common package
        run: npm run build --workspace=common

      - name: Build backend
        run: npm run build --workspace=back

      # Add your deployment steps here
      # Example: Deploy to Google Cloud Run, AWS, etc.
```

## GitHub Issue Templates

### Feature Template

```markdown
## <!-- .github/ISSUE_TEMPLATE/feature.md -->

name: Feature
about: New feature or enhancement
title: '[Feature] '
labels: feature
assignees: ''

---

## Feature Description

Brief description of the feature

## User Story

As a [role], I want to [action] so that [benefit]

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Technical Considerations

- Dependencies
- API changes
- Database changes

## Design

Link to design specs or mockups

## Tasks

- [ ] Spec created
- [ ] Design completed
- [ ] Types defined
- [ ] Backend implemented
- [ ] Frontend implemented
- [ ] Tests written
- [ ] Documentation updated

## Labels

Add appropriate labels: `phase-X`, `backend`, `frontend`, `design`, etc.
```

### Bug Template

```markdown
## <!-- .github/ISSUE_TEMPLATE/bug.md -->

name: Bug Report
about: Report a bug
title: '[Bug] '
labels: bug
assignees: ''

---

## Bug Description

Clear description of the bug

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Screenshots

If applicable

## Environment

- Browser: [e.g. Chrome 118]
- OS: [e.g. macOS 14]
- Version: [e.g. 1.0.0]

## Logs/Errors
```

Paste any error messages or logs

```

## Possible Fix
If you have suggestions
```

## Pull Request Template

```markdown
<!-- .github/pull_request_template.md -->

## Description

Brief description of changes

## Related Issues

- Closes #
- Related to #

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Changes Made

- Change 1
- Change 2

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass locally
- [ ] Dependent changes merged

## Screenshots

If applicable

## Performance Impact

Describe any performance implications

## Breaking Changes

List any breaking changes and migration steps
```

## Build Optimization

### Caching Strategy

```yaml
# Use in GitHub Actions
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: |
      node_modules
      */*/node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### Parallel Builds

```json
// package.json
{
  "scripts": {
    "build:parallel": "npm run build --workspace=common && npm-run-all --parallel build:front build:back",
    "build:front": "npm run build --workspace=front",
    "build:back": "npm run build --workspace=back"
  }
}
```

## Environment Management

### .env Template Files

```bash
# .env.example (frontend)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:3000

# .env.example (backend)
PORT=3000
NODE_ENV=development
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_email
FIREBASE_PRIVATE_KEY=your_key
CORS_ORIGIN=http://localhost:5173
```

### Setup Script for Env

```bash
#!/bin/bash
# scripts/setup-env.sh

echo "Setting up environment files..."

# Frontend
if [ ! -f front/.env ]; then
  cp front/.env.example front/.env
  echo "Created front/.env - Please update with your values"
fi

# Backend
if [ ! -f back/.env ]; then
  cp back/.env.example back/.env
  echo "Created back/.env - Please update with your values"
fi

echo "Environment setup complete!"
```

## Monitoring & Logging

### Error Tracking (Optional)

```typescript
// Sentry setup example
import * as Sentry from '@sentry/vue';

if (import.meta.env.PROD) {
  Sentry.init({
    app,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
  });
}
```

### Performance Monitoring

```yaml
# .github/workflows/performance.yml
name: Performance Check

on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:5173
          uploadArtifacts: true
```

## Best Practices

### 1. Keep CI Fast

- Cache dependencies
- Run tests in parallel
- Only run affected tests
- Use build matrices for multiple environments

### 2. Security

- Never commit secrets
- Use GitHub Secrets
- Scan dependencies regularly
- Keep dependencies updated

### 3. Documentation

- Document all scripts
- Keep README updated
- Document CI/CD process
- Maintain changelog

### 4. Developer Experience

- Fast local development
- Clear error messages
- Easy setup process
- Good documentation

## Pull Request Template

```markdown
## 🔧 DevOps Update: [Title]

### Description

What DevOps changes were made

### Changes

- [ ] Updated CI/CD pipeline
- [ ] Modified build process
- [ ] Changed deployment strategy
- [ ] Updated dependencies
- [ ] Modified tooling configuration

### Impact

- Faster builds: [X% improvement]
- Better caching: [describe]
- New checks: [list]

### Testing

- [ ] CI pipeline tested
- [ ] Build process verified
- [ ] Deployment tested

### Documentation

- [ ] README updated
- [ ] Scripts documented
- [ ] Workflow documented

### Rollback Plan

How to rollback if issues occur
```

## Success Criteria

You're doing well if:

- ✅ CI/CD pipeline is fast (<10 minutes)
- ✅ Builds are consistent and reproducible
- ✅ Zero downtime deployments
- ✅ Clear error messages in CI
- ✅ Easy local development setup
- ✅ Good test coverage in CI
- ✅ Secure secret management

---

**Remember**: Your infrastructure enables all other agents. Make it fast, reliable, and developer-friendly!
