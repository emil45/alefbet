# Feature Workflow Skill

A structured workflow for implementing features and tasks. Ensures quality through exploration, implementation, review, and testing phases.

## When to Use

- Implementing new features
- Fixing bugs
- Refactoring code
- Any task from a task management system (Monday, Jira, Trello, GitHub Issues)

## Workflow Phases

### Phase 1: Task Acquisition

1. **Get task from task management system**
   - For Monday.com: Query board for "Working on it" or next "Waiting For Work" item
   - Read the full task description for implementation context

2. **Set task to "In Progress"**
   - Update status in task management system
   - This signals to others that work has started

### Phase 2: Exploration

3. **Explore the codebase** (BEFORE writing any code)
   - Use `Explore` agent or read relevant files
   - Understand existing patterns related to the task
   - Identify files that will need changes
   - Look for similar implementations to follow as patterns

4. **Create implementation plan**
   - Use `TodoWrite` to create a task list
   - For complex tasks, consider using `Plan` agent
   - Break down into small, verifiable steps

### Phase 3: Implementation

5. **Implement the feature**
   - Follow existing patterns discovered in exploration
   - Create reusable utilities when appropriate (not one-off code)
   - Update TodoWrite as you complete each step
   - Prefer editing existing files over creating new ones

6. **Build verification**
   ```bash
   npm run build
   ```
   - Fix any TypeScript errors
   - Fix any lint errors

### Phase 4: Testing

7. **Run existing tests**
   ```bash
   npm test
   ```
   - All tests must pass before proceeding
   - Fix any regressions caused by changes

8. **Evaluate test coverage**
   - Consider: Does this feature need new tests?
   - Check CLAUDE.md for project testing guidelines
   - For Lepdy: Only add tests for new pages/routes or major functionality

### Phase 5: Review

9. **Run code-reviewer agent**
   - ALWAYS run after implementation
   - Focus on changed/new files
   - Address any high-priority issues found
   ```
   Task: code-reviewer agent on recent changes
   ```

10. **Run code-simplifier agent** (if complexity was added)
    - Use when: new abstractions, complex logic, multiple new files
    - Skip when: simple bug fixes, small changes
    ```
    Task: code-simplifier agent on new code
    ```

11. **Run silent-failure-hunter agent** (if error handling was added)
    - Use when: try/catch blocks, fallback logic, error handling
    - Ensures errors aren't silently swallowed

### Phase 6: Completion

12. **Mark task as complete**
    - Update status in task management system to "Done"
    - Clear the TodoWrite list

13. **Prompt for commit**
    - Ask user: "Ready to commit these changes?"
    - If yes, create commit with descriptive message
    - Do NOT push unless explicitly requested

## Decision Tree

```
Start Task
    │
    ▼
┌─────────────────────┐
│ 1. Get & Set Status │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ 2. Explore Codebase │◄── Use Explore agent for unfamiliar areas
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ 3. Plan with Todos  │◄── Complex task? Use Plan agent
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ 4. Implement        │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ 5. Build & Test     │◄── Must pass before continuing
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ 6. Code Review      │◄── ALWAYS run code-reviewer
└─────────────────────┘
    │
    ├── Complexity added? ──► Run code-simplifier
    │
    ├── Error handling? ────► Run silent-failure-hunter
    │
    ▼
┌─────────────────────┐
│ 7. Complete & Commit│
└─────────────────────┘
```

## Agents to Use

| Phase | Agent | When |
|-------|-------|------|
| Exploration | `Explore` | Understanding unfamiliar code |
| Planning | `Plan` | Complex multi-step features |
| Review | `code-reviewer` | **Always** after implementation |
| Review | `code-simplifier` | When complexity was added |
| Review | `silent-failure-hunter` | When error handling was added |

## Anti-Patterns to Avoid

- Starting to code before exploring existing patterns
- Skipping code-reviewer "because it's a small change"
- Creating new files when editing existing ones would work
- Marking task done before build/tests pass
- Pushing to remote without explicit user request
- Adding tests for trivial changes (follow project guidelines)
