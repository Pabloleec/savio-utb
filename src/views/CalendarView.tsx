import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ExternalLink, CalendarSearch, Clock, AlertTriangle, CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ACTIVITIES_DATA, Activity } from '../types';

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 15));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const getKey = (day: number) => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const activities = selectedDate ? ACTIVITIES_DATA[selectedDate] || [] : [];
  const rCount = activities.filter(a => a.reported).length;
  const uCount = activities.filter(a => !a.reported).length;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0 overflow-hidden"
    >
      <div className="block-card flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-4 shrink-0 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button 
              onClick={prevMonth}
              className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-[var(--primary)] hover:bg-[var(--primary-light)] transition-all active:scale-90"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-[1.1rem] font-extrabold tracking-tight text-[var(--black)] min-w-[120px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button 
              onClick={nextMonth}
              className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-[var(--primary)] hover:bg-[var(--primary-light)] transition-all active:scale-90"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex gap-4 text-[0.62rem] font-bold text-[var(--text-muted)] bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--danger)] shadow-[0_0_5px_var(--danger-glow)]"></span> Reportada
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--warning)] shadow-[0_0_5px_var(--warning-glow)]"></span> Por reportar
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-[0.65rem] font-black uppercase tracking-widest text-[var(--text-muted)] py-1 opacity-50">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5 flex-1 min-h-0 overflow-y-auto scrollbar-hide">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateKey = getKey(day);
              const dayActivities = ACTIVITIES_DATA[dateKey] || [];
              const hasR = dayActivities.some(a => a.reported);
              const hasU = dayActivities.some(a => !a.reported);
              const isSelected = selectedDate === dateKey;
              const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

              return (
                <div 
                  key={day}
                  onClick={() => setSelectedDate(dateKey)}
                  className={`aspect-square rounded-[var(--radius-md)] flex flex-col items-center justify-center cursor-pointer relative transition-all border-2 group ${isSelected ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg scale-105 z-10' : 'bg-[var(--bg)] border-transparent hover:bg-white hover:border-[var(--primary)] hover:shadow-md hover:scale-105 hover:z-10'}`}
                >
                  <span className={`text-[0.8rem] font-extrabold ${isToday && !isSelected ? 'text-[var(--primary)]' : ''} ${isSelected ? 'scale-110' : ''}`}>
                    {day}
                  </span>
                  {(hasR || hasU) && (
                    <div className="flex gap-1 mt-1">
                      {hasR && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[var(--danger)] shadow-[0_0_4px_var(--danger-glow)]'}`} />}
                      {hasU && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-[var(--warning)] shadow-[0_0_4px_var(--warning-glow)]'}`} />}
                    </div>
                  )}
                  {isToday && !isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_5px_var(--primary-glow)] animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="block-card flex flex-col min-h-0 overflow-hidden bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4 shrink-0 flex-wrap gap-2">
          <div className="flex flex-col">
            <span className="text-[0.62rem] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-0.5">Actividades del día</span>
            <span className="text-[0.95rem] font-extrabold text-[var(--black)] leading-tight">
              {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Selecciona un día'}
            </span>
          </div>
          <div className="flex gap-1.5">
            {uCount > 0 && <span className="text-[0.55rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--warning-light)] text-[var(--warning)] border border-orange-100">{uCount} pendientes</span>}
            {rCount > 0 && <span className="text-[0.55rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--danger-light)] text-[var(--danger)] border border-red-100">{rCount} reportadas</span>}
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {activities.length > 0 ? (
              <motion.div 
                key={selectedDate}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-3 overflow-y-auto scrollbar-hide pr-1"
              >
                {activities.map((a, i) => (
                  <div 
                    key={i}
                    className={`bg-white rounded-[var(--radius-lg)] p-4 border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md transition-all flex flex-col gap-2 shrink-0 group ${a.reported ? 'border-l-4 border-l-[var(--danger)]' : 'border-l-4 border-l-[var(--warning)]'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-[0.6rem] font-black uppercase tracking-wider text-[var(--text-muted)] opacity-70">{a.course}</div>
                      <div className={`px-2 py-0.5 rounded-md text-[0.55rem] font-bold ${a.reported ? 'bg-red-50 text-[var(--danger)]' : 'bg-orange-50 text-[var(--warning)]'}`}>
                        {a.type}
                      </div>
                    </div>
                    <div className="font-extrabold text-[0.85rem] text-[var(--black)] group-hover:text-[var(--primary)] transition-colors">{a.title}</div>
                    <div className="text-[0.7rem] text-[var(--text-muted)] flex items-center gap-1.5 mb-2 font-medium">
                      <Clock size={12} className="text-[var(--primary)]" /> <span className="text-[var(--black)] font-bold">{a.time}</span> &middot; SAVIO UTB
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button className="px-4 py-1.5 rounded-full bg-[var(--primary)] text-white font-bold text-[0.65rem] flex items-center gap-1.5 hover:bg-blue-900 transition-all shadow-sm active:scale-95">
                        <ExternalLink size={12} /> Ver detalles
                      </button>
                      {a.reported ? (
                        <button className="px-4 py-1.5 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] font-bold text-[0.65rem] flex items-center gap-1.5 hover:bg-[var(--primary-light)] transition-all active:scale-95">
                          <CalendarCheck size={12} /> Sincronizado
                        </button>
                      ) : (
                        <button className="px-4 py-1.5 rounded-full border-2 border-[var(--warning)] text-[var(--warning)] font-bold text-[0.65rem] flex items-center gap-1.5 hover:bg-[var(--warning-light)] transition-all active:scale-95">
                          <AlertTriangle size={12} /> Reportar ahora
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-muted)] text-center gap-4 py-12">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                  {selectedDate ? (
                    <CheckCircle size={40} className="text-[var(--success)] opacity-30" />
                  ) : (
                    <CalendarSearch size={40} className="text-gray-300 opacity-20" />
                  )}
                </div>
                <div>
                  <p className="text-[0.85rem] font-bold text-gray-400">
                    {selectedDate ? 'Día libre de tareas' : 'Explora tu calendario'}
                  </p>
                  <p className="text-[0.7rem] text-gray-300 mt-1 max-w-[180px] mx-auto">
                    {selectedDate ? 'No tienes entregas ni evaluaciones para esta fecha.' : 'Haz clic en un día del calendario para ver tus pendientes.'}
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
