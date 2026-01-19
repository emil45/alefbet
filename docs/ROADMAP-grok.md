# Lepdy Strategic Product Roadmap v2.0 (January 2026)

## Executive Summary

Lepdy (lepdy.com) remains a charming, authentic Hebrew-first learning platform for children aged 2–7, distinguished by real Israeli child pronunciation (Noa's voice), watercolor aesthetics, RTL-native design, and support for Hebrew, English, and Russian. As of January 17, 2026, the core offering is unchanged: foundational content categories and six engaging games, with no visible implementation of advanced features like accounts, progress tracking, or monetization.

This v2.0 roadmap refines prior recommendations with fresh 2026 insights:
- Competitive landscape: Khan Academy Kids, Lingokids, and TinyPal dominate global rankings; Hebrew-specific kid apps remain scarce.
- Market benchmarks: Education app retention is challenging (average ~2% at Day 30), but gamification can boost engagement 48–150%.
- Pricing trends: Average kids learning subscriptions ~$8/month or $56/year.
- Priorities: Double down on retention mechanics first, then personalization, content depth (e.g., nikud/vowels for emerging readers), and organic growth targeting Israeli/diaspora families.

**Strategic Goal**: Transform Lepdy into the #1 joyful Hebrew literacy app worldwide, achieving 100,000 MAU and sustainable MRR by end-2027, while preserving its authentic, ad-free soul.

---

## 1. Current State Assessment (Verified January 17, 2026)

**Content Categories**
- Letters (22 Hebrew letters with audio)
- Numbers (1–10)
- Colors (~12)
- Shapes (~22)
- Animals (~20 with sounds + names)
- Food (~21)
- Vocabulary (138+ words in Word Builder)

**Games (Unchanged)**
- Simon
- Letter Rain
- Memory Match
- Speed Challenge
- Word Builder
- Guess Game

**Strengths**
- Authentic child voice recordings
- Beautiful, consistent watercolor art
- Multi-language (Hebrew/English/Russian) with seamless switching
- Frictionless access (no login required)
- PWA-ready structure

**Gaps**
- No retention mechanics (streaks/badges)
- No letter tracing or nikud support
- No progress tracking or personalization
- No offline enhancements or parent tools
- Leaderboards referenced historically but not visible

---

## 2. Competitive Landscape (2026 Update)

**Global Leaders**
- **Khan Academy Kids**: Free, structured, highly personalized (top-ranked for early learning)
- **Lingokids**: Playlearning focus, 160M+ families, strong gamification
- **TinyPal**: Holistic development, emerging #1 in some rankings
- **Epic!**: Digital library, high revenue (~$2M/month)

**Hebrew/Niche Competitors**
- Limited kid-focused options: General apps (HebrewPod101, Lingopie) dominate adult learning
- Legacy apps (Ji Alef-Bet, AlephBet) lack modern polish/authenticity

**Lepdy's Edge**
- Only app with real Israeli child voice + Hebrew-first design
- Underserved Russian-Israeli diaspora
- Simplicity avoids bloat of broader apps

---

## 3. Vision & Value Proposition

**Vision**  
*Lepdy: The world's most joyful and authentic path to Hebrew literacy for young children and their families.*

**UVP**  
*Beautiful, playful Hebrew learning with real Israeli child pronunciation, designed from the ground up for young children — in Hebrew, English, and Russian.*

---

## 4. Prioritized Roadmap

### Phase 1: Retention & Habit Formation (Months 1–4, Q1–Q2 2026)  
*Theme: Make kids (and parents) return daily*

**Prioritized Quick Wins (Effort/Impact Matrix)**

| Priority | Feature                     | Rationale (2026 Data)                          | Effort    | Impact |
|----------|-----------------------------|------------------------------------------------|-----------|--------|
| 1        | Daily Streak + Rewards      | Gamification boosts engagement 48–150%; critical for low ed-app retention (~2% D30) | 1–2 weeks | High   |
| 2        | Achievement Badges (20+)    | Collectibility drives repeat play              | 1–2 weeks | High   |
| 3        | Letter Tracing + Nikud Intro| Top parent request; foundational for reading    | 3–4 weeks | High   |
| 4        | Full PWA Offline Mode       | Enables travel/use without WiFi                 | 2 weeks   | Medium |
| 5        | Celebrations & Leaderboards | Re-implement visible leaderboards             | 1 week    | Medium |

**Deliverables**
- Homepage streak flame + daily reward prompt
- Badge collection gallery
- Tracing game with stroke guidance and nikud hints
- Offline caching for all audio/content
- Basic analytics (game completions, sessions)

### Phase 2: Personalization & Parent Engagement (Months 5–9, Q3 2026–Q1 2027)  
*Theme: Build lasting relationships*

**Core Features**
- Firebase Auth (Google/Apple/Email)
- Multi-child profiles (up to 5)
- Progress tracking: Mastery levels (letters, words, nikud)
- Visual "My Hebrew Journey" album for kids
- Parent Dashboard: Weekly emails, screen-time controls, insights (PIN-protected)

**Content Additions**
- 15 interactive stories with audio (simple + nikud versions)
- Phrases & sentences category
- Seasonal holiday packs (Pesach, Hanukkah)

### Phase 3: Growth & Sustainable Monetization (Months 10+, 2027)  
*Theme: Scale joyfully*

**Freemium Model (Aligned to 2026 Benchmarks)**

| Tier    | Monthly | Annual  | Features                                          |
|---------|---------|---------|---------------------------------------------------|
| Free    | $0      | $0      | All basic content, 4 games, streaks/badges, 1 profile |
| Premium | $5.99   | $49.99  | All games + tracing/stories, unlimited profiles, full tracking, parent dashboard, offline, ad-free |
| Family  | $8.99   | $79.99  | Premium + family sharing, exclusive holiday content |

**Growth Channels**
- SEO/content marketing: Parent blog (Hebrew tips, diaspora guides)
- Community: Social sharing of badges, referral program
- Partnerships: Israeli schools, Russian-Jewish organizations
- Paid acquisition: Targeted Meta/Google ads (Hebrew-speaking parents)

**Advanced Ideas**
- Native iOS/Android apps (via PWA wrapping or React Native)
- Printable worksheets integration

---

## 5. Risks & Mitigation

| Risk                     | Likelihood | Mitigation                              |
|--------------------------|------------|-----------------------------------------|
| Slow feature rollout     | High       | Start with quick wins; validate via analytics |
| Low conversion           | Medium     | Generous free tier; test pricing early   |
| Compliance (COPPA/GDPR)  | Critical   | Legal review before accounts launch     |
| Acquisition costs        | Medium     | Focus organic/community first           |

---

## 6. Success Metrics (2026–2027 Targets)

**North Star**: Weekly Active Learners (≥3 activities/week)

| Metric             | Phase 1 (End Q2 2026) | Phase 2 (End 2026) | Phase 3 (End 2027) |
|--------------------|-----------------------|--------------------|-------------------|
| MAU                | 10,000                | 30,000             | 100,000           |
| 7-Day Retention    | 35%                   | 45%                | 50%               |
| 30-Day Retention   | 20%                   | 30%                | 35%               |
| Premium Conversion | —                     | 2%                 | 4–6%              |
| MRR                | —                     | $2,000             | $15,000+          |

---

## 7. Technical & Compliance

**Stack**
- Maintain Next.js + Firebase
- Add: Firestore, Stripe, analytics (Plausible/Firebase)

**Compliance**
- COPPA: Verifiable parental consent
- Minimal data collection

**Performance**
- Target LCP <2s, aggressive caching

---

## 8. Immediate Next Steps (January–February 2026)

1. Implement analytics tracking
2. Build streak system (localStorage)
3. Develop 10–15 badges
4. Prototype letter tracing with nikud support
5. Set up PWA manifest/service worker

---

## 9. Top Priorities Reconfirmed

1. **Streak + Rewards** – Proven retention rocket fuel
2. **Letter Tracing (with Nikud)** – Unlocks true literacy progression
3. **Badges & Leaderboards** – Immediate fun loop
4. **Offline PWA** – Removes barriers
5. **Analytics** – Data-driven iteration from day one

This v2.0 roadmap is execution-focused, market-aligned, and preserves Lepdy's heartfelt authenticity. Start small, measure relentlessly, and watch the joy spread.
