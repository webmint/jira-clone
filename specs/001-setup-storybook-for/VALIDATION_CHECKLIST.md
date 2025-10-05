# T013: Storybook Setup Validation Checklist

**Date**: 2025-10-05
**Feature**: 001-setup-storybook-for
**Task**: T013 - Validate Quickstart Scenarios

## Overview

This checklist validates all 10 quickstart scenarios from `quickstart.md` to ensure the Storybook setup is complete and functional.

## Prerequisites

- All tasks T001-T012 completed and merged
- Repository on spec branch: `001-setup-storybook-for`
- Dependencies installed: `npm install` in `front/` workspace

---

## Validation Scenarios

### ✅ Scenario 1: Storybook Installation Verification

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
   - [ ] `@storybook/vue3`
   - [ ] `@storybook/vue3-vite`
   - [ ] `@storybook/addon-essentials`
   - [ ] `@storybook/addon-a11y`
   - [ ] `@storybook/addon-interactions`
   - [ ] `@storybook/addon-themes`
   - [ ] `@storybook/test`
   - [ ] `@storybook/test-runner`
   - [ ] `storybook`

4. Verify Storybook scripts are in `package.json`:

   ```bash
   cat package.json | grep -A 3 '"scripts"'
   ```

5. Confirm these scripts exist:
   - [ ] `"storybook": "storybook dev -p 6006"`
   - [ ] `"build-storybook": "storybook build"`
   - [ ] `"test-storybook": "test-storybook"`

**Result**: [ ] PASS / [ ] FAIL

**Notes**:

---

### ✅ Scenario 2: Storybook Configuration Files

**Objective**: Verify that Storybook configuration files exist and are properly structured

**Steps**:

1. Check for `.storybook/` directory:

   ```bash
   ls -la .storybook/
   ```

2. Verify these files exist:
   - [ ] `.storybook/main.ts`
   - [ ] `.storybook/preview.ts`
   - [ ] `.storybook/test-runner.ts`

3. Inspect `main.ts` configuration:

   ```bash
   cat .storybook/main.ts
   ```

4. Verify `main.ts` contains:
   - [ ] Framework: `@storybook/vue3-vite`
   - [ ] Stories pattern: `../src/**/*.stories.@(js|jsx|ts|tsx)`
   - [ ] All required addons listed
   - [ ] TypeScript check enabled

5. Inspect `preview.ts` configuration:

   ```bash
   cat .storybook/preview.ts
   ```

6. Verify `preview.ts` contains:
   - [ ] Tailwind CSS import (`../src/style.css`)
   - [ ] Viewport configurations (mobile, tablet, desktop)
   - [ ] Default viewport set to 'mobile' (mobile-first)

**Result**: [ ] PASS / [ ] FAIL

**Notes**:

---

### ✅ Scenario 3: Start Storybook Dev Server

**Objective**: Verify that Storybook can start successfully

**Steps**:

1. Start Storybook from the `front/` workspace:

   ```bash
   npm run storybook
   ```

2. Wait for build to complete

3. Verify console output shows:
   - [ ] "Storybook started"
   - [ ] "Local: http://localhost:6006"
   - [ ] No error messages
   - [ ] Build completed in <5 seconds

4. Open browser and navigate to `http://localhost:6006`

5. Verify Storybook UI loads:
   - [ ] Sidebar visible
   - [ ] UiButton stories visible under "Atoms/UiButton"
   - [ ] No console errors in browser DevTools

**Result**: [ ] PASS / [ ] FAIL

**Notes**:

---

### ✅ Scenario 4: View Stories in Storybook

**Objective**: Verify that stories can be viewed and are interactive

**Steps**:

1. With Storybook running, navigate to "Atoms/UiButton" in sidebar

2. Verify all story variants are visible:
   - [ ] Primary
   - [ ] Secondary
   - [ ] Danger
   - [ ] Ghost
   - [ ] Small
   - [ ] Medium
   - [ ] Large
   - [ ] Disabled
   - [ ] Loading
   - [ ] LoadingSecondary
   - [ ] SubmitForm
   - [ ] CancelAction
   - [ ] ConfirmDelete
   - [ ] AddItem
   - [ ] ClickInteraction
   - [ ] KeyboardNavigation
   - [ ] DisabledNoClick
   - [ ] LoadingNoClick

3. Click on "Primary" story:
   - [ ] Button renders in canvas
   - [ ] Controls panel shows `label`, `variant`, `size`, `disabled`, `loading`
   - [ ] Docs tab shows auto-generated documentation

4. Test interactive controls:
   - [ ] Change label text → button updates
   - [ ] Change variant → button style changes
   - [ ] Change size → button size changes
   - [ ] Toggle disabled → button becomes disabled
   - [ ] Toggle loading → spinner appears

**Result**: [ ] PASS / [ ] FAIL

**Notes**:

---

### ✅ Scenario 5: Viewport Responsiveness

**Objective**: Verify mobile-first viewport configuration

**Steps**:

1. With Storybook running and a story open

2. Locate viewport toolbar button (usually top toolbar)

3. Click viewport dropdown

4. Verify these viewports are available:
   - [ ] Mobile (375px)
   - [ ] Tablet (768px)
   - [ ] Desktop (1440px)

5. Verify default viewport is "Mobile" (mobile-first)
   - [ ] Canvas defaults to mobile width

6. Switch to each viewport:
   - [ ] Click "Tablet" → canvas resizes to 768px width
   - [ ] Click "Desktop" → canvas resizes to 1440px width
   - [ ] Click "Mobile" → canvas resizes to 375px width

7. Verify component renders correctly at each viewport
   - [ ] Mobile: Button visible and properly sized
   - [ ] Tablet: Button visible and properly sized
   - [ ] Desktop: Button visible and properly sized

**Result**: [ ] PASS / [ ] FAIL

**Notes**:

---

### ✅ Scenario 6: Accessibility Testing

**Objective**: Verify accessibility addon is active and testing components

**Steps**:

1. With Storybook running and UiButton Primary story open

2. Open "Accessibility" tab in bottom panel

3. Verify axe-core accessibility checks are running:
   - [ ] Accessibility tab is visible
   - [ ] Results panel shows violations/passes

4. Check results:
   - [ ] Number of violations shown (should be 0 for compliant components)
   - [ ] Number of passes shown
   - [ ] Rules being checked (color-contrast, button-name, etc.)

5. Test all UiButton stories have 0 violations:
   - [ ] Primary: 0 violations
   - [ ] Secondary: 0 violations
   - [ ] Danger: 0 violations
   - [ ] Ghost: 0 violations

**Result**: [ ] PASS / [ ] FAIL

**Notes**:

---

### ✅ Scenario 7: Interaction Testing

**Objective**: Verify interaction testing capability with @storybook/test

**Steps**:

1. Navigate to "ClickInteraction" story

2. Verify "Interactions" panel appears at bottom

3. Watch the interaction play:
   - [ ] Panel shows interaction steps
   - [ ] "Click button" step executes
   - [ ] Green checkmark indicates success
   - [ ] No errors in interactions panel

4. Navigate to "KeyboardNavigation" story:
   - [ ] Interaction tests Tab focus
   - [ ] Interaction tests Enter key press
   - [ ] All tests pass

5. Navigate to "DisabledNoClick" story:
   - [ ] Tests that disabled button doesn't trigger onClick
   - [ ] All tests pass

6. Navigate to "LoadingNoClick" story:
   - [ ] Tests loading spinner present
   - [ ] Tests loading button doesn't trigger onClick
   - [ ] All tests pass

**Result**: [ ] PASS / [ ] FAIL

**Notes**:

---

### ✅ Scenario 8: Tailwind CSS Integration

**Objective**: Verify that Tailwind CSS styles are applied to stories

**Steps**:

1. With UiButton Primary story open

2. Inspect the rendered button element:
   - [ ] Right-click button in canvas
   - [ ] Select "Inspect Element"

3. Verify Tailwind utility classes are applied:
   - [ ] `inline-flex`, `items-center`, `justify-center`
   - [ ] `bg-blue-600`, `text-white`, `hover:bg-blue-700`
   - [ ] `px-4`, `py-2`, `rounded-lg`
   - [ ] `font-medium`, `transition-colors`

4. Verify computed styles in DevTools:
   - [ ] Background color: blue (#2563eb or similar)
   - [ ] Padding: 16px horizontal, 8px vertical
   - [ ] Border radius: applied
   - [ ] Font weight: 500 (medium)

5. Change variant to "Secondary":
   - [ ] Background changes to white
   - [ ] Border appears
   - [ ] Text color changes to gray

**Result**: [ ] PASS / [ ] FAIL

**Notes**:

---

### ✅ Scenario 9: Build Storybook for Production

**Objective**: Verify Storybook can build for static deployment

**Steps**:

1. Build Storybook:

   ```bash
   npm run build-storybook
   ```

2. Verify build completes successfully:
   - [ ] No errors in console
   - [ ] Build time <30 seconds
   - [ ] Output directory created: `storybook-static/`

3. Check build output:

   ```bash
   ls -la storybook-static/
   ```

4. Verify these files exist:
   - [ ] `index.html`
   - [ ] `iframe.html`
   - [ ] JavaScript bundles (`.js` files)
   - [ ] Asset files

5. Serve the built Storybook locally:

   ```bash
   npx http-server storybook-static -p 8080
   ```

6. Navigate to `http://localhost:8080`

7. Verify:
   - [ ] Storybook loads from static build
   - [ ] Stories are viewable
   - [ ] Interactions work
   - [ ] Accessibility tab works

**Result**: [ ] PASS / [ ] FAIL

**Notes**:

---

### ✅ Scenario 10: Hot Module Replacement (HMR)

**Objective**: Verify that component changes reload instantly

**Steps**:

1. Start Storybook dev server (if not running):

   ```bash
   npm run storybook
   ```

2. Open UiButton Primary story in browser

3. Note current appearance (blue button with "Primary Button" label)

4. Edit `UiButton.vue`:
   - Change line with `bg-blue-600` to `bg-green-600`
   - Save file

5. Measure time to see change in browser:
   - [ ] Change appears in <500ms
   - [ ] No full page reload
   - [ ] Story canvas updates automatically
   - [ ] Button is now green

6. Revert change:
   - Change `bg-green-600` back to `bg-blue-600`
   - Save file
   - [ ] Button returns to blue automatically

7. Edit `UiButton.stories.ts`:
   - Change `Primary` story label to "Updated Label"
   - Save file

8. Verify story updates without manual refresh:
   - [ ] Label updates automatically
   - [ ] HMR message in console

**Result**: [ ] PASS / [ ] FAIL

**Notes**:

---

## Overall Validation Summary

**Total Scenarios**: 10
**Passed**: **_
**Failed**: _**

### Acceptance Criteria

After completing all scenarios, verify:

- [ ] ✅ Storybook installed with all required dependencies
- [ ] ✅ Configuration files (main.ts, preview.ts, test-runner.ts) exist and valid
- [ ] ✅ Dev server starts successfully at http://localhost:6006
- [ ] ✅ Stories can be viewed and are interactive
- [ ] ✅ Mobile-first viewport configuration works (mobile, tablet, desktop)
- [ ] ✅ Tailwind CSS styles apply correctly in stories
- [ ] ✅ Accessibility addon detects violations automatically
- [ ] ✅ Interaction tests execute successfully
- [ ] ✅ Auto-documentation generates from stories
- [ ] ✅ HMR updates stories in <500ms
- [ ] ✅ Storybook builds successfully for production
- [ ] ✅ No console errors or warnings

---

## Issues Found

| Scenario | Issue Description | Severity | Status | Notes |
| -------- | ----------------- | -------- | ------ | ----- |
|          |                   |          |        |       |

---

## Sign-Off

**Validated By**: ********\_********
**Date**: ********\_********
**Status**: [ ] APPROVED / [ ] NEEDS FIXES

**Comments**:

---

## Next Steps

- [ ] If all scenarios PASS: Proceed with merging spec branch to main
- [ ] If any scenarios FAIL: Create issue tickets and fix before proceeding
- [ ] Update tasks.md to mark T013 as complete
- [ ] Create final PR from spec branch to main

---

_Based on quickstart.md validation requirements_
