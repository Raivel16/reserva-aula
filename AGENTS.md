# AGENTS.md

## What this is
Static vanilla HTML/CSS/JS classroom-booking app (**Reserva Aula**): npm-less, buildless, featurless, frameworkless. No package.json, no test runner, no committed tests. The authoritative spec is **`Especificaciones.md`** (Spanish) — read it before changing behavior; `README.md` mirrors it.
UI strings and commit messages are **Spanish** — keep it that way.

## Run
- Open `index.html` directly (works from `file://` because scripts are classic, not ES modules), or `python -m http.server 8000` → http://localhost:8000.
- No install step.

## Architecture & wiring gotchas
- Scripts load in fixed dependency order in `index.html` tail: **data** (`js/data/aulas.js`, `js/data/reservas.js`) → **view** (`js/ui/formulario.js`, `tabla.js`, `indicadores.js`, `mensajes.js`) → **control** (`js/app.js`, init on `DOMContentLoaded`).
- **New JS file ⇒ add its `<script>` tag in the right slot in `index.html`**, or globals won't exist at runtime.
- No modules: top-level `const` creates a shared global lexical binding (usable by bare identifier everywhere), but it is **not** a property of `window` — don't check `window.Foo`. Name collisions across files fail silently.
- Shared helpers cross layers by design: `fechaHoyISO()` / `esHorarioPasado()` (in `js/data/reservas.js`) are also consumed by the view; `formatearFecha()` (tabla.js) is used by the controller; `obtenerNombreAula()` (aulas.js) everywhere.

## Business rules (from the spec — don't break these)
- Duplicate = same **aula + fecha + horario** → rejected with UI message; valid reservation appends a row instantly; delete frees the aula; availability updates after register/delete.
- Date `min` = today (`setAttribute` in `formulario.js`); past horarios are rejected by `esHorarioPasado()` and shown gray/disabled on the board.
- Form has `novalidate`; ALL validation is JS: `EstadoReservas.validarDatosReserva()` (data) → `MensajesUI` message + `app.js::aplicarEstadoInvalido()` (classList + `aria-invalid`).

## Adding a new form field (wiring checklist)
Markup in `index.html` AND `FormularioUI.elementos` + `obtenerDatos()` AND `validarDatosReserva()` AND `aplicarEstadoInvalido()`. Missing any one breaks validation.

## Board selection — recent fix, don't regress
`IndicadoresUI.seleccion` stores the exact clicked cell `{aulaId, fecha, horario}`; `celda--seleccionada` must apply **only to that cell**, never the whole horario column. Selection resets when the date changes.

## DOM API constraint (learning-spec requirement)
Must keep using `querySelector`, `addEventListener`, `createElement`, `appendChild`, `remove`, `textContent`, `classList`, `setAttribute`; build rows/cells with `createElement` (no `innerHTML` rows, no frameworks).

## Git workflow (user-enforced, non-negotiable)
- Every change on a **`feature/{name}`** or **`bugfix/{fix}`** branch; never commit directly on `main`.
- Atomic commits, Spanish conventional messages: `feat:`, `fix:`, `style:`, `docs:`, `refactor:`, `chore:`.
- Merge with `git merge --no-ff <rama> -m "Merge rama <rama> into main"`, then `git push -u origin <rama>` and `git push origin main`. All branches stay on origin.

## Windows / line endings
- `.gitattributes` pins `* text=auto eol=lf`; "LF will be replaced by CRLF" warnings are harmless. Never commit CRLF/whitespace-only diffs (this has bitten `Especificaciones.md` before).
- Shell is Git Bash on Windows.

## Verification (no browser assumed)
- Desktop browser tooling can be disconnected; there are no committed tests. To smoke-test the UI headlessly, use **jsdom in a scratch dir outside the repo** (user asked tests not be committed): inline each `<script src>` into `index.html`, load with `runScripts: 'dangerously'`, and **wait for `DOMContentLoaded`** before interacting — jsdom fires it asynchronously, and acting earlier hits an uninitialized app.
- The data layer (`aulas.js` + `reservas.js`) is DOM-free: run it under plain Node by concatenating files into `new Function(...)`. `esHorarioPasado` depends on the real clock — use future dates (e.g. `2026-09-23`) in fixtures.