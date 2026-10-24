# StokFlow Product Context

**Project Type:** Client-specific inventory and sales management application (NOT SaaS)

---

## Core Business Purpose

StokFlow enables a business to:
- Track product inventory with complete movement history
- Record sales transactions with stock deduction
- Manage customer information
- Process and track payments
- Generate operational reports
- Maintain audit trails

---

## Key Business Rules (Confirmed)

1. **Atomic Sales:** Sales and stock deductions must happen together or not at all
2. **Price Snapshots:** Sale line items capture product price at time of sale
3. **Immutable Records:** Inventory movements and audit logs cannot be modified or deleted
4. **Audit Trail:** All sensitive actions must be logged with user, timestamp, and action details

---

## Open Business Questions

The following require client confirmation before implementation:

- Can products have variants (size, color), or is one product = one SKU?
- Can stock levels go negative, or must system prevent this?
- Can sales be edited or cancelled after creation?
- Are partial payments allowed? Are overpayments allowed?
- Is a customer required for all sales, or can "cash sales" exist without customer?
- Is customer receivables tracking in scope?
- What user roles and permissions are required?

**Do NOT invent answers to these questions. Ask the user for clarification.**

---

## Out of Scope

The following are explicitly OUT OF SCOPE unless client confirms otherwise:

- Multi-tenant SaaS infrastructure
- Subscription or billing systems
- Payment gateway integration (Stripe, PayPal, etc.)
- Microservices architecture
- AI features
- Mobile applications
- Third-party integrations

---

## Technology Constraints

- Frontend: React + Vite + TypeScript
- Backend: Express + Node.js + TypeScript
- Database: PostgreSQL + Prisma
- Architecture: Modular monolith (NOT microservices)

---

## Documentation Authority

- **PRD.md** — Business requirements and user stories
- **architecture.md** — Technical design and API conventions
- **SECURITY.md** — Security controls checklist
- **todo.md** — Implementation roadmap

Read these documents before implementing features.
