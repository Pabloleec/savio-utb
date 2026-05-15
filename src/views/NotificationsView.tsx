import React, { useState } from 'react';
import { Bell, Inbox, Clock, ExternalLink, CheckCircle, Pin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NOTIFICATIONS_DATA, Notification } from '../types';

export default function NotificationsView() {
  const [notifs, setNotifs] = useState<Notification[]>(NOTIFICATIONS_DATA);
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredNotifs = notifs.filter(n => {
    if (filter === 'unread') return n.unread;
    if (filter === 'urgent') return n.urgent;
    return true;
  }).sort((a, b) => {
    if (a.unread && !b.unread) return -1;
    if (!a.unread && b.unread) return 1;
    if (a.urgent && !b.urgent) return -1;
    if (!a.urgent && b.urgent) return 1;
    return b.id - a.id;
  });

  const selectedNotif = notifs.find(n => n.id === selectedId);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0 overflow-hidden"
    >
      <div className="block-card flex flex-col overflow-hidden">
        <div className="flex items-center justify-between shrink-0 mb-3 flex-wrap gap-2">
          <span className="text-[0.9rem] font-bold tracking-tight text-[var(--black)] flex items-center gap-2">
            <div className="p-1.5 bg-red-50 rounded-lg">
              <Bell size={16} className="text-[var(--danger)]" />
            </div>
            Centro de Notificaciones
          </span>
          <div className="flex gap-1 flex-wrap">
            <FilterPill active={filter === 'all'} onClick={() => setFilter('all')}>Todas</FilterPill>
            <FilterPill active={filter === 'unread'} onClick={() => setFilter('unread')}>No leídas</FilterPill>
            <FilterPill active={filter === 'urgent'} onClick={() => setFilter('urgent')}>Urgentes</FilterPill>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2 overflow-y-auto scrollbar-hide pr-1">
          {filteredNotifs.map(n => (
            <div 
              key={n.id}
              onClick={() => handleSelect(n.id)}
              className={`bg-[var(--bg)] rounded-[var(--radius-md)] p-3.5 border border-[var(--border-light)] cursor-pointer transition-all flex gap-3 items-start shrink-0 group ${n.id === selectedId ? 'border-[var(--primary)] bg-white shadow-sm ring-2 ring-[var(--primary-light)]' : 'hover:border-[var(--primary)] hover:bg-white'} ${n.unread ? 'border-l-4 border-l-[var(--primary)]' : ''} ${n.urgent ? 'border-l-4 border-l-[var(--danger)] bg-red-50/20' : ''}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-[0.8rem] transition-transform group-hover:scale-105 ${n.type === 'danger' ? 'bg-red-100 text-[var(--danger)]' : n.type === 'warning' ? 'bg-orange-100 text-[var(--warning)]' : n.type === 'success' ? 'bg-green-100 text-[var(--success)]' : 'bg-blue-100 text-[var(--primary)]'}`}>
                {n.type === 'danger' || n.type === 'warning' ? '!' : n.type === 'success' ? 'OK' : 'i'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.58rem] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-0.5">
                  {n.course}{n.urgent ? ' \u22C5 URGENTE' : ''}
                </div>
                <div className={`font-bold text-[0.78rem] mb-0.5 transition-colors ${n.id === selectedId ? 'text-[var(--primary)]' : 'text-[var(--black)]'}`}>{n.title}</div>
                <div className="text-[0.68rem] text-[var(--text-muted)] line-clamp-1">{n.desc}</div>
                <div className="text-[0.58rem] text-[var(--text-muted)] flex items-center gap-1 mt-1 font-medium">
                  <Clock size={9} /> {n.time}
                </div>
              </div>
              {n.unread && <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 shrink-0 shadow-[0_0_8px_var(--primary-glow)]" />}
            </div>
          ))}
        </div>
      </div>

      <div className="block-card flex flex-col overflow-hidden bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between shrink-0 mb-3">
          <span className="text-[0.9rem] font-bold tracking-tight text-[var(--black)]">Vista previa</span>
        </div>
        
        <div className="flex-1 flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            {selectedNotif ? (
              <motion.div 
                key={selectedId}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                className="flex-1 flex flex-col gap-5 h-full"
              >
                <div className="flex items-start gap-4 p-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-[1.1rem] shadow-sm ${selectedNotif.type === 'danger' ? 'bg-red-100 text-[var(--danger)]' : selectedNotif.type === 'warning' ? 'bg-orange-100 text-[var(--warning)]' : selectedNotif.type === 'success' ? 'bg-green-100 text-[var(--success)]' : 'bg-blue-100 text-[var(--primary)]'}`}>
                    {selectedNotif.type === 'danger' || selectedNotif.type === 'warning' ? '!' : selectedNotif.type === 'success' ? 'OK' : 'i'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-muted)]">{selectedNotif.course}</div>
                    <h3 className="text-[1.1rem] font-extrabold text-[var(--black)] mt-0.5 leading-tight">{selectedNotif.title}</h3>
                    <div className="text-[0.7rem] text-[var(--text-muted)] flex items-center gap-1.5 mt-1 font-medium">
                      <Clock size={12} className="text-[var(--primary)]" /> {selectedNotif.time}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[var(--radius-lg)] p-5 border border-[var(--border)] text-[0.85rem] leading-relaxed text-[var(--text-secondary)] shadow-sm flex-1 overflow-y-auto scrollbar-hide">
                  <div className="flex flex-col gap-4">
                    <p>{selectedNotif.desc}</p>
                    <div className="h-px bg-gray-100" />
                    <p className="text-[0.75rem] italic text-gray-400">Esta notificación fue generada automáticamente por el sistema SAVIO UTB.</p>
                  </div>
                </div>

                <div className="flex gap-3 flex-wrap shrink-0">
                  <button className="px-5 py-2.5 rounded-full bg-[var(--primary)] text-white font-bold text-[0.7rem] flex items-center gap-2 hover:bg-blue-900 transition-all shadow-md active:scale-95">
                    <ExternalLink size={14} /> Ir al curso
                  </button>
                  {selectedNotif.urgent && (
                    <button className="px-5 py-2.5 rounded-full bg-[var(--danger)] text-white font-bold text-[0.7rem] flex items-center gap-2 hover:bg-red-900 transition-all shadow-md active:scale-95">
                      <CheckCircle size={14} /> Confirmar lectura
                    </button>
                  )}
                  <button className="px-5 py-2.5 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] font-bold text-[0.7rem] flex items-center gap-2 hover:bg-[var(--primary-light)] transition-all active:scale-95">
                    <Pin size={14} /> Fijar actividad
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-muted)] text-center gap-4 py-12">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                  <Inbox size={40} className="opacity-10" />
                </div>
                <div>
                  <p className="text-[0.85rem] font-bold text-gray-400">Selecciona una notificación</p>
                  <p className="text-[0.7rem] text-gray-300 mt-1">Haz clic en un elemento de la lista para ver el detalle</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`text-[0.62rem] font-bold px-3 py-1.5 rounded-full border-2 transition-all active:scale-95 ${active ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm' : 'bg-transparent text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]'}`}
    >
      {children}
    </button>
  );
}
