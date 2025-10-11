# System Architecture

**Last Updated**: 2025-10-11
**Status**: Living Document

## Overview

This document provides a high-level overview of the Jira Clone system architecture, including the monorepo structure, service interactions, and data flow.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Jira Clone System                       │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│              │         │              │         │              │
│   Frontend   │◄────────┤    Common    ├────────►│   Backend    │
│   (Vue 3)    │         │  (Shared     │         │  (NestJS)    │
│              │         │   Types)     │         │              │
└──────┬───────┘         └──────────────┘         └──────┬───────┘
       │                                                  │
       │                                                  │
       │                                         ┌────────▼────────┐
       │                                         │                 │
       │                                         │    Firebase     │
       │                                         │  (Auth + DB)    │
       └─────────────────────────────────────────►                 │
                                                 └─────────────────┘
```

## Monorepo Structure

```
jira-clone/
└── packages/       # Monorepo packages
    ├── front/          # Vue 3 Single Page Application
    │   ├── src/
    │   │   ├── components/   # Reusable UI components
    │   │   ├── pages/        # Route-level page components
    │   │   ├── stores/       # Pinia state management
    │   │   └── services/     # API service layer
    │   └── tests/            # Frontend tests (Vitest)
    │
    ├── back/           # NestJS REST API
    │   ├── src/
    │   │   ├── modules/      # Feature modules
    │   │   ├── models/       # Data models
    │   │   └── services/     # Business logic
    │   └── tests/            # Backend tests (Jest)
    │
    └── common/         # Shared TypeScript types
        └── src/
            └── types/        # Type definitions, DTOs, interfaces
```

## Technology Stack

### Frontend
- **Framework**: Vue 3.5 with Composition API
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 6.x
- **Styling**: Tailwind CSS 4.0
- **State Management**: Pinia (planned)
- **Testing**: Vitest 3.x, Vue Test Utils 2.4
- **Component Development**: Storybook 8.6

### Backend
- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.7
- **Runtime**: Node.js (LTS)
- **API Style**: REST
- **Testing**: Jest 30.x

### Database & Auth
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **SDK**: Firebase Admin SDK 13.x

### Common
- **Language**: TypeScript 5.9
- **Validation**: Zod 4.x

## Data Flow

### Authentication Flow

```
User → Frontend → Firebase Auth → Backend (verify token) → Protected Resource
```

### API Request Flow

```
Frontend Component
    ↓
API Service (front/src/services/)
    ↓
HTTP Request (with JWT)
    ↓
NestJS Controller (back/src/modules/)
    ↓
Business Logic (back/src/services/)
    ↓
Firebase Firestore
    ↓
Response → Frontend → UI Update
```

### Type Safety Flow

```
Common Types (common/src/types/)
    ↓
├─→ Frontend imports types
└─→ Backend imports types
```

## Component Architecture

### Frontend Components

```
Pages (Route-level components)
    ├─→ Organisms (Complex components)
    │       ├─→ Molecules (Composite components)
    │       │       └─→ Atoms (Basic UI elements)
    │       └─→ Services (API calls)
    └─→ Stores (State management)
```

### Backend Modules

```
Module
    ├─→ Controller (HTTP endpoints)
    ├─→ Service (Business logic)
    ├─→ Model (Data structure)
    └─→ DTO (Data Transfer Object)
```

## Security Architecture

### Authentication & Authorization

1. **Firebase Auth** handles user authentication
2. **JWT tokens** passed in HTTP headers
3. **NestJS Guards** verify tokens on protected routes
4. **Role-Based Access Control (RBAC)** enforces permissions

### Data Validation

- **Frontend**: VeeValidate + Zod schemas
- **Backend**: NestJS class-validator + DTOs
- **Common**: Shared Zod schemas for validation logic

## Deployment Architecture

> [To be documented when deployment is configured]

## Performance Considerations

### Frontend
- Code splitting for route-level components
- Lazy loading for heavy components
- Virtual scrolling for long lists
- Debounced search inputs

### Backend
- Database indexes on queried fields
- Pagination for list endpoints
- Connection pooling for Firebase
- Caching strategy (when implemented)

## Workspace Structure

The project uses npm workspaces with all packages in the `packages/` directory:

- **packages/front**: Frontend workspace
- **packages/back**: Backend workspace
- **packages/common**: Shared types workspace

Commands can target specific workspaces:
```bash
npm run dev --workspace=packages/front
npm test --workspace=packages/back
```

## Development Workflow

For detailed development workflow, see [`.specify/memory/workflow.md`](../.specify/memory/workflow.md).

For governance and standards, see [`.specify/memory/constitution.md`](../.specify/memory/constitution.md).

## Architecture Decision Records

All major architectural decisions are documented in [`docs/adr/`](./adr/).

## Future Considerations

> Document planned architectural changes here

---

**For Updates**: This document should be updated when:
- Major architectural changes are made
- New services are added
- Technology stack changes
- Deployment architecture is finalized
