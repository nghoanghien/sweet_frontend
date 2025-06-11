import { useEffect } from 'react';

function NavItem({ icon, text, expanded, active, onClick }) {
  useEffect(() => {
    console.log('NavItem rendered');
  }, []);

  return (
    <div 
      className={`flex items-center px-4 py-3 my-1 cursor-pointer transition-all duration-300 rounded-xl ${
        active 
          ? "bg-white/20 backdrop-blur-sm text-white shadow-[inset_0_0_18px_12px_rgba(255,255,255,0.7)]" 
          : "text-indigo-100 hover:bg-white/10 hover:text-white hover:shadow-[inset_0_0_12px_8px_rgba(255,255,255,0.35)]"
      }`}
      onClick={onClick}
    >
      <div className={`${expanded ? "" : "mx-auto"}`}>
        {icon}
      </div>
      {expanded && <span className="ml-3 text-sm font-semibold text-gray-600">{text}</span>}
    </div>
  );
}

export default NavItem;