# Contributing to Jira Clone

Welcome! This guide will help you get started contributing to the Jira Clone project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (LTS version)
- **npm** (comes with Node.js)
- **Git**
- **GitHub CLI** (`gh`) - for PR and issue management
- **Code Editor** - VS Code recommended with extensions:
  - Vue Language Features (Volar)
  - TypeScript Vue Plugin
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense

## Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/[org]/jira-clone.git
cd jira-clone
```

### 2. Install Dependencies

This is a monorepo with npm workspaces in the `packages/` directory:

```bash
npm install
```

This installs dependencies for all workspaces (`packages/front`, `packages/back`, `packages/common`).

### 3. Set Up Environment Variables

#### Backend Environment

Create `packages/back/.env`:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Server Configuration
PORT=3000
NODE_ENV=development
```

#### Frontend Environment

Create `packages/front/.env`:

```env
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
```

### 4. Run Development Servers

#### Frontend (Vue 3 + Vite)

```bash
npm run dev --workspace=packages/front
# or
cd packages/front && npm run dev
```

Access at: `http://localhost:5173`

#### Backend (NestJS)

```bash
npm run dev --workspace=packages/back
# or
cd packages/back && npm run dev
```

Access at: `http://localhost:3000`

#### Storybook (Component Development)

```bash
npm run storybook --workspace=packages/front
# or
cd packages/front && npm run storybook
```

Access at: `http://localhost:6006`

## Project Structure

```
jira-clone/
├── packages/           # Monorepo workspaces
│   ├── front/          # Vue 3 frontend
│   ├── back/           # NestJS backend
│   └── common/         # Shared TypeScript types
├── .specify/           # Specifications and governance
│   ├── memory/         # Constitution and workflow
│   ├── specs/          # Feature specifications
│   └── templates/      # Reusable templates
└── docs/               # Project documentation
```

## Development Workflow

**IMPORTANT**: All development MUST follow the specification-first process defined in:
- **Constitution**: [`.specify/memory/constitution.md`](../.specify/memory/constitution.md)
- **Workflow**: [`.specify/memory/workflow.md`](../.specify/memory/workflow.md)

### Quick Workflow Summary

1. **Create Specification**: Use `/specify` command
2. **Get Approval**: User reviews and approves spec
3. **Create Plan**: Use `/plan` command
4. **Get Approval**: User reviews and approves plan
5. **Generate Tasks**: Use `/tasks` command
6. **Get Approval**: User reviews and approves tasks
7. **Implement**: Work through tasks sequentially
8. **Create PRs**: One PR per task, merge to spec branch
9. **Final PR**: Merge spec branch to main after all tasks complete

### Branch Naming Convention

**MANDATORY** format:

```
spec/###-feature-name                    # Spec/Feature branch
spec/###-feature-name/T###-task-name     # Task sub-branch
```

**Examples**:
- `spec/001-user-authentication`
- `spec/001-user-authentication/T014-auth-endpoints`

## Code Standards

### Quality Gates (MUST PASS)

All code must pass these checks before merge:

- ✅ **ESLint**: 0 errors, 0 warnings
- ✅ **TypeScript**: 0 compilation errors
- ✅ **Tests**: All tests passing
- ✅ **Coverage**: Backend >85%, Frontend >80%, Common >90%
- ✅ **Build**: Successful build
- ✅ **Accessibility**: WCAG 2.1 AA compliant

### Run Quality Checks

```bash
# Lint all workspaces
npm run lint

# Type check
npm run type-check --workspace=packages/front
npm run type-check --workspace=packages/back

# Run tests
npm test --workspace=packages/front
npm test --workspace=packages/back

# Build
npm run build
```

### Naming Conventions

- **Files**: camelCase (e.g., `userService.ts`, `authHelpers.ts`)
- **Vue Components**: PascalCase (e.g., `UserCard.vue`, `LoginForm.vue`)
- **Functions/Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase
- **Database Collections**: camelCase

Full conventions: [Constitution Article IV, Section 4.3](../.specify/memory/constitution.md#section-43-naming-conventions-enforced)

## Testing

### Running Tests

```bash
# Frontend tests (Vitest)
cd packages/front && npm test

# Backend tests (Jest)
cd packages/back && npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### Test-Driven Development (TDD)

**MANDATORY** workflow:
1. Write failing test (RED)
2. Write minimal code to pass (GREEN)
3. Refactor for quality (REFACTOR)

### Test Requirements

- **Unit tests**: For all business logic
- **Integration tests**: For API endpoints and services
- **Component tests**: For all Vue components
- **Accessibility tests**: For UI components

## Submitting Changes

### Before Creating a PR

1. ✅ All quality gates pass
2. ✅ User approval received (MANDATORY)
3. ✅ Commits follow conventional commit format
4. ✅ PR follows template format

### Commit Message Format

```
type: brief description

Detailed explanation if needed

Refs #[task-issue-number]
```

**Types**: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

**Example**:
```
feat: implement user authentication endpoints

Added Firebase Auth integration, JWT token handling,
and refresh token mechanism.

Refs #14
```

### Creating Pull Requests

```bash
# Create PR following template
gh pr create \
  --base spec/###-feature-name \
  --head spec/###-feature-name/T###-task-name \
  --title "[T###] Task description" \
  --body-file .github/pull_request_template.md
```

**MANDATORY**: PR description must include `Closes #[issue-number]`

### PR Review Process

1. **pr-reviewer agent** performs automated code review
2. User reviews agent findings
3. User approves PR (MANDATORY)
4. PR merges to spec branch

## Getting Help

- **Questions about workflow**: See [`.specify/memory/workflow.md`](../.specify/memory/workflow.md)
- **Questions about standards**: See [`.specify/memory/constitution.md`](../.specify/memory/constitution.md)
- **Questions about architecture**: See [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md)
- **Questions about testing**: See [`docs/TESTING.md`](./TESTING.md)

## Common Commands Reference

```bash
# Development
npm run dev --workspace=packages/front       # Start frontend dev server
npm run dev --workspace=packages/back        # Start backend dev server
npm run storybook --workspace=packages/front # Start Storybook

# Testing
npm test                                     # Run all tests
npm test --workspace=packages/front          # Run frontend tests
npm test --workspace=packages/back           # Run backend tests

# Linting & Type Checking
npm run lint                                 # Lint all workspaces
npm run type-check --workspace=packages/front

# Building
npm run build                                # Build all workspaces
npm run build --workspace=packages/front     # Build frontend only
npm run build --workspace=packages/back      # Build backend only
```

## Code Review Checklist

When reviewing code, check:

- [ ] Follows naming conventions
- [ ] Has appropriate tests
- [ ] TypeScript strict mode compliant
- [ ] ESLint passing (0 errors/warnings)
- [ ] Accessibility requirements met (for UI)
- [ ] Design system compliance (for UI)
- [ ] Security best practices followed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)

---

**Thank you for contributing!** Your adherence to these standards helps maintain code quality and project consistency.
