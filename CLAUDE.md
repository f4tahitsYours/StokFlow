# StokFlow — Instructions for Claude Code

**Project:** StokFlow — Client-Specific Inventory & Sales Management System  
**Type:** Custom Web Application (NOT SaaS)  
**Last Updated:** October 24, 2026

---

## Project Overview

StokFlow is a client-specific web application for inventory and sales management. It tracks products, stock movements, customer information, sales transactions, payments, and generates reports.

**Stack:**
- Frontend: React + Vite + TypeScript
- Backend: Express + Node.js + TypeScript
- Database: PostgreSQL + Prisma ORM
- Testing: Vitest + Playwright

**Architecture:** Modular monolith with separate frontend and backend applications in a monorepo.

---

## Authoritative Documentation

Before implementing any feature, read:
1. **PRD.md** — Business requirements, user stories, open questions
2. **architecture.md** — System design, component boundaries, API conventions
3. **SECURITY.md** — Security controls checklist and verification status
4. **todo.md** — Implementation roadmap with phases and dependencies

When requirements are unclear, consult PRD.md first. If not documented, ask the user for clarification rather than inventing assumptions.

---

## Critical Architecture Rules

### Frontend Responsibilities
- Render UI, handle user interactions, call backend APIs
- **NEVER** include database credentials or server secrets
- **NEVER** use `VITE_` environment variables for secrets (they are exposed to browser)
- Authorization enforcement is backend-only; frontend only hides UI for UX

### Backend Responsibilities
- Authenticate and authorize all requests
- Validate all inputs (never trust client data)
- Enforce all business rules
- Manage transactions (atomic sales + stock deductions)
- Log audit trails for sensitive actions
- Return safe error messages (no stack traces to client)

### Database Rules
- Use Prisma migrations for all schema changes (never manual SQL DDL)
- Use `Decimal` type for money, never floats
- Enforce foreign keys and unique constraints
- Financial records (sales, payments) should not be hard-deleted
- Inventory movements are immutable (no updates/deletes)

---

## Security Requirements (MANDATORY)

### Authentication
- Hash passwords with **Argon2id** (node-argon2 package)
- Use HttpOnly, Secure, SameSite=Strict cookies for sessions
- Rate-limit login endpoint (5 attempts per 15 minutes per IP)
- Never log passwords or tokens

### Authorization
- Enforce role-based access control on **every protected endpoint**
- Check authorization in middleware or service layer, not just frontend
- Prevent IDOR: validate resource ownership/access before returning data
- Test negative cases: unauthorized users must be rejected with 403

### Input Validation
- Validate all request bodies with schemas (express-validator or zod)
- SQL injection prevented by Prisma (never use raw SQL without review)
- XSS prevented by React (never use `dangerouslySetInnerHTML` without sanitization)

### API Security
- Use CORS with explicit origin allowlist (no wildcard in production)
- Set security headers: CSP, HSTS, X-Content-Type-Options, X-Frame-Options
- Rate-limit all endpoints
- Use HTTPS in production

### Transactions
- Sales + stock deductions must be atomic (use Prisma `$transaction`)
- If any item cannot be fulfilled, entire sale must be rolled back
- Test concurrent operations and race conditions

---

## Development Workflow

### For Every Feature:
1. Read relevant sections of PRD.md and architecture.md
2. Clarify open questions with the user (don't invent business rules)
3. Implement backend first (API endpoint + business logic + validation)
4. Write tests (unit + integration + security negative tests)
5. Implement frontend (UI + API integration)
6. Run lint, type-check, and tests before committing
7. Update documentation if design changes

### Testing Requirements:
- **Unit tests:** Business logic in services
- **Integration tests:** API endpoints with test database
- **Security tests:** Unauthorized access, privilege escalation, IDOR
- **E2E tests:** Critical user journeys (login, create sale, record payment)

Never skip tests for authentication, authorization, or transactional operations.

---

## Code Quality Standards

### TypeScript
- Use strict mode
- No `any` types (use `unknown` if type is truly unknown)
- Prefer interfaces for object shapes, types for unions/intersections
- Export types alongside implementations

### Naming Conventions
- Files: kebab-case (e.g., `product.service.ts`)
- Classes: PascalCase (e.g., `ProductService`)
- Functions/variables: camelCase (e.g., `createProduct`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_LOGIN_ATTEMPTS`)
- Database tables: snake_case (Prisma convention)

### Error Handling
- Use centralized Express error handler
- Log errors with request correlation IDs
- Return consistent error format:
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "...",
      "details": [ ... ]
    }
  }
  ```
- Never expose stack traces or internal errors to clients

### Module Organization (Backend)
```
modules/<domain>/
├── <domain>.routes.ts      # Route definitions
├── <domain>.controller.ts  # Request/response handling
├── <domain>.service.ts     # Business logic
├── <domain>.validation.ts  # Request schemas
└── <domain>.types.ts       # Domain types
```

---

## Commands (once project is initialized)

**Development:**
- `npm run dev` — Start both frontend and backend in dev mode
- `npm run dev:web` — Start frontend only
- `npm run dev:server` — Start backend only

**Type Checking:**
- `npm run typecheck` — Check TypeScript across workspace

**Linting:**
- `npm run lint` — Lint all code
- `npm run lint:fix` — Auto-fix linting issues

**Testing:**
- `npm run test` — Run all tests
- `npm run test:server` — Backend tests only
- `npm run test:web` — Frontend tests only

**Database:**
- `npm run db:migrate:dev` — Create and apply migration
- `npm run db:studio` — Open Prisma Studio
- `npm run db:seed` — Seed test data (if seed script exists)

**Build:**
- `npm run build` — Build frontend and backend for production

---

## Prohibited Actions

**DO NOT:**
- Commit secrets, credentials, or `.env` files to Git
- Use `npm audit fix --force` without review (may break dependencies)
- Run destructive database commands (`prisma migrate reset`, `DROP TABLE`) against production
- Skip authentication or authorization checks "temporarily"
- Hard-delete financial records (sales, payments) — use soft deletes or status flags
- Create microservices, multi-tenant SaaS infrastructure, or unnecessary abstractions
- Add features not in PRD.md without user confirmation
- Invent business rules (payment policies, stock policies) without clarification

**ALWAYS:**
- Read relevant documentation before implementing
- Ask for clarification when requirements are ambiguous
- Write tests for security-critical functionality
- Validate inputs on the backend
- Use transactions for atomic operations
- Log audit trails for sensitive actions
- Update documentation when design changes

---

## Definition of Done

A feature is complete when:
1. ✅ Backend endpoint implemented with validation and authorization
2. ✅ Frontend UI implemented with error handling
3. ✅ Unit and integration tests written and passing
4. ✅ Security tests pass (authorization, input validation)
5. ✅ Lint and type-check pass with no errors
6. ✅ Documentation updated (if applicable)
7. ✅ Code reviewed (if team workflow requires it)
8. ✅ Tested manually in dev environment

For security-critical features (auth, transactions), also require:
- ✅ Negative test cases pass (unauthorized access rejected)
- ✅ Concurrent operation tests pass (if applicable)
- ✅ Audit logging verified

---

## Contact & Escalation

When blocked or uncertain:
1. Check PRD.md and architecture.md for documented decisions
2. Check todo.md for dependencies and open questions
3. Ask the user for clarification (do not guess business rules)
4. If a security concern arises, flag it immediately

---

**END OF CLAUDE CODE INSTRUCTIONS**
