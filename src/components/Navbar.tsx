import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Bell, MessageCircle, ChevronLeft, Home } from 'lucide-react';
import { motion } from 'motion/react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  return (
    <nav className="bg-white border border-[var(--border)] rounded-[var(--radius-xl)] px-5 h-[var(--navbar-height)] flex items-center justify-between gap-4 shrink-0 shadow-xs">
      <div className="flex items-center gap-4">
        {!isHome && (
          <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-[var(--primary)] transition-all"
          >
            <ChevronLeft size={16} />
          </button>
        )}
        <NavLink to="/" className="flex items-center gap-2 no-underline text-[var(--black)] font-bold text-[1.05rem] tracking-tight shrink-0">
          <div className="w-8 h-8 rounded-[var(--radius-sm)] overflow-hidden shadow-[0_0_12px_var(--primary-glow)]">
            <img src="https://i.postimg.cc/Z50fZBRh/logo-savio.png" alt="SAVIO logo" className="w-full h-full object-cover" />
          </div>
          <span className="hidden sm:inline">SAVIO UTB</span>
        </NavLink>
      </div>

      <ul className="flex gap-1 list-none overflow-x-auto scrollbar-hide py-1">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `px-3 py-1.5 rounded-full text-[0.78rem] font-medium transition-all ${isActive ? 'bg-[var(--primary-light)] text-[var(--primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]'}`
            }
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/not-programmed" 
            className="px-3 py-1.5 rounded-full text-[0.78rem] font-medium transition-all text-[var(--text-secondary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
          >
            Biblioteca
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/not-programmed" 
            className="px-3 py-1.5 rounded-full text-[0.78rem] font-medium transition-all text-[var(--text-secondary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
          >
            Banner
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/calendar" 
            className={({ isActive }) => 
              `px-3 py-1.5 rounded-full text-[0.78rem] font-medium transition-all ${isActive ? 'bg-[var(--primary-light)] text-[var(--primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]'}`
            }
          >
            Calendario
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/notifications" 
            className={({ isActive }) => 
              `px-3 py-1.5 rounded-full text-[0.78rem] font-medium transition-all ${isActive ? 'bg-[var(--primary-light)] text-[var(--primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]'}`
            }
          >
            Notificaciones
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-2 shrink-0">
        <button 
          onClick={() => navigate('/notifications')}
          className="w-8 h-8 rounded-full border border-[var(--border)] bg-white cursor-pointer flex items-center justify-center transition-all text-[var(--text-secondary)] hover:border-[var(--primary)] relative"
          aria-label="Notificaciones"
        >
          <Bell size={16} />
          <span className="absolute -top-1 -right-1 bg-[var(--danger)] text-white text-[0.55rem] font-bold min-w-[17px] h-[17px] rounded-full flex items-center justify-center border-2 border-white shadow-[0_0_8px_var(--danger-glow)]">
            4
          </span>
        </button>

        <button 
          onClick={() => navigate('/not-programmed')}
          className="w-8 h-8 rounded-full border border-[var(--border)] bg-white cursor-pointer flex items-center justify-center transition-all text-[var(--text-secondary)] hover:border-[var(--primary)]"
          aria-label="Mensajes"
        >
          <MessageCircle size={16} />
        </button>
        
        <div className="hidden lg:flex items-center gap-2 bg-[var(--bg)] rounded-full border border-[var(--border)] p-1 pr-3 cursor-pointer hover:border-[var(--primary)] transition-all">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-blue-900 flex items-center justify-center text-white font-bold text-[0.6rem]">
            PL
          </div>
          <span className="text-[0.78rem] font-medium text-[var(--text-secondary)]">Pablo Leal</span>
        </div>
      </div>
    </nav>
  );
}
