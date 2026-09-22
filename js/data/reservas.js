/**
 * Capa de datos — Estado de las reservas y reglas de negocio.
 * Aquí vive la "memoria" de la aplicación: el arreglo de reservas y las
 * operaciones permitidas sobre él (alta con validación de duplicados y baja).
 */

const EstadoReservas = {
  reservas: [],
  contadorId: 1,

  /** Devuelve una copia del arreglo de reservas. */
  obtenerTodas() {
    return this.reservas.slice();
  },

  /** Indica si ya existe una reserva para la misma aula, fecha y horario. */
  existeDuplicado({ aulaId, fecha, horario }) {
    return this.reservas.some(
      (reserva) =>
        reserva.aulaId === aulaId &&
        reserva.fecha === fecha &&
        reserva.horario === horario
    );
  },

  /** Añade una reserva válida al estado y la devuelve. */
  agregar({ aulaId, fecha, horario, actividad }) {
    const reserva = {
      id: this.contadorId++,
      aulaId,
      fecha,
      horario,
      actividad: actividad.trim(),
    };
    this.reservas.push(reserva);
    return reserva;
  },

  /**
   * Valida que todos los datos de una reserva estén completos y que el
   * horario no haya transcurrido ya. Devuelve un arreglo de mensajes de error.
   */
  validarDatosReserva(datos) {
    const errores = [];
    if (!datos.aulaId) errores.push('Debes seleccionar un aula.');
    if (!datos.fecha) errores.push('Debes indicar una fecha.');
    if (!datos.horario) errores.push('Debes seleccionar un horario.');
    if (!datos.actividad || datos.actividad.trim() === '') {
      errores.push('Debes escribir una actividad.');
    }
    if (datos.fecha && datos.horario && esHorarioPasado(datos.fecha, datos.horario)) {
      errores.push('El horario elegido ya pasó para la fecha seleccionada.');
    }
    return errores;
  },
};

/** Devuelve la fecha de hoy en formato YYYY-MM-DD (no se reserva en el pasado). */
function fechaHoyISO() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

/** Determina si un bloque horario ya transcurrió para la fecha indicada. */
function esHorarioPasado(fechaISO, horario) {
  if (!fechaISO || !horario) return false;
  const [anio, mes, dia] = fechaISO.split('-').map(Number);
  const horaInicio = Number(horario.slice(0, 2));
  const minutoInicio = Number(horario.slice(3, 5)) || 0;
  const momentoHorario = new Date(anio, mes - 1, dia, horaInicio, minutoInicio);
  return momentoHorario.getTime() < Date.now();
}