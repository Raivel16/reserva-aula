/**
 * Capa de datos — Catálogo estático de aulas y horarios.
 * Define las aulas de la institución y la grilla de horarios disponibles.
 */

/** Aulas disponibles en la institución. */
const AULAS = [
  { id: 'aula-101', nombre: 'Aula 101', capacidad: 30 },
  { id: 'aula-102', nombre: 'Aula 102', capacidad: 30 },
  { id: 'aula-103', nombre: 'Aula 103', capacidad: 40 },
  { id: 'lab-1', nombre: 'Laboratorio 1', capacidad: 20 },
  { id: 'lab-2', nombre: 'Laboratorio 2', capacidad: 20 },
  { id: 'auditorio', nombre: 'Auditorio', capacidad: 120 },
];

/** Bloques horarios disponibles para reservar. */
const HORARIOS = [
  '07:00 - 08:00',
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
  '17:00 - 18:00',
];

/** Devuelve el objeto aula completo o null si no existe. */
function obtenerAulaPorId(idAula) {
  return AULAS.find((aula) => aula.id === idAula) || null;
}

/** Devuelve el nombre legible de un aula a partir de su id. */
function obtenerNombreAula(idAula) {
  const aula = obtenerAulaPorId(idAula);
  return aula ? aula.nombre : 'Aula desconocida';
}