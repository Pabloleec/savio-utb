import React from 'react';
import { Bell, BookOpen, Clock, Zap, Calendar, Award, Shield, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { NOTIFICATIONS_DATA, COURSES_DATA, ACTIVITIES_DATA } from '../types';

export default function HomeView() {
  const navigate = useNavigate();
  const urgentNotifs = NOTIFICATIONS_DATA.filter(n => n.urgent).slice(0, 3);
  const recentActivities = Object.values(ACTIVITIES_DATA).flat().slice(0, 7);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0 overflow-hidden"
    >
      <div className="flex-1 lg:flex-[0_0_58%] flex flex-col gap-4 min-h-0">
        <div 
          onClick={() => navigate('/notifications')}
          className="block-card flex-[0_0_40%] flex flex-col cursor-pointer overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3 gap-2 shrink-0">
            <span className="text-[0.9rem] font-bold tracking-tight flex items-center gap-2 text-[var(--black)]">
              <div className="p-1.5 bg-red-50 rounded-lg">
                <Bell size={16} className="text-[var(--danger)]" />
              </div>
              Últimas notificaciones
            </span>
            <span className="text-[0.6rem] font-bold px-2 py-1 rounded-full bg-[var(--danger-light)] text-[var(--danger)] border border-red-100">
              {urgentNotifs.length} urgentes
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 overflow-y-auto scrollbar-hide pr-1 flex-1">
            {NOTIFICATIONS_DATA.slice(0, 4).map(n => (
              <div 
                key={n.id}
                className={`bg-[var(--bg)] rounded-[var(--radius-md)] p-2.5 px-3 border border-[var(--border-light)] hover:border-[var(--primary)] hover:bg-white transition-all text-[0.7rem] flex gap-3 items-start group ${n.urgent ? 'border-l-4 border-l-[var(--danger)] bg-red-50/30' : ''}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${n.type === 'danger' ? 'bg-[var(--danger)]' : n.type === 'warning' ? 'bg-[var(--warning)]' : 'bg-[var(--primary)]'} group-hover:scale-125 transition-transform`} />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[0.72rem] text-[var(--black)] mb-0.5 truncate">{n.title}</div>
                  <div className="text-[0.58rem] text-[var(--text-muted)] uppercase tracking-wider font-bold">{n.course}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="block-card flex-1 min-h-0 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-3 gap-1 shrink-0">
            <span className="text-[0.9rem] font-bold tracking-tight flex items-center gap-2 text-[var(--black)]">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <BookOpen size={16} className="text-[var(--primary)]" />
              </div>
              Mis Cursos
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto scrollbar-hide pr-1 flex-1">
            {COURSES_DATA.map(c => (
              <div 
                key={c.id}
                className="bg-[var(--bg)] rounded-[var(--radius-md)] p-3.5 border border-[var(--border-light)] hover:border-[var(--primary)] hover:bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all flex flex-col gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center font-bold text-[0.9rem] shrink-0 text-white shadow-sm ${c.color}`}>
                    {c.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[0.8rem] text-[var(--black)] leading-tight group-hover:text-[var(--primary)] transition-colors truncate">{c.name}</div>
                    <div className="text-[0.6rem] text-[var(--text-muted)] mt-0.5">{c.code}</div>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="text-[0.55rem] font-bold px-2 py-1 rounded-full bg-red-50 text-[var(--danger)] border border-red-100">
                    {c.stats.reported} reportada(s)
                  </span>
                  <span className="text-[0.55rem] font-bold px-2 py-1 rounded-full bg-orange-50 text-[var(--warning)] border border-orange-100">
                    {c.stats.unreported} sin reportar
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 lg:flex-[0_0_42%] flex flex-col gap-4 min-h-0">
        <div 
          onClick={() => navigate('/calendar')}
          className="block-card flex-[0_0_45%] flex flex-col cursor-pointer overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3 gap-1 shrink-0">
            <span className="text-[0.9rem] font-bold tracking-tight flex items-center gap-2 text-[var(--black)]">
              <div className="p-1.5 bg-red-50 rounded-lg">
                <Clock size={16} className="text-[var(--danger)]" />
              </div>
              Próximas entregas
            </span>
          </div>
          
          <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide pr-1 flex-1">
            {recentActivities.map((a, i) => (
              <div 
                key={i}
                className="bg-[var(--bg)] rounded-[var(--radius-sm)] p-2.5 px-3 border border-[var(--border-light)] hover:border-[var(--primary)] hover:bg-white transition-all text-[0.7rem] flex items-center gap-3 shrink-0 group"
              >
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 group-hover:scale-125 transition-transform ${a.reported ? 'bg-[var(--danger)]' : 'bg-[var(--warning)]'}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-[0.58rem] text-[var(--text-muted)] font-bold uppercase tracking-wider">{a.course}</div>
                  <div className="font-medium text-[var(--black)] truncate">{a.title} &middot; <span className="text-[var(--primary)] font-bold">{a.time}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="block-card flex-1 min-h-0 flex flex-col overflow-hidden">
          <div className="mb-3 shrink-0">
            <span className="text-[0.9rem] font-bold tracking-tight flex items-center gap-2 text-[var(--black)]">
              <div className="p-1.5 bg-orange-50 rounded-lg">
                <Zap size={16} className="text-[var(--warning)]" />
              </div>
              Acciones rápidas
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 flex-1 min-h-0 overflow-y-auto scrollbar-hide pr-1">
            <QuickAction 
              onClick={() => navigate('/calendar')}
              icon={<Calendar size={18} className="text-[var(--primary)]" />}
              label="Calendario"
              bgColor="bg-blue-50"
            />
            <QuickAction 
              onClick={() => navigate('/not-programmed')}
              icon={<Award size={18} className="text-orange-500" />}
              label="Notas"
              bgColor="bg-orange-50"
            />
            <QuickAction 
              onClick={() => navigate('/not-programmed')}
              icon={<Shield size={18} className="text-emerald-500" />}
              label="Insignias"
              bgColor="bg-emerald-50"
            />
            <QuickAction 
              onClick={() => navigate('/not-programmed')}
              icon={<User size={18} className="text-purple-500" />}
              label="Perfil"
              bgColor="bg-purple-50"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function QuickAction({ onClick, icon, label, bgColor }: { onClick: () => void, icon: React.ReactNode, label: string, bgColor: string }) {
  return (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="min-h-0 bg-[var(--bg)] rounded-[var(--radius-lg)] p-3 border border-[var(--border-light)] hover:border-[var(--primary)] hover:bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all cursor-pointer flex flex-col items-center justify-center gap-2 text-[0.75rem] font-bold text-[var(--text-secondary)] group"
    >
      <div className={`w-11 h-11 rounded-full ${bgColor} flex items-center justify-center border border-white shadow-sm group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      {label}
    </div>
  );
}
