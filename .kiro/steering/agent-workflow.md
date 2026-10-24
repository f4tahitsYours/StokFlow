# Agent Workflow Optimization

**Purpose:** Reduce redundant operations, group related commands, and improve execution efficiency.

---

## Command Grouping Rules

### Group Related Commands
When multiple commands achieve a single logical goal, execute them together:

**BAD:**
```
1. Run typecheck
2. Wait for result
3. Run lint
4. Wait for result
5. Run test
6. Wait for result
```

**GOOD:**
```
Execute: npm run typecheck && npm run lint && npm run test
```

### Use Parallel Execution When Safe
Independent checks can run concurrently:

```bash
# If build and test are independent
npm run build & npm run test

# Or use npm-run-all if available
npm-run-all --parallel lint typecheck
```

### Batch File Operations
Read or create multiple related files in a single tool invocation block when possible.

---

## Avoid Redundant Checks

### Don't Re-verify Unchanged Systems
If a previous check passed and no changes were made to that system:
- ✅ **DO:** Note that the system was previously verified
- ❌ **DON'T:** Re-run the same verification

**Example:**
If `npm run lint` passed in step 2, and no code changes were made since, don't run it again in step 5.

### Trust Build System Caching
Modern build tools cache results. If a command reports "no changes", trust it.

### Skip Redundant File Reads
If a file's content is already in context and hasn't been modified, don't re-read it.

---

## Terminal & Process Management

### Current Environment Limitations
- The system does not support terminal reuse across sessions
- Process IDs are session-specific
- Background processes started in one interaction may not persist

### DO NOT Promise Terminal Reuse
- ❌ **DON'T SAY:** "I'll reuse the existing terminal"
- ❌ **DON'T SAY:** "The server is already running in terminal X"
- ✅ **DO SAY:** "Starting the server" (without making reuse claims)

### Starting Development Servers
Use `control_pwsh_process` with `action: start` for long-running processes:
```
- Backend: npm run dev (in apps/server)
- Frontend: npm run dev (in apps/web)
```

---

## Commit & Git Operations

### NEVER Auto-Commit or Push
- ❌ **DON'T:** Automatically run `git commit` or `git push`
- ❌ **DON'T:** Suggest committing without explicit user approval
- ✅ **DO:** Report changes and wait for user instruction

### When User Requests Commit
Only after explicit user approval:
1. Review staged changes
2. Verify tests pass
3. Execute commit with provided message
4. Confirm with user before push

---

## Verification Strategy

### Verify Only What Changed
If you modified:
- Backend code → Run backend tests and typecheck
- Frontend code → Run frontend tests and typecheck
- Configuration → Run affected checks only

### Progressive Verification
1. **Fast checks first:** lint, typecheck (seconds)
2. **Medium checks:** unit tests (seconds to minutes)
3. **Slow checks:** integration tests, builds (minutes)

Stop early if fast checks fail.

### Evidence-Based Reporting
- ✅ **DO:** Report actual command output
- ❌ **DON'T:** Assume success without running the command

---

## File Operation Batching

### Create Related Files Together
When scaffolding a module, create all files in one block:
```
- module.types.ts
- module.service.ts
- module.controller.ts
- module.routes.ts
- module.validation.ts
```

### Read Related Context Together
When analyzing a feature, batch-read related files:
```
- Implementation file
- Test file
- Type definition file
```

---

## When to Ask vs. Proceed

### Proceed Automatically
- Reading files to understand code
- Running non-destructive commands (lint, test, typecheck)
- Creating new files in appropriate locations
- Fixing obvious bugs or linting errors

### Ask First
- Deleting files or directories
- Modifying database schema
- Changing API contracts
- Installing new dependencies
- Running destructive commands
- Committing or pushing code

---

## Session Context Management

### Leverage Previous Context
If earlier in the session you:
- Read a file → Reference that knowledge
- Ran a command → Reference the result
- Made a decision → State the decision context

### Don't Repeat Full File Reads
If file content is in context and unchanged:
- ✅ Reference: "As seen in `app.ts` (read earlier)..."
- ❌ Don't: Read the entire file again

---

## Performance Guidelines

### Minimize Round-Trips
- Batch independent operations
- Use command chaining (`&&`, `;`)
- Read multiple files in one invocation

### Use Appropriate Tools
- `grep_search` for finding patterns across files
- `file_search` for locating files by name
- `read_code` for analyzing code structure
- `read_file` for specific content with offsets

### Fail Fast
- Run quick validations before expensive operations
- Check prerequisites before starting work
- Validate inputs before processing

---

## Error Recovery Strategy

### When Commands Fail
1. **Read Error Output:** Analyze actual error message, don't guess
2. **Check Prerequisites:** Dependencies installed? Environment configured?
3. **Try Alternative:** If blocked, attempt different approach
4. **Report Specifics:** Share error details and context if stuck

### When Tests Fail
1. **Read Test Output:** Examine failure message carefully
2. **Fix Root Cause:** Address the issue, never disable tests
3. **Re-run Affected:** Test only what changed
4. **Verify No Regression:** Ensure fix doesn't break other tests

### When Build Fails
1. **Check Error Location:** File path and line number
2. **Verify Syntax:** TypeScript/ESLint errors
3. **Check Dependencies:** Missing imports or packages
4. **Incremental Fix:** Solve one error at a time

### When Stuck
- State what was tried and what failed
- Ask for guidance with specific error context
- Don't repeatedly try the same failing approach

---

## Examples

### GOOD: Efficient Feature Implementation
```
1. Read requirements (PRD.md section)
2. Create all backend files in one block
3. Run verification: npm run lint && npm run typecheck && npm run test
4. Create frontend files in one block
5. Final verification of changed systems only
6. Report completion with evidence
```

### BAD: Inefficient Implementation
```
1. Read PRD.md
2. Create one file
3. Run lint
4. Create another file
5. Run lint again
6. Run typecheck
7. Create test file
8. Run lint again
9. Run typecheck again
10. Run tests
11. Read PRD.md again
12. Run all checks again even though nothing changed
```

---

## Summary

**Key Principles:**
1. Group related commands
2. Avoid redundant checks
3. Batch file operations
4. Never auto-commit/push
5. Verify only what changed
6. Fail fast on errors
7. Leverage context effectively

**Result:** Faster execution, fewer round-trips, clearer communication.
