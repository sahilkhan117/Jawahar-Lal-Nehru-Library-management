import React from 'react';
import { MdSearch, MdNotifications, MdHelpOutline, MdMenu } from 'react-icons/md';

const StudentHeader = () => {
  return (
    <header className="bg-surface-container-lowest/80 backdrop-blur-md sticky top-0 w-full z-40 border-b border-outline-variant shadow-sm flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors">
          <MdMenu className="text-2xl" />
        </button>
        <span className="font-headline-sm text-headline-sm text-on-surface">Library Portal</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-surface-container-low rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <MdSearch className="text-outline mr-2" />
          <input className="bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface placeholder-outline w-48 outline-none" placeholder="Search..." type="text"/>
        </div>
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container-low">
          <MdNotifications className="text-xl" />
        </button>
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container-low hidden sm:block">
          <MdHelpOutline className="text-xl" />
        </button>
        <div className="h-8 w-8 rounded-full overflow-hidden ml-2 border border-outline-variant">
          <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_mR-lOMAb-Pl-TuE32myKMLY-V7iAO0JCyV_wLFWzYti5iyejIEJf6NrxoUUK6f5PQVla1hSRoX0K9TIHY-h2TfipmeFuyayzGGyDkEksLQakzUuYTbNwaSTPGUG6ngQuLRq0-eOP8bPJ5TwAGrsC4iHj0ta6fcVvKquYRLEte5NBCk-GUTU84WAyDamcqQV5FkltOnNI_d3vfgwfYFbyyJRHw0jYansv_HN9zg-9azEqL3njONVr0AxV5lXuWdEXjwNqPjvs2NdR"/>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
