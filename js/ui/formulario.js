/**
 * Capa de vista — Utilidades del formulario de reserva.
 * Responsable de las referencias al DOM y del llenado de los selectores.
 */

const FormularioUI = {
  elementos: {
    formulario: null,
    aula: null,
    fecha: null,
    horario: null,
    actividad: null,
  },

  /** Busca los elementos del formulario y los deja listos para usar. */
  inicializar() {
    this.elementos.formulario = document.querySelector('#formulario-reserva');
    this.elementos.aula = document.querySelector('#aula');
    this.elementos.fecha = document.querySelector('#fecha');
    this.elementos.horario = document.querySelector('#horario');
    this.elementos.actividad = document.querySelector('#actividad');
    this._ajustarFechaMinima();
    this._poblarSelectores();
  },

  /** Rellena los selectores de aula y horario desde el catálogo. */
  _poblarSelectores() {
    const selectAula = this.elementos.aula;
    AULAS.forEach((aula) => {
      const opcion = document.createElement('option');
      opcion.textContent = `${aula.nombre} (${aula.capacidad} pers.)`;
      opcion.value = aula.id;
      selectAula.appendChild(opcion);
    });

    const selectHorario = this.elementos.horario;
    HORARIOS.forEach((horario) => {
      const opcion = document.createElement('option');
      opcion.textContent = horario;
      opcion.value = horario;
      selectHorario.appendChild(opcion);
    });
  },

  /** Impide reservar fechas pasadas y deja la fecha de hoy por defecto. */
  _ajustarFechaMinima() {
    this.elementos.fecha.setAttribute('min', fechaHoyISO());
    this.elementos.fecha.value = fechaHoyISO();
  },

  /** Lee los valores actuales del formulario. */
  obtenerDatos() {
    return {
      aulaId: this.elementos.aula.value,
      fecha: this.elementos.fecha.value,
      horario: this.elementos.horario.value,
      actividad: this.elementos.actividad.value.trim(),
    };
  },

  /** Vacía el formulario y lo devuelve a su estado inicial. */
  limpiar() {
    this.elementos.formulario.reset();
    this.elementos.fecha.value = fechaHoyISO();
  },
};