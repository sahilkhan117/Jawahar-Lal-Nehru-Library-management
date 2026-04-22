import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  MdDashboard, MdLibraryBooks, MdHistory, MdPayments, MdPerson, 
  MdLocalLibrary, MdWarning, MdSettings, MdGroups, MdSync, MdDns, MdSchool, MdInventory2, MdLogout
} from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: MdDashboard },
    { name: 'Catalog', path: '/student/catalog', icon: MdLibraryBooks },
    { name: 'History', path: '/student/history', icon: MdHistory },
    { name: 'Complaints', path: '/student/complaints', icon: MdWarning },
    { name: 'Profile', path: '/student/profile', icon: MdPerson },
  ];

  const librarianLinks = [
    { name: 'POS', path: '/librarian/pos', icon: MdSync },
    { name: 'Students', path: '/librarian/students', icon: MdSchool },
    { name: 'Inventory', path: '/librarian/inventory', icon: MdInventory2 },
    { name: 'Defaulters', path: '/librarian/defaulters', icon: MdWarning },
    { name: 'Settings', path: '/librarian/settings', icon: MdSettings },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: MdDashboard },
    { name: 'Complaints', path: '/admin/complaints', icon: MdWarning },
    { name: 'Notices', path: '/admin/notices', icon: MdDns },
    { name: 'Staff', path: '/admin/staff', icon: MdGroups },
    { name: 'Settings', path: '/admin/settings', icon: MdSettings },
  ];

  const links = role === 'admin' ? adminLinks : role === 'librarian' ? librarianLinks : studentLinks;
  const portalName = role.charAt(0).toUpperCase() + role.slice(1) + ' Portal';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-surface font-body h-screen w-64 border-r border-outline-variant/30 fixed left-0 top-0 shadow-bento hidden md:flex flex-col py-8 px-4 z-50">
      <div className="mb-8 px-4 flex items-center gap-3">
        <div className="p-2 bg-primary rounded-lg text-white">
          <MdLocalLibrary className="text-2xl" />
        </div>
        <div>
          <h1 className="text-xl font-headline italic text-on-surface leading-none">{portalName}</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1 opacity-60">Nexus Library</p>
        </div>
      </div>
      <ul className="flex-1 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all active:scale-95 transform ${
                  isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 font-bold' 
                    : 'text-on-surface-variant hover:bg-background'
                }`}
              >
                <Icon className="text-xl" />
                <span className="text-xs uppercase tracking-widest">{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto px-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <MdLogout className="text-xl" />
            Logout
          </button>
      </div>
    </nav>
  );
};

export default Sidebar;
