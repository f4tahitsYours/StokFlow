# StokFlow Architecture Guidelines

---

## Component Boundaries

### Frontend (`apps/web/`)
- **Responsibilities:** UI rendering, user interaction, API calls
- **NOT Responsible:** Authentication enforcement, authorization enforcement, business logic, direct database access
- **Environment:** NEVER include secrets in `VITE_` variables (they are exposed to browser)

### Backend (`apps/server/`)
- **Responsibilities:** Authentication, authorization, input validation, business logic, transactions, audit logging
- **Security:** Every protected endpoint MUST enforce authentication and authorization
- **Transactions:** Use Prisma `$transaction` for atomic operations (sales + stock)

### Database (PostgreSQL + Prisma)
- **Migrations:** Use `prisma migrate` only, never manual DDL
- **Money:** Use `Decimal` type, never floats
- **Integrity:** Enforce foreign keys, unique constraints, check constraints

---

## API Conventions

- **Base URL:** `/api/v1`
- **Authentication:** Required for all protected endpoints
- **Authorization:** Role-based, enforced on backend
- **Validation:** All inputs validated with schemas
- **Errors:** Consistent format, safe messages (no stack traces to client)
- **Responses:** JSON with `{ success: true/false, data/error: ... }` format

---

## Security Boundaries

- **Frontend is NOT a security boundary:** Never trust client-provided prices, totals, roles, or permissions
- **Backend validates everything:** All inputs, all permissions, all business rules
- **Transactions are atomic:** Sales + stock deductions use database transactions
- **Audit logs are immutable:** No updates or deletes

---

## Module Organization

Backend modules follow this structure:
```
modules/<domain>/
├── <domain>.routes.ts      # Express routes
├── <domain>.controller.ts  # Request handling
├── <domain>.service.ts     # Business logic
├── <domain>.validation.ts  # Input schemas
└── <domain>.types.ts       # Domain types
```

---

## Non-Goals

- Microservices architecture
- Multi-tenant SaaS features (unless confirmed by client)
- Premature abstractions
- Overengineered patterns

Keep it simple, secure, and maintainable.
