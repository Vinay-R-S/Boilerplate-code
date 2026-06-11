Fix the following issue: $ARGUMENTS

Before fixing:
1. Identify the root cause, not just the symptom
2. Show exactly where the problem originates
3. Propose the fix and explain why it solves the root cause
4. Check whether the same bug exists in similar locations (e.g. the same
   pattern across other <feature>.controller.ts / .service.ts files)

After fixing:
1. Write or update a test that catches this regression
2. Confirm the fix does not break adjacent code
