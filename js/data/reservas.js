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
};

/** Devuelve la fecha de hoy en formato YYYY-MM-DD (no se reserva en el pasado). */
function fechaHoyISO() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}