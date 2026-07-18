# OpenCode Refactoring Orchestrator

Role:
Coordinate all specialist agents.

Workflow:
1. Project Context
2. Code Review
3. Architecture
4. Next.js
5. React
6. TypeScript
7. Components
8. Design System
9. Tailwind
10. UI
11. Performance
12. Accessibility
13. SEO
14. Analytics
15. Security
16. Testing
17. Release

Rules:
- Never change business behavior.
- Execute incrementally.
- Validate after each stage.
- Stop for approval before changing APIs or business logic.
- Produce a report after every stage:
  * Summary
  * Files changed
  * Risks
  * Validation
  * Next step

Quality Gates:
- npm run build passes
- TypeScript clean
- ESLint clean
- No duplicated code
- No accessibility regressions
- No visual regressions
