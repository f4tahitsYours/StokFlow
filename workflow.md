# StokFlow — Development Workflow

**Version:** 1.0.0  
**Last Updated:** October 24, 2026

---

## Standard Feature Development Workflow

### 1. Planning Phase

**Before writing any code:**

1. **Read Documentation**
   - Review relevant sections of PRD.md for business requirements
   - Review architecture.md for technical constraints and patterns
   - Check todo.md for dependencies and current phase status

2. **Clarify Requirements**
   - Identify any ambiguous business rules
   - List open questions that need client confirmation
   - DO NOT invent assumptions—ask the user for clarification

3. **Define Acceptance Criteria**
   - What does "done" look like for this feature?
   - What are the happy paths?
   - What are the error cases?
   - What security controls are required?

4. **Create or Update Kiro Spec (Optional)**
   - For substantial features, create a Kiro specification in `.kiro/specs/`
   - Document requirements, design decisions, and implementation tasks

5. **Plan Implementation**
   - Break down the feature into smallest coherent tasks
   - Identify backend endpoints needed
   - Identify database changes required
   - Identify frontend components needed
   - Determine test coverage required

---

### 2. Implementation Phase

**Implement one scoped task at a time:**

#### Step 1: Database Changes (if needed)
1. Update `apps/server/prisma/schema.prisma`
2. Run `npm run db:migrate:dev -- --name descriptive_name`
3. Review generated migration file
4. Test migration rollback if destructive
5. Commit migration files

#### Step 2: Backend Implementation
1. **Create/Update Domain Module** (in `apps/server/src/modules/<domain>/`)
   - Define types (`<domain>.types.ts`)
   - Create validation schemas (`<domain>.validation.ts`)
   - Implement service logic (`<domain>.service.ts`)
   - Create controller (`<domain>.controller.ts`)
   - Define routes (`<domain>.routes.ts`)

2. **Enforce Security**
   - Add authentication middleware to protected routes
   - Add authorization middleware with role checks
   - Validate all inputs
   - Use transactions for atomic operations
   - Add audit logging for sensitive actions

3. **Handle Errors Gracefully**
   - Throw appropriate error types (ValidationError, NotFoundError, etc.)
   - Never expose internal errors to clients
   - Log detailed errors server-side with request IDs

#### Step 3: Backend Testing
1. **Write Unit Tests**
   - Test business logic in services
   - Mock external dependencies (database, API calls)
   - Test edge cases and error conditions

2. **Write Integration Tests**
   - Test API endpoints end-to-end
   - Use test database
   - Test authentication and authorization
   - Test with valid and invalid inputs

3. **Write Security Tests**
   - Test unauthorized access (no session/token)
   - Test insufficient permissions (wrong role)
   - Test IDOR vulnerabilities (accessing other user's resources)
   - Test input validation bypass attempts
   - Test concurrent operations (if applicable)

4. **Run Tests**
   ```bash
   npm run test:server
   ```

#### Step 4: Frontend Implementation
1. **Create API Client Functions** (in `apps/web/src/features/<feature>/api.ts`)
   - Define typed request/response interfaces
   - Handle errors and return structured results

2. **Create Components**
   - Build UI components for the feature
   - Implement forms with validation feedback
   - Handle loading and error states
   - Display success confirmations

3. **Integrate with Backend**
   - Call API functions from components
   - Handle authentication errors (redirect to login)
   - Display backend validation errors
   - Show user-friendly error messages

4. **Frontend Testing**
   - Write component tests
   - Test user interactions
   - Test error handling
   ```bash
   npm run test:web
   ```

---

### 3. Verification Phase

**Before marking the task complete:**

1. **Run All Checks**
   ```bash
   npm run lint          # Lint all code
   npm run typecheck     # TypeScript type checking
   npm run test          # All tests
   npm run build         # Verify build succeeds
   ```

2. **Manual Testing in Dev Environment**
   - Start dev servers: `npm run dev`
   - Test happy path (successful operation)
   - Test error cases (invalid inputs, unauthorized access)
   - Test edge cases (empty lists, boundary values)
   - Verify error messages are user-friendly

3. **Review Code Changes**
   - Check git diff for unintended changes
   - Remove console.log and debug code
   - Verify no secrets or credentials in code
   - Check for code quality issues

4. **Security Review (if applicable)**
   - Authentication implemented correctly?
   - Authorization enforced on backend?
   - Inputs validated?
   - Transactions used for atomic operations?
   - Audit logs created?
   - No sensitive data logged?

---

### 4. Documentation Phase

**Update documentation if design changed:**

1. **Update PRD.md** if requirements were clarified or changed
2. **Update architecture.md** if architectural decisions were made
3. **Update SECURITY.md** if security controls were implemented
4. **Update todo.md** task status
5. **Update README.md** if setup steps changed or new commands added
6. **Add API documentation** in `docs/api/` (if API docs maintained)

---

## Pull Request / Change Review Workflow

### Before Creating PR:
1. ✅ All tests passing
2. ✅ Lint and type-check passing
3. ✅ Build succeeds
4. ✅ Manually tested in dev environment
5. ✅ Documentation updated
6. ✅ Commit messages are clear and descriptive

### PR Description Should Include:
- **What:** Summary of changes
- **Why:** Business requirement or bug being addressed
- **How:** Technical approach taken
- **Testing:** What was tested and how
- **Screenshots:** For UI changes
- **Breaking Changes:** If any
- **Open Questions:** If any

### Code Review Checklist:
- [ ] Code follows TypeScript and naming conventions
- [ ] Business logic is in service layer, not controllers
- [ ] All inputs are validated
- [ ] Authorization checks present on protected endpoints
- [ ] Errors handled gracefully
- [ ] Tests cover happy path and error cases
- [ ] No secrets or credentials in code
- [ ] No `console.log` or debug code left in
- [ ] Documentation updated if needed

---

## Database Migration Workflow

### Creating Migrations:
1. Update `schema.prisma` with changes
2. Run `npm run db:migrate:dev -- --name descriptive_migration_name`
3. Review generated migration SQL
4. Test migration applies successfully
5. Test migration rollback (if destructive)
6. Commit both `schema.prisma` and migration files

### Reviewing Migrations:
- [ ] Migration name is descriptive
- [ ] No data loss (unless intentional and documented)
- [ ] Foreign keys and constraints are correct
- [ ] Indexes added for performance-critical queries
- [ ] Default values appropriate
- [ ] Migration is reversible (or rollback documented)

### Applying Migrations in Production:
1. Review migration files thoroughly
2. Backup database before applying
3. Run `npm run db:migrate:deploy`
4. Verify application works correctly
5. Monitor for errors

**NEVER:**
- Run `prisma migrate reset` in production
- Manually edit migration files after they're committed
- Skip migration testing in dev/staging environment

---

## Release Preparation Workflow

### Pre-Release Checklist:
1. **Code Quality**
   - [ ] All tests passing
   - [ ] No lint errors
   - [ ] No TypeScript errors
   - [ ] Build succeeds for frontend and backend

2. **Documentation**
   - [ ] README.md is up-to-date
   - [ ] API documentation reflects current endpoints
   - [ ] Environment variables documented in .env.example
   - [ ] Migration procedures documented

3. **Security Review**
   - [ ] SECURITY.md checklist reviewed
   - [ ] Authentication controls verified
   - [ ] Authorization controls verified
   - [ ] Input validation verified
   - [ ] No secrets in repository
   - [ ] Security tests passing

4. **Testing**
   - [ ] Unit tests passing
   - [ ] Integration tests passing
   - [ ] E2E tests passing (critical paths)
   - [ ] Security tests passing
   - [ ] Manual testing completed

5. **Database**
   - [ ] Migrations reviewed and tested
   - [ ] Backup procedures tested
   - [ ] Rollback procedures documented

6. **Deployment**
   - [ ] Environment variables configured in production
   - [ ] HTTPS configured
   - [ ] CORS origin set correctly
   - [ ] Database connection string correct
   - [ ] Session secret generated (not default)

---

## Rollback Procedure

### If Deployment Fails:
1. **Assess Impact**
   - Are users affected?
   - Is data at risk?
   - What functionality is broken?

2. **Immediate Actions**
   - Revert to previous working version
   - Notify stakeholders
   - Document the issue

3. **Investigation**
   - Review deployment logs
   - Identify root cause
   - Check if database migration caused issue

4. **Database Rollback (if needed)**
   - Restore from backup (if data corrupted)
   - Or apply reverse migration (if safe)

5. **Fix and Re-deploy**
   - Fix the issue in development
   - Test thoroughly
   - Re-deploy with caution

---

## Incident Response Workflow

### Security Incident:
1. **Contain**
   - Disable affected functionality if needed
   - Revoke compromised sessions/tokens
   - Block malicious IPs (if applicable)

2. **Investigate**
   - Review audit logs
   - Check access logs
   - Identify attack vector
   - Assess data exposure

3. **Remediate**
   - Fix vulnerability
   - Deploy patch
   - Rotate secrets if compromised
   - Update security controls

4. **Document**
   - Write incident report
   - Update security procedures
   - Add regression tests

5. **Notify**
   - Inform affected parties if required
   - Update stakeholders

### Data Integrity Issue:
1. **Assess Scope**
   - How much data is affected?
   - What operations are impacted?

2. **Stop the Damage**
   - Disable affected features
   - Prevent further corruption

3. **Restore Data**
   - Use backup if available
   - Or manually correct data (with audit trail)

4. **Fix Root Cause**
   - Identify and fix the bug
   - Add transaction handling if missing
   - Add validation if missing

5. **Verify**
   - Confirm data integrity restored
   - Test affected operations
   - Monitor for recurrence

---

## Emergency Security Patch Workflow

### For Critical Security Vulnerability:
1. **Assess Severity**
   - Is it actively being exploited?
   - What data is at risk?
   - Can it wait for normal release cycle?

2. **Fast-Track Fix**
   - Implement minimal fix to address vulnerability
   - Write security regression test
   - Test thoroughly (but quickly)

3. **Emergency Deployment**
   - Skip non-critical review steps
   - Deploy immediately
   - Monitor closely

4. **Follow-Up**
   - Conduct full code review after deployment
   - Update security documentation
   - Add to incident log

---

## Daily Development Best Practices

### Start of Day:
1. Pull latest changes: `git pull`
2. Install new dependencies: `npm install`
3. Run database migrations: `npm run db:migrate:dev`
4. Check todo.md for current priorities

### During Development:
1. Commit frequently with clear messages
2. Run tests before committing
3. Keep PRD.md open for reference
4. Ask questions early if requirements unclear

### End of Day:
1. Commit or stash work in progress
2. Update todo.md if task status changed
3. Document any blockers or questions
4. Push commits to remote (if work is complete enough)

---

## Git Commit Message Conventions

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, build config)
- `security`: Security fixes or improvements

**Examples:**
```
feat(products): add product creation endpoint

Implements POST /api/v1/products with validation,
authorization, and stock movement recording.

Closes #123
```

```
security(auth): add rate limiting to login endpoint

Prevents brute-force attacks by limiting login
attempts to 5 per 15 minutes per IP.
```

---

## Approval Gates

### Before Proceeding to Next Phase:
- [ ] Current phase tasks completed (check todo.md)
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Security checklist reviewed (if applicable)
- [ ] User/client approval obtained (if required)

### Security Release Gate (Before Production):
- [ ] All authentication controls implemented and verified
- [ ] All authorization controls implemented and verified
- [ ] Security tests passing
- [ ] Critical and high-severity findings resolved
- [ ] Backup and restore tested
- [ ] Production secrets configured
- [ ] HTTPS verified
- [ ] Release review completed and documented

**DO NOT DEPLOY TO PRODUCTION** until security release gate criteria are met.

---

**END OF WORKFLOW DOCUMENT**
