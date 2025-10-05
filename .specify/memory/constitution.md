<!--
Sync Impact Report:
Version: 1.0.0 → 2.0.0 (MAJOR - merged two constitutions with expanded governance)
Modified Principles:
  - I. Code Quality & Maintainability → Enhanced with specific tooling (ESLint, Airbnb style)
  - II. Testing Discipline → Added specific coverage targets per workspace
  - III. User Experience Consistency → Expanded with design system authority
  - IV. Performance & Scalability → Added specific performance budgets
Added Sections:
  - Development Workflow (agent responsibilities, decision-making)
  - Technical Standards (immutable tech stack, naming conventions)
  - Design System (authority and component library standards)
  - Security Standards (authentication, validation, practices)
  - Documentation Standards (code and project documentation)
  - Continuous Integration (CI/CD requirements)
  - Communication Protocols (agent handoffs, issue/PR communication)
  - Violation Handling (severity levels and response)
  - Constitution Amendments (amendment process)
Templates Status:
  ✅ plan-template.md - Updated Constitution Check section (pending)
  ✅ spec-template.md - Aligns with specification-first workflow
  ✅ tasks-template.md - Supports agent-based task organization
  ⚠️  Agent-specific files - May need agent responsibility documentation
Follow-up TODOs:
  - Consider creating agent-specific guidance files referenced in Article III
  - Establish quarterly review schedule for constitution
-->

# Jira Clone Project Constitution

**Version**: 2.0.0
**Ratified**: 2025-10-04
**Last Amended**: 2025-10-04
**Status**: Active

---

## Preamble

This constitution establishes the foundational principles, standards, and governance model for the Jira Clone project. All contributors, whether human developers or AI agents, must adhere to these principles to ensure consistency, quality, and maintainability throughout the project lifecycle.

**Project Vision**: We build a professional, accessible, and maintainable project management tool that demonstrates excellence in modern web development practices.

---

## Article I: Core Principles

### Section 1.1: Fundamental Values

**1. Quality Over Speed**

- We prioritize correctness and maintainability over rapid delivery
- Technical debt is minimized through proper planning and implementation
- Code is written once but read many times

**2. Specification-First Development** (NON-NEGOTIABLE)

- No code is written without a specification
- All features must have written requirements before implementation
- Architecture decisions are documented in ADRs (Architecture Decision Records)
- Workflow: `Idea → Specification → Design → Implementation → Testing → Review → Merge`

**3. Consistency is Paramount**

- Design system rules are absolute
- Code style is enforced, not suggested
- Patterns established must be followed

**4. Accessibility is Non-Negotiable**

- WCAG 2.1 AA compliance is mandatory for all features
- Keyboard navigation must work everywhere
- Screen readers must be supported
- Color contrast ratio ≥ 4.5:1

**5. Security by Design**

- Security is considered from the start, not added later
- Input validation is mandatory on both client and server
- Authentication and authorization are never optional
- Security issues are P0 and block all other work

**6. Testability is Required**

- All code must be testable
- Critical paths require 100% test coverage
- Tests are maintained with the same care as production code

---

## Article II: Code Quality Standards (NON-NEGOTIABLE)

### Section 2.1: Frontend Code Quality

**ABSOLUTE REQUIREMENTS:**

1. **ESLint Compliance**
   - ZERO ESLint errors permitted in any PR
   - Airbnb TypeScript style guide is law
   - Vue 3 recommended rules are mandatory
   - Prettier formatting enforced via pre-commit hooks

2. **TypeScript Strict Mode**
   - Strict mode enabled in all projects
   - No `any` types without explicit justification in code comments
   - All functions must have proper type annotations
   - Strict null checks enabled
   - No type assertions without documented reason

3. **Vue 3 Standards**
   - Always use `<script setup lang="ts">`
   - Type-based props and emits only
   - Multi-word component names (PascalCase)
   - No `v-html` without security review
   - Composition API preferred over Options API

### Section 2.2: Backend Code Quality

**ABSOLUTE REQUIREMENTS:**

1. **NestJS Best Practices**
   - Dependency injection everywhere
   - Proper module organization
   - DTOs (Data Transfer Objects) for all endpoints
   - Validation pipes required
   - Service layer abstracts data access

2. **Firebase Integration**
   - No direct Firestore calls in controllers
   - Service layer abstracts Firebase
   - Transactions for multi-document operations
   - Security rules reviewed before production

### Section 2.3: Common Package Standards

1. **Type Safety**
   - All shared types documented with JSDoc
   - Zod schemas for runtime validation
   - No circular dependencies
   - Proper exports in index.ts

2. **Documentation**
   - Public APIs must have JSDoc/TSDoc comments
   - Complex algorithms must be explained
   - Business logic must include rationale

### Section 2.4: Quality Gates (MANDATORY)

**All code must pass these gates before merge:**

- ✅ **ESLint**: 0 errors, 0 warnings
- ✅ **TypeScript**: 0 compilation errors
- ✅ **Tests**: All tests passing
- ✅ **Coverage**: Backend >85%, Frontend >80%, Common >90%, Critical paths 100%
- ✅ **Build**: Successful build completion
- ✅ **Design Review**: Compliant with design system
- ✅ **Accessibility**: WCAG 2.1 AA compliant
- ✅ **Performance**: No regressions >5%
- ✅ **Security**: No high/critical vulnerabilities
- ✅ **Code Review**: At least 1 approval, all conversations resolved

**Any PR failing these gates will be rejected.**

---

## Article III: Development Workflow

### Section 3.1: Specification-First Process

**Mandatory Workflow (NO STAGE MAY BE SKIPPED):**

```
Idea → Specification → Design → Implementation → Testing → Review → Merge
```

**Specification Requirements:**

1. Load or create feature spec in `.specify/specs/[###-feature-name]/spec.md`
2. All ambiguities marked with `[NEEDS CLARIFICATION]`
3. All requirements must be testable
4. User scenarios defined with acceptance criteria

### Section 3.2: Agent Responsibilities

**Architecture Agent** (Final Authority on Technical Decisions)

- Creates specifications for all features
- Makes final decisions on technical approach
- Reviews all PRs for architectural compliance
- **Authority**: Can reject any PR for architectural reasons

**Design Agent** (Final Authority on UI/UX)

- Creates and maintains design system
- Approves all UI/UX implementations
- **Authority**: Can reject any PR for design violations

**Common Agent** (Guardian of Type Contracts)

- Maintains type contracts in `common/` workspace
- **Authority**: Can reject breaking changes without migration plan

**Backend Agent** (API Implementation)

- Implements API contracts exactly as specified
- **Authority**: Cannot change API contracts without Architecture Agent approval

**Frontend Agent** (UI Implementation)

- Implements designs exactly as specified
- **Authority**: Cannot deviate from design system without Design Agent approval

**DevOps Agent** (Build and Deployment)

- Maintains build and deployment systems
- **Authority**: Can block merges if CI/CD is broken

**Testing Agent** (Quality Assurance)

- Defines test requirements
- **Authority**: Can reject PRs with insufficient tests

### Section 3.3: Decision-Making Hierarchy

**Level 1: Individual Agent Decisions** (No approval needed)

- Implementation details within agent's domain
- Variable naming, internal structure
- Micro-optimizations

**Level 2: Cross-Agent Decisions** (Architecture Agent approval required)

- API contract changes
- New dependencies
- Database schema changes
- Performance trade-offs

**Level 3: Project-Level Decisions** (Team consensus required)

- Technology stack changes
- Major architectural shifts
- Breaking changes to public APIs
- Constitution amendments

### Section 3.4: Issue and PR Protocol

**Every Issue Must Have:**

- Clear description
- Acceptance criteria
- Assigned agent
- Proper labels (feature/bug/tech-debt/docs)
- Linked to epic/milestone

**Every PR Must Have:**

- Reference to issue number
- Description of changes and rationale
- Test evidence (screenshots of passing tests)
- Screenshots (for UI changes)
- Agent checklist completed
- Breaking changes documented (if any)

**PR Review Requirements:**

- Minimum 1 approval
- Architecture Agent approval for cross-cutting changes
- Design Agent approval for UI changes
- All CI checks passing (green build mandatory)
- No unresolved conversations

---

## Article IV: Technical Standards

### Section 4.1: Technology Stack (IMMUTABLE)

**Approved Technologies:**

- **Frontend**: Vue 3, TypeScript, Vite, Pinia, Tailwind CSS
- **Backend**: NestJS, TypeScript, Firebase (Auth, Firestore)
- **Common**: TypeScript, Zod
- **Testing**: Vitest (frontend), Jest (backend), Vue Test Utils, Playwright (E2E)
- **Tooling**: ESLint, Prettier, Husky (git hooks)
- **CI/CD**: GitHub Actions

**Changes to this stack require constitution amendment (Article XIV).**

### Section 4.2: Project Structure (STANDARDIZED)

```
jira-clone/
├── front/          # Vue 3 application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   └── services/
│   └── tests/
├── back/           # NestJS API
│   ├── src/
│   │   ├── modules/
│   │   ├── models/
│   │   └── services/
│   └── tests/
├── common/         # Shared types
│   └── src/
│       └── types/
├── .specify/       # Specifications and templates
│   ├── specs/
│   ├── templates/
│   └── memory/
└── docs/           # Documentation
    ├── design/
    └── adr/
```

**No additional top-level directories without Architecture Agent approval.**

### Section 4.3: Naming Conventions (ENFORCED)

- **Files**: kebab-case (`user-card.vue`, `auth-service.ts`)
- **Components**: PascalCase (`UserCard`, `IssueList`)
- **Functions/Variables**: camelCase (`getUserData`, `isLoggedIn`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`UserProfile`, `ApiResponse`)
- **Enums**: PascalCase with UPPER_CASE values (`Status.IN_PROGRESS`)
- **Database Collections**: snake_case (`user_profiles`, `issue_comments`)

### Section 4.4: Git Standards

**Branch Naming:**

```
agent/[agent-name]/[feature-name]
```

Examples:

- `agent/backend/auth-endpoints`
- `agent/frontend/login-page`
- `agent/design/component-library`

**Commit Messages (Conventional Commits):**

```
[Agent] type: brief description

Detailed explanation if needed

Closes #[issue-number]
```

Examples:

```
[Backend] feat: implement user authentication endpoints

Added Firebase Auth integration, JWT token handling,
and refresh token mechanism.

Closes #8
```

**Commit Types**: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

---

## Article V: Design System

### Section 5.1: Design System Authority

The Design System documented in `docs/design/DESIGN_SYSTEM.md` is **authoritative and absolute**.

**Design System Rules (NON-NEGOTIABLE):**

1. All colors MUST come from the defined palette
2. All spacing MUST use the defined scale (Tailwind spacing)
3. All typography MUST follow the defined scale
4. No custom CSS without Design Agent approval
5. Tailwind utility classes only (no arbitrary values without justification)
6. All UI components MUST use the shared component library

### Section 5.2: Component Library Standards

**Component Requirements:**

1. All components documented in `docs/design/COMPONENTS.md`
2. New components require Design Agent specification
3. Component props must be minimal and well-typed
4. No prop drilling beyond 2 levels (use composition or provide/inject)
5. Composition over configuration
6. Multi-word component names (PascalCase)

### Section 5.3: Responsive Design (STANDARD BREAKPOINTS)

**Breakpoints (Mobile-First):**

- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

**Additional Tailwind Breakpoints:**

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

**Mobile-first approach is mandatory.**

---

## Article VI: Testing Standards

### Section 6.1: Test-Driven Development (NON-NEGOTIABLE)

**TDD Workflow (MANDATORY):**

1. Write test that fails (RED)
2. Get user approval on test scenarios
3. Write minimal code to pass test (GREEN)
4. Refactor for quality (REFACTOR)

**Tests MUST be written before implementation code.**

### Section 6.2: Test Coverage Requirements

**Minimum Coverage (Blocks merge if not met):**

- **Backend**: 85% line coverage
- **Frontend**: 80% line coverage
- **Common**: 90% line coverage
- **Critical paths**: 100% coverage (authentication, data mutations, payments)

### Section 6.3: Test Categories (ALL REQUIRED)

**Backend Tests:**

- **Contract Tests**: API request/response schemas, database models
- **Integration Tests**: Service-to-service communication, database interactions
- **Unit Tests**: Business logic, utilities, transformations
- **E2E Tests**: Full user journeys (create issue, update status, assign user)

**Frontend Tests:**

- **Component Tests**: All Vue components (render, props, emits, slots)
- **Store Tests**: All Pinia stores (actions, getters, state mutations)
- **Integration Tests**: API service interactions
- **Accessibility Tests**: Keyboard navigation, screen readers, ARIA

### Section 6.4: Test Quality Standards

**All tests must:**

- Test behavior, not implementation details
- Be independent and isolated (no shared state)
- Have clear, descriptive names (`test('user can login with valid credentials')`)
- Follow AAA pattern (Arrange, Act, Assert)
- Run in under 5 minutes total (suite execution time)
- Use proper mocking for external dependencies
- Clean up after themselves (no side effects)

**Flaky tests MUST be fixed immediately or removed.**

---

## Article VII: Performance Standards

### Section 7.1: Performance Budgets (ENFORCED)

**Frontend Performance:**

- **Initial page load**: < 3 seconds (3G network)
- **Time to Interactive**: < 1 second (desktop), < 5 seconds (mobile)
- **Lighthouse score**: > 90 (Performance, Accessibility, Best Practices)
- **Bundle size**: < 200KB gzipped for initial load, < 500KB total
- **UI interactions**: < 16ms frame time (60 fps)

**Backend Performance:**

- **API response time**: < 200ms p95 (simple queries), < 500ms p95 (complex aggregations)
- **Database queries**: < 100ms average
- **File uploads**: Support up to 10MB, < 2s processing time

**Performance regressions >5% block merge.**

### Section 7.2: Optimization Requirements

**Frontend Optimizations (MANDATORY):**

1. Code splitting for routes (lazy loading)
2. Lazy loading for heavy components (modals, editors)
3. Image optimization (WebP format, responsive images)
4. Debouncing for search inputs (300ms minimum)
5. Virtual scrolling for long lists (>100 items)

**Backend Optimizations (MANDATORY):**

1. Database indexes on all queried fields
2. Pagination for list endpoints (max 100 items per page)
3. Caching where appropriate (Redis for session data)
4. Batch operations for bulk updates
5. N+1 query prevention (eager loading, DataLoader pattern)

### Section 7.3: Monitoring Requirements

**Application MUST:**

- Log performance metrics to monitoring service
- Alert on p95 degradation >20%
- Track Core Web Vitals (LCP, FID, CLS)
- Monitor bundle size in CI

---

## Article VIII: Security Standards

### Section 8.1: Authentication & Authorization (NON-NEGOTIABLE)

**Requirements:**

1. Firebase Auth for all authentication
2. JWT tokens with 24-hour expiration
3. Refresh token mechanism implemented
4. Authorization checks on all protected routes (backend)
5. Route guards on all protected pages (frontend)
6. Role-based access control (RBAC) enforced

### Section 8.2: Data Validation (MANDATORY)

**Input Validation (Defense in Depth):**

1. **Backend**: class-validator on all DTOs (NestJS validation pipes)
2. **Frontend**: VeeValidate + Zod on all forms
3. **Common**: Zod schemas for shared validation logic
4. **Principle**: Never trust client input; always validate on server

### Section 8.3: Security Practices (ABSOLUTE REQUIREMENTS)

**Prohibited:**

- ❌ Secrets in code (use environment variables)
- ❌ Hardcoded credentials
- ❌ SQL injection vulnerabilities (use Firebase/ORM properly)
- ❌ XSS vulnerabilities (no `v-html` without sanitization)
- ❌ Disabling security features

**Mandatory:**

- ✅ HTTPS in production
- ✅ CORS properly configured (whitelist origins)
- ✅ Rate limiting on APIs (prevent abuse)
- ✅ Input sanitization (strip HTML tags)
- ✅ Secure session management
- ✅ Password hashing (bcrypt/argon2 via Firebase Auth)
- ✅ Security headers (CSP, X-Frame-Options, etc.)
- ✅ Regular dependency audits (`npm audit`)

**Security issues are P0 and block all other work.**

---

## Article IX: Accessibility Standards

### Section 9.1: WCAG 2.1 AA Compliance (NON-NEGOTIABLE)

**Mandatory Requirements:**

1. **Color Contrast**: Ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text
2. **Keyboard Navigation**: All interactive elements keyboard accessible (tab, enter, escape)
3. **Focus Indicators**: Visible focus indicators on all focusable elements
4. **ARIA Labels**: Proper ARIA labels where semantic HTML insufficient
5. **Semantic HTML**: Use correct elements (`<button>` not `<div onclick>`)
6. **Screen Reader Support**: All content and functionality accessible via screen reader
7. **Responsive Text**: Text resizable up to 200% without loss of functionality

### Section 9.2: Accessibility Testing (REQUIRED)

**Tests Required:**

1. Automated testing with axe-core (in component tests)
2. Keyboard navigation testing for all features
3. Screen reader testing on key flows (NVDA/JAWS on Windows, VoiceOver on Mac/iOS)
4. Color contrast verification (automated + manual spot checks)
5. Focus management verification (modals, route changes)

**Accessibility violations block merge.**

### Section 9.3: Accessibility Checklist

**Every UI component must:**

- [ ] Work with keyboard only
- [ ] Have visible focus indicators
- [ ] Have proper ARIA labels/roles
- [ ] Pass automated accessibility tests
- [ ] Be tested with screen reader
- [ ] Meet color contrast requirements

---

## Article X: Documentation Standards

### Section 10.1: Required Documentation

**Code Documentation (MANDATORY):**

1. JSDoc/TSDoc for all public functions and classes
2. README in each workspace (`front/`, `back/`, `common/`)
3. API documentation (OpenAPI/Swagger for backend)
4. Component documentation (props, events, slots, usage examples)

**Project Documentation (MANDATORY):**

1. **Architecture Decision Records (ADRs)**: Document all major decisions in `docs/adr/`
2. **Feature Specifications**: In `.specify/specs/[###-feature-name]/spec.md`
3. **Design Specifications**: In `docs/design/` (design system, components)
4. **Deployment Guides**: In `docs/deployment/`
5. **Onboarding Guide**: For new contributors

### Section 10.2: Documentation Updates

**Documentation MUST be updated when:**

- APIs change (update OpenAPI spec)
- Features are added (update README, specs)
- Architectural decisions are made (create ADR)
- Deployment process changes (update deployment guide)
- Dependencies change (update README)

**Outdated documentation is a bug (P2 severity).**

### Section 10.3: ADR Format

**Architecture Decision Records must include:**

1. **Title**: Short descriptive name
2. **Status**: Proposed/Accepted/Deprecated/Superseded
3. **Context**: Problem statement and constraints
4. **Decision**: What was decided
5. **Consequences**: Trade-offs and implications
6. **Alternatives Considered**: What else was evaluated

---

## Article XI: Continuous Integration

### Section 11.1: CI Pipeline Requirements (MANDATORY)

**All PRs must pass (green build mandatory):**

1. **Linting**: ESLint, Prettier (0 errors, 0 warnings)
2. **Type Checking**: TypeScript compilation (0 errors)
3. **Unit Tests**: All unit tests passing
4. **Integration Tests**: All integration tests passing
5. **E2E Tests**: All E2E tests passing (on main branch merges)
6. **Build Process**: Successful build for all workspaces
7. **Security Scanning**: No high/critical vulnerabilities (`npm audit`, Snyk)
8. **Bundle Size Check**: No regressions beyond budget

**CI must complete in under 10 minutes.**

### Section 11.2: Deployment Requirements

**Pre-Deployment Checklist:**

- [ ] All tests pass in CI
- [ ] Code review approved
- [ ] No known security vulnerabilities
- [ ] Performance benchmarks pass
- [ ] Database migrations tested on staging
- [ ] Rollback plan documented
- [ ] Monitoring and alerting configured
- [ ] Changelog updated
- [ ] Version bumped (semantic versioning)

**Deployment Workflow:**

1. Merge to `main` triggers staging deployment
2. Automated smoke tests on staging
3. Manual approval for production deployment
4. Blue-green deployment to production
5. Post-deployment health checks

---

## Article XII: Communication Protocols

### Section 12.1: Agent Handoffs

**Handoff Document Requirements:**

1. Complete agent-specific checklist
2. All deliverables linked (files, PRs, issues)
3. Next steps clearly defined with acceptance criteria
4. Blockers documented with suggested resolutions
5. Open questions highlighted

### Section 12.2: Issue Communication

**Issue Update Requirements:**

- **In-Progress Issues**: Daily updates or status comment
- **Blocked Issues**: Immediately flag if stuck >4 hours, tag relevant agents
- **Completed Issues**: Close with summary of work done, link to PR

**Issue Labels (STANDARD):**

- Type: `feature`, `bug`, `tech-debt`, `docs`, `security`
- Priority: `P0-critical`, `P1-high`, `P2-medium`, `P3-low`
- Status: `backlog`, `in-progress`, `blocked`, `review`, `done`
- Agent: `agent:backend`, `agent:frontend`, `agent:design`, etc.

### Section 12.3: PR Communication

**PR Description Template (MANDATORY):**

```markdown
## What Changed

[Description of changes and why]

## How to Test

[Step-by-step testing instructions]

## Screenshots

[For UI changes - before/after if applicable]

## Checklist

- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] Accessibility verified
- [ ] Performance tested
```

---

## Article XIII: Violation Handling

### Section 13.1: Violation Severity Levels

**P0 - Critical (BLOCKS EVERYTHING)**

- Security vulnerabilities (high/critical)
- Production-breaking bugs
- Data loss risks
- Authentication/authorization failures

**P1 - High (BLOCKS MERGE)**

- ESLint errors
- TypeScript compilation errors
- Test failures
- Accessibility violations (WCAG AA)
- Design system violations
- Coverage below minimum

**P2 - Medium (MUST FIX IN SPRINT)**

- Missing tests for new code
- Incomplete documentation
- Performance issues (not regressions)
- Code duplication

**P3 - Low (SHOULD FIX)**

- Minor optimizations
- Style improvements
- Refactoring opportunities

### Section 13.2: Violation Response Protocol

**P0 Violations:**

1. Immediate stop of all work
2. Root cause analysis required (5 Whys)
3. Prevention plan documented
4. Incident report created
5. Constitution review if systemic

**P1 Violations:**

1. PR rejected immediately
2. Must be fixed before resubmission
3. No exceptions (Architecture Agent cannot override)

**P2/P3 Violations:**

1. Create follow-up issue with appropriate label
2. Schedule for current/next sprint
3. Document as technical debt in backlog

---

## Article XIV: Constitution Amendments

### Section 14.1: Amendment Process

**To Amend This Constitution:**

1. **Proposal**: Document proposed change with rationale in GitHub issue
2. **Discussion**: Team reviews and comments; minimum 48-hour review period
3. **Impact Analysis**: Assess effect on existing code, templates, workflows
4. **Approval**: Requires consensus from project maintainers
5. **Migration**: If existing code violates new rule, create migration plan before ratification
6. **Documentation**: Update constitution version, templates, agent guidance files

### Section 14.2: Versioning Policy

**Constitution uses semantic versioning (MAJOR.MINOR.PATCH):**

- **MAJOR**: Backward-incompatible changes (removing principle, changing NON-NEGOTIABLE rule)
- **MINOR**: New principles/sections added, material expansions
- **PATCH**: Clarifications, wording improvements, typo fixes

### Section 14.3: Living Document

This constitution is a **living document**. It should be reviewed and updated as the project evolves.

**Review Schedule:**

- **Quarterly**: Review all sections, update if needed
- **After Major Milestones**: Retrospective and lessons learned
- **When Problems Arise**: Immediate review of relevant sections

---

## Article XV: Enforcement & Authority

### Section 15.1: Contributor Responsibility

**All contributors are responsible for:**

- Reading and understanding this constitution
- Following all standards and processes
- Calling out violations when seen (respectfully)
- Proposing improvements via amendment process
- Maintaining quality culture

### Section 15.2: Final Authority

**Architecture Agent has final authority on:**

- Technical disputes
- Exception requests
- Constitutional interpretation
- Cross-agent conflicts

**No one may override (NON-NEGOTIABLE):**

- Security requirements
- Accessibility requirements (WCAG 2.1 AA)
- Quality gates (ESLint, tests, coverage)
- Test coverage minimums
- Specification-first workflow

### Section 15.3: Exception Process

**Justified exceptions to principles:**

1. Must be documented in `plan.md` Complexity Tracking table
2. Explain what simpler alternative was rejected and why
3. Include plan to refactor toward compliance when feasible
4. **Exceptions expire after 6 months**; must be re-justified or resolved
5. Architecture Agent approval required

---

## Appendix A: Quick Reference

### ✅ Non-Negotiables (ABSOLUTE REQUIREMENTS)

- **Code Quality**: ESLint 0 errors, TypeScript strict mode, 0 warnings
- **Testing**: All tests passing, coverage >80% (85% backend, 80% frontend, 90% common)
- **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation, screen reader support
- **Security**: No high/critical vulnerabilities, input validation, secure auth
- **Design**: Follow design system, no custom CSS without approval
- **Specification**: Required before any code is written
- **Performance**: <200ms API p95, <1s TTI, no regressions >5%

### ❌ Prohibited (NEVER ALLOWED)

- `any` types without justification
- Disabling ESLint rules
- Skipping tests or coverage
- Custom CSS without Design Agent approval
- Secrets/credentials in code
- Breaking changes without migration plan
- Merge without code review approval
- Code without specification
- `v-html` without security review
- Direct Firebase calls in controllers (use service layer)

### 📋 Quality Gates Checklist

Before merge, ALL must be ✅:

- [ ] ESLint: 0 errors, 0 warnings
- [ ] TypeScript: 0 compilation errors
- [ ] Tests: All passing (unit, integration, E2E)
- [ ] Coverage: Backend >85%, Frontend >80%, Common >90%, Critical paths 100%
- [ ] Build: Successful
- [ ] Design: Compliant with design system
- [ ] Accessibility: WCAG 2.1 AA compliant
- [ ] Performance: No regressions >5%
- [ ] Security: No high/critical vulnerabilities
- [ ] Documentation: Updated
- [ ] Code Review: At least 1 approval

### 🔧 Technology Stack (Immutable)

- **Frontend**: Vue 3 + TypeScript + Vite + Pinia + Tailwind CSS
- **Backend**: NestJS + TypeScript + Firebase
- **Testing**: Vitest (FE), Jest (BE), Playwright (E2E)
- **Tooling**: ESLint + Prettier + Husky

---

## Appendix B: Version History

- **v2.0.0** (2025-10-04) - Merged constitutions; added agent responsibilities, expanded standards
- **v1.0.0** (2025-10-04) - Initial constitution established

---

**End of Constitution**

_By contributing to this project, you agree to uphold this constitution._
