# Project: Reforming Research - AI Lessons Demo

This project is a demonstration of lessons learned while integrating AI into research workflows. It serves as both a presentation and a technical case study.

## Critical Mandates

- **Environment:** Always use **PowerShell** for shell commands. Assume a Windows environment.
- **UI & Styling:**
    - Use **TailwindCSS** (via CDN) for all HTML content.
    - Follow the established aesthetic: **Inter** font, slate/sky color palette, and **FontAwesome** icons.
    - Maintain the "slide-based" presentation structure in `content/` files.
- **AI Workflow Strategy:**
    - **Implementation Plans First:** Before writing complex code, describe the intended behavior in plain language to ensure architectural alignment.
    - **Process Documentation:** After every conversation turn, update `public/content/lesson-x.md` with a summary of the interaction, decisions made, and the rationale for the path forward. This log serves as the foundation for the final "Meta-Lesson" on building the project.
    - **The Efficiency Rule:** If a complex logic issue isn't resolved within two iterations, stop and propose a manual debugging strategy or a complete architectural pivot rather than patching.
    - **Behavioral Specification:** Focus on what the code should *achieve* rather than just translating or moving existing logic.

## Project Structure

- `public/content/`: Contains the lesson slides (HTML files) and process logs.
- `src/`: React source code for the presentation shell.
- `venv/`: Local Python virtual environment.

## Contextual Precedence

These instructions take absolute precedence over general defaults. Always prioritize the "Expertise as the Pilot" philosophy—ensure that all AI-generated content is architecturally sound and guided by clear domain intent.
