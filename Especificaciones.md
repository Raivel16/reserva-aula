Sistema de reservas de aulas
1. Nombre de la aplicación
Reserva Aula

2. Problema que resuelve
Una institución necesita controlar de manera sencilla la reserva de aulas para determinadas actividades académicas.

3. Objetivo del ejercicio
Crear una interfaz que permita registrar reservas y visualizar dinámicamente la disponibilidad de aulas.

4. Funcionalidades
Seleccionar aula, fecha, horario y actividad.
Registrar una reserva.
Mostrar las reservas realizadas en una tabla.
Evitar reservas duplicadas para la misma aula, fecha y horario.
Eliminar una reserva.
Mostrar visualmente la disponibilidad de las aulas.
5. Manipulación del DOM requerida
querySelector().
addEventListener().
createElement().
appendChild().
remove().
textContent.
classList.
setAttribute().
Creación dinámica de filas de una tabla.
Actualización de indicadores de disponibilidad.
6. Requisitos de interfaz
Debe contener:

Formulario de reserva.
Selector de aula.
Campo de fecha.
Selector de horario.
Campo de actividad.
Botón Reservar.
Tabla de reservas.
Indicadores de disponibilidad.
7. Reglas de funcionamiento
Todos los datos obligatorios deben estar completos.
Una misma aula no puede reservarse dos veces para la misma fecha y horario.
Una reserva válida debe incorporarse inmediatamente a la tabla.
La eliminación debe liberar nuevamente el aula.
Los mensajes de error deben mostrarse en la interfaz.
La disponibilidad debe actualizarse después de registrar o eliminar una reserva.
8. Casos de prueba para la demostración
Caso	Acción	Resultado esperado
1	Registrar una reserva válida	Aparece una nueva fila
2	Intentar registrar la misma aula, fecha y hora	Se rechaza la reserva
3	Registrar otra aula en el mismo horario	Se permite
4	Eliminar una reserva	Desaparece de la tabla
5	Volver a reservar el aula liberada	La reserva es aceptada
9. Evidencias de aprendizaje
Uso de formularios HTML.
Selectores y tablas.
Eventos de formularios.
Validación mediante JavaScript.
Recorrido de arreglos.
Condiciones y búsqueda de información.
Creación y eliminación de filas.
Actualización dinámica de estados visuales.