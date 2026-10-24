# StokFlow Coding Standards

---

## TypeScript

- **Strict Mode:** Always enabled (`strict: true`)
- **No `any`:** Use `unknown` if type is truly unknown
- **Type Imports:** Use `import type` for type-only imports
- **Naming:**
  - Interfaces: PascalCase (e.g., `User`, `Product`)
  - Types: PascalCase (e.g., `UserId`, `UserRole`)
  - Classes: PascalCase (e.g., `ProductService`)
  - Functions/variables: camelCase (e.g., `createProduct`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_LOGIN_ATTEMPTS`)
  - Files: kebab-case (e.g., `product.service.ts`)

---

## Backend Structure

```
modules/<domain>/
├── <domain>.routes.ts      # Express route definitions
├── <domain>.controller.ts  # Request/response handling
├── <domain>.service.ts     # Business logic (main layer)
├── <domain>.validation.ts  # Request validation schemas
└── <domain>.types.ts       # Domain-specific types
```

**Layering:**
- Routes → Controllers → Services → Database (Prisma)
- Business logic lives in Services, NOT controllers
- Controllers only handle request parsing and response formatting

---

## Validation

- **All Inputs:** Validate on backend using express-validator or zod
- **Never Trust Client:** Even if frontend validates, backend MUST validate
- **Return 400:** With structured error details on validation failure

---

## Error Handling

- **Custom Errors:** Use error classes (`ValidationError`, `NotFoundError`, etc.)
- **Centralized Handler:** Express error middleware catches all errors
- **Safe Messages:** Never expose stack traces or internal errors to client
- **Logging:** Log detailed errors server-side with request correlation IDs

---

## Security Practices

- **Authentication:** Check on every protected route
- **Authorization:** Verify user role and resource access
- **Transactions:** Use Prisma `$transaction` for atomic operations
- **Audit Logs:** Log all sensitive actions immutably
- **Passwords:** Hash with Argon2id, never log passwords or tokens

---

## Testing Requirements

- **Unit Tests:** Business logic in services
- **Integration Tests:** API endpoints with test database
- **Security Tests:** Unauthorized access (must return 401/403)
- **Coverage:** Critical paths and error cases

**Test Naming:** Use descriptive names
```typescript
it('should return 400 when SKU is missing', async () => { ... })
it('should reject product creation by Cashier role', async () => { ... })
```

---

## Database

- **Migrations:** Use `prisma migrate` only, never manual SQL
- **Money:** Use `Decimal` type, never floats
- **Constraints:** Enforce foreign keys, unique constraints, check constraints
- **Immutability:** Inventory movements and audit logs cannot be updated/deleted

---

## Code Quality

- **Lint:** Fix all ESLint errors before committing
- **Format:** Use Prettier for consistent formatting
- **Type Check:** Fix all TypeScript errors
- **No Debug Code:** Remove console.log before committing

---

## Documentation

- **Comments:** Explain "why", not "what"
- **API Docs:** Document request/response schemas, errors, auth requirements
- **README:** Update when setup changes or new commands added

---

## Git Commits

**Format:** `<type>(<scope>): <subject>`

**Types:** feat, fix, docs, style, refactor, test, chore, security

**Example:**
```
feat(products): add product creation endpoint
security(auth): add rate limiting to login
```

---

## Prohibited

- Using `any` type
- Skipping backend validation
- Trusting client-provided sensitive data (prices, roles, etc.)
- Hard-deleting financial records
- Committing secrets or `.env` files
- Running destructive commands in production

---

## Definition of Done

- ✅ Feature implements PRD requirements
- ✅ Backend validation and authorization enforced
- ✅ Tests written and passing (unit + integration + security)
- ✅ Lint and type-check passing
- ✅ No debug code left in
- ✅ Documentation updated
- ✅ Manually tested in dev

---

**Reference:** See skill.md for detailed technical standards.
