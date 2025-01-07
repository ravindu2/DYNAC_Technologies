import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  icon: ReactNode;
  isActive: boolean;
  to: string; // Add a `to` prop for navigation
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, isActive, to }) => {
  return (
    <Link 
      to={to} 
      className={`w-10 h-10 rounded-lg flex items-center justify-center
        ${isActive 
          ? 'bg-[#C7D2FE] text-white' 
          : 'bg-[#6366F1] bg-opacity-20 text-[#191B37] hover:bg-opacity-30'
        } transition-all duration-200`}
    >
      {icon}
    </Link>
  );
};

export default SidebarItem;
