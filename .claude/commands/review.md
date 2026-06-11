Review the code I just wrote (or the file: $ARGUMENTS).

Check the following against docs/conventions.md and the Airbnb style guide,
and give a prioritized list of findings:

CRITICAL (must fix before merge):
- Security issues (missing validation, missing auth, exposed secrets/passwords)
- Unhandled errors that bypass AppError / the global error handler

MAJOR (should fix):
- Missing Zod validation on a route
- Use of `any` or non-null assertion `!`
- Logic errors or missed edge cases
- Business logic placed in a controller or component instead of a
  service/hook
- Missing tests for new services or utilities

MINOR (consider fixing):
- Naming that does not match docs/conventions.md
- File placed outside the expected folder for its layer
- Missing JSDoc on exported functions
- Import order not matching the eslint import/order rule

For each finding: state the issue, the location, and the fix.
