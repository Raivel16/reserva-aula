# 🏛️ Reserva Aula

Sistema de reservas de aulas para una institución académica, desarrollado **solo con HTML, CSS y JavaScript** (sin frameworks, sin librerías ni dependencias externas).

Permite registrar reservas de aulas y visualizar dinámicamente la disponibilidad de cada aula por fecha y horario.

---

## ✨ Funcionalidades

- **Registrar una reserva** seleccionando aula, fecha, horario y actividad.
- **Evitar duplicados**: una misma aula no puede reservarse dos veces en la misma fecha y horario.
- **Tabla dinámica de reservas** que se actualiza al instante.
- **Eliminar reservas** para liberar el aula nuevamente.
- **Tablero visual de disponibilidad** (aula × horario) que se actualiza al reservar, eliminar o cambiar la selección del formulario.
- **Precarga rápida**: clic en una celda libre del tablero rellena el formulario.
- **Validación** de campos obligatorios con mensajes de error claros en la interfaz.

## ⚙️ Reglas de funcionamiento

1. Todos los datos son obligatorios.
2. Misma aula + fecha + horario ⇒ la reserva se rechaza.
3. Una reserva válida aparece de inmediato en la tabla.
4. Al eliminar, el aula vuelve a estar disponible.
5. La disponibilidad se recalcula tras cada registro o eliminación.

## 🚀 Cómo ejecutar

Todo es frontend puro. Solo abre `index.html` en tu navegador, o sirve la carpeta con cualquier servidor estático:

```bash
# Python
python -m http.server 8000

# o con Node (npx)
npx serve
```

Luego abre `http://localhost:8000`.

## 🗂️ Estructura por capas

```
reserva-aula/
├── index.html              → Estructura semántica de la interfaz
├── css/
│   └── styles.css          → Tema visual, layout y responsive
└── js/
    ├── data/               → Capa de datos
    │   ├── aulas.js        → Catálogo de aulas y horarios
    │   └── reservas.js     → Estado y reglas de negocio (alta, validación, baja, disponibilidad)
    ├── ui/                 → Capa de vista (manipulación del DOM)
    │   ├── formulario.js   → Utilidades del formulario y selectores
    │   ├── tabla.js        → Render dinámico de la tabla
    │   ├── indicadores.js  → Tablero de disponibilidad
    │   └── mensajes.js     → Mensajes de error / éxito / info
    └── app.js              → Capa de control (eventos y orquestación)
```

## 🧑‍💻 Desarrollo incremental

Cada característica se implementó en una rama propia (`feature/*`) con commits atómicos y se integró a `main` con merge:

| Rama | Contenido |
| --- | --- |
| `feature/estructura-base` | HTML semántico y estilos base |
| `feature/catalogo-aulas` | Catálogo de aulas y horarios + selectores dinámicos |
| `feature/registro-reservas` | Estado de reservas, tabla dinámica y alta desde el formulario |
| `feature/validacion-mensajes` | Validación de campos y mensajes en la interfaz |
| `feature/eliminar-reservas` | Eliminación de reservas y liberación del aula |
| `feature/indicadores-disponibilidad` | Tablero aula × horario con precarga por clic |
| `feature/pulido-final` | Refinamientos visuales, accesibilidad y documentación |

## 🧪 Casos de prueba (demo)

| # | Acción | Resultado esperado |
| --- | --- | --- |
| 1 | Registrar una reserva válida | Aparece una nueva fila |
| 2 | Registrar la misma aula, fecha y hora | Se rechaza |
| 3 | Registrar otra aula en el mismo horario | Se permite |
| 4 | Eliminar una reserva | Desaparece de la tabla |
| 5 | Volver a reservar el aula liberada | Se acepta |

---

*Proyecto académico · HTML + CSS + JavaScript vanilla*