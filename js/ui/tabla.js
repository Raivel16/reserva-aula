/**
 * Capa de vista — Renderizado dinámico de la tabla de reservas.
 * Crea las filas de la tabla a partir del estado de las reservas.
 */

const TablaUI = {
  cuerpoTabla: null,
  estadoVacio: null,
  contador: null,
  alEliminar: null,

  inicializar(opciones) {
    this.cuerpoTabla = document.querySelector('#cuerpo-tabla');
    this.estadoVacio = document.querySelector('#tabla-vacia');
    this.contador = document.querySelector('#contador-reservas');
    this.alEliminar = opciones.alEliminar;
  },

  /** Vuelve a dibujar todas las filas a partir del arreglo de reservas. */
  renderizar(reservas) {
    this.cuerpoTabla.textContent = '';
    reservas.forEach((reserva) => {
      this.cuerpoTabla.appendChild(this._crearFila(reserva));
    });
    this._actualizarContador();
    this._actualizarEstadoVacio();
  },

  /** Elimina del DOM la fila correspondiente a una reserva y actualiza el resumen. */
  eliminarFila(idReserva) {
    const fila = this.cuerpoTabla.querySelector(`tr[data-id="${idReserva}"]`);
    if (fila) fila.remove();
    this._actualizarContador();
    this._actualizarEstadoVacio();
  },

  /** Construye una fila de la tabla para una reserva. */
  _crearFila(reserva) {
    const fila = document.createElement('tr');
    fila.setAttribute('data-id', reserva.id);

    const valores = [
      obtenerNombreAula(reserva.aulaId),
      formatearFecha(reserva.fecha),
      reserva.horario,
      reserva.actividad,
    ];

    valores.forEach((texto) => {
      const celda = document.createElement('td');
      celda.textContent = texto;
      fila.appendChild(celda);
    });

    const celdaAccion = document.createElement('td');
    const botonEliminar = document.createElement('button');
    botonEliminar.type = 'button';
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.className = 'boton boton--peligro boton--compacto';
    botonEliminar.setAttribute('aria-label', `Eliminar la reserva de ${obtenerNombreAula(reserva.aulaId)}`);
    botonEliminar.addEventListener('click', () => {
      if (this.alEliminar) this.alEliminar(reserva.id);
    });
    celdaAccion.appendChild(botonEliminar);
    fila.appendChild(celdaAccion);

    return fila;
  },

  /** Actualiza el contador de reservas de la cabecera de la sección. */
  _actualizarContador() {
    const total = this.cuerpoTabla.children.length;
    this.contador.textContent = `${total} ${total === 1 ? 'reserva' : 'reservas'}`;
  },

  /** Muestra u oculta el mensaje de "no hay reservas". */
  _actualizarEstadoVacio() {
    const hayFilas = this.cuerpoTabla.children.length > 0;
    this.estadoVacio.classList.toggle('estado-vacio--oculto', hayFilas);
  },
};

/** Devuelve una fecha ISO (YYYY-MM-DD) en formato legible dd/mm/aaaa. */
function formatearFecha(fechaISO) {
  if (!fechaISO) return '';
  const [anio, mes, dia] = fechaISO.split('-').map(Number);
  return new Date(anio, mes - 1, dia).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}