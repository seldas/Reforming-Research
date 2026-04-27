# Process Log: Building the Research Demo

This log records the interactions and decisions made during the development of the "Reforming Research" project.

## Session 1: Project Initialization & Architecture

### Interactions
- User requested the creation of a `GEMINI.md` file to set project standards (Windows, PowerShell, AI research focus).
- User inquired about the best tool to visualize HTML lessons (exported from Canva) as an interactive presentation.
- User directed that the development process itself be recorded as a "meta-lesson" (`lesson-x`).

### Decisions & Rationale
1.  **Standardization via `GEMINI.md`:** Established a strict "Expertise as the Pilot" philosophy. Mandated PowerShell and TailwindCSS for consistency.
2.  **Architecture: "The Shell & The Slide":** Use a Single Page Application (SPA) "Shell" to host individual lesson files via `<iframe>` or isolated containers.

## Session 2: Tooling Selection & Pre-Implementation Review

### Interactions
- User decided on **Vite + React** for the application framework.

### Decisions & Rationale
1.  **Vite + React:** Superior developer experience and easy static asset handling.
2.  **Asset Handling Strategy:** Keep `content/*.html` files as static assets in `public/`.

## Session 3: Architecture Implementation & Validation

### Interactions
- Manually scaffolded the Vite + React environment.
- Implemented a sidebar-based navigation using React state.

## Session 4: Server Integration & Presentation Logic

### Interactions
- Started the Vite development server on `localhost:5173`.
- Implemented a structured presentation flow: Title Page -> Table of Contents -> Lessons.
- Added PPTX export requirement.

### Decisions & Rationale
1.  **PPTX Conversion:** Integrated `pptxgenjs` for client-side slide generation.

## Session 5: Content Integrity & Recovery

### Interactions
- Identified and restored empty `lesson-1.html`.

## Session 6: Manual Intervention & Content Sync

### Interactions
- Synchronized the agent's state with user's manual updates to `lesson-1.html`.

## Session 7: Advanced Content Delivery (Markdown & Pagination)

### Interactions
- Integrated `react-markdown` and `remark-gfm` for professional rendering of the Meta-Lesson.
- Implemented session-based pagination for long markdown files.

## Session 8: Presentation Abstract & Branding

### Interactions
- Added an "Executive Highlights" abstract page.
- Integrated branding: Author "Leihong Wu" and "DBB Seminar 2026."
- Redesigned the Title Page for a clean, formal academic look.

## Session 9: Demo Integration & Project Scaling

### Interactions
- Added a dedicated "Demos" panel in the sidebar.
- Registered "FDALabel: Flask to Next.js" and "The 3-Day Build Workflow."
- Created initial planning documents for demos.

## Session 10: Audience-Centric Refinement

### Interactions
- Simplified the language across all lessons to be more accessible for general audiences and students.
- Renamed Lesson 1 to "Updating is Harder than Starting Fresh."
- Renamed Lesson 2 to "You are the Driver: The Best Way to Use AI."
- Created Lesson 3: "How we built this: Learning by Doing."

### Decisions & Rationale
1.  **Plain Language Shift:** Removed technical jargon in favor of relatable metaphors.
2.  **ToC Streamlining:** Refined the Table of Contents to focus exclusively on the core three lessons for better narrative flow.

## Session 11: Data-Driven Evidence Integration

### Interactions
- Analyzed a 470+ line git log (`migration-gitlog.md`) from the `askFDALabel` project.
- Extracted statistical patterns to support the core lessons of the presentation.
- Integrated empirical evidence into the final slides of Lesson 1 and Lesson 2.

## Session 12: Case Study Expansion

### Interactions
- Transformed the "Project Update: Old to New" demo from a plan into a detailed Case Study.
- Integrated specific numbers (2.5x effort increase, 72% side-effect rate) and a detailed timeline into the demo content.

### Decisions & Rationale
1.  **Evidence-First Demos:** Decided to treat the demos not just as empty links but as deep-dives into the data analyzed in Session 11.
2.  **Narrative Closure:** Ensured the Case Study provided a clear "Result" (4x faster navigation) to validate the architectural shift.

### Implementation Checklist (Final)
- [x] Launch Vite dev server.
- [x] Install `pptxgenjs`.
- [x] Redesign `App.tsx` with Title, Highlights, and ToC views.
- [x] Implement dynamic Abstract synthesis.
- [x] Integrate global branding (Author & Seminar).
- [x] Add dedicated "Demos" section to sidebar.
- [x] Simplify verbiage for non-AI experts/students.
- [x] Create Lesson 3 slide content.
- [x] Extend `downloadPPTX` for all content types.
- [x] Implement `react-markdown` viewer with sophisticated pagination (Intro/Session/Checklist/Summary).
- [x] Perform detailed analysis of `migration-gitlog.md`.
- [x] Populate `demo-migration.md` with statistical findings.

### Path Forward
- Final validation of the visual workflow timeline (`demo-workflow.md`).
- Ready for delivery.
