import { Sparkles } from 'lucide-react';

const Toast = ({ msg }) => (
  <div className="fixed bottom-6 left-1/2 -translate-y-0 -translate-x-1/2 z-[110] bg-kdark-900/95 backdrop-blur-md text-white px-5 py-2.5 rounded-full shadow-2xl text-xs font-semibold border border-surface-200/20 flex items-center gap-2 animate-fade-in max-w-md text-center">
    <Sparkles className="w-3.5 h-3.5 text-brand-400 shrink-0" />
    <span>{msg}</span>
  </div>
);

export default Toast;
