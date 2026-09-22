/**
 * Capa de vista — Tablero de disponibilidad de aulas por horario.
 * Muestra una matriz aula × horario con celdas de color y permite
 * precargar el formulario haciendo clic sobre una celda libre.
 */

const IndicadoresUI = {
  contenedor: null,
  alSeleccionarCelda: null,

  inicializar(opciones) {
    this.contenedor = document.querySelector('#tablero-disponibilidad');
    this.alSeleccionarCelda = opciones.alSeleccionarCelda;
  },

  /** Dibuja el tablero completo para la fecha seleccionada. */
  renderizar({ reservas, fecha, horario }) {
    this.contenedor.textContent = '';
    const fechaEfectiva = fecha || fechaHoyISO();

    this._renderizarEncabezado();
    AULAS.forEach((aula) => {
      this._renderizarFilaAula(aula, reservas, fechaEfectiva, horario);
    });
  },

  /** Fila superior con la etiqueta de cada bloque horario. */
  _renderizarEncabezado() {
    const fila = document.createElement('div');
    fila.className = 'tablero__fila tablero__fila--cabecera';

    const etiqueta = document.createElement('span');
    etiqueta.className = 'tablero__aula';
    etiqueta.textContent = 'Aula / Horario';
    fila.appendChild(etiqueta);

    HORARIOS.forEach((horario) => {
      const celda = document.createElement('span');
      celda.className = 'celda celda--cabecera';
      celda.textContent = horario.slice(0, 5);
      celda.setAttribute('title', horario);
      fila.appendChild(celda);
    });

    this.contenedor.appendChild(fila);
  },

  /** Fila del tablero para un aula: nombre, resumen y una celda por horario. */
  _renderizarFilaAula(aula, reservas, fecha, horarioSeleccionado) {
    const fila = document.createElement('div');
    fila.className = 'tablero__fila';

    const ocupados = EstadoReservas.obtenerHorariosOcupados(aula.id, fecha);
    const libres = HORARIOS.filter(
      (horario) => !ocupados.includes(horario) && !esHorarioPasado(fecha, horario)
    ).length;

    const etiquetaAula = document.createElement('div');
    etiquetaAula.className = 'tablero__aula';
    const nombre = document.createElement('span');
    nombre.textContent = aula.nombre;
    const resumen = document.createElement('small');
    resumen.textContent = `${libres} de ${HORARIOS.length} disponibles`;
    etiquetaAula.appendChild(nombre);
    etiquetaAula.appendChild(resumen);
    fila.appendChild(etiquetaAula);

    HORARIOS.forEach((horario) => {
      const estaOcupada = ocupados.includes(horario);
      const estado = esHorarioPasado(fecha, horario)
        ? 'pasado'
        : estaOcupada
          ? 'ocupada'
          : 'libre';

      const celda = document.createElement('button');
      celda.type = 'button';
      celda.className = `celda celda--${estado}`;
      if (horario === horarioSeleccionado) celda.classList.add('celda--seleccionada');
      celda.textContent = horario.slice(0, 5);
      celda.setAttribute('title', `${aula.nombre} · ${horario}${estaOcupada ? ' · Ocupada' : ''}`);
      celda.setAttribute('data-aula-id', aula.id);
      celda.setAttribute('data-horario', horario);

      if (estado !== 'libre') {
        celda.setAttribute('disabled', '');
      } else {
        celda.addEventListener('click', () => {
          const accion = this.alSeleccionarCelda;
          if (accion) accion({ aulaId: aula.id, fecha, horario });
        });
      }

      fila.appendChild(celda);
    });

    this.contenedor.appendChild(fila);
  },
};