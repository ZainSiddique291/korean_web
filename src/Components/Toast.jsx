const Toast = ({ msg }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-6 py-3 rounded-2xl shadow-2xl text-sm font-medium animate-bounce-slow max-w-sm text-center">
    {msg}
  </div>
);

export default Toast;
