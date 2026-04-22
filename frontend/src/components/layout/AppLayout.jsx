import React from 'react';
import Sidebar from './Sidebar';
import StudentHeader from './StudentHeader';
import LibrarianHeader from './LibrarianHeader';
import AdminHeader from './AdminHeader';
import { motion, AnimatePresence } from 'motion/react';

const AppLayout = ({ children, role }) => {
  const Header = role === 'admin' ? AdminHeader : role === 'librarian' ? LibrarianHeader : StudentHeader;

  return (
    <div className="min-h-screen bg-[#faf8ff] flex overflow-hidden">
      <Sidebar role={role} />
      
      <div className="flex-1 flex flex-col md:ml-64 w-full h-screen overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
