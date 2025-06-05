import { useEffect } from 'react';

function NavItem({ icon, text, expanded, active, onClick }) {
  useEffect(() => {
    console.log('NavItem rendered');
  }, []);

  return (
    <div 
      className={`flex items-center px-4 py-3 my-1 cursor-pointer transition-colors rounded-xl ${
        active ? "bg-white/20 backdrop-blur-sm text-white" : "text-indigo-100 hover:bg-white/10 hover:text-white"
      }`}
      onClick={onClick}
    >
      <div className={`${expanded ? "" : "mx-auto"}`}>
        {icon}
      </div>
      {expanded && <span className="ml-3 text-sm font-medium">{text}</span>}
    </div>
  );
}

export default NavItem;