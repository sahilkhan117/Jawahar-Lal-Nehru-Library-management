import React from 'react';
import { MdNotifications, MdHelpOutline } from 'react-icons/md';

const LibrarianHeader = () => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-end w-full h-20 px-8 bg-surface/80 backdrop-blur-md border-b border-outline-variant shadow-sm hidden md:flex">
      <div className="flex items-center gap-6 text-on-surface-variant">
        <MdNotifications className="text-xl hover:text-primary transition-all duration-200 cursor-pointer" />
        <MdHelpOutline className="text-xl hover:text-primary transition-all duration-200 cursor-pointer" />
        <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
          <div className="text-right">
            <p className="font-label-md text-label-md text-on-surface">Sarah Jenkins</p>
            <p className="font-label-sm text-label-sm text-outline">Head Librarian</p>
          </div>
          <img alt="Librarian profile picture" className="w-10 h-10 rounded-full border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6fdcQYAqXehqCesgBqhFdBI2RMiOF2fjmdLH2LjhM39iN12VWYscSY490fugjrLrniLDjXsWDsOEbZQNfXBj-I-QgWQNvufaTi9wF_fydQofJZ7SIwN6-BB9uwo5jprgDikTp_b4VR9VGRb-AC5gTbgc2diICVk4U0mkrUPayVk_pqSgXZVrU0gfy3U81_w5rkzz6LYTAKdB-jTvRn8OWodggXhpo3ou5FjqIIfKy4W5MNT8NvtZIuA-mWvROsfI3FEN9XBkdLgnf"/>
        </div>
      </div>
    </header>
  );
};

export default LibrarianHeader;
