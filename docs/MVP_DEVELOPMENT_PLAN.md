# Jira Clone - MVP Development Plan

**Goal**: Build a good-looking, functional MVP of a Jira clone for team project management

**Strategy**: Small, focused specs that can be completed in 1-3 days each

**Target Timeline**: 12 weeks to MVP

**Current Progress**: 4/33 specs completed (12%) ✅

---

## ✅ Already Completed

You've made great progress on the design system foundation! Here's what's been completed:

| Spec | Status | Folder | Description |
|------|--------|--------|-------------|
| **001** | ✅ DONE | `specs/001-setup-storybook-for/` | Storybook 8.6 setup for component preview |
| **002** | ✅ DONE | `specs/002-design-system/` | Design tokens, Roboto typography, 5 palettes, WCAG AAA |
| **003** | ✅ DONE | `specs/003-palette-switcher/` | 5 palettes × 2 modes (light/dark) = 10 variations |
| **004** | ✅ DONE | `specs/004-uibutton-component-you/` | UiButton component (filled/outline/text, 5 sizes) |

**What this means**: Your design system foundation is solid! You have:
- ✅ Storybook for component development and preview
- ✅ Complete design token system with professional color palettes
- ✅ Theme switching infrastructure (10 palette variations)
- ✅ First UI component (Button) fully implemented

**Next Steps**: Continue building UI components (Icons, Inputs, Cards, etc.) before moving to authentication and features.

---

## MVP Scope

### ✅ What's Included in MVP
- User authentication (register, login, logout)
- User profiles with avatars
- Create and manage projects
- Create and manage issues/tickets
- Kanban board with drag-and-drop
- Basic issue workflow (To Do → In Progress → Done)
- Comments on issues
- Basic search and filtering
- Clean, professional UI with design system

### ❌ What's NOT in MVP (Future)
- Advanced role-based permissions
- File attachments
- Rich text editor (use textarea for now)
- Email notifications
- Sprint planning
- Time tracking
- Advanced reporting
- Real-time collaboration

---

## Development Phases

### ✅ Phase 1: Design System Foundation - COMPLETED
**Goal**: Establish visual language and base tokens

#### ✅ Spec 001: Storybook Setup (DONE)
**Status**: Completed in `specs/001-setup-storybook-for/`
**What**: Setup Storybook for design preview and component development
**Deliverables**: ✅ Storybook 8.6 configured, component preview system ready

#### ✅ Spec 002: Design System Foundation (DONE)
**Status**: Completed in `specs/002-design-system/`
**What**: Design tokens, color palette, typography (Roboto), spacing, shadows
**Deliverables**: ✅ 5 professional color palettes, WCAG AAA compliant, documented in Storybook

#### ✅ Spec 003: Palette Switcher (DONE)
**Status**: Completed in `specs/003-palette-switcher/`
**What**: Multi-palette support with light/dark modes (5 palettes × 2 modes = 10 variations)
**Deliverables**: ✅ CSS class-based switching, Corporate Trust/Creative Energy/Natural Harmony/Warm Welcome/Minimalist palettes

#### ✅ Spec 004: UI Button Component (DONE)
**Status**: Completed in `specs/004-uibutton-component-you/`
**What**: Button component with filled/outline/text variants, 5 sizes (xs, sm, md, lg, xl)
**Deliverables**: ✅ UiButton.vue component, palette integration, WCAG 2.1 AAA compliant

---

### Phase 2: Core UI Components (Weeks 2-4) - IN PROGRESS
**Goal**: Build reusable UI component library (11 components)

#### Spec 005: Icon System Setup
**What**: Integrate Material Icons and create icon component wrapper
**Deliverables**:
- Icon component (`UiIcon.vue`)
- Material Icons from Google Fonts integrated
- UiButton component updated to support icons
- Storybook story showing all available icons

**Prompt for /specify**:
```
Create icon system specification for Material Icons integration.

Requirements:
- Use Material Icons from Google Fonts: https://fonts.google.com/icons
- Research Material Design 3 icon guidelines: https://m3.material.io/styles/icons/overview
- Reference Material Web Components implementation: https://github.com/material-components/material-web/blob/main/docs/components/icon.md
- Create UiIcon.vue component following Material Design 3 specifications:
  - Support for icon properties: fill, weight, grade, optical size
  - Size variants based on M3 guidelines
  - Integration with design system color tokens
  - Semantic token support for palette-aware coloring
- Update UiButton component to support icons:
  - Leading icon (left side)
  - Trailing icon (right side)
  - Icon-only button variant
  - Update UiButton Storybook stories with icon examples
- Create comprehensive Storybook story for UiIcon:
  - Showcase icon variants and properties
  - Interactive controls for fill, weight, grade, size
  - Common icon set examples (navigation, actions, status, entities)
- Configure Material Icons loading in Vite

Out of scope:
- Custom SVG icons (use Material Icons only)
- Icon animations
- Multiple icon libraries
```

#### Spec 006: UiTextField Component
**What**: Text field component following Material Design 3 specifications
**Deliverables**:
- `UiTextField.vue` component for text/email/password inputs
- Material Design 3 compliant implementation
- Storybook story with all variants

**Prompt for /specify**:
```
Create text field component specification following Material Design 3.

Requirements:
- Research Material Design 3 text field specifications: https://m3.material.io/components/text-fields/specs
- Reference Material Web Components implementation for text fields: https://github.com/material-components/material-web
- Create UiTextField component based on M3 specifications discovered during research
- All technical requirements (variants, anatomy, states, dimensions, typography, colors, supporting elements) should be defined after research
- Component must integrate with design system color tokens
- Support form validation integration (VeeValidate)
- Password visibility toggle for password type
- WCAG 2.1 AA compliant
- Comprehensive Storybook story showcasing all variants and states

Out of scope:
- Advanced input types (date picker, file upload, search with autocomplete)
- Input masks/formatting
```

#### Spec 007: UiCheckbox Component
**What**: Checkbox input component following Material Design 3 specifications
**Deliverables**:
- `UiCheckbox.vue` component
- Material Design 3 compliant implementation
- Storybook story with all variants

**Prompt for /specify**:
```
Create checkbox component specification following Material Design 3.

Requirements:
- Research Material Design 3 checkbox specifications: https://m3.material.io/components/checkbox/specs
- Reference Material Web Components implementation for checkbox: https://github.com/material-components/material-web/blob/main/docs/components/checkbox.md
- Create UiCheckbox component based on M3 specifications discovered during research
- All technical requirements (anatomy, states, dimensions, interactions, animations) should be defined after research
- Support single checkbox and checkbox groups
- Component must integrate with design system color tokens
- Support form validation integration (VeeValidate)
- WCAG 2.1 AA compliant
- Comprehensive Storybook story showcasing all variants and states

Out of scope:
- Toggle switch component (separate component if needed)
```

#### Spec 008: UiRadio Component
**What**: Radio button input component following Material Design 3 specifications
**Deliverables**:
- `UiRadio.vue` component
- Material Design 3 compliant implementation
- Storybook story with all variants

**Prompt for /specify**:
```
Create radio button component specification following Material Design 3.

Requirements:
- Research Material Design 3 radio button specifications: https://m3.material.io/components/radio-button/overview
- Reference Material Web Components implementation for radio: https://github.com/material-components/material-web/blob/main/docs/components/radio.md
- Create UiRadio component based on M3 specifications discovered during research
- All technical requirements (anatomy, states, dimensions, interactions, animations) should be defined after research
- Support radio groups with proper state management
- Component must integrate with design system color tokens
- Support form validation integration (VeeValidate)
- WCAG 2.1 AA compliant
- Comprehensive Storybook story showcasing all variants and states

Out of scope:
- Radio cards (larger clickable areas with descriptions)
- Icon radios
```

#### Spec 009: Card Component
**What**: Card component following Material Design 3 specifications
**Deliverables**:
- `UiCard.vue` component
- Material Design 3 compliant implementation
- Storybook story with all variants

**Prompt for /specify**:
```
Create card component specification following Material Design 3.

Requirements:
- Research Material Design 3 card specifications: https://m3.material.io/components/cards/specs
- Create UiCard component based on M3 specifications discovered during research
- All technical requirements (variants, anatomy, states, dimensions, elevation, interactions) should be defined after research
- Component must integrate with design system color tokens
- Support clickable cards with appropriate interaction states
- WCAG 2.1 AA compliant
- Comprehensive Storybook story showcasing all variants and use cases

Use cases:
- Project cards in project list
- Issue cards in list view and Kanban board
- Profile cards
- Dashboard widgets

Out of scope:
- Complex card layouts (those go in specific components)
```

#### Spec 010: Avatar Component
**What**: User avatar component with fallback to initials
**Deliverables**:
- `UiAvatar.vue` component
- Image support with initials fallback
- Storybook story with all variants

**Prompt for /specify**:
```
Create avatar component specification for user representation.

Requirements:
- Research best practices for avatar components in design systems
- UiAvatar component should support:
  - Image display with URL
  - Automatic fallback to user initials when no image available
  - Multiple size variants for different contexts
  - Optional status indicator (online/offline)
  - Consistent background colors for initials (generated from name)
- All technical requirements (sizes, dimensions, initials logic, color generation) should be defined after research
- Component must integrate with design system color tokens
- WCAG 2.1 AA compliant (proper alt text, contrast)
- Comprehensive Storybook story showcasing all sizes and states

Use cases:
- User profiles
- Issue assignee display
- Comment author display
- Project member lists

Out of scope:
- Avatar upload functionality (separate spec)
- Avatar groups/stacks
- Square avatars
```

#### Spec 011: Badge Component
**What**: Badge component following Material Design 3 specifications
**Deliverables**:
- `UiBadge.vue` component
- Material Design 3 compliant implementation
- Storybook story with all variants

**Prompt for /specify**:
```
Create badge component specification following Material Design 3.

Requirements:
- Research Material Design 3 badge specifications: https://m3.material.io/components/badges/overview
- Create UiBadge component based on M3 specifications discovered during research
- All technical requirements (variants, anatomy, states, dimensions, colors, typography) should be defined after research
- Component must integrate with design system color tokens
- Support different semantic variants for status/priority indication
- Optional icon support
- WCAG 2.1 AA compliant (proper contrast ratios)
- Comprehensive Storybook story showcasing all variants and use cases

Use cases:
- Issue status badges (TODO, IN_PROGRESS, DONE)
- Issue priority badges (LOW, MEDIUM, HIGH)
- Issue type badges (BUG, TASK, STORY)
- Labels on issues

Out of scope:
- Removable badges (close button)
- Badge counters/notification dots (separate component if needed)
```

#### Spec 012: Dropdown/Menu Component
**What**: Dropdown menu component following Material Design 3 specifications
**Deliverables**:
- `UiDropdown.vue` component for action menus
- Material Design 3 compliant implementation
- Storybook story with all variants

**Prompt for /specify**:
```
Create dropdown/menu component specification following Material Design 3.

Requirements:
- Research Material Design 3 menu specifications: https://m3.material.io/components/menus/overview
- Create UiDropdown component based on M3 specifications discovered during research
- All technical requirements (anatomy, states, positioning, interactions, animations) should be defined after research
- Component must integrate with design system color tokens
- Support menu items with icons, dividers, disabled states
- Keyboard navigation (arrow keys, enter, escape)
- Click outside to close behavior
- WCAG 2.1 AA compliant (proper ARIA roles and labels)
- Comprehensive Storybook story showcasing all variants and use cases

Use cases:
- User account menu (profile, settings, logout)
- Issue actions menu (edit, delete, move)
- More options menus
- Context menus

Out of scope:
- Nested/cascading menus
- Menu with complex content (forms, etc.)
```

#### Spec 013: Select Component
**What**: Select input component for forms following Material Design 3 specifications
**Deliverables**:
- `UiSelect.vue` component for form selection
- Material Design 3 compliant implementation
- Storybook story with all variants

**Prompt for /specify**:
```
Create select input component specification following Material Design 3.

Requirements:
- Research Material Design 3 select component best practices
- Reference Material Web Components implementation for select: https://github.com/material-components/material-web/blob/main/docs/components/select.md
- Create UiSelect component based on M3 specifications discovered during research
- All technical requirements (variants, anatomy, states, positioning, animations, search behavior, option rendering) should be defined after research
- Component must integrate with design system color tokens
- Support form validation integration (VeeValidate)
- Form integration with v-model
- Optional search/filter for long option lists
- WCAG 2.1 AA compliant (proper ARIA roles, keyboard accessible)
- Comprehensive Storybook story showcasing all states and use cases

Use cases:
- Issue status selection
- Issue priority selection
- Assignee selection
- Project selection
- Any form dropdown selection

Out of scope:
- Multi-select (separate component if needed)
- Tree select
- Async option loading (pass all options for MVP)
- Rich option content (images, complex layouts)
```

#### Spec 014: Dialog Component
**What**: Dialog/Modal component following Material Design 3 specifications
**Deliverables**:
- `UiDialog.vue` component
- Material Design 3 compliant implementation
- Storybook story with all variants

**Prompt for /specify**:
```
Create dialog/modal component specification following Material Design 3.

Requirements:
- Research Material Design 3 dialog specifications: https://m3.material.io/components/dialogs/overview
- Reference Material Web Components implementation for dialog: https://github.com/material-components/material-web/blob/main/docs/components/dialog.md
- Create UiDialog component based on M3 specifications discovered during research
- All technical requirements (variants, anatomy, states, dimensions, animations, interactions) should be defined after research
- Component must integrate with design system color tokens
- Support focus trap and keyboard navigation
- Backdrop interaction behavior
- WCAG 2.1 AA compliant (proper ARIA roles, focus management)
- Comprehensive Storybook story showcasing all variants and use cases

Use cases:
- Create/edit issue form
- Create project form
- Delete confirmations
- User profile edit

Out of scope:
- Nested dialogs
- Draggable dialogs
- Multi-step wizards (can be content)
```

#### Spec 015: Snackbar Component
**What**: Snackbar component following Material Design 3 specifications
**Deliverables**:
- `UiSnackbar.vue` component
- Snackbar service/composable for triggering
- Material Design 3 compliant implementation
- Storybook story with all variants

**Prompt for /specify**:
```
Create snackbar/notification component specification following Material Design 3.

Requirements:
- Research Material Design 3 snackbar specifications: https://m3.material.io/components/snackbar/specs
- Create UiSnackbar component based on M3 specifications discovered during research
- All technical requirements (variants, anatomy, states, dimensions, animations, timing, positioning) should be defined after research
- Create composable/service for triggering snackbars programmatically
- Component must integrate with design system color tokens
- Support different semantic variants (success, error, warning, info)
- Auto-dismiss behavior with configurable duration
- Queue management for multiple snackbars
- WCAG 2.1 AA compliant (proper ARIA roles, announcements)
- Comprehensive Storybook story showcasing all variants and use cases

Use cases:
- Success: "Issue created successfully"
- Error: "Failed to save changes"
- Warning: "Unsaved changes will be lost"
- Info: "Changes saved as draft"

Out of scope:
- Action buttons in snackbar (keep simple for MVP)
- Rich content (links, images, etc.)
- Multiple position options (use M3 default positioning)
```

---

### Phase 3: Authentication (Week 4)
**Goal**: User registration, login, and session management

#### Spec 016: Login Page UI
**What**: Login form page
**Deliverables**:
- Login page component (`LoginView.vue`)
- Form with email/password inputs
- "Forgot password?" link (no functionality yet)
- Link to register page
- Form validation
- Loading state

**Prompt for /specify**:
```
Create login page UI specification.

Requirements:
- LoginView page component with:
  - Email input (UiInput type="email")
  - Password input (UiInput type="password" with visibility toggle)
  - "Remember me" checkbox
  - Login button (UiButton, loading state)
  - "Forgot password?" link (disabled/styled but no action for MVP)
  - "Don't have an account? Sign up" link to register page

- Validation:
  - Email: Required, valid email format
  - Password: Required, min 6 characters
  - Show validation errors below inputs

- States:
  - Default: Form ready
  - Loading: Disable inputs, show spinner on button
  - Error: Show error message (from auth service) at top

- Layout:
  - Centered card on page
  - Responsive (full width on mobile)
  - Clean, minimal design

Out of scope:
- OAuth providers (Google, GitHub - add later)
- Password reset functionality
- Actual authentication logic (separate spec)
```

#### Spec 017: Register Page UI
**What**: User registration form page
**Deliverables**:
- Register page component (`RegisterView.vue`)
- Form with name, email, password, confirm password
- Password strength indicator
- Link to login page
- Form validation
- Loading state

**Prompt for /specify**:
```
Create registration page UI specification.

Requirements:
- RegisterView page component with:
  - Full name input (UiInput)
  - Email input (UiInput type="email")
  - Password input (UiInput type="password")
  - Confirm password input (UiInput type="password")
  - Password strength indicator (weak/medium/strong)
  - Register button (UiButton, loading state)
  - "Already have an account? Log in" link

- Validation:
  - Full name: Required, min 2 characters
  - Email: Required, valid email format, unique (check on submit)
  - Password: Required, min 8 characters, at least 1 number and 1 letter
  - Confirm password: Must match password
  - Show validation errors below inputs

- Password strength:
  - Weak: < 8 chars
  - Medium: 8+ chars with numbers OR letters
  - Strong: 8+ chars with numbers AND letters AND special char

- States:
  - Default: Form ready
  - Loading: Disable inputs, show spinner on button
  - Error: Show error message at top

Out of scope:
- Email verification flow
- Terms of service checkbox (add later)
- OAuth registration
```

#### Spec 018: Firebase Auth Backend Integration
**What**: Backend authentication endpoints and Firebase setup
**Deliverables**:
- Auth module in NestJS (`AuthModule`, `AuthService`, `AuthController`)
- POST `/api/auth/register` - Create user with Firebase Auth
- POST `/api/auth/login` - Verify credentials, return JWT
- POST `/api/auth/logout` - Invalidate session
- GET `/api/auth/me` - Get current user
- Firebase Admin SDK integration
- JWT token generation
- Auth guard for protected routes

**Prompt for /specify**:
```
Create Firebase authentication backend specification.

Requirements:
- Auth module in packages/back/src/auth/:
  - AuthModule (register module)
  - AuthService (business logic)
  - AuthController (HTTP endpoints)
  - FirebaseService (Firebase Admin SDK wrapper)

- Endpoints:
  - POST /api/auth/register
    - Body: { email, password, fullName }
    - Create user in Firebase Auth
    - Create user document in Firestore users collection
    - Return user object (no password)

  - POST /api/auth/login
    - Body: { email, password }
    - Verify with Firebase Auth
    - Generate custom JWT token
    - Return: { user, accessToken }

  - POST /api/auth/logout
    - Invalidate user session (revoke refresh tokens in Firebase)

  - GET /api/auth/me (protected)
    - Verify JWT token
    - Return current user from Firestore

- Auth guard:
  - JwtAuthGuard for protecting routes
  - Extract user from JWT token
  - Attach user to request object

- Firebase setup:
  - Initialize Firebase Admin SDK with service account
  - Configure in environment variables

- User model in Firestore (users/{userId}):
  - id (Firebase Auth UID)
  - email
  - fullName
  - avatarUrl (null for now)
  - role (default: 'USER')
  - createdAt, updatedAt

Out of scope:
- Password reset functionality
- Email verification
- Refresh token rotation
- OAuth providers
```

#### Spec 019: Auth Store & Frontend Integration
**What**: Pinia store for authentication state and API integration
**Deliverables**:
- Auth store (`useAuthStore`)
- API service for auth endpoints
- Login/register actions
- Persistent session (localStorage)
- Auto-redirect on auth state change

**Prompt for /specify**:
```
Create frontend authentication store and integration specification.

Requirements:
- Auth store (packages/front/src/stores/auth.ts):
  - State: user (User | null), token (string | null), isAuthenticated (boolean), isLoading (boolean)
  - Actions:
    - login(email, password) - Call backend, store token
    - register(email, password, fullName) - Call backend, store token
    - logout() - Clear state, remove token
    - checkAuth() - Verify token, load user
  - Getters:
    - currentUser - Return user object
    - isLoggedIn - Boolean

- API service (packages/front/src/services/api/auth.ts):
  - POST /api/auth/register
  - POST /api/auth/login
  - POST /api/auth/logout
  - GET /api/auth/me
  - Axios interceptor to add Authorization header

- Session persistence:
  - Store token in localStorage
  - Check token on app initialization
  - Auto-logout if token invalid/expired

- Integration:
  - Call auth store actions from LoginView and RegisterView
  - Show toast notifications on success/error
  - Redirect to dashboard on successful login
  - Redirect to login on logout

Out of scope:
- Refresh token mechanism
- Remember me functionality (basic session only)
```

#### Spec 020: Protected Routes & Auth Guards
**What**: Route protection and auto-redirect based on auth state
**Deliverables**:
- Vue Router navigation guards
- Protected route meta field
- Auto-redirect to login if not authenticated
- Auto-redirect to dashboard if authenticated and accessing login

**Prompt for /specify**:
```
Create route protection specification for authenticated pages.

Requirements:
- Router configuration (packages/front/src/router/index.ts):
  - Public routes: /login, /register
  - Protected routes: All others (/, /projects, /issues, /profile)
  - Meta field: requiresAuth: boolean

- Navigation guards:
  - beforeEach guard:
    - If route requires auth AND user not logged in → redirect to /login
    - If route is /login or /register AND user logged in → redirect to /
    - Otherwise allow navigation

- Routes to create (minimal for MVP):
  - / (Dashboard - protected)
  - /login (public)
  - /register (public)
  - /projects (protected)
  - /projects/:id (protected)
  - /profile (protected)

- Integration:
  - Check auth store's isAuthenticated getter
  - Store intended route, redirect after login
  - Show loading spinner during auth check

Out of scope:
- Role-based route protection (admin vs user)
- Permission-based access (project members only)
```

---

### Phase 4: Project Management (Weeks 5-6)
**Goal**: Create, list, and view projects

#### Spec 021: Project List View
**What**: Dashboard showing all user's projects
**Deliverables**:
- Project list page (`ProjectsView.vue`)
- Project card grid layout
- "Create Project" button
- Empty state if no projects
- Loading state

**Prompt for /specify**:
```
Create project list view specification.

Requirements:
- ProjectsView page component:
  - Header: "Projects" + "Create Project" button (opens modal)
  - Grid of project cards (3 columns desktop, 2 tablet, 1 mobile)
  - Each card shows: project avatar/icon, name, key, member count
  - Click card → navigate to project detail page
  - Empty state: "No projects yet. Create your first project!" + Create button

- Project card:
  - Use UiCard component
  - Project avatar placeholder (colored circle with first letter of name)
  - Project name (truncate if too long)
  - Project key (e.g., "PROJ")
  - Small text: "X members"

- States:
  - Loading: Skeleton cards
  - Empty: Empty state component
  - Error: Error message with retry button
  - Success: Grid of cards

- API integration:
  - Fetch projects on mount: GET /api/projects
  - Store in projects Pinia store

Out of scope:
- Project search/filter (add later)
- Sorting options
- Project settings on this page
- Favorite/star projects
```

#### Spec 022: Create Project Modal & Backend
**What**: Form to create new project + backend endpoint
**Deliverables**:
- Create project modal component
- Form with project name, key, description
- Backend endpoint POST `/api/projects`
- Firestore integration

**Prompt for /specify**:
```
Create new project form and backend specification.

Requirements:
- CreateProjectModal component:
  - Use UiModal component
  - Form fields:
    - Project name (text input, required)
    - Project key (text input, 2-10 uppercase letters, required, auto-suggest from name)
    - Description (textarea, optional)
  - Validation:
    - Name: Required, 3-50 chars
    - Key: Required, 2-10 uppercase letters, unique (validate on backend)
    - Description: Max 500 chars
  - Submit button: "Create Project" (loading state)
  - Cancel button: Close modal

- Backend:
  - POST /api/projects
  - Body: { name, key, description }
  - Create project document in Firestore: projects/{projectId}
  - Set ownerId to current user
  - Set memberIds to [currentUserId]
  - Create owner as admin in projects/{projectId}/members/{userId} subcollection
  - Return created project

- Project model in Firestore:
  - id (auto-generated)
  - key (uppercase, unique validation)
  - name
  - description
  - ownerId (current user)
  - memberIds: [currentUserId]
  - isPrivate: false (default)
  - avatarUrl: null
  - createdAt, updatedAt

- Integration:
  - Call POST /api/projects
  - Update projects store
  - Close modal on success
  - Show success toast
  - Navigate to new project page

Out of scope:
- Project avatar upload
- Privacy settings (public/private)
- Initial member invitation
```

#### Spec 023: Project Detail Page
**What**: View project details and issue list
**Deliverables**:
- Project detail page (`ProjectView.vue`)
- Project header (name, key, description)
- Tab navigation (Issues, Board, Settings - only Issues implemented for now)
- Issue list (simplified)
- "Create Issue" button

**Prompt for /specify**:
```
Create project detail page specification.

Requirements:
- ProjectView page component (/projects/:id):
  - Route param: projectId
  - Fetch project: GET /api/projects/:id

- Project header:
  - Project avatar/icon (first letter)
  - Project name (large text)
  - Project key (gray text)
  - Description (smaller text below)
  - Members: Small avatar stack (first 3 members, + X more)

- Tab navigation:
  - Tabs: Issues (active), Board (disabled), Settings (disabled)
  - Only Issues tab clickable for MVP
  - Styled as underline tabs

- Issues section (simplified for now):
  - "Create Issue" button
  - Table/list of issues (just title, key, status for now)
  - Empty state: "No issues yet. Create your first issue!"
  - Each row clickable → navigate to issue detail

- Backend:
  - GET /api/projects/:id
  - Return project with member details
  - GET /api/projects/:id/issues
  - Return issues for project

Out of scope:
- Full issue management (separate phase)
- Board view
- Project settings
- Member management UI
```

---

### Phase 5: Issue Management (Weeks 7-8)
**Goal**: Create, view, edit, and list issues

#### Spec 024: Issue List Component
**What**: Sortable, filterable table of issues
**Deliverables**:
- Issue list component (`IssueList.vue`)
- Table with columns: Key, Title, Type, Status, Priority, Assignee
- Row click → navigate to issue detail
- Sort by columns
- Filter by status (tabs)

**Prompt for /specify**:
```
Create issue list component specification.

Requirements:
- IssueList component:
  - Props: projectId
  - Fetch issues: GET /api/projects/:projectId/issues

- Status filter tabs:
  - All | To Do | In Progress | Done
  - Show count for each tab
  - Filter issues client-side

- Table columns:
  - Key (e.g., PROJ-1) - small text
  - Title - main text, truncate if long
  - Type icon - small badge/icon (BUG, TASK, STORY)
  - Status badge - colored badge
  - Priority badge - colored badge
  - Assignee avatar - small avatar (or "Unassigned")

- Sorting:
  - Click column header to sort
  - Default sort: createdAt DESC (newest first)
  - Sort options: Key, Title, Status, Priority

- Row interaction:
  - Hover: light background
  - Click: Navigate to /issues/:issueId

- Empty state per filter:
  - "No issues in this status"

Out of scope:
- Advanced filtering (multiple filters)
- Pagination (load all issues for MVP)
- Bulk actions
- Drag to reorder
```

#### Spec 025: Create Issue Modal & Backend
**What**: Form to create new issue + backend endpoint
**Deliverables**:
- Create issue modal component
- Form with title, description, type, priority, status, assignee
- Backend endpoint POST `/api/projects/:projectId/issues`
- Auto-increment issue key

**Prompt for /specify**:
```
Create issue form and backend specification.

Requirements:
- CreateIssueModal component:
  - Use UiModal (size: lg)
  - Form fields:
    - Title (text input, required)
    - Description (textarea, optional for MVP - no rich text)
    - Type (select: Bug, Task, Story - default: Task)
    - Priority (select: Lowest, Low, Medium, High, Highest - default: Medium)
    - Status (select: To Do, In Progress, Done - default: To Do)
    - Assignee (select: project members dropdown - default: Unassigned)
  - Validation:
    - Title: Required, 5-200 chars
    - Description: Max 5000 chars
  - Submit: "Create Issue" button (loading state)
  - Cancel button

- Backend:
  - POST /api/projects/:projectId/issues
  - Body: { title, description, type, priority, status, assigneeId }
  - Create issue document in Firestore: projects/{projectId}/issues/{issueId}
  - Generate issue key: Fetch max issue number for project, increment
  - Key format: {PROJECT_KEY}-{NUMBER} (e.g., PROJ-1, PROJ-2)
  - Set reporterId to current user
  - Return created issue

- Issue model in Firestore:
  - id (auto-generated)
  - projectId
  - key (PROJECT-1, PROJECT-2, etc.)
  - title
  - description
  - type: 'BUG' | 'TASK' | 'STORY'
  - status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  - priority: 'LOWEST' | 'LOW' | 'MEDIUM' | 'HIGH' | 'HIGHEST'
  - assigneeId (nullable)
  - reporterId (current user)
  - createdAt, updatedAt

- Integration:
  - Call POST endpoint
  - Refresh issue list
  - Close modal on success
  - Show success toast
  - Optionally: Navigate to new issue detail page

Out of scope:
- Rich text description (use textarea)
- Due date
- Estimated hours
- Labels
- File attachments
- Parent/sub-task relationships
```

#### Spec 026: Issue Detail View
**What**: Full issue view with all details
**Deliverables**:
- Issue detail page (`IssueView.vue`)
- Issue header (title, key, type, status)
- Editable fields (inline or modal)
- Activity/comments section (placeholder for now)
- Backend GET `/api/issues/:id`

**Prompt for /specify**:
```
Create issue detail page specification.

Requirements:
- IssueView page component (/issues/:id):
  - Route param: issueId
  - Fetch issue: GET /api/issues/:id

- Page layout (2 columns):
  - Left column (main content, 70% width):
    - Breadcrumb: Project name > PROJ-1
    - Issue title (large, editable on click)
    - Description section (editable textarea)
    - Comments section (placeholder: "Comments coming soon")

  - Right column (sidebar, 30% width):
    - Type (select dropdown)
    - Status (select dropdown)
    - Priority (select dropdown)
    - Assignee (select dropdown)
    - Reporter (read-only, avatar + name)
    - Created (date, read-only)
    - Updated (date, read-only)

- Editing:
  - Click title → inline edit (input field, save/cancel)
  - Click description → textarea edit (save/cancel)
  - Sidebar fields: Dropdowns with immediate save on change
  - PATCH /api/issues/:id with changed fields

- Backend:
  - GET /api/issues/:id
  - Return issue with assignee and reporter user details (joined)
  - PATCH /api/issues/:id
  - Body: partial issue object (only changed fields)
  - Validate and update
  - Return updated issue

- States:
  - Loading: Skeleton
  - Error: "Issue not found" or error message
  - Success: Show issue

Out of scope:
- Comments (separate spec)
- Activity log
- File attachments
- Due date
- Time tracking
- Linked issues
```

---

### Phase 6: Kanban Board (Weeks 9-10)
**Goal**: Visual board with drag-and-drop

#### Spec 027: Kanban Board Layout
**What**: Board view with columns for each status
**Deliverables**:
- Board view page (`BoardView.vue`)
- Columns for To Do, In Progress, Done
- Issue cards in columns
- Column headers with issue count
- Empty column states

**Prompt for /specify**:
```
Create Kanban board layout specification.

Requirements:
- BoardView page component (/projects/:id/board):
  - Same project header as ProjectView
  - 3 columns: To Do, In Progress, Done
  - Each column:
    - Header: Status name + count badge
    - Scrollable card list
    - Empty state: "No issues"

- Board layout:
  - Horizontal 3-column layout (equal width)
  - Fixed header
  - Scrollable columns (vertical scroll if many issues)
  - Responsive: Stack columns on mobile

- Fetch data:
  - GET /api/projects/:projectId/issues
  - Group issues by status client-side

- Issue card (simplified):
  - UiCard with clickable prop
  - Issue key (small, top-left)
  - Issue title (main text)
  - Issue type icon
  - Priority icon
  - Assignee avatar (small, bottom-right)
  - Click card → navigate to issue detail

Out of scope:
- Drag and drop (next spec)
- Filters
- Swimlanes
- Create issue from board
```

#### Spec 028: Drag & Drop Functionality
**What**: Drag issues between columns to change status
**Deliverables**:
- VueDraggable integration
- Drag issue card to different column
- Optimistic UI update
- Backend PATCH to update status

**Prompt for /specify**:
```
Create drag-and-drop functionality for Kanban board.

Requirements:
- Integrate vue-draggable-next (Vue 3 compatible):
  - Wrap issue cards in each column with draggable component
  - Enable drag between columns
  - Show dragging state (opacity, cursor)

- Drag behavior:
  - User drags issue card from one column to another
  - Drop in column → update issue status
  - Optimistic update: Move card immediately
  - Call PATCH /api/issues/:id { status: newStatus }
  - On error: Revert move, show error toast

- Visual feedback:
  - Dragging: Card semi-transparent
  - Drop zone: Column background highlight
  - Smooth animations

- Backend:
  - PATCH /api/issues/:id
  - Body: { status }
  - Update issue status in Firestore
  - Return updated issue

- Edge cases:
  - Can't drag to same column (no-op)
  - Show loading state during API call
  - Handle API errors gracefully

Out of scope:
- Drag to reorder within column
- Multi-select drag
- Drag to assign
```

---

### Phase 7: Comments & Collaboration (Week 11)
**Goal**: Add comments to issues

#### Spec 029: Comments List Component
**What**: Display comments on issue detail page
**Deliverables**:
- Comments section on issue detail page
- Comment list component
- Comment item (user, timestamp, content)
- Backend GET `/api/issues/:issueId/comments`

**Prompt for /specify**:
```
Create comments display specification.

Requirements:
- Comments section in IssueView:
  - Below description
  - "Comments" heading
  - Comment list
  - Empty state: "No comments yet"

- CommentItem component:
  - User avatar
  - User name + timestamp (e.g., "2 hours ago")
  - Comment text (preserve line breaks)
  - Layout: Avatar left, content right

- Backend:
  - GET /api/issues/:issueId/comments
  - Return comments with user details (joined)
  - Sort by createdAt ASC (oldest first)

- Comment model in Firestore (projects/{projectId}/issues/{issueId}/comments/{commentId}):
  - id
  - issueId
  - userId
  - content (text)
  - createdAt, updatedAt

Out of scope:
- Edit/delete comments (add later)
- Rich text in comments
- @mentions
- Reactions
```

#### Spec 030: Add Comment Form
**What**: Form to post new comment
**Deliverables**:
- Add comment form below comments list
- Textarea + submit button
- Backend POST `/api/issues/:issueId/comments`

**Prompt for /specify**:
```
Create add comment form specification.

Requirements:
- AddCommentForm component:
  - Below comments list
  - Current user avatar
  - Textarea: "Add a comment..."
  - Submit button: "Comment" (disabled if empty)
  - Loading state during submit

- Validation:
  - Required: Not empty
  - Max 5000 characters

- Backend:
  - POST /api/issues/:issueId/comments
  - Body: { content }
  - Create comment in Firestore subcollection
  - Set userId to current user
  - Return created comment

- Integration:
  - Call POST endpoint
  - Add new comment to list (optimistic update or refetch)
  - Clear textarea on success
  - Show error toast on failure
  - Scroll to new comment

Out of scope:
- Rich text editor (use plain textarea)
- File attachments in comments
- Comment drafts
```

---

### Phase 8: Navigation & Polish (Week 12)
**Goal**: Complete app navigation and final polish

#### Spec 031: App Layout & Navigation
**What**: Main layout with header, sidebar, content area
**Deliverables**:
- App layout component (`AppLayout.vue`)
- Header with logo, project selector, user menu
- Sidebar navigation (collapsed on mobile)
- Responsive design

**Prompt for /specify**:
```
Create application layout and navigation specification.

Requirements:
- AppLayout component (wraps all authenticated pages):
  - Header (top, fixed):
    - Left: Logo/app name
    - Center: Project selector dropdown (if in project context)
    - Right: Search icon (disabled), notifications icon (disabled), user avatar + menu

  - User menu dropdown:
    - "Profile" (navigate to /profile)
    - "Settings" (disabled)
    - Divider
    - "Logout" (call logout action)

  - Sidebar (left, fixed, collapsible):
    - Navigation links:
      - Dashboard (/)
      - Projects (/projects)
    - Collapse button (hamburger icon)
    - Auto-collapse on mobile

  - Main content area:
    - Right of sidebar (or full width if sidebar collapsed)
    - Scrollable
    - Padding

- Responsive:
  - Desktop: Sidebar visible, header full
  - Tablet: Sidebar collapsed by default
  - Mobile: Sidebar as overlay/drawer

Out of scope:
- Global search
- Notifications
- Breadcrumbs (add in pages)
- Footer
```

#### Spec 032: Error Handling & Loading States
**What**: Consistent error and loading UI across app
**Deliverables**:
- Error page component (404, 500)
- Loading skeleton components
- Error boundary
- Toast for API errors

**Prompt for /specify**:
```
Create error handling and loading states specification.

Requirements:
- Error pages:
  - 404 NotFoundView: "Page not found" + back to dashboard button
  - 500 ErrorView: "Something went wrong" + retry button

- Loading components:
  - LoadingSpinner: Centered spinner (use in pages)
  - CardSkeleton: Skeleton for loading project/issue cards
  - TableSkeleton: Skeleton for loading tables

- Error boundary:
  - Vue error handler
  - Catch unhandled errors
  - Show error toast
  - Log to console (or error service)

- API error handling:
  - Axios interceptor for error responses
  - Show toast notification for errors
  - 401 Unauthorized: Logout and redirect to login
  - 403 Forbidden: Show "Access denied" toast
  - 500 Server error: Show "Server error" toast

Out of scope:
- Sentry/error tracking service
- Retry logic
- Offline detection
```

#### Spec 033: User Profile Page
**What**: View and edit user profile
**Deliverables**:
- Profile page (`ProfileView.vue`)
- Display user info (avatar, name, email)
- Edit profile form (name only for MVP)
- Backend PUT `/api/users/:id`

**Prompt for /specify**:
```
Create user profile page specification.

Requirements:
- ProfileView page component (/profile):
  - Display current user info:
    - Large avatar (with fallback to initials)
    - Full name
    - Email (read-only)
    - Member since (createdAt date)

  - Edit form:
    - Full name input (editable)
    - Save button
    - Cancel button (revert changes)

- Backend:
  - GET /api/users/:id (or /api/auth/me)
  - PUT /api/users/:id
  - Body: { fullName }
  - Update user in Firestore
  - Return updated user

- Integration:
  - Fetch user on mount
  - Submit form: PATCH current user
  - Update auth store
  - Show success toast

Out of scope:
- Avatar upload (add later)
- Password change
- Email change
- Delete account
```

---

## Summary of Specs

**✅ Phase 1: Design System - COMPLETED (4 specs)**
- ✅ 001: Storybook Setup (DONE)
- ✅ 002: Design System Foundation (DONE)
- ✅ 003: Palette Switcher (DONE)
- ✅ 004: UI Button Component (DONE)

**Phase 2: UI Components (11 specs remaining)**
- 005: Icon System (Material Icons)
- 006: UiTextField Component (includes multiline)
- 007: UiCheckbox Component
- 008: UiRadio Component
- 009: Card Component
- 010: Avatar Component
- 011: Badge Component
- 012: Dropdown/Menu Component
- 013: Select Component
- 014: Dialog Component
- 015: Snackbar Component

**Phase 3: Authentication (5 specs)**
- 016: Login Page UI
- 017: Register Page UI
- 018: Firebase Auth Backend
- 019: Auth Store & Integration
- 020: Protected Routes

**Phase 4: Projects (3 specs)**
- 021: Project List View
- 022: Create Project Modal & Backend
- 023: Project Detail Page

**Phase 5: Issues (3 specs)**
- 024: Issue List Component
- 025: Create Issue Modal & Backend
- 026: Issue Detail View

**Phase 6: Kanban Board (2 specs)**
- 027: Kanban Board Layout
- 028: Drag & Drop Functionality

**Phase 7: Comments (2 specs)**
- 029: Comments List
- 030: Add Comment Form

**Phase 8: Polish (3 specs)**
- 031: App Layout & Navigation
- 032: Error Handling & Loading
- 033: User Profile Page

**Total: 33 specs (4 completed ✅, 29 remaining)** 🎯

---

## How to Use This Plan

### Starting Each Spec
```bash
# Use the /specify command with the prompt provided in each spec
/specify
```

Then paste the prompt from the spec description.

### Completing Each Spec
Follow the constitution workflow:
1. Create spec with `/specify`
2. Get user approval
3. Create plan with `/plan`
4. Get user approval
5. Generate tasks with `/tasks`
6. Get user approval
7. Implement with `/implement`
8. Review and iterate

### Adjusting the Plan
- Specs can be reordered based on dependencies
- Some specs can be done in parallel (e.g., UI components)
- Timeline is flexible - adjust based on progress

---

**Next Step**: Start with **Spec 005: Icon System Setup** (Material Icons) to continue building the UI component library! 🚀
