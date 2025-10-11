# Documentation

This directory contains project-level documentation for the Jira Clone project.

## Documentation Structure

```
docs/
├── adr/                    # Architecture Decision Records
│   ├── README.md           # ADR guidelines
│   └── template.md         # ADR template
├── integrations/           # Third-party integrations
│   └── speckit.md          # Spec-Kit integration guide
├── artefacts/             # Planning artifacts and drafts
├── ARCHITECTURE.md        # System architecture overview
├── CONTRIBUTING.md        # Developer onboarding guide
├── DEPLOYMENT.md          # Deployment procedures
├── TESTING.md            # Testing strategy and practices
└── README.md             # This file
```

## What Goes Where

### Code-Level Documentation
- **JSDoc/TSDoc**: In source code files
- **Component Props/Events**: JSDoc in Vue components
- **API Endpoints**: JSDoc in controllers

### Visual Component Documentation
- **Storybook**: Component stories in `packages/front/src/**/*.stories.ts`
- Design tokens, component variants, usage examples

### Governance Documents
- **Constitution**: `.specify/memory/constitution.md`
- **Workflow**: `.specify/memory/workflow.md`

### Feature Specifications
- **Active Specs**: `.specify/specs/###-feature-name/`
- Each spec includes: spec.md, plan.md, tasks.md, etc.

### Project Documentation (docs/)

This folder contains:

1. **Architecture Decision Records** (`adr/`)
   - Major technical decisions
   - Technology choices
   - Architectural patterns

2. **System Architecture** (`ARCHITECTURE.md`)
   - High-level system overview
   - Technology stack
   - Data flow diagrams
   - Monorepo structure

3. **Contributing Guide** (`CONTRIBUTING.md`)
   - Developer onboarding
   - Setup instructions
   - Development workflow
   - Code standards

4. **Deployment Guide** (`DEPLOYMENT.md`)
   - Deployment procedures
   - Environment configuration
   - CI/CD pipeline
   - Rollback procedures

5. **Testing Guide** (`TESTING.md`)
   - Testing philosophy (TDD)
   - Test categories
   - Running tests
   - Best practices

6. **Integration Guides** (`integrations/`)
   - Third-party service integrations
   - External tool configurations

## Quick Links

### For New Contributors
1. Start with [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md)
3. Read [`.specify/memory/constitution.md`](../.specify/memory/constitution.md)
4. Read [`.specify/memory/workflow.md`](../.specify/memory/workflow.md)

### For Developers
- **Testing**: [TESTING.md](./TESTING.md)
- **Code Standards**: [`.specify/memory/constitution.md`](../.specify/memory/constitution.md)
- **Workflow**: [`.specify/memory/workflow.md`](../.specify/memory/workflow.md)

### For DevOps
- **Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)

### For Architects
- **ADRs**: [adr/](./adr/)
- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)

## Documentation Principles

### Keep Documentation Close to Code
- Component documentation → JSDoc in code
- API documentation → JSDoc in controllers
- Visual documentation → Storybook

### Keep Documentation Current
Update relevant documentation when:
- Adding features
- Changing architecture
- Updating dependencies
- Modifying deployment process
- Changing testing strategy

### Documentation is Code
- Review documentation in PRs
- Treat outdated documentation as a bug (P2)
- Follow constitution requirements

## Documentation Requirements

Per Constitution Article X, Section 10.1:

**Required Documentation**:
- ✅ Code Documentation (JSDoc/TSDoc)
- ✅ README in each workspace
- ✅ API documentation (OpenAPI/Swagger)
- ✅ Component documentation (Storybook + JSDoc)
- ✅ Architecture Decision Records
- ✅ Feature Specifications
- ✅ Deployment Guides
- ✅ Onboarding Guide

## Documentation Updates

Per Constitution Article X, Section 10.2:

Documentation MUST be updated when:
- APIs change → Update OpenAPI spec
- Features added → Update README, specs
- Architectural decisions made → Create ADR
- Deployment process changes → Update deployment guide
- Dependencies change → Update README

## Contributing to Documentation

When adding documentation:

1. Choose the right location:
   - Code docs → In source files (JSDoc)
   - Component docs → Storybook + JSDoc
   - Project docs → `docs/`
   - Governance → `.specify/memory/`
   - Specs → `.specify/specs/`

2. Follow existing formats and templates

3. Keep it concise but complete

4. Include examples where helpful

5. Link related documents

6. Update this README if structure changes

---

**For questions about documentation standards**, see [`.specify/memory/constitution.md`](../.specify/memory/constitution.md) Article X.
