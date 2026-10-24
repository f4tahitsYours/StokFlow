# StokFlow — Implementation Roadmap

**Version:** 1.0.0  
**Last Updated:** October 24, 2026  
**Status:** Phase 1 Complete

---

## Phase 0: Project Foundation ✅ COMPLETE

### P0-001: Repository Setup
- [x] Create .gitignore
- [x] Create .env.example
- [x] Initialize Git repository
- [x] Create initial commit
**Status:** COMPLETE
**Priority:** CRITICAL  

### P0-002: Documentation
- [x] Create PRD.md
- [x] Create architecture.md
- [x] Create SECURITY.md
- [x] Create CLAUDE.md
- [x] Create AGENTS.md
- [x] Create skill.md
- [x] Create workflow.md
- [x] Create README.md
**Status:** COMPLETE
**Priority:** CRITICAL  

### P0-003: Kiro Steering
- [x] Create .kiro/steering/product.md
- [x] Create .kiro/steering/architecture.md
- [x] Create .kiro/steering/security.md
- [x] Create .kiro/steering/coding-standards.md
**Status:** COMPLETE
**Priority:** HIGH  

### P0-004: Documentation Audit
- [x] Cross-document consistency check
- [x] Create AUDIT_REPORT.md
**Status:** COMPLETE
**Priority:** HIGH  

---

## Phase 1: Repository & Development Tooling ✅ COMPLETE

### P1-001: Workspace Setup
- [x] Initialize npm workspace (package.json at root)
- [x] Create tsconfig.base.json
- [x] Configure npm scripts
**Status:** COMPLETE (October 24, 2026)
**Evidence:**
- Root package.json with workspaces: ["apps/*", "packages/*"]
- npm install successful, 27 packages installed
- Workspace discovery working
**Dependencies:** P0 complete  
**Priority:** CRITICAL  

### P1-002: Backend Foundation
- [x] Create apps/server directory structure
- [x] Initialize backend package.json
- [x] Configure TypeScript (tsconfig.json)
- [x] Install core dependencies (Express, Prisma, TypeScript)
- [x] Create app.ts and server.ts skeleton
**Status:** COMPLETE (October 24, 2026)
**Evidence:**
- Server running on http://localhost:3000
- Health endpoint returns 200 OK with correct response format
- TypeScript compiles without errors
- Integration tests passing (3/3 tests)
**Dependencies:** P1-001  
**Priority:** CRITICAL  

### P1-003: Frontend Foundation
- [x] Create apps/web with Vite + React + TypeScript
- [x] Configure Vite
- [x] Set up basic routing structure
- [x] Install core dependencies
**Status:** COMPLETE (October 24, 2026)
**Evidence:**
- Vite dev server running on http://localhost:5173
- Frontend accessible and rendering
- TypeScript compiles without errors
- API proxy configured to backend
- Tests passing (2/2 tests)
**Dependencies:** P1-001  
**Priority:** CRITICAL  

### P1-004: Code Quality Tools
- [x] Configure ESLint
- [x] Configure Prettier
- [x] Set up pre-commit hooks (husky)
- [x] Configure npm scripts for lint and format
**Status:** COMPLETE (October 24, 2026)
**Evidence:**
- ESLint 9 flat config for backend and frontend
- Prettier configured with .prettierrc
- Husky pre-commit hook with lint-staged
- All linting passing
**Dependencies:** P1-002, P1-003  
**Priority:** HIGH  

### P1-005: Testing Setup
- [x] Configure Vitest for backend
- [x] Configure Vitest for frontend
- [x] Set up test database configuration
- [x] Create sample tests
**Status:** COMPLETE (October 24, 2026)
**Evidence:**
- Vitest configured for both workspaces
- Backend: 3 integration tests passing (health endpoint)
- Frontend: 2 unit tests passing
- Coverage configuration ready
**Dependencies:** P1-002, P1-003  
**Priority:** HIGH  

---

## Phase 2: Database & Authentication Foundations

### P2-001: Database Schema Design
- [ ] Design complete Prisma schema
- [ ] Define all models, relations, constraints
- [ ] Review schema with client
**Dependencies:** P1 complete  
**Priority:** CRITICAL  
**Acceptance Criteria:**
- Schema includes all entities from PRD
- Foreign keys and unique constraints defined
- Decimal types used for money
- Timestamps on all tables

### P2-002: Initial Migration
- [ ] Run prisma migrate dev
- [ ] Verify migration files
- [ ] Test migration rollback
**Dependencies:** P2-001  
**Priority:** CRITICAL  

### P2-003: Authentication Implementation
- [ ] Implement password hashing with Argon2id
- [ ] Create user registration endpoint
- [ ] Create login endpoint
- [ ] Implement session management
- [ ] Create authentication middleware
- [ ] Add login rate limiting
**Dependencies:** P2-002  
**Priority:** CRITICAL  
**Tests Required:**
- Unit tests for password hashing
- Integration tests for login/logout
- Security tests for rate limiting
- Negative tests for invalid credentials

### P2-004: Authorization Framework
- [ ] Implement role-based authorization middleware
- [ ] Create permission checking functions
- [ ] Add authorization to protected routes
**Dependencies:** P2-003  
**Priority:** CRITICAL  
**Tests Required:**
- Authorization enforcement tests
- Privilege escalation negative tests

---

## Phase 3: Product Catalog & Category Management

### P3-001: Category Management
- [ ] Create category module (routes, controller, service)
- [ ] Implement CRUD operations
- [ ] Add validation
- [ ] Write tests
**Dependencies:** P2 complete  
**Priority:** HIGH  
**Acceptance Criteria:**
- Admin/Manager can create categories
- Unique name constraint enforced
- Categories can be listed and searched

### P3-002: Product Management
- [ ] Create product module
- [ ] Implement product CRUD
- [ ] Link products to categories
- [ ] Enforce unique SKU constraint
- [ ] Record opening stock as inventory movement
- [ ] Write tests
**Dependencies:** P3-001  
**Priority:** HIGH  
**Tests Required:**
- Product creation with opening stock
- Duplicate SKU prevention
- Authorization tests

### P3-003: Frontend Product UI
- [ ] Create category list and form pages
- [ ] Create product list and form pages
- [ ] Implement search and filtering
- [ ] Display validation errors
**Dependencies:** P3-002  
**Priority:** HIGH  

---

## Phase 4: Inventory Ledger & Stock Adjustments

### P4-001: Inventory Movement Model
- [ ] Implement inventory movement tracking
- [ ] Ensure immutability (no updates/deletes)
- [ ] Create movement types (opening, sale, adjustment)
**Dependencies:** P3 complete  
**Priority:** HIGH  

### P4-002: Stock Adjustment
- [ ] Create stock adjustment endpoint
- [ ] Implement adjustment business logic
- [ ] Record adjustment reasons
- [ ] Create audit log entries
- [ ] Write tests
**Dependencies:** P4-001  
**Priority:** HIGH  
**Tests Required:**
- Stock adjustment creates movement
- Audit log records adjustment
- Authorization tests

### P4-003: Inventory Reports
- [ ] Create inventory report endpoint
- [ ] Show current stock levels per product
- [ ] Add filtering by category
- [ ] Frontend inventory report UI
**Dependencies:** P4-002  
**Priority:** MEDIUM  

---

## Phase 5: Customers & Sales Transactions

### P5-001: Customer Management
- [ ] Create customer module
- [ ] Implement customer CRUD
- [ ] Add search functionality
- [ ] Write tests
**Dependencies:** P4 complete  
**Priority:** HIGH  

### P5-002: Sales Transaction (Backend)
- [ ] Create sales module
- [ ] Implement atomic sale + stock deduction
- [ ] Validate stock availability
- [ ] Capture price snapshots in line items
- [ ] Create inventory movements
- [ ] Write tests
**Dependencies:** P5-001  
**Priority:** CRITICAL  
**Tests Required:**
- Atomic transaction tests
- Insufficient stock rejection
- Concurrent sale handling
- Transaction rollback tests

### P5-003: Sales Transaction (Frontend)
- [ ] Create sale form UI
- [ ] Customer selection/search
- [ ] Product selection with quantity
- [ ] Real-time total calculation
- [ ] Stock availability check
- [ ] Sale confirmation
**Dependencies:** P5-002  
**Priority:** HIGH  

---

## Phase 6: Payments & Receivables

### P6-001: Payment Processing (Backend)
- [ ] Create payment module
- [ ] Implement payment recording
- [ ] Calculate sale payment status
- [ ] Handle partial payments (if in scope)
- [ ] Write tests
**Dependencies:** P5 complete  
**Priority:** HIGH  
**Acceptance Criteria:**
- Payment linked to sale
- Payment status calculated correctly
- Overpayment handling defined

### P6-002: Payment UI
- [ ] Create payment form
- [ ] Display sale details and outstanding balance
- [ ] Record payment with method and reference
- [ ] Show payment history
**Dependencies:** P6-001  
**Priority:** HIGH  

### P6-003: Receivables Report (IF IN SCOPE)
- [ ] Create receivables calculation logic
- [ ] Create receivables report endpoint
- [ ] Frontend receivables report UI
**Dependencies:** P6-002  
**Priority:** MEDIUM  
**Status:** CONDITIONAL — pending client confirmation

---

## Phase 7: Reports & Audit Visibility

### P7-001: Sales Reports
- [ ] Create sales report endpoint with date range filtering
- [ ] Add customer and product filters
- [ ] Calculate summary totals
- [ ] Frontend sales report UI
**Dependencies:** P6 complete  
**Priority:** MEDIUM  

### P7-002: Payment Reports
- [ ] Create payment report endpoint
- [ ] Filter by date range and payment method
- [ ] Frontend payment report UI
**Dependencies:** P7-001  
**Priority:** MEDIUM  

### P7-003: Audit Log Report
- [ ] Create audit log query endpoint
- [ ] Filter by user, action, date range
- [ ] Frontend audit log UI (admin only)
**Dependencies:** P7-002  
**Priority:** MEDIUM  

---

## Phase 8: Integration, E2E & Security Testing

### P8-001: Integration Test Suite
- [ ] Complete integration tests for all modules
- [ ] Test all API endpoints
- [ ] Test authentication and authorization
- [ ] Test transactional integrity
**Dependencies:** P7 complete  
**Priority:** CRITICAL  

### P8-002: End-to-End Tests
- [ ] Set up Playwright
- [ ] Test critical user journeys (login, create sale, record payment)
- [ ] Test across browsers
**Dependencies:** P8-001  
**Priority:** HIGH  

### P8-003: Security Regression Tests
- [ ] Test unauthorized access attempts
- [ ] Test IDOR vulnerabilities
- [ ] Test input validation bypass
- [ ] Test concurrent operations
- [ ] Test privilege escalation
**Dependencies:** P8-002  
**Priority:** CRITICAL  

### P8-004: Performance Testing
- [ ] Load test API endpoints
- [ ] Identify slow queries
- [ ] Optimize indexes
**Dependencies:** P8-003  
**Priority:** MEDIUM  

---

## Phase 9: Deployment Preparation & Client Handover

### P9-001: Deployment Documentation
- [ ] Document deployment steps
- [ ] Document environment variable configuration
- [ ] Document database migration process
- [ ] Document backup procedures
**Dependencies:** P8 complete  
**Priority:** CRITICAL  

### P9-002: Backup & Recovery Testing
- [ ] Create database backup
- [ ] Test restoration procedure
- [ ] Document recovery time
**Dependencies:** P9-001  
**Priority:** CRITICAL  

### P9-003: Security Release Gate Review
- [ ] Verify all security controls implemented
- [ ] Review security test results
- [ ] Resolve critical and high-severity findings
- [ ] Document accepted risks
**Dependencies:** P9-002  
**Priority:** CRITICAL  
**Blockers:** Cannot deploy until security gate passed

### P9-004: Production Deployment
- [ ] Deploy to production environment
- [ ] Configure HTTPS
- [ ] Set production environment variables
- [ ] Run production database migrations
- [ ] Verify production deployment
**Dependencies:** P9-003  
**Priority:** CRITICAL  

### P9-005: Client Handover
- [ ] Conduct user training
- [ ] Deliver documentation
- [ ] Provide credentials securely
- [ ] Establish support process
**Dependencies:** P9-004  
**Priority:** HIGH  

---

## Open Client Decisions (BLOCKING)

These decisions are required before proceeding with related implementation:

1. **Product Variants:** Can products have size/color variants, or one SKU = one product?
2. **Negative Stock:** Can stock go negative, or must system prevent it?
3. **Sale Cancellation:** Can sales be cancelled? How is stock restored?
4. **Payment Policies:** Are partial payments allowed? Are overpayments allowed?
5. **Mandatory Customer:** Is a customer required for all sales (or allow cash sales)?
6. **Receivables Management:** Is customer credit/receivables tracking in scope?
7. **User Roles:** Confirm Admin, Manager, Cashier, Viewer roles and permissions
8. **Backup Responsibility:** Who manages database backups (dev team or client ops)?

---

**END OF ROADMAP**
