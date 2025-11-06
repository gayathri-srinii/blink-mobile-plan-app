# Copilot instructions for blink-mobile-plan-app

This repo is a small monorepo with two main parts:
- `blink-backend/blinkapp` — Spring Boot (Java 17, Maven) REST API using JPA and JWT helpers.
- `blink-frontend` — React app (Vite) using react-router and Bootstrap.

Keep the following focused facts in mind when making code changes or PRs:

1. Architecture & data flow
   - Backend (`blink-backend/blinkapp`) is a Spring Boot app (see `pom.xml`) exposing REST endpoints under `/api/*`.
   - Auth endpoints: `POST /api/auth/register` and `POST /api/auth/login` are implemented in `AuthController` and handled by `AuthService` which uses `UserRepository` (JPA).
   - JWTs are created/validated in `JwtUtil` (secret is hard-coded in `JwtUtil.SECRET_KEY`). The code currently generates tokens but there is no HTTP filter to extract/validate tokens on incoming requests — authenticated routes rely on Spring Security configuration but no JWT-based authentication filter is wired.
   - Frontend is a Vite+React single page app. Client routing lives in `src/App.jsx`. Login/Signup components are in `src/components` and currently are local (use alerts); integrating real auth requires changing these to call backend APIs.

2. Key files to inspect or modify
   - Backend: `blink-backend/blinkapp/src/main/java/com/example/controller/AuthController.java`, `UserController.java`, `service/AuthService.java`, `service/UserService.java`, `util/JwtUtil.java`, `repository/UserRepository.java`, `config/SecurityConfig.java`.
   - Frontend: `blink-frontend/package.json`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `src/components/Login.jsx`, `src/components/Signup.jsx`.
   - DB config: `blink-backend/blinkapp/src/main/resources/application.properties` (MySQL connection, server.port=8080).

3. Common developer workflows (exact commands)
   - Backend (Windows PowerShell using the Maven wrapper):

     .\blink-backend\blinkapp\mvnw.cmd spring-boot:run

     or build+run jar:

     cd blink-backend\blinkapp; .\mvnw.cmd -DskipTests clean package ; java -jar target\blinkapp-0.0.1-SNAPSHOT.jar

   - Backend tests:

     cd blink-backend\blinkapp; .\mvnw.cmd test

   - Frontend (from repo root):

     cd blink-frontend; npm install
     cd blink-frontend; npm run dev

   - Frontend lint:

     cd blink-frontend; npm run lint

   - Run both at once: open two shells (frontend uses port 5173 by default; backend 8080). Frontend does not currently proxy API calls — controllers use `@CrossOrigin("*")` so CORS is permitted.

4. Integration notes / examples
   - To replace the placeholder login UI with a real call, POST to `http://localhost:8080/api/auth/login` using JSON {"email":"...","password":"..."}. Example fetch (frontend):

     fetch('http://localhost:8080/api/auth/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password })
     })
       .then(r => r.text()) // backend currently returns token as plain text
       .then(token => localStorage.setItem('token', token))

   - When calling protected endpoints, include the token as `Authorization: Bearer <token>`.

5. Project-specific conventions & gotchas
   - JWT secret is hard-coded in `JwtUtil`. Rotate it and/or move it to environment variables (`application.properties`) before production.
   - Passwords are encoded with BCrypt in `AuthService` — follow that when creating users.
   - `SecurityConfig` permits `/api/auth/**` and requires auth for others, but no JWT filter is configured. If you add token-based auth for requests, implement and register a filter that extracts the Authorization header, validates the token with `JwtUtil.validateToken`, and sets the SecurityContext.
   - `UserConfig` defines an in-memory `UserDetailsService` — this project uses `UserRepository` directly for auth flows. Be careful when adding Spring Security auth managers; there may be overlap with the in-memory manager.
   - Frontend currently uses client-side navigation only (no backend calls); expect to wire network calls manually in `Login.jsx` / `Signup.jsx`.

6. Tests & linting
   - Backend tests: `mvn test` as above. Spring Boot test dependencies are included in `pom.xml`.
   - Frontend lint: `npm run lint` (ESLint is configured in the project root of the frontend).

7. If you touch auth:
   - Update `JwtUtil.SECRET_KEY` to use a property or env var; update `application.properties` and reference via `@Value` in `JwtUtil`.
   - Add an authentication filter (example place: `config/JwtFilter.java`) and register it in `SecurityConfig.filterChain` so requests with Bearer tokens are authenticated.

If anything above is unclear or you want a sample JWT filter + frontend login wiring added, say which part to implement and I will open a PR with the changes.
