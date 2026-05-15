import { motion } from 'motion/react';
import { Construction, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotProgrammedView() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center text-center gap-4 bg-white border border-[var(--border)] rounded-[var(--radius-xl)] shadow-xs"
    >
      <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center text-[var(--primary)]">
        <Construction size={32} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-[var(--black)]">zona sin programar</h2>
      </div>
      <button 
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-[var(--primary)] text-white font-bold rounded-full flex items-center gap-2 hover:bg-blue-900 transition-all shadow-sm"
      >
        <Home size={18} />  Inicio
      </button>
    </motion.div>
  );
}
