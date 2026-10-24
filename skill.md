# StokFlow — Technical Working Standards

**Version:** 1.0.0  
**Last Updated:** October 24, 2026

---

## TypeScript Conventions

### Strict Configuration
- Enable `strict: true` in tsconfig.json
- Enable `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`
- No `any` types; use `unknown` for truly unknown types

### Type Definitions
- Prefer `interface` for object shapes
- Use `type` for unions, intersections, primitives
- Export types alongside implementations
- Use type-only imports: `import type { User } from './types'`

### Naming
- Interfaces: PascalCase with `I` prefix optional (e.g., `User` or `IUser`)
- Types: PascalCase (e.g., `UserId`, `UserRole`)
- Enums: PascalCase for name, UPPER_SNAKE_CASE for values

---

## Module Organization

### Backend Structure
```
modules/<domain>/
├── <domain>.routes.ts      # Express route definitions
├── <domain>.controller.ts  # Request handling, response formatting
├── <domain>.service.ts     # Business logic
├── <domain>.validation.ts  # Request validation schemas
├── <domain>.types.ts       # Domain-specific types
└── __tests__/              # Module tests
```

### Frontend Structure
```
features/<feature>/
├── components/             # Feature-specific components
├── hooks/                  # Custom React hooks
├── api.ts                  # API client functions
├── types.ts                # Feature types
└── __tests__/              # Feature tests
```

---

## Validation Conventions

### Backend Request Validation
- Use express-validator or zod for request schemas
- Validate all inputs: body, params, query
- Return 400 with structured error details on validation failure

**Example (express-validator):**
```typescript
export const createProductValidation = [
  body('sku').isString().trim().notEmpty(),
  body('name').isString().trim().notEmpty(),
  body('categoryId').isInt(),
  body('stock').isInt({ min: 0 })
];
```

### Business Rule Validation
- Service layer enforces business rules
- Throw custom errors with meaningful messages
- Example: `throw new ConflictError('SKU already exists')`

---

## Error Handling Patterns

### Backend Error Hierarchy
```typescript
class AppError extends Error {
  statusCode: number;
  code: string;
}

class ValidationError extends AppError {
  statusCode = 400;
  code = 'VALIDATION_ERROR';
}

class UnauthorizedError extends AppError {
  statusCode = 401;
  code = 'UNAUTHORIZED';
}

class ForbiddenError extends AppError {
  statusCode = 403;
  code = 'FORBIDDEN';
}

class NotFoundError extends AppError {
  statusCode = 404;
  code = 'NOT_FOUND';
}

class ConflictError extends AppError {
  statusCode = 409;
  code = 'CONFLICT';
}
```

### Express Error Handler
```typescript
app.use((err, req, res, next) => {
  logger.error({ err, requestId: req.id }, 'Request error');
  
  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message,
      details: err.details || []
    }
  });
});
```

### Frontend Error Handling
- Display user-friendly messages from API errors
- Log client errors for debugging
- Provide actionable guidance (e.g., "Check SKU field")

---

## Database Access Patterns

### Prisma Usage
- Use Prisma Client directly in services (no repository layer unless needed)
- Use transactions for multi-step operations
- Use `select` to return only needed fields for performance
- Use `include` sparingly (avoid N+1 queries)

### Transaction Pattern
```typescript
async createSale(data: CreateSaleData): Promise<Sale> {
  return await prisma.$transaction(async (tx) => {
    // 1. Create sale
    const sale = await tx.sale.create({ data: saleData });
    
    // 2. Create line items
    await tx.saleLineItem.createMany({ data: lineItems });
    
    // 3. Deduct stock
    for (const item of lineItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }
    
    // 4. Record movements
    await tx.inventoryMovement.createMany({ data: movements });
    
    return sale;
  });
}
```

### Query Optimization
- Add indexes to frequently queried fields
- Use pagination for large result sets
- Use database-level constraints for data integrity

---

## Authentication & Authorization Rules

### Authentication Middleware
```typescript
export async function authenticate(req, res, next) {
  const sessionId = req.cookies.sessionId;
  
  if (!sessionId) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Authentication required' }
    });
  }
  
  const session = await getSession(sessionId);
  if (!session) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Invalid session' }
    });
  }
  
  req.user = session.user;
  next();
}
```

### Authorization Middleware
```typescript
export function authorize(...allowedRoles: UserRole[]) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required' }
      });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Insufficient permissions' }
      });
    }
    
    next();
  };
}
```

### Resource-Level Authorization
```typescript
// In service layer
async getSale(saleId: number, userId: number, userRole: UserRole) {
  const sale = await prisma.sale.findUnique({ where: { id: saleId } });
  
  if (!sale) {
    throw new NotFoundError('Sale not found');
  }
  
  // Check resource access
  if (userRole !== 'ADMIN' && sale.createdBy !== userId) {
    throw new ForbiddenError('Access denied');
  }
  
  return sale;
}
```

---

## Testing Standards

### Unit Tests
- Test business logic in isolation
- Mock external dependencies (database, APIs)
- Use descriptive test names: `should return 400 when SKU is missing`

### Integration Tests
- Test API endpoints with real test database
- Reset database state before each test
- Test happy paths and error cases

### Security Tests
```typescript
describe('Product Authorization', () => {
  it('should reject unauthorized product creation', async () => {
    const res = await request(app)
      .post('/api/v1/products')
      .send(validProductData);
    
    expect(res.status).toBe(401);
  });
  
  it('should reject product creation by Cashier role', async () => {
    const res = await request(app)
      .post('/api/v1/products')
      .set('Cookie', cashierSessionCookie)
      .send(validProductData);
    
    expect(res.status).toBe(403);
  });
});
```

---

## Logging Conventions

### Structured Logging
```typescript
logger.info({
  requestId: req.id,
  userId: req.user?.id,
  action: 'CREATE_SALE',
  saleId: sale.id
}, 'Sale created');

logger.error({
  requestId: req.id,
  error: err.message,
  stack: err.stack
}, 'Failed to create sale');
```

### Sensitive Data Redaction
- Never log passwords, tokens, session IDs
- Redact PII where appropriate
- Use `[REDACTED]` placeholder

---

## Dependency Management

### Version Pinning
- Use exact versions for critical dependencies
- Use caret (`^`) for dev dependencies
- Review `npm audit` findings before auto-fixing

### Adding Dependencies
1. Verify package is actively maintained
2. Check security advisories
3. Prefer well-known packages over obscure ones
4. Document why the dependency is needed

---

## Documentation Standards

### Code Comments
- Explain "why", not "what"
- Document complex business rules
- Add TODO comments with context

### API Documentation
- Document request/response schemas
- Document error codes
- Document authorization requirements

### README Updates
- Update setup instructions when dependencies change
- Document new environment variables
- Update commands when scripts change

---

## Security Review Requirements

Before merging code that involves:
- Authentication or session management
- Authorization checks
- Payment or financial transactions
- Database migrations
- Input validation

**Required Reviews:**
1. Code implements all acceptance criteria
2. Tests cover happy path and error cases
3. Security tests include negative cases
4. No secrets committed to repository
5. Audit logs capture relevant actions

---

## Definition of Done Checklist

- [ ] Feature implements requirements from PRD.md
- [ ] Backend validation enforces constraints
- [ ] Authorization checks prevent unauthorized access
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] Security tests written and passing (if applicable)
- [ ] Lint and type-check pass with no errors
- [ ] No console.log or debug code left in
- [ ] Documentation updated (if design changed)
- [ ] Manually tested in dev environment

---

**END OF TECHNICAL STANDARDS**
