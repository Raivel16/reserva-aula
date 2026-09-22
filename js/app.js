/**
 * Capa de control — Orquestación entre las capas de datos y de vista.
 * Reacciona a los eventos del usuario y mantiene la interfaz sincronizada
 * con el estado de las reservas.
 */
document.addEventListener('DOMContentLoaded', iniciar);

/** Punto de entrada de la aplicación. */
function iniciar() {
  FormularioUI.inicializar();
  TablaUI.inicializar({ alEliminar: null });
  MensajesUI.inicializar();
  mostrarFechaActual();
  TablaUI.renderizar(EstadoReservas.obtenerTodas());
  FormularioUI.elementos.formulario.addEventListener('submit', manejarEnvioReserva);
}

/** Registra una reserva válida o muestra un mensaje de error. */
function manejarEnvioReserva(evento) {
  evento.preventDefault();
  MensajesUI.limpiar();
  const datos = FormularioUI.obtenerDatos();

  const camposFaltantes = [];
  if (!datos.aulaId) camposFaltantes.push('el aula');
  if (!datos.fecha) camposFaltantes.push('la fecha');
  if (!datos.horario) camposFaltantes.push('el horario');
  if (!datos.actividad) camposFaltantes.push('la actividad');

  if (camposFaltantes.length > 0) {
    MensajesUI.mostrarError(`Completa los campos obligatorios: ${camposFaltantes.join(', ')}.`);
    return;
  }

  if (EstadoReservas.existeDuplicado(datos)) {
    MensajesUI.mostrarError(
      `Ya existe una reserva para ${obtenerNombreAula(datos.aulaId)} el ${formatearFecha(datos.fecha)} en el horario ${datos.horario}. Elige otra combinación de aula, fecha u horario.`
    );
    return;
  }

  const reserva = EstadoReservas.agregar(datos);
  TablaUI.renderizar(EstadoReservas.obtenerTodas());
  FormularioUI.limpiar();
  MensajesUI.mostrarExito(
    `Reserva registrada: ${obtenerNombreAula(reserva.aulaId)} · ${formatearFecha(reserva.fecha)} · ${reserva.horario} · ${reserva.actividad}.`
  );
}

/** Muestra la fecha de hoy con formato largo en la cabecera. */
function mostrarFechaActual() {
  const fechaActual = document.querySelector('#fecha-actual');
  fechaActual.textContent = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}