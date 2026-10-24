# StokFlow — AI Agent Instructions

**Project:** StokFlow Inventory & Sales Management  
**Last Updated:** October 24, 2026

---

## Project Context

Client-specific web application (NOT SaaS) for inventory and sales management.

**Technology Stack:**
- React + Vite + TypeScript (Frontend)
- Express + Node.js + TypeScript (Backend)
- PostgreSQL + Prisma ORM (Database)
- Vitest + Playwright (Testing)

**Architecture:** Monorepo with modular monolith backend.

---

## Core Principles

1. **Security First:** Never compromise authentication, authorization, input validation, or transaction integrity.
2. **Client-Specific:** No multi-tenant SaaS features unless explicitly confirmed by client.
3. **Documentation-Driven:** Read PRD.md and architecture.md before implementing features.
4. **Test Everything:** All security-critical code must have tests.
5. **Explicit Over Implicit:** Ask for clarification rather than inventing business rules.

---

## Mandatory Requirements

### Security
- Hash passwords with Argon2id (never bcrypt, MD5, SHA-256)
- Enforce authentication on all protected endpoints
- Enforce authorization with role-based access control
- Validate all request inputs (backend, not just frontend)
- Use Prisma transactions for atomic sales + stock deductions
- Log audit trails for sensitive actions (immutable records)
- Never expose secrets via environment variables prefixed with `VITE_`

### Code Quality
- TypeScript strict mode, no `any` types
- Modular structure: routes → controllers → services → database
- Consistent error handling with centralized Express error handler
- RESTful API design with `/api/v1` base path

### Testing
- Unit tests for business logic
- Integration tests for API endpoints
- Security tests for authorization (negative cases)
- Concurrent operation tests for stock updates

### Database
- Use Prisma migrations (never manual schema changes)
- `Decimal` type for money, never floats
- Immutable inventory movements (no updates/deletes)
- Soft deletes or status flags for financial records

---

## Prohibited

- Hard-deleting sales or payment records
- Trusting client-provided prices, totals, roles, or permissions
- Skipping backend validation because frontend validates
- Using raw SQL without security review
- Committing secrets or `.env` files
- Running `prisma migrate reset` against production
- Inventing business rules not documented in PRD.md

---

## Workflow

1. Read PRD.md and architecture.md for context
2. Check todo.md for dependencies and status
3. Implement backend (API + validation + authorization + business logic)
4. Write tests (unit + integration + security)
5. Implement frontend (UI + API integration + error handling)
6. Run lint, typecheck, tests
7. Update documentation if design changes

---

## When Uncertain

- Check PRD.md for business requirements
- Check architecture.md for technical decisions
- Check SECURITY.md for security controls
- Ask the user for clarification (never guess)

---

**Reference:** See CLAUDE.md for detailed instructions.

---

**END OF AGENTS.md**
