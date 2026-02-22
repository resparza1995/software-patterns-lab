# Hexagonal Architectural Rules (Ports and Adapters)

Rules specific to the Hexagonal Architecture pattern.

## 1. The Core (Inside)
- **Domain Purity**: The Domain Core must be completely isolated from external technologies.
- **Zero External Dependencies**: The core should not depend on frameworks (Spring, Express, etc.) or libraries (TypeORM, Axios).

## 2. Ports (Interfaces)
- **Inbound Ports**: Interfaces for the Application services called by external actors.
- **Outbound Ports**: Interfaces for the external systems (DB, APIs) called by the Application core.

## 3. Adapters (Outside)
- **Driving Adapters (Primary)**: Transform external requests into calls to Inbound Ports (e.g., REST Controllers, CLI).
- **Driven Adapters (Secondary)**: Implement Outbound Ports to communicate with external systems (e.g., Repositories, API Clients).

## 4. Critical Violations
- **Adapter Leakage**: An adapter calling another adapter directly without going through the core.
- **Core Pollution**: Using third-party DTOs or entities inside the core.
- **Missing Ports**: The core calling an implementation directly instead of an interface.
