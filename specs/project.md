# Jira Clone - Project Specification

## 1. Project Overview

### 1.1 Purpose

Build a simplified project management tool inspired by Jira, focusing on core issue tracking and team collaboration features.

### 1.2 Scope

A web-based application that allows teams to create projects, manage issues/tickets, track progress, and collaborate on tasks.

### 1.3 Target Users

- Development teams
- Project managers
- Individual contributors
- Team leads

---

## 2. Core Features

### 2.1 User Management

- User registration and authentication
- User profiles with avatar and basic info
- Role-based access (Admin, Project Lead, Developer, Viewer)
- Password reset functionality

### 2.2 Project Management

- Create/Edit/Delete projects
- Project settings (name, key, description, avatar)
- Project access control (public/private)
- Project dashboard with key metrics

### 2.3 Issue/Ticket Management

- Create issues with the following fields:
  - Title (required)
  - Description (rich text)
  - Issue type (Bug, Task, Story, Epic)
  - Priority (Lowest, Low, Medium, High, Highest)
  - Status (To Do, In Progress, Done)
  - Assignee
  - Reporter
  - Due date
  - Estimated time
  - Labels/Tags
- Edit and delete issues
- Issue comments and activity log
- Attach files to issues
- Link related issues

### 2.4 Board View

- Kanban board with drag-and-drop functionality
- Columns representing different statuses
- Filter and search capabilities
- Quick edit from board view

### 2.5 Search and Filtering

- Full-text search across issues
- Filter by:
  - Issue type
  - Status
  - Priority
  - Assignee
  - Reporter
  - Labels
  - Date range
- Save custom filters

---

## 3. User Stories

### 3.1 Authentication

```
As a new user
I want to register for an account
So that I can access the application

As a registered user
I want to log in securely
So that I can manage my projects and issues
```

### 3.2 Projects

```
As a project manager
I want to create a new project
So that I can organize work for my team

As a team member
I want to view all projects I have access to
So that I can see what I'm working on
```

### 3.3 Issues

```
As a developer
I want to create a new issue
So that I can track a bug or task

As a team member
I want to update issue status
So that others know the current progress

As a developer
I want to assign issues to team members
So that work is clearly distributed

As a user
I want to comment on issues
So that I can collaborate with my team

As a team lead
I want to filter issues by status and assignee
So that I can monitor team workload
```

### 3.4 Board

```
As a team member
I want to view issues in a Kanban board
So that I can visualize workflow

As a developer
I want to drag and drop issues between columns
So that I can quickly update status
```

---

## 4. Data Models (Firestore Collections)

### 4.1 User Collection (`users/{userId}`)

```typescript
interface User {
  id: string; // Firebase Auth UID
  email: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
  role: 'ADMIN' | 'USER';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### 4.2 Project Collection (`projects/{projectId}`)

```typescript
interface Project {
  id: string;
  key: string; // unique, 2-10 uppercase chars (e.g., "PROJ")
  name: string;
  description: string;
  avatarUrl?: string;
  ownerId: string; // Reference to User
  isPrivate: boolean;
  memberIds: string[]; // Array of user IDs for quick access check
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### 4.3 ProjectMember SubCollection (`projects/{projectId}/members/{userId}`)

```typescript
interface ProjectMember {
  userId: string;
  role: 'ADMIN' | 'MEMBER' | 'VIEWER';
  joinedAt: Timestamp;
}
```

### 4.4 Issue Collection (`projects/{projectId}/issues/{issueId}`)

```typescript
interface Issue {
  id: string;
  projectId: string;
  key: string; // e.g., "PROJ-123"
  title: string;
  description: string;
  type: 'BUG' | 'TASK' | 'STORY' | 'EPIC';
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOWEST' | 'LOW' | 'MEDIUM' | 'HIGH' | 'HIGHEST';
  assigneeId?: string; // Reference to User
  reporterId: string; // Reference to User
  dueDate?: Timestamp;
  estimateHours?: number;
  labels: string[]; // Array of label IDs
  attachmentIds: string[]; // Array of attachment IDs
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### 4.5 Comment SubCollection (`projects/{projectId}/issues/{issueId}/comments/{commentId}`)

```typescript
interface Comment {
  id: string;
  issueId: string;
  userId: string; // Reference to User
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### 4.6 Label Collection (`projects/{projectId}/labels/{labelId}`)

```typescript
interface Label {
  id: string;
  projectId: string;
  name: string;
  color: string; // hex color
  createdAt: Timestamp;
}
```

### 4.7 Attachment Collection (`attachments/{attachmentId}`)

```typescript
interface Attachment {
  id: string;
  issueId: string;
  projectId: string;
  uploaderId: string; // Reference to User
  filename: string;
  fileUrl: string; // Firebase Storage URL
  fileSize: number;
  mimeType: string;
  storagePath: string; // Path in Firebase Storage
  createdAt: Timestamp;
}
```

### 4.8 Activity Log SubCollection (`projects/{projectId}/issues/{issueId}/activity/{activityId}`)

```typescript
interface ActivityLog {
  id: string;
  issueId: string;
  userId: string;
  action: 'CREATED' | 'UPDATED' | 'COMMENTED' | 'STATUS_CHANGED' | 'ASSIGNED';
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  };
  createdAt: Timestamp;
}
```

### 4.9 Firestore Indexes Required

```
Collection: projects/{projectId}/issues
- Composite: projectId ASC, status ASC, createdAt DESC
- Composite: projectId ASC, assigneeId ASC, status ASC
- Composite: projectId ASC, type ASC, priority DESC

Collection: projects/{projectId}/issues/{issueId}/comments
- Single: createdAt DESC
```

---

## 5. API Endpoints

### 5.1 Authentication

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
GET    /api/auth/me
```

### 5.2 Users

```
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

### 5.3 Projects

```
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
GET    /api/projects/:id/members
POST   /api/projects/:id/members
DELETE /api/projects/:id/members/:userId
```

### 5.4 Issues

```
GET    /api/projects/:projectId/issues
POST   /api/projects/:projectId/issues
GET    /api/issues/:id
PUT    /api/issues/:id
DELETE /api/issues/:id
PATCH  /api/issues/:id/status
PATCH  /api/issues/:id/assignee
```

### 5.5 Comments

```
GET    /api/issues/:issueId/comments
POST   /api/issues/:issueId/comments
PUT    /api/comments/:id
DELETE /api/comments/:id
```

### 5.6 Labels

```
GET    /api/projects/:projectId/labels
POST   /api/projects/:projectId/labels
PUT    /api/labels/:id
DELETE /api/labels/:id
POST   /api/issues/:issueId/labels/:labelId
DELETE /api/issues/:issueId/labels/:labelId
```

### 5.7 Attachments

```
POST   /api/issues/:issueId/attachments
GET    /api/attachments/:id
DELETE /api/attachments/:id
```

---

## 6. Technical Requirements

### 6.1 Project Structure (Monorepo)

```
jira-clone/
├── package.json (root)
├── turbo.json or nx.json (optional)
├── .gitignore
├── README.md
├── front/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── src/
│   │   ├── main.ts
│   │   ├── App.vue
│   │   ├── router/
│   │   ├── stores/
│   │   ├── components/
│   │   ├── views/
│   │   ├── composables/
│   │   ├── types/
│   │   └── assets/
│   └── public/
├── back/
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── auth/
│   │   ├── users/
│   │   ├── projects/
│   │   ├── issues/
│   │   ├── comments/
│   │   ├── labels/
│   │   ├── common/
│   │   └── firebase/
│   └── test/
└── common/
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── types/
        ├── interfaces/
        ├── enums/
        └── validators/
```

### 6.2 Frontend (Vue 3 Ecosystem)

- **Language**: TypeScript
- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **UI Framework**:
  - Tailwind CSS
  - HeadlessUI Vue or PrimeVue
- **Form Handling**: VeeValidate + Zod
- **HTTP Client**: Axios
- **Drag and Drop**: VueDraggable (Vue 3 compatible)
- **Rich Text Editor**: TipTap (Vue 3)
- **Date Handling**: date-fns
- **Icons**: Heroicons or Material Design Icons

### 6.3 Backend (NestJS + Firebase)

- **Language**: TypeScript
- **Framework**: NestJS
- **Database**: Firestore (Firebase)
- **Authentication**: Firebase Auth
- **File Storage**: Firebase Storage
- **Validation**: class-validator + class-transformer
- **API Documentation**: Swagger/OpenAPI
- **Configuration**: @nestjs/config
- **Testing**: Jest + Supertest

### 6.4 Common Package

- **Shared Types**: TypeScript interfaces and types
- **Enums**: Shared enumerations (IssueType, Priority, Status, etc.)
- **Validators**: Zod schemas for data validation
- **Constants**: Shared constants across front and back
- **Utilities**: Shared utility functions

### 6.4.1 Design Tools

- **Storybook**: Component development and live preview
  - All UI components MUST have `.stories.ts` files
  - Design reviews happen in browser at `http://localhost:6006`
  - Component isolation for development
  - CSF3 (Component Story Format 3) with TypeScript
  - Stories demonstrate all component states and variants

### 6.5 DevOps & Tools

- **Package Manager**: npm (with workspaces)
- **Monorepo Tool**: npm workspaces or Turborepo (optional)
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint + Prettier
- **Pre-commit**: Husky + lint-staged
- **Testing**:
  - Frontend: Vitest + @vue/test-utils
  - Backend: Jest + Supertest
- **Type Checking**: TypeScript strict mode

---

## 7. Monorepo Configuration

### 7.1 Root package.json

```json
{
  "name": "jira-clone",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["front", "back", "common"],
  "scripts": {
    "dev": "npm run dev --workspace=front & npm run dev --workspace=back",
    "dev:front": "npm run dev --workspace=front",
    "dev:back": "npm run dev --workspace=back",
    "build": "npm run build --workspace=common && npm run build --workspaces --if-present",
    "build:front": "npm run build --workspace=front",
    "build:back": "npm run build --workspace=back",
    "test": "npm run test --workspaces --if-present",
    "lint": "npm run lint --workspaces --if-present",
    "format": "prettier --write \"**/*.{ts,vue,json,md}\"",
    "prepare": "husky install"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.50.0",
    "husky": "^8.0.3",
    "lint-staged": "^15.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.2.0"
  }
}
```

### 7.2 Front package.json

```json
{
  "name": "@jira-clone/front",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
  },
  "dependencies": {
    "@jira-clone/common": "*",
    "vue": "^3.3.0",
    "vue-router": "^4.2.0",
    "pinia": "^2.1.0",
    "axios": "^1.5.0",
    "vee-validate": "^4.11.0",
    "zod": "^3.22.0",
    "@vueuse/core": "^10.5.0",
    "vuedraggable": "^4.1.0",
    "@tiptap/vue-3": "^2.1.0",
    "@tiptap/starter-kit": "^2.1.0",
    "date-fns": "^2.30.0",
    "firebase": "^10.5.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.4.0",
    "@vue/test-utils": "^2.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.0",
    "vite": "^4.5.0",
    "vitest": "^0.34.0",
    "vue-tsc": "^1.8.0"
  }
}
```

### 7.3 Back package.json

```json
{
  "name": "@jira-clone/back",
  "version": "1.0.0",
  "scripts": {
    "build": "nest build",
    "dev": "nest start --watch",
    "start": "nest start",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@jira-clone/common": "*",
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/config": "^3.1.0",
    "@nestjs/swagger": "^7.1.0",
    "firebase-admin": "^11.11.0",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/supertest": "^2.0.12",
    "jest": "^29.5.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0"
  }
}
```

### 7.4 Common package.json

```json
{
  "name": "@jira-clone/common",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "lint": "eslint \"src/**/*.ts\" --fix"
  },
  "dependencies": {
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.2.0"
  }
}
```

### 7.5 Firebase Configuration

**Firebase Services Setup:**

1. Firebase Authentication (for user management)
2. Cloud Firestore (for database)
3. Firebase Storage (for file uploads)
4. Firebase Hosting (optional, for deployment)

**Environment Variables (.env files):**

Front (.env):

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:3000
```

Back (.env):

```
PORT=3000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY=your_private_key
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

---

## 8. UI/UX Requirements

### 8.1 Key Pages

1. **Login/Register Page**
2. **Dashboard** - Overview of all projects
3. **Project Page** - Project details and issue list
4. **Board View** - Kanban board
5. **Issue Detail Page** - Full issue view with comments
6. **Create/Edit Issue Modal**
7. **User Profile Page**
8. **Project Settings Page**

### 8.2 Design Principles

- Clean, minimalist interface
- Responsive design (mobile-friendly)
- Intuitive navigation
- Clear visual hierarchy
- Consistent color scheme
- Accessible (WCAG 2.1 AA compliant)

### 8.3 Key Interactions

- Drag and drop issues on board
- Inline editing where appropriate
- Real-time updates (optional with WebSockets)
- Keyboard shortcuts for power users
- Toast notifications for actions

---

## 9. Milestones & Phases

### Phase 1: MVP (Weeks 1-4)

- User authentication
- Basic project CRUD
- Basic issue CRUD
- Simple list view of issues
- Basic UI/UX

### Phase 2: Core Features (Weeks 5-8)

- Kanban board with drag and drop
- Comments functionality
- Labels and filtering
- Issue status workflow
- User assignment

### Phase 3: Enhancement (Weeks 9-12)

- Advanced search and filters
- File attachments
- Rich text editor for descriptions
- Project dashboard with metrics
- Email notifications

### Phase 4: Polish (Weeks 13-14)

- Performance optimization
- Mobile responsiveness
- Accessibility improvements
- Bug fixes
- Documentation

---

## 10. Success Metrics

- User can create a project in < 30 seconds
- User can create an issue in < 1 minute
- Board loads and renders < 2 seconds with 100 issues
- 95% of core user journeys can be completed without documentation
- Zero critical security vulnerabilities

---

## 12. Getting Started

### 12.1 Initial Setup Steps

1. **Create Repository and Initialize Monorepo**

```bash
# Create project directory
mkdir jira-clone && cd jira-clone
git init

# Initialize root package.json
npm init -y

# Create workspace folders
mkdir front back common

# Initialize each workspace
cd front && npm init -y
cd ../back && npm init -y
cd ../common && npm init -y
cd ..
```

2. **Setup Firebase Project**
   - Go to Firebase Console (https://console.firebase.google.com)
   - Create a new project
   - Enable Authentication (Email/Password provider)
   - Create Firestore database (Start in production mode)
   - Enable Firebase Storage
   - Generate service account key for backend
   - Copy web app config for frontend

3. **Setup Frontend (Vue 3)**

```bash
cd front
npm install vue@latest vue-router@latest pinia
npm install -D @vitejs/plugin-vue vite typescript vue-tsc
npm install -D tailwindcss postcss autoprefixer
npm install axios firebase @vueuse/core
npm install vee-validate zod vuedraggable
```

4. **Setup Backend (NestJS)**

```bash
cd ../back
npm install @nestjs/core @nestjs/common @nestjs/platform-express
npm install @nestjs/config @nestjs/swagger
npm install firebase-admin class-validator class-transformer
npm install -D @nestjs/cli @nestjs/testing jest ts-jest
```

5. **Setup Common Package**

```bash
cd ../common
npm install zod
npm install -D typescript
```

6. **Configure TypeScript**
   - Create tsconfig.json in each workspace
   - Setup path aliases for imports
   - Enable strict mode

7. **Setup Linting and Formatting**

```bash
# In root
npm install -D eslint prettier husky lint-staged
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
npx husky install
```

### 12.2 Development Workflow

**This project follows a specification-first development process as defined in `.specify/memory/constitution.md` v2.7.0.**

**See `docs/WORKFLOW.md` for complete workflow documentation.**

#### Specification-First Process Overview

1. **`/specify <feature description>`** - Create feature specification
   - Creates spec branch: `spec/###-feature-name`
   - Generates spec.md with requirements
   - Creates GitHub issue
   - ⚠️ **MANDATORY USER APPROVAL** before proceeding

2. **`/plan`** - Create implementation plan
   - Generates plan.md, research.md, data-model.md, contracts/
   - Commits to spec branch (not pushed yet)
   - ⚠️ **MANDATORY USER APPROVAL** before proceeding

3. **`/tasks`** - Generate task breakdown
   - Creates tasks.md and tasks/ folder with individual task files
   - Creates GitHub issues for each task
   - Assigns tasks to agents (backend, frontend, testing, etc.)
   - Pushes spec branch with all planning artifacts
   - ⚠️ **MANDATORY USER APPROVAL** before proceeding

4. **`/implement`** - Execute tasks sequentially
   - Each task on sub-branch: `spec/###-name/T###-task-name`
   - Tasks MUST be completed sequentially (cannot start new until previous merged)
   - Husky pre-commit hooks (user approval required for fixes)
   - ⚠️ **MANDATORY USER APPROVAL** after each task before PR
   - Task PRs merge to spec branch

5. **Final PR** - After all tasks complete
   - ⚠️ **MANDATORY USER APPROVAL** for entire feature
   - Create PR: `spec/###-name` → `main`

#### Branch Strategy

- **Spec branch**: `spec/###-feature-name` (contains spec + plan + tasks)
- **Task branches**: `spec/###-feature-name/T###-task-name` (one per task)
- All task PRs merge to spec branch
- Final PR merges spec branch to main

#### Daily Development

1. **Start Development Servers**

```bash
# From root - start both front and back
npm run dev

# Or separately
npm run dev:front  # Starts Vite dev server (usually port 5173)
npm run dev:back   # Starts NestJS (usually port 3000)
npm run storybook  # Starts Storybook (port 6006)
```

2. **Working with Common Package**
   - Make changes in `common/src/`
   - Run `npm run build --workspace=common`
   - Changes will be available in front and back

3. **Creating New Components/Modules**
   - Frontend: Create in `front/src/components/` with `.stories.ts` file
   - Backend: Use NestJS CLI: `nest g module <name>` or `nest g service <name>`
   - Always follow TDD (tests before implementation)

---

## 13. Governance & Development Process

### 13.1 Constitution

This project is governed by the constitution in `.specify/memory/constitution.md` (v2.7.0).

**Key Principles (NON-NEGOTIABLE):**

- **Specification-First Development**: NO code without spec
- **Test-Driven Development (TDD)**: Tests before implementation (MANDATORY)
- **Agent-Based Task Delegation**: Complex tasks use specialized agents
- **Sequential Task Execution**: Cannot start new task until previous merged
- **Code Quality Standards**: TypeScript strict mode, ESLint (Airbnb), Prettier
- **Accessibility**: WCAG 2.1 AA compliance (MANDATORY)
- **Security by Design**: Input validation, authentication, authorization

### 13.2 Agent Responsibilities

**Architecture Agent** (Final Authority on Technical Decisions)

- Creates specifications for all features
- Makes final decisions on technical approach
- Reviews all PRs for architectural compliance
- Can reject any PR for architectural reasons

**Design Agent** (Final Authority on UI/UX)

- Creates and maintains design system
- Creates Storybook stories for all UI components
- Ensures components are viewable in browser via Storybook
- Can reject any PR for design violations

**Backend Agent** (API Implementation)

- Implements API contracts exactly as specified
- Cannot change API contracts without Architecture Agent approval

**Frontend Agent** (UI Implementation)

- Implements designs exactly as specified
- Cannot deviate from design system without Design Agent approval

**Common Agent** (Guardian of Type Contracts)

- Maintains type contracts in `common/` workspace
- Can reject breaking changes without migration plan

**Testing Agent** (Quality Assurance)

- Defines test requirements
- Can reject PRs with insufficient tests

**DevOps Agent** (Build and Deployment)

- Maintains build and deployment systems
- Configures and maintains Storybook infrastructure
- Can block merges if CI/CD is broken

### 13.3 Quality Gates

**Test Coverage Requirements (Blocks merge if not met):**

- Backend: 85% line coverage
- Frontend: 80% line coverage
- Common: 90% line coverage
- Critical paths: 100% coverage (authentication, data mutations, payments)

**Performance Budgets:**

- Frontend: <3s page load (3G), <1s TTI (desktop), >90 Lighthouse score
- Backend: <200ms p95 (simple endpoints), <500ms p95 (complex endpoints)

**Code Quality:**

- ESLint: 0 errors (warnings allowed with justification)
- TypeScript: strict mode, no `any` without justification
- Prettier: all files formatted
- Husky pre-commit hooks: must pass

### 13.4 Task Sizing Guidelines

**Good task size:** 1-3 related files, single responsibility, ~1-3 hours work

**Examples of good tasks:**

- "Create User entity with validation" (model + validation rules)
- "Implement UsersService CRUD operations" (service with all methods)
- "Build ProjectCard component with Storybook story" (component + styles + story)

**Too granular (avoid):**

- "Add email field to User entity"
- "Create UserDto class"
- "Fix typo in variable name"

**Too big (split into multiple):**

- "Implement entire authentication system" → split into: entity, service, controller, DTOs, middleware
- "Build user dashboard with all features" → split by feature/component

### 13.5 Approval Gates

**5 MANDATORY approval gates in every feature:**

1. After `/specify` - User must approve spec before `/plan`
2. After `/plan` - User must approve plan before `/tasks`
3. After `/tasks` - User must approve task breakdown before `/implement`
4. After each task - User must approve task before creating PR
5. After all tasks - User must approve entire feature before final PR to main

**For detailed workflow:** See `docs/WORKFLOW.md`

---

## 11. Future Enhancements (Out of Scope)

- Sprint planning and velocity tracking
- Roadmap view
- Time tracking
- Advanced reporting and analytics
- Integration with external tools (Slack, GitHub)
- Custom fields and workflows
- Mobile native apps
- Real-time collaboration features
