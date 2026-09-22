/**
 * Capa de vista — Mensajes de éxito, información y error en la interfaz.
 * Todos los avisos para el usuario se muestran en el área de mensajes del
 * formulario, con estilos según el tipo de aviso.
 */

const MensajesUI = {
  contenedor: null,

  inicializar() {
    this.contenedor = document.querySelector('#mensaje-formulario');
  },

  /** Oculta y limpia cualquier mensaje previo. */
  limpiar() {
    if (!this.contenedor) return;
    this.contenedor.textContent = '';
    this.contenedor.classList.remove('mensaje--error', 'mensaje--exito', 'mensaje--info');
  },

  /** Muestra un aviso de error. */
  mostrarError(texto) {
    this._mostrar(texto, 'mensaje--error');
  },

  /** Muestra un aviso de éxito. */
  mostrarExito(texto) {
    this._mostrar(texto, 'mensaje--exito');
  },

  /** Muestra un aviso informativo. */
  mostrarInfo(texto) {
    this._mostrar(texto, 'mensaje--info');
  },

  _mostrar(texto, clase) {
    this.limpiar();
    this.contenedor.textContent = texto;
    this.contenedor.classList.add(clase);
  },
};