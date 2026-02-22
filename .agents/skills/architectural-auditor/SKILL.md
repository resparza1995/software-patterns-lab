---
name: architectural-auditor
description: Specialized skill for auditing software architectures and pattern implementations.
---

# Architectural Auditor Skill

This skill allows the agent to perform deep analysis of software architectures, ensuring pattern correctness, detecting code smells, and identifying missing information.

## Core Responsibilities

1.  **Correctness Verification**: Check if the implemented code follows the specific architectural pattern (e.g., N-Layered, Hexagonal).
2.  **Information Completeness**: Identify if key concepts (Pros/Cons, Diagram, Rules) are missing or insufficiently explained.
3.  **Refinement Suggestions**: Propose better ways to explain or structure the architectural information.

## How to use

1.  Read the relevant rule files in the `rules/` directory based on the pattern being analyzed.
2.  Follow the universal rules in `rules/base.md`.
3.  Generate the report using the template provided in `templates/audit-report.md`.

## Analysis Framework

When conducting an audit, always evaluate:
- **Dependency Direction**: Are the dependencies flowing correctly?
- **Isolation**: Is the business core free from infrastructure leakage?
- **Terminology**: Are the terms used appropriate for the pattern?
- **Visual Aid**: Does the diagram accurately represent the code structure?
