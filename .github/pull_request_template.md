## Description

## Related Issues

- Closes #
- Related to #
- Part of #

## Type of Change

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] ✅ Test update
- [ ] 🔧 Configuration change
- [ ] 🎨 UI/UX update

## Agent

**Agent**:

- [ ] Architecture
- [ ] Backend
- [ ] Frontend
- [ ] Common
- [ ] DevOps
- [ ] Testing
- [ ] Design

---

## Changes Made

- Change 1
- Change 2
- Change 3

## Code Quality Checklist

### All PRs

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated (if needed)
- [ ] No new warnings generated
- [ ] No console.log or debugger statements

### Frontend PRs (MANDATORY)

- [ ] **✅ ESLint: ZERO errors** (`npm run lint:front`)
  ```bash
  # Paste ESLint output here
  ```
- [ ] **✅ Prettier: Formatted** (`npm run format`)
- [ ] **✅ TypeScript: No errors** (`npm run type-check`)
- [ ] No `any` types (or justified with comment)
- [ ] Type-based props and emits
- [ ] Multi-word component names (PascalCase)
- [ ] Uses ``
- [ ] Follows design system (Tailwind classes from spec)
- [ ] Responsive (mobile/tablet/desktop tested)

### Backend PRs

- [ ] DTOs defined for all endpoints
- [ ] Validation implemented with class-validator
- [ ] Error handling implemented
- [ ] Swagger/OpenAPI docs updated
- [ ] No sensitive data in code
- [ ] Firebase security considered

### Common PRs

- [ ] Types documented with JSDoc
- [ ] Zod schemas for validation
- [ ] Exports added to index.ts
- [ ] No circular dependencies
- [ ] Breaking changes documented

---

## Testing

### Test Coverage

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated (if applicable)
- [ ] E2E tests added/updated (if applicable)
- [ ] All tests passing locally

**Coverage**:

- Backend: X%
- Frontend: X%
- Common: X%

### Manual Testing

- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari (if applicable)
- [ ] Tested on mobile
- [ ] Tested edge cases

**Test scenarios covered**:

1. Scenario 1
2. Scenario 2

---

## Design Compliance (Frontend Only)

- [ ] Follows design specification
- [ ] Uses design system colors/typography/spacing
- [ ] All interaction states implemented (hover, active, disabled, loading)
- [ ] Matches mockups/screenshots
- [ ] Design Agent approved (tag: @design-agent)

---

## Accessibility (Frontend Only)

- [ ] Semantic HTML used
- [ ] ARIA labels added where needed
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader tested
- [ ] Color contrast meets WCAG 2.1 AA (≥4.5:1)

---

## Performance

- [ ] No unnecessary re-renders (Frontend)
- [ ] Database queries optimized (Backend)
- [ ] Pagination implemented (if needed)
- [ ] Images/assets optimized
- [ ] Bundle size impact acceptable (Frontend)

---

## Security

- [ ] No secrets or credentials in code
- [ ] Input validation implemented
- [ ] Authentication/authorization checked
- [ ] XSS prevention (no v-html without sanitization)
- [ ] SQL injection prevention (proper Firestore usage)
- [ ] CORS properly configured (Backend)

---

## Breaking Changes

**Breaking Changes**: Yes / No

**If yes, describe**:

- What breaks:
- Migration guide:
- Affected areas:

---

## Database Changes

- [ ] Firestore collections added/modified
- [ ] Firestore indexes created
- [ ] Migration script provided (if needed)
- [ ] Backward compatible / Breaking change documented

**Collections affected**:

- Collection 1
- Collection 2

---

## Screenshots/Videos

**Before**:
[Screenshot]

**After**:
[Screenshot]

**Demo**:
[Video/GIF if applicable]

---

## Deployment Notes

- [ ] Environment variables added/changed (document in .env.example)
- [ ] New dependencies added (listed below)
- [ ] Database migration needed
- [ ] Configuration changes needed

**New dependencies**:

- package-name@version - reason

---

## Reviewer Checklist

### For Reviewers

**Architecture Review**:

- [ ] Follows architectural patterns
- [ ] No security vulnerabilities
- [ ] Scalable and maintainable
- [ ] API contracts maintained

**Code Review**:

- [ ] Code is readable and well-structured
- [ ] No code duplication
- [ ] Error handling is appropriate
- [ ] Tests are meaningful and comprehensive

**Frontend Review** (if applicable):

- [ ] ESLint passes with 0 errors
- [ ] Design system followed
- [ ] Accessibility requirements met
- [ ] Responsive design works

**Backend Review** (if applicable):

- [ ] DTOs properly defined
- [ ] Validation comprehensive
- [ ] Firebase integration correct
- [ ] API documentation complete

---

## How to Test

1. Pull this branch: `git checkout `
2. Install dependencies: `npm install`
3. Build common: `npm run build --workspace=common`
4. Start backend: `npm run dev:back`
5. Start frontend: `npm run dev:front`
6. Navigate to: [URL]
7. Test: [Specific actions]

**Test Accounts** (if needed):

- Email: test@example.com
- Password: [password]

---

## Post-Merge Tasks

- [ ] Update documentation
- [ ] Notify stakeholders
- [ ] Create follow-up issues
- [ ] Deploy to staging
- [ ] Monitor for issues

---

## Additional Notes

---

## Checklist Before Requesting Review

- [ ] I have read the [Project Constitution](../docs/PROJECT_CONSTITUTION.md)
- [ ] I have followed the [Workflow](../docs/WORKFLOW.md)
- [ ] I have read the relevant [Agent Instructions](.claude/agents/)
- [ ] All CI checks are passing
- [ ] I have tested this locally
- [ ] I have added/updated tests
- [ ] I have updated documentation
- [ ] Frontend: ESLint shows 0 errors
- [ ] This PR is ready for review

---

**By submitting this PR, I confirm that I have followed all project standards and this code is ready for production.**
