# Quickstart: Storybook Setup Verification

**Feature**: 001-setup-storybook-for
**Date**: 2025-10-05

## Purpose

This guide provides step-by-step manual testing instructions to verify that Storybook is correctly set up and functional after implementation.

## Prerequisites

- All implementation tasks completed
- Node.js and npm installed
- Repository cloned and dependencies installed

## Test Scenarios

### Scenario 1: Storybook Installation Verification

**Objective**: Verify that Storybook is installed with all required dependencies

**Steps**:

1. Navigate to the `front/` workspace:

   ```bash
   cd front
   ```

2. Check that Storybook dependencies are in `package.json`:

   ```bash
   cat package.json | grep -A 10 '"devDependencies"'
   ```

3. Verify the following packages are listed:
   - `@storybook/vue3`
   - `@storybook/vue3-vite`
   - `@storybook/addon-essentials`
   - `@storybook/addon-a11y`
   - `@storybook/addon-interactions`
   - `@storybook/addon-themes`
   - `@storybook/test`
   - `@storybook/test-runner`
   - `storybook`

4. Verify Storybook scripts are in `package.json`:

   ```bash
   cat package.json | grep -A 3 '"scripts"'
   ```

5. Confirm these scripts exist:
   - `"storybook": "storybook dev -p 6006"`
   - `"build-storybook": "storybook build"`
   - `"test-storybook": "test-storybook"`

**Expected Result**: ✅ All dependencies and scripts are present

---

### Scenario 2: Storybook Configuration Files

**Objective**: Verify that Storybook configuration files exist and are properly structured

**Steps**:

1. Check for `.storybook/` directory:

   ```bash
   ls -la .storybook/
   ```

2. Verify these files exist:
   - `.storybook/main.ts`
   - `.storybook/preview.ts`

3. Inspect `main.ts` configuration:

   ```bash
   cat .storybook/main.ts
   ```

4. Verify `main.ts` contains:
   - Framework: `@storybook/vue3-vite`
   - Stories pattern: `../src/**/*.stories.@(js|jsx|ts|tsx)`
   - All required addons listed
   - TypeScript check enabled

5. Inspect `preview.ts` configuration:

   ```bash
   cat .storybook/preview.ts
   ```

6. Verify `preview.ts` contains:
   - Tailwind CSS import
   - Viewport configurations (mobile, tablet, desktop)
   - Default viewport set to 'mobile' (mobile-first)
   - Background color options

**Expected Result**: ✅ All configuration files exist with correct structure

---

### Scenario 3: Start Storybook Dev Server

**Objective**: Verify that Storybook can start successfully

**Steps**:

1. Start Storybook from the `front/` workspace:

   ```bash
   npm run storybook
   ```

2. Wait for build to complete

3. Verify console output shows:
   - "Storybook X.X.X started"
   - "Local: http://localhost:6006"
   - No error messages
   - Build completed in <2 seconds

4. Open browser and navigate to `http://localhost:6006`

5. Verify Storybook UI loads:
   - Sidebar visible
   - Welcome page or empty state shown
   - No console errors in browser DevTools

**Expected Result**: ✅ Storybook dev server starts and UI loads successfully

---

### Scenario 4: Create and View a Test Story

**Objective**: Verify that stories can be created and viewed

**Steps**:

1. Create a simple test component (if not exists):

   ```bash
   mkdir -p src/components/atoms/TestButton
   ```

2. Create `TestButton.vue`:

   ```vue
   <script setup lang="ts">
   defineProps<{
     label: string;
     variant?: 'primary' | 'secondary';
   }>();
   </script>

   <template>
     <button
       :class="[
         'px-4 py-2 rounded-lg font-medium',
         variant === 'secondary'
           ? 'bg-white text-gray-700 border border-gray-300'
           : 'bg-blue-500 text-white',
       ]"
     >
       {{ label }}
     </button>
   </template>
   ```

3. Create `TestButton.stories.ts`:

   ```typescript
   import type { Meta, StoryObj } from '@storybook/vue3';
   import TestButton from './TestButton.vue';

   const meta = {
     title: 'Atoms/TestButton',
     component: TestButton,
     tags: ['autodocs'],
   } satisfies Meta<typeof TestButton>;

   export default meta;
   type Story = StoryObj<typeof meta>;

   export const Primary: Story = {
     args: {
       label: 'Primary Button',
       variant: 'primary',
     },
   };

   export const Secondary: Story = {
     args: {
       label: 'Secondary Button',
       variant: 'secondary',
     },
   };
   ```

4. Verify Storybook auto-reloads (HMR)

5. Check Storybook sidebar:
   - "Atoms" folder appears
   - "TestButton" component listed under "Atoms"
   - "Primary" and "Secondary" stories visible

6. Click on "Primary" story:
   - Button renders in canvas
   - Controls panel shows `label` and `variant` controls
   - Docs tab shows auto-generated documentation

7. Click on "Secondary" story:
   - Button changes to secondary style
   - Controls update

**Expected Result**: ✅ Story is visible and interactive in Storybook

---

### Scenario 5: Viewport Responsiveness

**Objective**: Verify mobile-first viewport configuration

**Steps**:

1. With Storybook running and a story open

2. Locate viewport toolbar button (usually top toolbar)

3. Click viewport dropdown

4. Verify these viewports are available:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1440px)

5. Verify default viewport is "Mobile" (mobile-first)

6. Switch to each viewport:
   - Click "Tablet" → canvas resizes to 768px width
   - Click "Desktop" → canvas resizes to 1440px width
   - Click "Mobile" → canvas resizes to 375px width

7. Verify component renders correctly at each viewport

**Expected Result**: ✅ Viewport switching works and defaults to mobile

---

### Scenario 6: Accessibility Testing

**Objective**: Verify accessibility addon is active and testing components

**Steps**:

1. With Storybook running and TestButton story open

2. Open "Accessibility" tab in bottom panel

3. Verify axe-core accessibility checks are running

4. Check results:
   - Number of violations shown (should be 0 for compliant components)
   - Number of passes shown
   - Rules being checked (color-contrast, button-name, etc.)

5. Intentionally create an accessibility violation:
   - Modify TestButton to have white text on white background
   - Save and let Storybook reload

6. Verify "Accessibility" tab shows:
   - Violation detected
   - Clear error message
   - Highlight on failing element

7. Fix the violation and verify it disappears

**Expected Result**: ✅ Accessibility addon detects violations automatically

---

### Scenario 7: Interaction Testing

**Objective**: Verify interaction testing capability with @storybook/test

**Steps**:

1. Update `TestButton.stories.ts` to add an interaction test:

   ```typescript
   import { within, userEvent, expect } from '@storybook/test';

   export const Clicked: Story = {
     args: {
       label: 'Click Me',
       variant: 'primary',
     },
     play: async ({ canvasElement }) => {
       const canvas = within(canvasElement);
       const button = canvas.getByRole('button');
       await userEvent.click(button);
       await expect(button).toBeInTheDocument();
     },
   };
   ```

2. Save and let Storybook reload

3. Navigate to "Clicked" story

4. Verify "Interactions" panel appears at bottom

5. Watch the interaction play:
   - Step "Click button" executes
   - Green checkmark indicates success

6. Verify no errors in interactions panel

**Expected Result**: ✅ Interaction test runs and passes

---

### Scenario 8: Tailwind CSS Integration

**Objective**: Verify that Tailwind CSS styles are applied to stories

**Steps**:

1. With TestButton story open

2. Inspect the rendered button element:
   - Right-click button in canvas
   - Select "Inspect Element"

3. Verify Tailwind utility classes are applied:
   - `px-4`, `py-2`, `rounded-lg`, `font-medium`
   - `bg-blue-500`, `text-white` (for primary)

4. Verify computed styles in DevTools:
   - Padding: 16px (horizontal), 8px (vertical)
   - Background color: blue
   - Border radius: applied

5. Modify component to use different Tailwind classes:
   - Change to `bg-red-500`
   - Save and verify button turns red

**Expected Result**: ✅ Tailwind CSS works correctly in Storybook

---

### Scenario 9: Build Storybook for Production

**Objective**: Verify Storybook can build for static deployment

**Steps**:

1. Build Storybook:

   ```bash
   npm run build-storybook
   ```

2. Verify build completes successfully:
   - No errors in console
   - Build time <10 seconds
   - Output directory created: `storybook-static/`

3. Check build output:

   ```bash
   ls -la storybook-static/
   ```

4. Verify these files exist:
   - `index.html`
   - `iframe.html`
   - JavaScript bundles
   - Asset files

5. Serve the built Storybook locally:

   ```bash
   npx http-server storybook-static -p 8080
   ```

6. Navigate to `http://localhost:8080`

7. Verify:
   - Storybook loads from static build
   - Stories are viewable
   - Interactions work
   - Accessibility tab works

**Expected Result**: ✅ Storybook builds successfully and runs from static files

---

### Scenario 10: Hot Module Replacement (HMR)

**Objective**: Verify that component changes reload instantly

**Steps**:

1. Start Storybook dev server (if not running)

2. Open TestButton story in browser

3. Note current appearance (e.g., blue button)

4. Edit `TestButton.vue`:
   - Change background color to green
   - Save file

5. Measure time to see change in browser:
   - Should be <100ms
   - No full page reload
   - Story canvas updates automatically

6. Edit `TestButton.stories.ts`:
   - Change args label to "Updated Label"
   - Save file

7. Verify story updates without manual refresh

8. Check console for HMR messages

**Expected Result**: ✅ HMR works and updates appear in <100ms

---

## Acceptance Criteria Checklist

After completing all scenarios, verify:

- [ ] ✅ Storybook installed with all required dependencies
- [ ] ✅ Configuration files (main.ts, preview.ts) exist and valid
- [ ] ✅ Dev server starts successfully at http://localhost:6006
- [ ] ✅ Stories can be created and viewed
- [ ] ✅ Mobile-first viewport configuration works (mobile, tablet, desktop)
- [ ] ✅ Tailwind CSS styles apply correctly in stories
- [ ] ✅ Accessibility addon detects violations automatically
- [ ] ✅ Interaction tests can be written and executed
- [ ] ✅ Auto-documentation generates from stories
- [ ] ✅ HMR updates stories in <100ms
- [ ] ✅ Storybook builds successfully for production
- [ ] ✅ No console errors or warnings

## Validation Commands

Quick commands to verify setup:

```bash
# Check dependencies
cd front && npm list | grep storybook

# Verify config files exist
ls -la front/.storybook/

# Start Storybook
cd front && npm run storybook

# Build Storybook
cd front && npm run build-storybook

# Run tests
cd front && npm run test-storybook
```

## Troubleshooting

### Issue: Storybook won't start

**Check**:

- All dependencies installed: `npm install`
- No port conflicts: Port 6006 available
- TypeScript compiles: `npm run build`

### Issue: Stories not appearing

**Check**:

- File naming: Must be `*.stories.ts`
- File location: Must be under `src/`
- Default export: Must export meta object
- Glob pattern: Check `main.ts` stories array

### Issue: Tailwind styles not working

**Check**:

- CSS import in `preview.ts`
- Vite config includes Tailwind
- Tailwind directives in main CSS file

### Issue: Accessibility tab empty

**Check**:

- `@storybook/addon-a11y` installed
- Addon listed in `main.ts`
- Tab visible in bottom panel

## Success Metrics

Storybook setup is successful when:

- ✅ Dev server starts in <2 seconds
- ✅ Story HMR updates in <100ms
- ✅ All viewport sizes work correctly
- ✅ Accessibility checks run automatically
- ✅ Production build completes successfully
- ✅ No TypeScript errors in config files
- ✅ Design agent can create and preview components
- ✅ Frontend agent can reference stories for implementation

---

**Next Steps**: After verifying all scenarios pass, the Storybook setup is complete and ready for use by design and frontend agents.
