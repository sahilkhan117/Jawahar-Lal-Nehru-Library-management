import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MdDashboard, MdLibraryBooks, MdHistory, MdPayments, MdPerson, 
  MdLocalLibrary, MdWarning, MdSettings, MdGroups, MdSync, MdDns, MdSchool, MdInventory2, MdLogout
} from 'react-icons/md';

const Sidebar = ({ role }) => {
  const location = useLocation();
  
  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: MdDashboard },
    { name: 'Catalog', path: '/student/catalog', icon: MdLibraryBooks },
    { name: 'History', path: '/student/history', icon: MdHistory },
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

  return (
    <nav className="bg-surface-container-lowest font-body-md h-screen w-64 border-r border-outline-variant fixed left-0 top-0 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hidden md:flex flex-col py-8 px-4 z-50">
      <div className="mb-8 px-4 flex items-center gap-3">
        <MdLocalLibrary className="text-primary text-3xl" />
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-primary leading-none">{portalName}</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Modern Library</p>
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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all active:scale-95 transform ${
                  isActive 
                    ? 'bg-primary-container text-on-primary-container border-r-4 border-primary shadow-sm font-semibold' 
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                <Icon className={`text-xl ${isActive ? 'text-primary' : ''}`} />
                <span className="font-label-md text-label-md">{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto px-4">
          <Link to="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error/10 transition-all font-label-md text-label-md">
            <MdLogout className="text-xl" />
            Logout
          </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
