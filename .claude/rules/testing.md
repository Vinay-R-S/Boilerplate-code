globs: ["**/*.test.ts", "**/*.spec.ts", "**/__tests__/**"]

# Testing Rules

## What to Test
- Test behavior, not implementation details
- Cover happy path, error cases, edge cases, boundary values
- For routes: assert status code, response envelope shape, and side effects

## Test Structure
- Descriptive names: it('returns 404 when user does not exist')
- describe blocks mirror the module under test
- Arrange, Act, Assert

## Mocking
- Mock the database (Sequelize) and external HTTP calls in unit tests
- Reset mocks between tests, no shared mutable state

## Coverage
- New services and utilities need tests before merging
- Bug fixes include a regression test

## Performance
- Tests must not depend on execution order
- No hardcoded timeouts, use proper async/await
