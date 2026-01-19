---
name: feature-workflow
description: Autonomous feature development workflow. Fetches task from Monday.com, implements it, reviews with pr-review-toolkit agents, tests, commits, and pushes.
---

# /feature-workflow

Autonomous end-to-end feature development. Fetches next task from Monday.com and works independently until complete or help is needed.

---

## Context

| Key | Value |
|-----|-------|
| **Monday.com Board ID** | `5090306877` |
| **Status: Ready** | `To Do` |
| **Status: In Progress** | `In Progress` |
| **Status: Complete** | `Done` |
| **Description Column** | `text` |
| **Build Command** | `npm run build` |
| **Test Command** | `npm test -- --workers=1` |
| **Review Agents** | code-reviewer → silent-failure-hunter → code-simplifier |

### Tech Stack
Next.js 16, TypeScript, MUI, Firebase, next-intl (he/en/ru)

### File Structure
```
app/[locale]/     → Pages (server: page.tsx, client: *Content.tsx)
components/       → UI components
hooks/            → Custom hooks (useCelebration, useGameAnalytics)
utils/            → Utilities (audio.ts, celebrations.ts)
data/             → Static data arrays
lib/              → External integrations (firebase.ts, seo.ts)
```

### Key Patterns
- Audio: `playSound(AudioSounds.X)` for effects, `playAudio(path)` for content
- Celebrations: `useCelebration` hook with types: gameComplete, milestone, correctAnswer, streak

### Testing Rules
- **Add tests**: New pages, new games, major UI changes
- **Skip tests**: Copy changes, styling, adding category items

---

## Design Philosophy

> Claude is capable of extraordinary creative work. Don't hold back—show what can truly be created when thinking outside the box and committing fully to a distinctive vision.

### Mindset

This is a **children's learning app**. Every feature should spark joy, wonder, and delight. Generic is the enemy. Safe is forgettable. Kids deserve magic.

**Before coding any UI, ask:**
- What would make a 4-year-old's eyes light up?
- How can this feel like play, not work?
- What unexpected detail would make this memorable?

### Creative Principles

**1. Bold Over Safe**
Don't settle for "it works." Push for "this is delightful." A button could bounce. A transition could whoosh. Success could explode with confetti. Take creative risks.

**2. Personality Over Polish**
Generic rounded rectangles are forgettable. Give elements character. A loading state could be playful. An error could be gentle and encouraging. Everything communicates.

**3. Reward Every Interaction**
Children need constant positive feedback. Every tap should feel responsive. Every correct answer should celebrate. Every milestone should feel earned. Use `useCelebration` liberally.

**4. Sensory Richness**
Combine visual + audio + motion. A card flip with sound. A success with confetti AND fanfare. Multiple senses = deeper engagement.

**5. Surprise & Delight**
Add unexpected moments. Easter eggs. Playful animations. Sounds that make kids giggle. The details they'll show their parents.

### UI Guidelines

| Element | Guideline |
|---------|-----------|
| **Touch targets** | Minimum 48px, larger for small fingers |
| **Typography** | Large, clear, playful - never small text |
| **Colors** | Pastel palette from `theme.ts` - warm, inviting |
| **Animations** | Bouncy, celebratory - use spring physics |
| **Feedback** | Every interaction = visual + audio response |
| **Layout** | Breathing room, one clear action per view |

### Design Anti-Patterns

- Generic UI that could be any app
- Subtle animations kids won't notice
- Small text or tiny touch targets
- Silent interactions (no feedback)
- Overwhelming complexity
- "Adult" aesthetics (sharp, minimal, cold)

---

## Workflow

```
ACQUIRE → EXPLORE → PLAN → IMPLEMENT → SEO → REVIEW → TEST → SHIP
```

Execute phases sequentially. No approval gates. Ask for help only if stuck after 3 attempts.

---

## Phase 1: Acquire

**Goal**: Get next task from Monday.com.

1. Query **Monday.com Board ID** for items with **Status: In Progress** or **Status: Ready**
2. Priority: **Status: In Progress** first (resume), then oldest **Status: Ready**
3. Set status to **Status: In Progress**
4. Read **Description Column** for requirements
5. Create TodoWrite with task breakdown
6. If no tasks: Report "No pending tasks" and stop

---

## Phase 2: Explore

**Goal**: Understand codebase before coding.

1. Launch 2-3 Explore agents in parallel to find:
   - Similar features and patterns
   - Files that need changes
   - Existing utilities/hooks to reuse

2. Read all identified key files

3. Update TodoWrite with specific files to modify/create

---

## Phase 3: Plan

**Goal**: Break down into concrete steps.

1. Create detailed TodoWrite:
   - Each todo = one logical change
   - Order by dependency
   - Include build verification

2. Prefer editing existing files over creating new ones

---

## Phase 4: Implement

**Goal**: Build the feature.

1. For each todo:
   - Mark `in_progress`
   - Make change following existing patterns
   - Mark `completed`

2. **UI translations**: Add strings to `messages/{he,en,ru}.json` for any user-facing text

3. **Tests** (if needed per Testing Rules): Add to `e2e/app.spec.ts`

4. Run **Build Command** - fix ALL errors before proceeding

5. If stuck >3 attempts: Ask for help

---

## Phase 5: SEO

**Goal**: Ensure new pages/routes are discoverable.

**Skip this phase if**: No new pages or routes were created.

### For New Pages:

1. **Add translation keys** in `messages/{he,en,ru}.json`:
   ```json
   "seo": {
     "pages": {
       "yourPage": {
         "title": "...",
         "description": "..."
       }
     }
   }
   ```

2. **Generate metadata** in `page.tsx`:
   ```typescript
   export async function generateMetadata({ params }: Props) {
     const { locale } = await params;
     return generatePageMetadata(locale, 'yourPage', '/your-path');
   }
   ```

3. **Update sitemap** in `app/sitemap.ts`:
   - Add route to the `routes` array
   - Set appropriate priority (0.9 content, 0.6 games, 0.5 info)
   - Hreflang alternates are auto-generated for all locales

4. **Structured data** (if applicable):
   - FAQ page? Add FAQPage JSON-LD (see `learn/page.tsx`)
   - Game with scores? Consider adding Game schema

### Checklist:
- [ ] SEO translations in all 3 locales
- [ ] `generateMetadata` exports in page.tsx
- [ ] Route added to `app/sitemap.ts`

---

## Phase 6: Review

**Goal**: Catch issues before testing.

Run **Review Agents** sequentially:

### 6.1 code-reviewer
- Bugs, logic errors, guideline violations
- Fix critical/high severity issues

### 6.2 silent-failure-hunter
- Error handling, silent failures
- Fix swallowed exceptions

### 6.3 code-simplifier
- Unnecessary complexity
- Apply clarity improvements

After fixes: Re-run **Build Command**

---

## Phase 7: Test

**Goal**: Verify nothing broke.

1. Run **Test Command** (single worker avoids race conditions)

2. If fails:
   - **Failures in files YOU modified**: Fix the issue, re-run
   - **Failures in unrelated files**: Note them and proceed (pre-existing issues)
   - Re-run reviews if fix was significant
   - After 3 failures on YOUR code: Ask for help

3. If passes: Proceed to Ship

**Don't**: Use `git stash` to verify if failures are pre-existing. Just check if the failing test files relate to your changes.

---

## Phase 8: Ship

**Goal**: Commit, push, close task.

1. **Check working directory**: Run `git status`
   - If unrelated files are modified, ask user: "Include [file] in commit or revert?"
   - Don't silently revert or include without asking

2. **Commit** (types: `feat`, `fix`, `refactor`, `style`, `docs`, `test`):
```bash
git add <specific-files>
git commit -m "$(cat <<'EOF'
<type>(<scope>): <description>

<body>

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

3. **Push**: `git push`

4. **Update Monday.com**: Set status to **Status: Complete**

5. **Summary**: Report files changed, decisions made, follow-ups

---

## Error Handling

### Ask for help when:
- Build/test fails 3+ times on same issue
- Requirements unclear
- Major architectural decision needed

### Format:
```
I'm stuck on [issue].

Tried:
1. [attempt]
2. [attempt]
3. [attempt]

Error: [specific error]

Options:
- [A]
- [B]

Which approach?
```

---

## Workflow Anti-Patterns

- Coding before exploring codebase
- Creating files when editing existing works
- Skipping reviews "because it's small"
- Over-engineering for hypothetical needs
- Committing without tests passing
- Forgetting UI translations for new text
- Skipping SEO for new pages
- Using `git stash` to verify pre-existing test failures (just check file names)
- Silently reverting unrelated working directory changes without asking
