export interface Notification {
  id: number;
  course: string;
  title: string;
  desc: string;
  time: string;
  type: 'danger' | 'warning' | 'success' | 'info';
  unread: boolean;
  urgent: boolean;
}

export interface Activity {
  course: string;
  title: string;
  time: string;
  reported: boolean;
  type: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  initials: string;
  color: string;
  stats: {
    reported: number;
    unreported: number;
  };
}

export const NOTIFICATIONS_DATA: Notification[] = [
  { id: 1, course: 'DESARROLLO FRONTEND-2622', title: 'Clase cancelada', desc: 'El profesor cancelo la clase del jueves 15 de mayo. Se reprograma para el lunes 19 a las 8:00 am.', time: 'Hace 2 horas', type: 'danger', unread: true, urgent: true },
  { id: 2, course: 'SISTEMAS Y MODELOS-1780', title: 'Notas publicadas', desc: 'Las calificaciones del parcial 2 ya estan disponibles. Promedio del curso: 4.1', time: 'Hace 5 horas', type: 'success', unread: true, urgent: false },
  { id: 3, course: 'SABER PRO INGLES', title: 'Simulacro obligatorio', desc: 'Debes presentar el simulacro de Speaking antes del 20 de mayo. Es requisito para el examen final.', time: 'Ayer', type: 'warning', unread: true, urgent: true },
  { id: 4, course: 'DESARROLLO FRONTEND-2622', title: 'Nueva tarea publicada', desc: 'Tarea 3: Diseno Responsivo con Flexbox. Fecha de entrega: 25 de mayo.', time: 'Ayer', type: 'info', unread: true, urgent: false },
  { id: 5, course: 'Taller Saber-Pro Comunicativas', title: 'Recordatorio de monitoria', desc: 'Manana hay sesion de monitoria grupal a las 3:00 pm. Sala virtual ya publicada.', time: 'Hace 2 dias', type: 'info', unread: false, urgent: false },
  { id: 6, course: 'SABER PRO INGLES', title: 'Simulacro obligatorio', desc: 'Debes presentar el simulacro de Speaking antes del 20 de mayo.', time: 'Ayer', type: 'warning', unread: false, urgent: true },
  { id: 7, course: 'DESARROLLO FRONTEND-2622', title: 'Entrega revisada', desc: 'Tu Proyecto HTML/CSS ha sido calificado. Calificacion: 4.8 / 5.0', time: 'Hace 4 dias', type: 'success', unread: false, urgent: false },
  { id: 8, course: 'SISTEMAS Y MODELOS-1780', title: 'Material nuevo', desc: 'Diapositivas de la Unidad 4 ya estan disponibles en el aula virtual.', time: 'Hace 5 dias', type: 'info', unread: false, urgent: false }
];

export const ACTIVITIES_DATA: Record<string, Activity[]> = {
  '2026-05-14': [
    { course: 'DESARROLLO FRONTEND-2622', title: 'Entrega Proyecto mockups', time: '23:59', reported: true, type: 'Tarea' },
    { course: 'SISTEMAS Y MODELOS-1780', title: 'Diagrama de Casos de Uso', time: '18:00', reported: false, type: 'Taller' }
  ],
  '2026-05-18': [{ course: 'SABER PRO INGLES', title: 'Mock Test Reading', time: '23:55', reported: true, type: 'Cuestionario' }],
  '2026-05-20': [
    { course: 'DESARROLLO FRONTEND-2622', title: 'Avance Proyecto Final', time: '23:59', reported: false, type: 'Avance' },
    { course: 'Taller Saber-Pro Comunicativas', title: 'Simulacro lectura critica', time: '23:59', reported: true, type: 'Ensayo' }
  ],
  '2026-05-25': [{ course: 'SISTEMAS Y MODELOS-1780', title: 'Sustentacion Parcial', time: '14:00', reported: true, type: 'Exposicion' }],
  '2026-05-28': [
    { course: 'SABER PRO INGLES', title: 'Reading Comprehension', time: '23:55', reported: false, type: 'Cuestionario' },
    { course: 'Taller Saber-Pro Comunicativas', title: 'Comprension Lectora', time: '23:59', reported: false, type: 'Taller' }
  ]
};

export const COURSES_DATA: Course[] = [
  { id: '1', name: 'Desarrollo Frontend', code: '2622-202610', initials: 'DF', color: 'bg-blue-600', stats: { reported: 2, unreported: 1 } },
  { id: '2', name: 'Sistemas y Modelos', code: '1780-202610', initials: 'SM', color: 'bg-purple-600', stats: { reported: 1, unreported: 1 } },
  { id: '3', name: 'Saber Pro Ingles', code: '202610', initials: 'SI', color: 'bg-emerald-600', stats: { reported: 1, unreported: 1 } },
  { id: '4', name: 'Taller Saber-Pro Comunicativas', code: '202610', initials: 'TC', color: 'bg-rose-600', stats: { reported: 1, unreported: 1 } }
];
