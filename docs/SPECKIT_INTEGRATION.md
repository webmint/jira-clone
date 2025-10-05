# Spec-Kit Integration Guide

## Overview

Your project uses **GitHub spec-kit**, which provides a structured framework for specification-driven development. This guide explains how to integrate our agent-based workflow with spec-kit's features.

## Spec-Kit Folder Structure

```
.claude/
└── agents/      # Claude-specific agent instruction files

.specify/
├── scripts/     # Automation and helper scripts
├── memory/      # Context and session persistence
└── templates/   # Reusable specification templates
```

---

## How Spec-Kit Folders Work

### `.specify/templates/`

**Purpose**: Store reusable specification templates

**Recommended Templates to Create:**

1. **Feature Specification Template**

```markdown
<!-- .specify/templates/feature-spec.md -->

# [Feature Name] Specification

## Overview

[Brief description]

## User Stories

- As a [role], I want to [action] so that [benefit]

## Technical Requirements

### Frontend

- [Requirements]

### Backend

- [Requirements]

### Common

- [Shared types needed]

## API Contracts

[API specifications]

## Data Models

[Firestore collections/documents]

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Dependencies

- Depends on: #[issue]
- Blocks: #[issue]

## Out of Scope

[What's not included]
```

2. **ADR Template**

```markdown
<!-- .specify/templates/adr.md -->

# ADR-XXX: [Title]

**Status**: [Proposed | Accepted | Deprecated]
**Date**: YYYY-MM-DD
**Deciders**: [Names]

## Context

[Issue description]

## Decision

[What was decided]

## Consequences

### Positive

- [Benefit 1]

### Negative

- [Drawback 1]

## Alternatives Considered

1. [Alternative 1] - [Why rejected]
```

3. **Design Specification Template**

```markdown
<!-- .specify/templates/design-spec.md -->

# [Feature] - Design Specification

## Overview

[Brief description]

## Page Layout

[ASCII mockup or description]

## Components Needed

### ComponentName

- Purpose: [Description]
- Props: [List]
- States: [List]
- Tailwind Classes: [Specific classes]

## Interaction Patterns

[User flows and interactions]

## Responsive Behavior

- Mobile: [Changes]
- Tablet: [Changes]
- Desktop: [Default]

## Accessibility Requirements

[WCAG compliance notes]
```

### `.specify/memory/`

**Purpose**: Maintain context and state across work sessions

**How It Works:**

- Spec-kit can store information about:
  - Current feature being worked on
  - Recent decisions made
  - Active issues and PRs
  - Context from previous conversations

**Best Practices:**

- Let spec-kit manage this folder automatically
- Don't manually edit unless you understand the structure
- Review memory files periodically to ensure accuracy

**Example Memory Structure:**

```
.specify/memory/
├── current-sprint.json      # Active sprint context
├── active-features.json     # Features in progress
└── recent-decisions.json    # Recent ADRs and choices
```

### `.specify/scripts/`

**Purpose**: Automation and workflow helpers

**Recommended Scripts to Create:**

1. **Create Feature Spec from Template**

```bash
#!/bin/bash
# .specify/scripts/new-feature.sh

FEATURE_NAME=$1
AGENT=$2

if [ -z "$FEATURE_NAME" ]; then
  echo "Usage: ./new-feature.sh <feature-name> <agent>"
  exit 1
fi

# Create spec from template
mkdir -p .specify/specs/$FEATURE_NAME
cp .specify/templates/feature-spec.md .specify/specs/$FEATURE_NAME/spec.md

# Create GitHub issue
echo "Creating GitHub issue..."
# gh issue create --title "[Spec] $FEATURE_NAME" --assignee $AGENT

echo "Feature spec created: .specify/specs/$FEATURE_NAME/spec.md"
```

2. **Generate Agent Report**

```bash
#!/bin/bash
# .specify/scripts/agent-report.sh

AGENT=$1

echo "=== $AGENT Agent Report ==="
echo ""
echo "Active Issues:"
gh issue list --assignee $AGENT --state open
echo ""
echo "Recent PRs:"
gh pr list --author $AGENT --limit 5
```

3. **Sync Spec to Docs**

```bash
#!/bin/bash
# .specify/scripts/sync-specs.sh

# Copy specs from .specify to docs for better visibility
rsync -av --delete .specify/specs/ docs/specs/

echo "Specs synced to docs/specs/"
```

---

## Integration with Agent Workflow

### Architecture Agent + Spec-Kit

**When creating specifications:**

```bash
# 1. Use spec-kit template
cp .specify/templates/feature-spec.md .specify/specs/auth/authentication.md

# 2. Fill in the specification
# Edit .specify/specs/auth/authentication.md

# 3. Create GitHub issue from spec
gh issue create --title "[Spec] User Authentication" \
                --body-file .specify/specs/auth/authentication.md \
                --label "spec,architecture,phase-1"

# 4. Store context in memory (if using spec-kit features)
# This helps maintain context for next session
```

**Specification Location Strategy:**

**Option 1: Primary in `.specify/`**

```
.specify/specs/
├── auth/
│   ├── authentication.md
│   └── authorization.md
├── projects/
│   └── project-management.md
└── issues/
    └── issue-tracking.md
```

**Option 2: Primary in `docs/`, Link from `.specify/`**

```
docs/specs/
├── auth/
│   └── authentication.md

.specify/specs/
└── auth/
    └── README.md  → "See docs/specs/auth/authentication.md"
```

**Recommendation**: Use Option 1 if you're heavily using spec-kit features, Option 2 if you prefer traditional documentation structure.

### Design Agent + Spec-Kit

**Creating design specifications:**

```bash
# Use design template
cp .specify/templates/design-spec.md .specify/specs/auth/design.md

# Fill in design details
# Edit with Design Agent guidance

# Link to issue
gh issue comment <issue-number> --body "Design spec: .specify/specs/auth/design.md"
```

### All Agents + Memory

**Leveraging Context:**

When starting a work session:

```bash
# Check what was being worked on
cat .specify/memory/current-sprint.json

# Check recent decisions
cat .specify/memory/recent-decisions.json
```

When ending a work session:

```bash
# Update context (if not automatic)
echo '{"feature": "authentication", "status": "in-progress", "next": "implement-backend"}' \
  > .specify/memory/current-context.json
```

---

## Recommended Workflow with Spec-Kit

### 1. Starting a New Feature

```bash
# Architecture Agent creates spec
./specify/scripts/new-feature.sh authentication architecture

# Edit the generated spec
vim .specify/specs/authentication/spec.md

# Create GitHub issue
gh issue create --title "[Spec] Authentication" \
                --body-file .specify/specs/authentication/spec.md

# Store in memory
# (spec-kit may do this automatically)
```

### 2. During Development

```bash
# Check current context
cat .specify/memory/current-sprint.json

# Each agent references the spec
cat .specify/specs/authentication/spec.md

# Update memory as work progresses
# (can be manual or automatic)
```

### 3. Completing a Feature

```bash
# Generate report
.specify/scripts/agent-report.sh backend

# Sync specs to docs for archival
.specify/scripts/sync-specs.sh

# Update memory to clear completed work
```

---

## File Organization Best Practices

### Recommended Structure

```
jira-clone/
├── .claude/
│   └── agents/              # Claude agent instructions (permanent)
│       ├── architecture.md
│       ├── backend.md
│       ├── frontend.md
│       ├── common.md
│       ├── devops.md
│       ├── testing.md
│       └── design.md
├── .specify/
│   ├── templates/           # Reusable templates
│   │   ├── feature-spec.md
│   │   ├── adr.md
│   │   └── design-spec.md
│   ├── scripts/             # Automation
│   │   ├── new-feature.sh
│   │   ├── agent-report.sh
│   │   └── sync-specs.sh
│   ├── memory/              # Context (managed by spec-kit)
│   │   ├── current-sprint.json
│   │   └── active-features.json
│   └── specs/               # Active feature specs
│       ├── auth/
│       ├── projects/
│       └── issues/
├── docs/
│   ├── design/              # Design system (permanent)
│   ├── decisions/           # ADRs (archived)
│   └── specs/               # Archived/published specs (optional)
├── SPECIFICATION.md         # Main project spec (permanent)
└── README.md
```

### What Goes Where

| Content Type         | Location                 | Reason                  |
| -------------------- | ------------------------ | ----------------------- |
| Agent instructions   | `.claude/agents/`        | Claude-specific prompts |
| Active feature specs | `.specify/specs/`        | Working documents       |
| Templates            | `.specify/templates/`    | Reusable templates      |
| Context/Memory       | `.specify/memory/`       | Session state           |
| Automation scripts   | `.specify/scripts/`      | Workflow helpers        |
| Design system        | `docs/design/`           | Permanent reference     |
| ADRs                 | `docs/decisions/`        | Historical record       |
| Main spec            | Root `SPECIFICATION.md`  | Project overview        |
| Archived specs       | `docs/specs/` (optional) | Historical reference    |

---

## Integration Checklist

- [ ] `.claude/agents/` folder exists with agent instructions
- [ ] `.specify/` folder exists (created by spec-kit)
- [ ] Created feature spec template in `.specify/templates/`
- [ ] Created ADR template in `.specify/templates/`
- [ ] Created design spec template in `.specify/templates/`
- [ ] Created automation scripts in `.specify/scripts/`
- [ ] Understand what `.specify/memory/` is for
- [ ] Decided on spec location strategy (Option 1 or 2)
- [ ] Updated agent instructions are in `.claude/agents/`
- [ ] All agents know where to find/create specs

---

## Tips for Using Spec-Kit

### 1. Template Consistency

Use templates consistently across all features to maintain uniform documentation.

### 2. Memory Hygiene

Periodically review `.specify/memory/` to ensure context is accurate.

### 3. Script Automation

Create scripts for repetitive tasks (creating issues, syncing docs, generating reports).

### 4. Spec Lifecycle

```
Draft (.specify/specs/) → Review → Implement → Archive (docs/specs/)
```

### 5. Integration with GitHub

Use spec-kit templates when creating GitHub issues for consistency.

---

## Troubleshooting

**Issue**: Spec-kit folders not present

- **Solution**: Initialize spec-kit in your project

**Issue**: Memory files getting stale

- **Solution**: Clear `.specify/memory/` or update manually

**Issue**: Scripts not executable

- **Solution**: `chmod +x .specify/scripts/*.sh`

**Issue**: Confusion about where to put specs

- **Solution**: Pick Option 1 or Option 2 and stick with it consistently

---

## Summary

**Spec-Kit provides:**

- ✅ Templates for consistent specifications
- ✅ Memory for context persistence
- ✅ Scripts for workflow automation

**Integration with our workflow:**

- ✅ Architecture Agent uses `.specify/templates/` for specs
- ✅ Design Agent uses `.specify/templates/` for designs
- ✅ All agents reference specs in `.specify/specs/`
- ✅ Context maintained in `.specify/memory/`
- ✅ Automation via `.specify/scripts/`

**Result:**
A structured, consistent, and efficient specification-driven development process powered by spec-kit! 🚀
