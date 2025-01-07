import SidebarItem from './SidebarItem';
import { Puzzle, Users, UserPlus, Power, Flower } from 'lucide-react';
import img from '/src/assets/logo.png';
import img2 from '/src/assets/admin.png';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 flex flex-col items-center w-16 h-screen py-4 bg-white">
      {/* Logo */}
      <div className="mb-8">
        <img src={img} alt="Minator" className="w-8 h-12" />
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col flex-1 gap-3">
        <SidebarItem icon={<Flower className="w-5 h-5" />} isActive={false} to="/dashboard" />
        <SidebarItem icon={<Puzzle className="w-5 h-5" />} isActive={false} to="/dashboard/PlansClasses" />
        <SidebarItem icon={<Users className="w-5 h-5" />} isActive={false} to="/dashboard/trainer" />
        <SidebarItem icon={<UserPlus className="w-5 h-5" />} isActive={false} to="/dashboard/member" />
      </div>

      {/* User Profile and Logout */}
      <div className="flex flex-col gap-3">
        <div className="w-10 h-10 overflow-hidden rounded-full">
          <img 
            src={img2}
            alt="Profile" 
            className="object-cover w-full h-full"
          />
        </div>
        <SidebarItem icon={<Power className="w-5 h-5" />} isActive={false} to="/logout" />
      </div>
    </div>
  );
};

export default Sidebar;
