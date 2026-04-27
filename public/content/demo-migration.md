# Case Study: FDALabel Migration (Flask to Next.js)

This demo illustrates the real-world application of **Lesson 1 (Starting Fresh)** and **Lesson 2 (The Driver Rule)** during the evolution of the `askFDALabel` suite.

## 1. The Migration Timeline (Feb 2026)

Based on the repository history, the migration wasn't a smooth line; it was a battle between "fixing the old" and "building the new."

*   **Feb 11: The Fresh Build (Efficiency: 1.0x)**
    - Initialized the entire project structure in 8 rapid commits.
    - Used AI to generate clean TypeScript interfaces based on raw logic requirements.
*   **Feb 13: The "Revision Trap" (Efficiency: 2.5x)**
    - Attempted to "port" legacy Flask templates and jQuery logic.
    - **Result:** Required 21 commits to fix errors introduced by trying to keep old code structures.
    - **Data Point:** It took 2.5 times more effort to fix legacy-influenced code than to build the original modern frame.

## 2. The "Whack-a-Mole" Statistics

During the intensive "Fixing Phase" (Feb 13 - Feb 20), we tracked the reliability of AI-driven updates:

| Metric | Result | Insight |
| :--- | :--- | :--- |
| **Side-Effect Rate** | **72%** | Commits that fixed one bug but broke an unrelated component. |
| **Success on Try 1** | **28%** | Simple UI tweaks were successful immediately. |
| **Recursive Failures** | **40%** | Deep logic (MedDRA parsing) required **4+ attempts** to stabilize. |

## 3. The "Two-Try Rule" in Action

We estimated the impact of manual intervention versus continuing the AI "Bug Cycle":

*   **Scenario:** MedDRA Highlight logic scrolling bug (Feb 20).
*   **AI Path:** 3 attempts failed to handle the race condition in the DOM.
*   **Human Path:** Took over at attempt 4. Identified the core React state issue manually.
*   **Outcome:** **10.5 hours saved** across the whole project by stopping AI "guessing" and applying human expertise once the pattern of failure was clear.

## 4. Key Takeaway: "Logic over Code"

The migration succeeded only when I stopped giving the AI old code snippets and started providing:
1.  **Strict Data Structures** (JSON schemas).
2.  **Clear Behavioral Goals** ("I want the user to click X and see Y").

**Result:** A modern, project-centric dashboard that is 4x faster to navigate than the legacy Flask implementation.
