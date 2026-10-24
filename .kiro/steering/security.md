# StokFlow Security Requirements

**These are MANDATORY security controls. Never compromise on these.**

---

## Authentication

- **Password Hashing:** Use Argon2id ONLY (node-argon2 package)
- **Never use:** bcrypt, MD5, SHA-256, or plain text for passwords
- **Sessions:** HttpOnly, Secure, SameSite=Strict cookies
- **Rate Limiting:** Login endpoint limited to 5 attempts per 15 minutes per IP
- **Logging:** Never log passwords, tokens, or session IDs

---

## Authorization

- **Enforcement:** EVERY protected endpoint must check authentication and authorization
- **Backend Only:** Frontend UI hiding is NOT security; backend MUST enforce
- **Role-Based:** Check user role before allowing actions
- **Resource Access:** Validate user has access to specific resources (prevent IDOR)
- **Testing:** Write negative tests for unauthorized access (must return 403)

---

## Input Validation

- **All Inputs:** Validate every request body, param, query on backend
- **Never Trust Client:** Client can send anything; backend validates everything
- **SQL Injection:** Use Prisma parameterized queries (no raw SQL without review)
- **XSS Prevention:** React escapes by default; never use `dangerouslySetInnerHTML` without sanitization

---

## Transactions

- **Atomic Operations:** Sales + stock deductions MUST use Prisma `$transaction`
- **All or Nothing:** If any step fails, entire operation rolls back
- **Race Conditions:** Test concurrent operations and stock updates
- **Idempotency:** Critical operations should handle duplicate requests safely

---

## Secrets Management

- **Never Commit:** Secrets, credentials, or `.env` files to Git
- **Environment Variables:** All secrets in `.env`, never hardcoded
- **Frontend:** NEVER expose secrets via `VITE_` environment variables
- **Production:** Use secure secret management (not plaintext files)

---

## Audit Logging

- **Immutable:** Audit logs cannot be modified or deleted
- **What to Log:** User, action, resource, timestamp, IP address
- **What NOT to Log:** Passwords, tokens, session IDs, sensitive PII
- **Actions:** Login attempts, authorization failures, stock adjustments, sales, payments, user changes

---

## API Security

- **HTTPS:** Required in production
- **CORS:** Explicit origin allowlist (no wildcard in production)
- **Headers:** CSP, HSTS, X-Content-Type-Options, X-Frame-Options
- **Rate Limiting:** All endpoints rate-limited appropriately
- **Error Messages:** Safe, no stack traces or internal details to client

---

## Data Integrity

- **Money:** Use `Decimal` type, never floats
- **Foreign Keys:** Enforce referential integrity
- **Unique Constraints:** SKU, email, etc. must be unique
- **Check Constraints:** Enforce business rules at database level (e.g., stock >= 0)

---

## Prohibited

- Skipping authentication checks "temporarily"
- Trusting client-provided prices, totals, roles, permissions
- Hard-deleting financial records (sales, payments)
- Using raw SQL without security review
- Exposing database errors to clients
- Running `prisma migrate reset` in production

---

## Security Release Gate

**Cannot deploy to production until:**
- ✅ Authentication controls implemented and verified
- ✅ Authorization controls implemented and verified
- ✅ Security tests passing (including negative tests)
- ✅ Critical and high-severity vulnerabilities resolved
- ✅ Backup and restore tested
- ✅ HTTPS configured
- ✅ Production secrets secured

---

**Reference:** See SECURITY.md for complete checklist.
