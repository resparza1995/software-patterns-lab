# Vertical Slicing Architectural Rules

Rules specific to the Vertical Slicing (Feature-Folder) architecture pattern.

## 1. Feature Isolation
- **Co-location**: All code related to a single feature (Presentation, Application, Persistence) SHOULD live in the same folder.
- **Side-Effect Free**: Changing one slice should ideally have zero impact on other slices.

## 2. Communication Between Slices
- **Shared Kernel (Optional)**: Common utilities or cross-cutting concerns (Auth, Logging) can live in a shared folder, but business logic should not.
- **Independence**: Slices should not depend on each other directly. If they need to communicate, use an Event Bus or a very thin Shared Interface.

## 3. Avoid "Layeritis"
- **Pragmatism**: Don't force every slice to have exactly the same internal layers if they aren't needed. A simple slice can be just a single file.

## 4. Critical Violations
- **Leaking Domain**: One slice importing domain entities from another slice.
- **Global Objects**: Using global services that orchestrate multiple slices (use a Message Bus instead).
- **Technological Silos**: Grouping by `controllers/` or `services/` globally instead of by `feature/`.
