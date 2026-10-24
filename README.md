# StokFlow — Inventory & Sales Management System

**Version:** 1.0.0 (Phase 0 — Foundation)
**Status:** Documentation Phase Complete
**Project Type:** Client-Specific Application

---

## ⚠️ Current Project Status

**Phase 0 (Foundation) — COMPLETE:** Documentation and project planning phase is complete.

**Phase 1 (Implementation) — NOT STARTED:** Application structure, source code, and npm configuration have not yet been created.

**The commands listed in this README are for future reference and will become functional after Phase 1 initialization.**

Currently available in this repository:
- ✅ Comprehensive project documentation (PRD, architecture, security policy)
- ✅ Implementation roadmap (todo.md)
- ✅ Development workflow and standards (workflow.md, skill.md)
- ✅ Kiro steering files for AI-assisted development
- ✅ Environment configuration templates

Not yet available:
- ❌ Application source code (`apps/web/`, `apps/server/`)
- ❌ npm workspace configuration (`package.json`)
- ❌ TypeScript configuration (`tsconfig.json`)
- ❌ Development dependencies and tools
- ❌ Database schema or migrations

**Next Steps:** Phase 1 will initialize the npm workspace, create application structure, and install dependencies.

---

## Overview

StokFlow is a web-based inventory and sales management application designed for a specific client. It enables tracking of product inventory, recording sales transactions, managing customer information, processing payments, and generating operational reports.

**This is NOT a SaaS product.** It is a custom application developed for one client organization.

---

## Technology Stack

### Frontend
- **Framework:** React 18+
- **Build Tool:** Vite
- **Language:** TypeScript
- **Routing:** React Router (TBD)

### Backend
- **Runtime:** Node.js 22.x or 24.x LTS
- **Framework:** Express
- **Language:** TypeScript
- **ORM:** Prisma

### Database
- **Database:** PostgreSQL 15+ or 16+

### Testing
- **Unit/Integration:** Vitest
- **E2E:** Playwright
- **API Testing:** Supertest

### Package Management
- **Manager:** npm
- **Workspace:** npm workspaces (monorepo)

---

## Project Structure

```
StokFlow/
├── apps/
│   ├── web/              # React frontend
│   └── server/           # Express backend
├── packages/
│   └── shared/           # Shared code (if needed)
├── docs/                 # Documentation
├── scripts/              # Utility scripts
├── .kiro/                # Kiro IDE configuration
├── PRD.md                # Product requirements
├── architecture.md       # System architecture
├── SECURITY.md           # Security policy
├── todo.md               # Implementation roadmap
├── CLAUDE.md             # Claude Code instructions
├── AGENTS.md             # AI agent instructions
├── skill.md              # Technical standards
├── workflow.md           # Development workflow
└── README.md             # This file
```

---

## Prerequisites

### Required Software
- **Node.js:** Version 22.x or 24.x LTS
- **npm:** Version 10.x or higher (comes with Node.js)
- **PostgreSQL:** Version 15+ or 16+
- **Git:** For version control

### Recommended Tools
- **VS Code** or **Kiro IDE:** For development
- **Prisma Studio:** For database inspection (included with Prisma)
- **Postman** or **Insomnia:** For API testing (optional)

---

## Getting Started (Phase 1+)

**Note:** The following setup instructions will become applicable after Phase 1 initialization creates the necessary project structure and configuration files.

### 1. Clone Repository

```bash
git clone <repository-url>
cd StokFlow
```

### 2. Install Dependencies (Phase 1+)

**Prerequisites:** `package.json` must be created in Phase 1.

```bash
npm install
```

This will install dependencies for the root workspace, frontend, and backend.

### 3. Configure Environment Variables

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Edit `.env` and fill in the required values:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/stokflow_dev?schema=public"

# Server
NODE_ENV="development"
PORT=3000

# Frontend
VITE_API_BASE_URL="http://localhost:3000/api/v1"

# Authentication
SESSION_SECRET="generate-a-random-string-at-least-32-characters-long"

# Security
CORS_ORIGIN="http://localhost:5173"
```

**Important:**
- Replace `username` and `password` with your PostgreSQL credentials
- Generate a secure random string for `SESSION_SECRET` (use `openssl rand -base64 32`)
- Never commit the `.env` file to Git

### 4. Set Up Database (Phase 2+)

**Prerequisites:** Database schema must be designed in Phase 2.

Create the PostgreSQL database:

```bash
createdb stokflow_dev
```

Or using psql:

```sql
CREATE DATABASE stokflow_dev;
```

### 5. Run Database Migrations (Phase 2+)

**Prerequisites:** Prisma schema and migrations must be created in Phase 2.

```bash
npm run db:migrate:dev
```

This will apply Prisma migrations to set up the database schema.

### 6. (Optional) Seed Database (Phase 2+)

If a seed script is available:

```bash
npm run db:seed
```

### 7. Start Development Servers (Phase 1+)

**Prerequisites:** Application code must be created in Phase 1+.

Start both frontend and backend in development mode:

```bash
npm run dev
```

Or start them separately:

```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev:web
```

**Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api/v1

---

## Available Commands (Phase 1+)

**Note:** These commands will be configured in Phase 1 when `package.json` and npm scripts are created. They are listed here for reference.

### Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in dev mode |
| `npm run dev:web` | Start frontend only (Vite dev server) |
| `npm run dev:server` | Start backend only (Node.js with watch mode) |

### Building

| Command | Description |
|---------|-------------|
| `npm run build` | Build both frontend and backend for production |
| `npm run build:web` | Build frontend only |
| `npm run build:server` | Build backend only |

### Testing

| Command | Description |
|---------|-------------|
| `npm run test` | Run all tests (frontend + backend) |
| `npm run test:web` | Run frontend tests only |
| `npm run test:server` | Run backend tests only |
| `npm run test:e2e` | Run end-to-end tests (Playwright) |

### Code Quality

| Command | Description |
|---------|-------------|
| `npm run lint` | Lint all code (frontend + backend) |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |

### Database

| Command | Description |
|---------|-------------|
| `npm run db:migrate:dev` | Create and apply a new migration in dev |
| `npm run db:migrate:deploy` | Apply migrations in production |
| `npm run db:studio` | Open Prisma Studio (database GUI) |
| `npm run db:seed` | Seed database with test data |
| `npm run db:generate` | Generate Prisma Client |

---

## Project Documentation

| Document | Purpose |
|----------|---------|
| **PRD.md** | Product requirements, user stories, business rules |
| **architecture.md** | System architecture, component design, API conventions |
| **SECURITY.md** | Security policy, controls checklist, verification status |
| **todo.md** | Implementation roadmap with phases and tasks |
| **CLAUDE.md** | Instructions for Claude Code AI assistant |
| **AGENTS.md** | Instructions for AI coding agents |
| **skill.md** | Technical working standards and coding conventions |
| **workflow.md** | Development workflow and procedures |

**Before implementing any feature, read PRD.md and architecture.md.**

---

## Development Workflow

### For Every Feature:
1. Read relevant PRD.md and architecture.md sections
2. Check todo.md for dependencies and current phase
3. Implement backend (API + validation + business logic + tests)
4. Implement frontend (UI + API integration + tests)
5. Run lint, typecheck, and tests
6. Update documentation if design changes

### Definition of Done:
- ✅ Backend endpoint with validation and authorization
- ✅ Frontend UI with error handling
- ✅ Unit and integration tests passing
- ✅ Security tests passing (if applicable)
- ✅ Lint and type-check passing
- ✅ Manually tested in dev environment

See **workflow.md** for detailed procedures.

---

## Testing

### Running Tests

```bash
# All tests
npm run test

# Watch mode (auto-rerun on file changes)
npm run test:watch

# With coverage report
npm run test:coverage
```

### Test Database

Tests use a separate test database (`stokflow_test`). Set it up:

```bash
createdb stokflow_test
DATABASE_URL="postgresql://username:password@localhost:5432/stokflow_test?schema=public" npm run db:migrate:dev
```

Or configure `DATABASE_URL_TEST` in `.env`:

```env
DATABASE_URL_TEST="postgresql://username:password@localhost:5432/stokflow_test?schema=public"
```

---

## Security

### Key Security Principles

1. **Authentication:** Passwords hashed with Argon2id
2. **Authorization:** Role-based access control enforced on backend
3. **Input Validation:** All inputs validated on backend
4. **Transactions:** Sales and stock operations are atomic
5. **Audit Logging:** Sensitive actions logged immutably
6. **HTTPS:** Required in production
7. **Secrets:** Never committed to Git, managed via environment variables

### Security Checklist

See **SECURITY.md** for the complete security controls checklist and verification status.

### Reporting Security Issues

If you discover a security vulnerability, please:
1. Do NOT open a public issue
2. Contact the project maintainer directly
3. Provide details of the vulnerability and steps to reproduce

---

## Troubleshooting

### Database Connection Error

**Error:** `Cannot connect to database`

**Solution:**
1. Verify PostgreSQL is running: `pg_isready`
2. Check `DATABASE_URL` in `.env` is correct
3. Verify database exists: `psql -l`
4. Check PostgreSQL logs for errors

### Port Already in Use

**Error:** `Port 3000 (or 5173) is already in use`

**Solution:**
1. Find process using the port:
   ```bash
   # Linux/Mac
   lsof -i :3000
   
   # Windows
   netstat -ano | findstr :3000
   ```
2. Kill the process or change the port in `.env`

### Migration Error

**Error:** Migration fails to apply

**Solution:**
1. Check migration SQL for errors
2. Verify database schema state with Prisma Studio
3. If in dev, reset database: `npm run db:migrate:reset` (DESTRUCTIVE)
4. If in production, investigate carefully before rolling back

### Prisma Client Out of Sync

**Error:** `Prisma Client is out of sync with schema`

**Solution:**
```bash
npm run db:generate
```

### TypeScript Errors After Dependency Update

**Solution:**
```bash
# Clean build artifacts
rm -rf node_modules/.cache
rm -rf apps/*/node_modules/.cache

# Reinstall dependencies
npm install

# Rebuild
npm run build
```

---

## Deployment

**Note:** Deployment procedures are documented in **docs/operations/** and **workflow.md**.

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Security release gate criteria met (see SECURITY.md)
- [ ] Database migrations reviewed
- [ ] Backup and restore tested
- [ ] Environment variables configured in production
- [ ] HTTPS configured
- [ ] CORS origin set correctly

### Production Deployment (Overview)

1. Build production assets:
   ```bash
   npm run build
   ```

2. Set production environment variables

3. Apply database migrations:
   ```bash
   NODE_ENV=production npm run db:migrate:deploy
   ```

4. Start production server (use PM2 or similar process manager)

5. Verify deployment health

**Do NOT deploy to production until security release gate is passed.**

---

## Contributing

### Code Review Checklist

- [ ] Code follows TypeScript and naming conventions
- [ ] Business logic in service layer, not controllers
- [ ] All inputs validated
- [ ] Authorization checks present
- [ ] Tests cover happy path and error cases
- [ ] No secrets or credentials in code
- [ ] Documentation updated if needed

### Git Workflow

1. Create feature branch: `git checkout -b feat/feature-name`
2. Make changes and commit frequently
3. Run tests before committing
4. Push branch and create pull request
5. Address code review feedback
6. Merge after approval

---

## Project Status

**Current Phase:** Phase 0 — Foundation (COMPLETE)

**Phase 0 Completed:**
- ✅ Repository structure defined
- ✅ Comprehensive documentation created (PRD, architecture, security, roadmap)
- ✅ Technology stack decided
- ✅ Git repository initialized
- ✅ Kiro steering files configured
- ✅ Documentation audit completed

**Phase 1 Status:** NOT STARTED

Phase 1 will create:
- npm workspace configuration (`package.json`)
- Application directory structure (`apps/web/`, `apps/server/`)
- TypeScript configuration
- Development tooling (ESLint, Prettier, Vitest)
- CI/CD pipeline (.github/workflows/)

**Phase 2+ Status:** NOT STARTED

Implementation of business features will begin after Phase 1 infrastructure is in place.

See **todo.md** for detailed roadmap.

---

## License

[License type TBD — to be determined by client]

---

## Support & Contact

For questions or issues:
- Check documentation in `docs/` directory
- Review PRD.md and architecture.md
- Consult workflow.md for procedures
- Contact project maintainer: [Contact details TBD]

---

**Current Version:** 1.0.0 (Phase 0)  
**Last Updated:** October 24, 2026

---

**END OF README**
