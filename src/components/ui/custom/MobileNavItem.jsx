import { useEffect } from 'react';

function MobileNavItem({ icon, text, active, onClick }) {
  useEffect(() => {
    console.log('MobileNavItem rendered');
  }, []);

  return (
    <div 
      className={`flex items-center px-4 py-3 my-1 cursor-pointer transition-colors rounded-xl ${
        active ? "bg-white/20 backdrop-blur-sm text-white" : "text-indigo-100 hover:bg-white/10 hover:text-white"
      }`}
      onClick={onClick}
    >
      <div>{icon}</div>
      <span className="ml-3 text-sm font-medium">{text}</span>
    </div>
  );
}

export default MobileNavItem;