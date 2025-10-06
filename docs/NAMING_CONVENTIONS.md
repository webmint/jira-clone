# Naming Conventions

## File and Folder Naming

### General Rule: camelCase

All files and folders should use **camelCase** naming convention unless specified otherwise below.

#### Examples:

✅ **Correct:**

- `designSystem/` (folder)
- `userService.ts` (file)
- `authHelpers.ts` (file)
- `tokenValidation.ts` (file)

❌ **Incorrect:**

- `design-system/` (kebab-case)
- `user_service.ts` (snake_case)
- `AuthHelpers.ts` (PascalCase for non-components)

### Exceptions:

#### 1. Vue Components: PascalCase

Vue single-file components use **PascalCase**:

- `UserCard.vue` ✅
- `LoginForm.vue` ✅
- `DashboardLayout.vue` ✅

#### 2. Configuration Files: Any Case

Configuration files can use any standard naming:

- `vite.config.ts`
- `tsconfig.json`
- `package.json`
- `.eslintrc.cjs`

#### 3. Type Definition Files: camelCase with .d.ts

- `types.d.ts`
- `global.d.ts`
- `environment.d.ts`

#### 4. Test Files: Match Source File Name

Test files should match their source file naming:

- `userService.ts` → `userService.spec.ts`
- `UserCard.vue` → `UserCard.spec.ts`

#### 5. Storybook Stories: Match Component Name

- `UserCard.vue` → `UserCard.stories.ts`
- For MDX: `Colors.stories.mdx`

## Variable and Function Naming

### TypeScript/JavaScript

- **Variables and functions**: camelCase

  ```typescript
  const userId = 123;
  function getUserData() {}
  ```

- **Classes and Interfaces**: PascalCase

  ```typescript
  class UserService {}
  interface UserData {}
  type UserRole = 'admin' | 'user';
  ```

- **Constants**: UPPER_SNAKE_CASE (for true constants)

  ```typescript
  const MAX_RETRY_COUNT = 3;
  const API_BASE_URL = 'https://api.example.com';
  ```

- **Enums**: PascalCase (name) and UPPER_SNAKE_CASE (values)
  ```typescript
  enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
  }
  ```

### Vue Components

- **Component names**: PascalCase (in both script and template)

  ```vue
  <template>
    <UserCard :user="currentUser" />
  </template>

  <script setup lang="ts">
  import UserCard from './UserCard.vue';
  </script>
  ```

- **Props**: camelCase

  ```typescript
  defineProps<{
    userId: string;
    isActive: boolean;
  }>();
  ```

- **Events**: camelCase with verb prefix
  ```typescript
  const emit = defineEmits<{
    updateUser: [userId: string];
    deleteUser: [userId: string];
  }>();
  ```

## CSS/SCSS Naming

### Utility Classes (Tailwind CSS)

Follow Tailwind's conventions (kebab-case):

- `bg-primary-500`
- `text-gray-900`

### Custom CSS Classes: camelCase

When writing custom CSS classes:

```css
.userCard {
  /* styles */
}

.userCardTitle {
  /* styles */
}
```

## Design System Specific

### Design Tokens

- **File names**: camelCase
  - `referenceTokens.ts`
  - `systemTokens.ts`
  - `corporateTrustPalette.ts`

### Storybook Organization

- **Story folders**: camelCase
  - `designSystem/`
  - `storybook/`

- **Story files**: PascalCase.stories.(ts|mdx)
  - `Colors.stories.mdx`
  - `Typography.stories.mdx`
  - `Button.stories.ts`

## Enforcement

1. **Manual Code Review**: All PRs must follow these conventions
2. **ESLint Comments**: See `.eslintrc.cjs` for documented conventions
3. **Pre-commit Hooks**: Prettier enforces consistent formatting
4. **Future**: Consider adding automated linting rule (eslint-plugin-unicorn)

## References

- [Vue.js Style Guide](https://vuejs.org/style-guide/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
