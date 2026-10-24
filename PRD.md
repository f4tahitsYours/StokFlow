# StokFlow — Product Requirements Document

**Version:** 1.0.0  
**Last Updated:** October 24, 2026  
**Status:** Phase 0 — Foundation  
**Project Type:** Client-Specific Application

---

## 1. Product Overview

**Product Name:** StokFlow

**Product Type:** Web-based inventory and sales management application

**Development Model:** Custom application developed for a specific client

**NOT a SaaS product:** StokFlow is NOT designed for multi-tenant SaaS, subscription billing, or public marketplace deployment.

**Purpose:** Enable a business to track product inventory, record sales transactions, manage customer information, process payments, and generate operational reports.

---

## 2. Problem Statement

The client requires a web-based system to:
- Track product inventory accurately
- Record sales transactions with complete details
- Manage customer information
- Process and record payments
- Monitor stock levels and movements
- Generate business reports for decision-making
- Maintain audit trails for accountability

**Current State:** Requirements confirmation in progress. Business rules, workflow details, and operational policies require client validation.

---

## 3. Users and Roles

### Proposed User Roles

**NOTE:** These roles are PROPOSED pending client confirmation.

#### R-ADMIN: Administrator
- Full system access
- User management
- System configuration
- Access to all reports and audit logs

#### R-MANAGER: Manager
- Product and category management
- Inventory management and adjustments
- Customer management
- Sales and payment processing
- Report access

#### R-CASHIER: Cashier/Sales Staff
- Process sales transactions
- Record payments
- View product and customer information
- Limited report access

#### R-VIEWER: View-Only User
- Read-only access to reports
- No data modification permissions

**OPEN QUESTION:** Does the client require these specific roles, or different role definitions?

**OPEN QUESTION:** Can one user have multiple roles?

---

## 4. Core Workflows

### 4.1 Product Management Workflow
1. Administrator/Manager creates product categories
2. Administrator/Manager adds products with SKU, name, category, and opening stock
3. System records opening stock as initial inventory movement
4. Products become available for sales transactions

**OPEN QUESTION:** Can products have variants (size, color)? Or is one product = one SKU?

**OPEN QUESTION:** How are product costs and pricing determined?

### 4.2 Inventory Management Workflow
1. Manager views current stock levels
2. Manager performs stock adjustments (add/remove) with documented reason
3. System validates adjustment and records movement
4. Audit log captures who made the adjustment and why
5. Reports reflect updated inventory levels

**OPEN QUESTION:** Can stock levels go negative, or must the system prevent this?

**OPEN QUESTION:** Is there a stock reorder threshold or low-stock alert requirement?

### 4.3 Sales Transaction Workflow
1. Cashier/Manager selects customer (or creates new customer record)
2. Cashier adds products to sale with quantities
3. System validates stock availability
4. System calculates line totals and sale total
5. Cashier confirms sale
6. System deducts stock atomically
7. System records sale and line items with product price snapshot
8. Sale is available for payment processing

**OPEN QUESTION:** Can a sale be created without a customer (cash sales)?

**OPEN QUESTION:** Can sales be edited or cancelled after creation?

**OPEN QUESTION:** How are product prices determined at sale time?

### 4.4 Payment Workflow
1. User selects an unpaid or partially paid sale
2. User records payment with amount and optional reference
3. System validates payment amount
4. System updates sale payment status
5. If fully paid, sale status changes to "Paid"
6. If overpaid, system records overpayment

**OPEN QUESTION:** Are partial payments allowed?

**OPEN QUESTION:** Are overpayments allowed, or should they be rejected?

**OPEN QUESTION:** Can payments be refunded or reversed?

**OPEN QUESTION:** What payment methods are supported (cash, bank transfer, check)?

### 4.5 Receivables Management (CONDITIONAL)
1. System calculates outstanding balance per customer
2. Manager views customer receivables report
3. Manager tracks payment history

**OPEN QUESTION:** Is customer credit/receivables management in scope?

---

## 5. Functional Requirements

### FR-001: User Authentication
- Users must authenticate with email and password
- Passwords must be hashed with Argon2id
- Failed login attempts must be rate-limited
- Sessions must expire after inactivity
- STATUS: REQUIRED

### FR-002: User Authorization
- All protected endpoints must enforce role-based authorization
- Users must only access resources and actions permitted by their role
- Authorization must be enforced on the backend
- STATUS: REQUIRED

### FR-003: Product Categories
- System must support hierarchical or flat product categories
- Categories must have unique names
- Categories can be created, updated, and listed
- STATUS: REQUIRED

**OPEN QUESTION:** Are categories hierarchical (parent/child), or flat?

### FR-004: Product Management
- Products must have: SKU, name, category, description (optional), opening stock
- SKUs must be unique
- Products can be created, updated, listed, and searched
- Opening stock must be recorded as an inventory movement
- STATUS: REQUIRED

### FR-005: Inventory Movements
- System must record all inventory changes: opening stock, sales, adjustments
- Each movement must capture: product, quantity, type, reason, user, timestamp
- Inventory movements must be immutable (no deletion, only reversal)
- STATUS: REQUIRED

### FR-006: Stock Adjustments
- Authorized users can adjust stock levels with a documented reason
- Adjustments must create inventory movement records
- Adjustments must be auditable
- STATUS: REQUIRED

### FR-007: Customer Management
- Customers must have: name, contact information, optional address
- Customers can be created, updated, listed, and searched
- STATUS: REQUIRED

**OPEN QUESTION:** Is customer information mandatory for all sales?

### FR-008: Sales Transactions
- Sales must capture: customer (if applicable), date, line items, total
- Each line item must capture: product, quantity, unit price, line total
- Unit price must be captured at sale time (price snapshot)
- Sales must atomically deduct stock from inventory
- STATUS: REQUIRED

### FR-009: Payment Processing
- Payments must be recorded against sales
- Payment records must capture: sale, amount, payment method, reference, date, user
- System must calculate sale payment status: Unpaid, Partially Paid, Paid, Overpaid
- STATUS: REQUIRED

### FR-010: Customer Receivables (CONDITIONAL)
- System must calculate outstanding balance per customer
- Receivables report must show customer, total sales, total payments, balance
- STATUS: PENDING CLIENT CONFIRMATION

### FR-011: Reports
- Inventory Report: current stock levels per product
- Sales Report: sales transactions by date range, customer, product
- Payment Report: payments by date range, payment method
- Receivables Report (if in scope): outstanding balances
- Audit Log Report: sensitive actions by user and timestamp
- STATUS: REQUIRED

### FR-012: Audit Logging
- System must log: user authentication, authorization failures, stock adjustments, sales, payments, user management
- Audit logs must be immutable and tamper-evident
- Audit logs must capture: user, action, resource, timestamp, IP address (optional)
- STATUS: REQUIRED

---

## 6. Non-Functional Requirements

### NFR-001: Security
- All passwords must be hashed with Argon2id
- All API endpoints must validate input
- All protected endpoints must enforce authentication and authorization
- HTTPS must be used in production
- Sensitive data must not be logged
- CORS must use explicit origin allowlists
- Rate limiting must protect against abuse
- STATUS: REQUIRED

### NFR-002: Data Integrity
- Sales and stock deductions must be atomic (transactional)
- Database must enforce referential integrity
- Concurrent stock updates must be handled safely
- Financial data must use appropriate decimal precision
- STATUS: REQUIRED

### NFR-003: Performance
- API responses must complete within acceptable time (target: <500ms for typical queries)
- Database queries must use appropriate indexes
- Large reports must support pagination
- STATUS: REQUIRED

### NFR-004: Usability
- Frontend must be responsive and accessible
- Forms must provide clear validation feedback
- Error messages must be actionable
- STATUS: REQUIRED

### NFR-005: Maintainability
- Code must be modular and testable
- API contracts must be documented
- Database schema must be version-controlled
- STATUS: REQUIRED

### NFR-006: Testability
- Unit tests for business logic
- Integration tests for API endpoints and database operations
- End-to-end tests for critical user journeys
- Security regression tests for authorization and validation
- STATUS: REQUIRED

### NFR-007: Backup and Recovery
- Database backup procedures must be documented
- Backup restoration must be tested
- STATUS: REQUIRED (documentation and procedure only during Phase 0)

---

## 7. In-Scope Features

- User authentication and session management
- Role-based authorization
- Product and category management
- SKU management
- Inventory tracking with movement history
- Stock adjustments with auditability
- Customer management
- Sales transaction recording
- Payment processing
- Inventory, sales, and payment reports
- Audit logging
- Database backup and recovery procedures (documentation)

---

## 8. Out-of-Scope Features

The following are explicitly OUT OF SCOPE unless the client confirms otherwise:

- Multi-tenant SaaS infrastructure
- Subscription billing or tenant billing
- Payment gateway integration (Stripe, PayPal, etc.)
- Barcode scanning or printing
- Point-of-sale hardware integration
- Mobile application
- Email or SMS notifications
- Purchase order and supplier management (unless confirmed)
- Multi-currency support
- Tax calculation automation
- Shipping and logistics
- E-commerce storefront
- AI-powered features
- Real-time collaboration features
- Third-party integrations (accounting software, CRM, etc.)
- Microservices architecture
- Kubernetes or container orchestration

---

## 9. User Stories

### Authentication & Authorization

**US-001:** As an administrator, I want to log in with my email and password so that I can access the system securely.
- **Acceptance Criteria:**
  - User can enter email and password
  - System validates credentials against hashed passwords
  - System creates a session on successful authentication
  - System rejects invalid credentials with appropriate error message
  - System rate-limits login attempts

**US-002:** As a user, I want the system to enforce my role permissions so that I can only access features I'm authorized to use.
- **Acceptance Criteria:**
  - System checks user role before allowing access to protected resources
  - Unauthorized access attempts are rejected with 403 Forbidden
  - Frontend hides UI elements for unauthorized actions (as UX enhancement, not security)

### Product Management

**US-003:** As a manager, I want to create product categories so that I can organize products logically.
- **Acceptance Criteria:**
  - Manager can enter category name and description
  - System validates unique category name
  - System saves category to database
  - System displays success confirmation

**US-004:** As a manager, I want to add new products with SKU, name, category, and opening stock so that they are available for sale.
- **Acceptance Criteria:**
  - Manager can enter product details including opening stock quantity
  - System validates unique SKU
  - System saves product to database
  - System records opening stock as an inventory movement
  - System displays success confirmation

### Inventory Management

**US-005:** As a manager, I want to view current stock levels for all products so that I can monitor inventory.
- **Acceptance Criteria:**
  - Manager can view a list of products with current stock quantities
  - List can be filtered by category
  - List can be searched by product name or SKU

**US-006:** As a manager, I want to adjust stock levels with a documented reason so that I can correct inventory discrepancies.
- **Acceptance Criteria:**
  - Manager can select a product
  - Manager can enter adjustment quantity (positive or negative) and reason
  - System validates adjustment
  - System updates stock level
  - System records adjustment as an inventory movement
  - System logs adjustment in audit log

### Customer Management

**US-007:** As a manager, I want to add new customers with name and contact information so that I can track sales by customer.
- **Acceptance Criteria:**
  - Manager can enter customer name, phone, email, address
  - System validates required fields
  - System saves customer to database
  - System displays success confirmation

### Sales Transactions

**US-008:** As a cashier, I want to create a sale by selecting a customer and adding products with quantities so that I can record the transaction.
- **Acceptance Criteria:**
  - Cashier can select an existing customer or indicate a cash sale (if allowed)
  - Cashier can search and add products to the sale
  - Cashier can specify quantity for each product
  - System validates stock availability
  - System calculates line totals and sale total
  - System displays sale summary before confirmation

**US-009:** As a cashier, I want to confirm a sale so that inventory is deducted and the sale is recorded.
- **Acceptance Criteria:**
  - Cashier can review sale details
  - Cashier can confirm the sale
  - System atomically deducts stock for all line items
  - System records sale and line items with product price snapshots
  - System displays success confirmation
  - If stock is insufficient, system rejects the sale with clear error message

### Payment Processing

**US-010:** As a cashier, I want to record a payment against a sale so that I can track what has been paid.
- **Acceptance Criteria:**
  - Cashier can select an unpaid or partially paid sale
  - Cashier can enter payment amount, method, and optional reference
  - System validates payment amount
  - System records payment
  - System updates sale payment status (Unpaid, Partially Paid, Paid, Overpaid)
  - System displays updated payment status

### Reporting

**US-011:** As a manager, I want to view an inventory report showing current stock levels so that I can understand what is in stock.
- **Acceptance Criteria:**
  - Manager can access inventory report
  - Report displays product name, SKU, category, current stock quantity
  - Report can be filtered by category
  - Report can be exported or printed

**US-012:** As a manager, I want to view a sales report by date range so that I can analyze sales performance.
- **Acceptance Criteria:**
  - Manager can specify start and end date
  - Report displays sales transactions with date, customer, total, payment status
  - Report displays summary totals
  - Report can be exported or printed

**US-013:** As an administrator, I want to view audit logs so that I can investigate security incidents or data changes.
- **Acceptance Criteria:**
  - Administrator can access audit log report
  - Report displays user, action, resource, timestamp
  - Report can be filtered by user, action type, date range
  - Report cannot be modified or deleted

---

## 10. Business Rules

### BR-001: Stock Deduction Atomicity
- When a sale is confirmed, stock must be deducted for all line items in a single atomic transaction
- If any line item cannot be fulfilled due to insufficient stock, the entire sale must be rejected
- STATUS: REQUIRED

### BR-002: Price Snapshot
- Product prices at the time of sale must be captured in the sale line items
- Subsequent changes to product pricing must not affect historical sales
- STATUS: REQUIRED

### BR-003: Inventory Movement Immutability
- Inventory movements must not be deleted
- Corrections must be made through reversal movements or adjustments
- STATUS: REQUIRED

### BR-004: Audit Log Immutability
- Audit log records must not be modified or deleted
- STATUS: REQUIRED

### BR-005: Negative Stock (UNRESOLVED)
- **OPEN QUESTION:** Can stock levels go negative, or must the system prevent this?
- **PROPOSED:** System should prevent negative stock for most scenarios, but allow overrides for authorized users with documented reasons

### BR-006: Sale Cancellation (UNRESOLVED)
- **OPEN QUESTION:** Can sales be cancelled after creation? If so, how is stock restored?
- **PROPOSED:** Sales can be marked as "Cancelled" with stock restored through reversal movements, preserving the audit trail

### BR-007: Payment Amount Validation (UNRESOLVED)
- **OPEN QUESTION:** Can payments exceed the sale total (overpayment)?
- **OPEN QUESTION:** Are partial payments allowed?
- **PROPOSED:** Allow partial payments; flag overpayments but record them for reconciliation

### BR-008: Mandatory Customer (UNRESOLVED)
- **OPEN QUESTION:** Is a customer required for all sales, or can "cash sales" be recorded without a specific customer?
- **PROPOSED:** Allow sales without a customer (or with a generic "Walk-in Customer" record)

---

## 11. Success Metrics

**NOTE:** These are PROPOSED metrics pending client validation.

### Functional Success
- System successfully processes sales transactions without stock inconsistencies
- Reports accurately reflect inventory, sales, and payment data
- Users can perform assigned tasks without critical errors

### Security Success
- Zero unauthorized access incidents
- Zero SQL injection or XSS vulnerabilities in production
- All sensitive actions are logged and auditable

### Performance Success
- API response times remain below 500ms for 95% of requests
- Database queries complete efficiently under expected load
- Reports generate within acceptable time frames

### User Success (if client provides feedback)
- Users can complete common tasks efficiently
- Error messages are clear and actionable
- System meets client's business workflow requirements

---

## 12. Assumptions

1. **Single Client Deployment:** This application will be deployed for one client organization, not as a multi-tenant SaaS.

2. **Internal Users:** Users are trusted internal staff, not public customers.

3. **Network Environment:** Application will be deployed on a network accessible to authorized users with HTTPS.

4. **Database Access:** PostgreSQL database will be managed and backed up by the deployment environment or operations team.

5. **Manual Backups:** Database backup and recovery will follow documented procedures rather than automated SaaS backup infrastructure.

6. **Simple Pricing:** Products have a single price (no tiered pricing, no dynamic pricing, no promotions). **REQUIRES CONFIRMATION.**

7. **No Variants:** Each product is identified by a single SKU without size/color variants. **REQUIRES CONFIRMATION.**

8. **Single Currency:** All transactions are in one currency. **REQUIRES CONFIRMATION.**

9. **No Tax Automation:** Tax calculation is either not required or handled outside the system. **REQUIRES CONFIRMATION.**

10. **Desktop/Tablet Access:** Users will access the system via web browsers on desktops or tablets, not mobile phones primarily.

---

## 13. Open Questions

### Business Logic
- **Q1:** Can products have variants (size, color), or is one product = one SKU?
- **Q2:** How are product costs and selling prices determined?
- **Q3:** Can stock levels go negative?
- **Q4:** Is there a low-stock alert or reorder threshold requirement?
- **Q5:** Can sales be created without a customer (cash sales)?
- **Q6:** Can sales be edited or cancelled after creation? How is stock restored?
- **Q7:** Are partial payments allowed?
- **Q8:** Are overpayments allowed or rejected?
- **Q9:** Can payments be refunded or reversed?
- **Q10:** What payment methods must be supported (cash, bank transfer, check, card)?
- **Q11:** Is customer credit and receivables management in scope?
- **Q12:** Is supplier/purchase order management in scope?
- **Q13:** Are categories hierarchical (parent/child) or flat?

### User Roles & Permissions
- **Q14:** Are the proposed roles (Admin, Manager, Cashier, Viewer) correct?
- **Q15:** Can one user have multiple roles?
- **Q16:** What specific permissions does each role have?

### Workflow & Operations
- **Q17:** What is the expected backup frequency and retention policy?
- **Q18:** Who is responsible for database backups and recovery?
- **Q19:** What are the expected system availability requirements?
- **Q20:** What is the expected concurrent user load?

### Reporting
- **Q21:** What additional reports are required beyond inventory, sales, payments, and audit logs?
- **Q22:** Do reports need export functionality (PDF, Excel)?

### Integration
- **Q23:** Does the system need to integrate with any external systems (accounting software, POS hardware, etc.)?

---

## 14. Dependencies and Constraints

### Technical Dependencies
- Node.js LTS (22.x or 24.x)
- PostgreSQL 15+ or 16+
- Modern web browsers (Chrome, Firefox, Edge, Safari - current versions)

### Development Dependencies
- Kiro IDE with Claude Code for AI-assisted development
- Git for version control
- npm for package management

### Constraints
- Development must follow security-first principles
- All features must have appropriate test coverage
- Database schema changes must use version-controlled migrations
- No deployment to production until security release gate criteria are met

---

## 15. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-10-24 | StokFlow Team | Initial PRD created during Phase 0 foundation |

---

## 16. Approval and Sign-Off

**Document Status:** DRAFT — Pending Client Review

**Client Approval Required For:**
- Confirmed business requirements
- User roles and permissions
- Business rules and workflows
- In-scope vs. out-of-scope features
- Success metrics and priorities

**Next Steps:**
1. Review this PRD with the client
2. Clarify open questions
3. Confirm or modify requirements
4. Obtain client sign-off
5. Proceed to implementation phases

---

**END OF PRD**
