# Architecture

- Supabase Auth is the only authentication system.
- Server Components handle authenticated page reads.
- Route Handlers use API-specific guards and JSON responses.
- Repositories isolate data access.
- Services coordinate validation, permissions and audit events.
- UI components never import service-role clients.
