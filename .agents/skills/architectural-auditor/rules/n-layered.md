# N-Layered Architectural Rules

Rules specific to the N-Layered (Traditional) architecture pattern.

## 1. Strict Layering
- **Downward Flow**: Dependencies MUST only flow downwards (Presentation -> Application -> Domain -> Infrastructure).
- **No Layer Skipping (Optional but recommended)**: A layer should ideally only communicate with the layer immediately below it.

## 2. Layer Responsibilities
- **Presentation**: Entry points (Controllers, UI). Only handles input/output.
- **Application**: Orchestration (Use Cases). Coordinates between Domain and Infrastructure.
- **Domain**: Pure business logic (Entities, Value Objects). SHOULD NOT depend on anything.
- **Infrastructure**: Technical details (Database, External APIs). Implementations of abstractions.

## 3. Critical Violations
- **Leaked Infrastructure**: If `Domain` contains ORM annotations or HTTP status codes.
- **Cyclic Dependency**: If `Domain` tries to access `Presentation` logic.
- **Fat Controllers**: Business logic residing in the `Presentation` layer.
