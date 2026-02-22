# Base Architectural Rules

These rules apply to ANY architectural pattern and should always be verified.

## 1. SOLID Principles
- **SRP (Single Responsibility Principle)**: Each module or class should have only one reason to change.
- **DIP (Dependency Inversion Principle)**: High-level modules should not depend on low-level modules. Both should depend on abstractions.

## 2. Cohesion and Coupling
- **High Cohesion**: Related logic should be grouped together.
- **Low Coupling**: Modules should have minimal knowledge of other modules.

## 3. Communication Patterns
- **Standardized Interfaces**: Use clear interfaces/contracts for communication between boundaries.
- **No Circular Dependencies**: Ensure there are no cycles in the dependency graph.

## 4. Separation of Concerns
- **UI vs Business Logic**: UI components should never contain domain logic.
- **Data Access vs Business Logic**: Business logic should not be coupled to the specific database technology.
