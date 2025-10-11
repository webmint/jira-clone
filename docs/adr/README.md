# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records (ADRs) for the Jira Clone project.

## What is an ADR?

An Architecture Decision Record (ADR) captures an important architectural decision made along with its context and consequences.

## When to Create an ADR

Create an ADR when you make a decision that:
- Affects the structure, behavior, or non-functional characteristics of the system
- Is difficult or expensive to reverse
- Impacts multiple teams or components
- Has significant trade-offs

## ADR Format

Each ADR should follow this template (from Constitution Article X, Section 10.3):

1. **Title**: Short descriptive name
2. **Status**: Proposed/Accepted/Deprecated/Superseded
3. **Context**: Problem statement and constraints
4. **Decision**: What was decided
5. **Consequences**: Trade-offs and implications
6. **Alternatives Considered**: What else was evaluated

See [`template.md`](./template.md) for the full template.

## Naming Convention

ADRs are numbered sequentially:
- `001-nestjs-backend-framework.md`
- `002-firebase-for-database.md`
- `003-monorepo-structure.md`

## ADR Lifecycle

1. **Proposed**: Decision is being considered
2. **Accepted**: Decision is approved and should be implemented
3. **Deprecated**: Decision is no longer valid (explain why)
4. **Superseded**: Replaced by another ADR (reference the new ADR)

## Example ADRs to Create

Consider creating ADRs for these existing decisions:

- Why NestJS for backend?
- Why Vue 3 (not React/Angular)?
- Why Firebase (not PostgreSQL/MongoDB)?
- Why monorepo (not separate repos)?
- Why Tailwind CSS (not custom CSS/other framework)?
- Why Vitest/Jest (not other test frameworks)?
- Why Storybook for component development?

## Quick Start

To create a new ADR:

```bash
# Copy the template
cp docs/adr/template.md docs/adr/###-your-decision-title.md

# Edit the file
vim docs/adr/###-your-decision-title.md
```

## List of ADRs

<!-- Update this list as ADRs are created -->

- [Template](./template.md) - ADR template for reference

<!-- Example:
- [001 - NestJS Backend Framework](./001-nestjs-backend-framework.md)
- [002 - Firebase for Database](./002-firebase-for-database.md)
-->
