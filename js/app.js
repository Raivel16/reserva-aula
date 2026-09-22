/**
 * Capa de control — Orquestación entre las capas de datos y de vista.
 * Reacciona a los eventos del usuario y mantiene la interfaz sincronizada
 * con el estado de las reservas.
 */
document.addEventListener('DOMContentLoaded', iniciar);

/** Punto de entrada de la aplicación. */
function iniciar() {
  FormularioUI.inicializar();
  TablaUI.inicializar({ alEliminar: eliminarReserva });
  MensajesUI.inicializar();
  IndicadoresUI.inicializar({ alSeleccionarCelda: precargarFormulario });
  mostrarFechaActual();
  TablaUI.renderizar(EstadoReservas.obtenerTodas());
  renderizarIndicadores();

  const { formulario, fecha, horario } = FormularioUI.elementos;
  formulario.addEventListener('submit', manejarEnvioReserva);
  fecha.addEventListener('change', renderizarIndicadores);
  horario.addEventListener('change', renderizarIndicadores);
}

/** Registra una reserva válida o muestra un mensaje de error. */
function manejarEnvioReserva(evento) {
  evento.preventDefault();
  MensajesUI.limpiar();
  const datos = FormularioUI.obtenerDatos();
  aplicarEstadoInvalido(datos);

  const errores = EstadoReservas.validarDatosReserva(datos);
  if (errores.length > 0) {
    MensajesUI.mostrarError(errores.join(' '));
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
  renderizarIndicadores();
  FormularioUI.limpiar();
  MensajesUI.mostrarExito(
    `Reserva registrada: ${obtenerNombreAula(reserva.aulaId)} · ${formatearFecha(reserva.fecha)} · ${reserva.horario} · ${reserva.actividad}.`
  );
}

/** Elimina una reserva por su id, actualiza la tabla y libera el aula. */
function eliminarReserva(idReserva) {
  const reserva = EstadoReservas.eliminar(idReserva);
  if (!reserva) return;
  TablaUI.eliminarFila(idReserva);
  renderizarIndicadores();
  MensajesUI.mostrarExito(
    `Reserva eliminada. ${obtenerNombreAula(reserva.aulaId)} queda libre el ${formatearFecha(reserva.fecha)} a las ${reserva.horario}.`
  );
}

/** Precarga aula, fecha y horario desde una celda libre del tablero. */
function precargarFormulario(seleccion) {
  const { aula, fecha, horario } = FormularioUI.elementos;
  aula.value = seleccion.aulaId;
  fecha.value = seleccion.fecha;
  horario.value = seleccion.horario;
  renderizarIndicadores();
  FormularioUI.elementos.actividad.focus();
  MensajesUI.mostrarInfo(
    `Formulario precargado: ${obtenerNombreAula(seleccion.aulaId)}, ${formatearFecha(seleccion.fecha)} a las ${seleccion.horario}. Completa la actividad y pulsa Reservar.`
  );
}

/** Redibuja el tablero de disponibilidad con el estado y la selección actuales. */
function renderizarIndicadores() {
  IndicadoresUI.renderizar({
    reservas: EstadoReservas.obtenerTodas(),
    fecha: FormularioUI.elementos.fecha.value,
  });
}

/** Marca visual y semánticamente los campos vacíos (classList + aria-invalid). */
function aplicarEstadoInvalido(datos) {
  const campos = {
    aulaId: FormularioUI.elementos.aula,
    fecha: FormularioUI.elementos.fecha,
    horario: FormularioUI.elementos.horario,
    actividad: FormularioUI.elementos.actividad,
  };

  Object.entries(campos).forEach(([clave, campo]) => {
    const estaVacio = String(datos[clave] ?? '').trim() === '';
    campo.classList.toggle('campo--invalido', estaVacio);
    if (estaVacio) campo.setAttribute('aria-invalid', 'true');
    else campo.removeAttribute('aria-invalid');
  });
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