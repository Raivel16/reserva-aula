/**
 * Capa de control — Arranque de la aplicación y orquestación inicial.
 * Conecta la capa de datos con la capa de vista.
 */
document.addEventListener('DOMContentLoaded', iniciar);

/** Punto de entrada: prepara el formulario y la información de la cabecera. */
function iniciar() {
  FormularioUI.inicializar();
  mostrarFechaActual();
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