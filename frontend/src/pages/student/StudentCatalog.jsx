import React, { useState, useEffect } from 'react';
import { 
  MdArrowForward, MdSearch, MdFilterList, 
  MdSort, MdHourglassEmpty, MdBookmarkBorder, 
  MdChromeReaderMode, MdOutlineLibraryBooks,
  MdBookmark
} from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import API from '../../api/axios';
import { toast } from 'react-hot-toast';

export default function StudentCatalog() {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');

  // Handle URL search params on mount or URL change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSearch = params.get('search');
    if (urlSearch) {
      setSearch(urlSearch);
    }
  }, [location.search]);

  const categories = ['All', 'Computer Science', 'Physics', 'Mathematics', 'Literature', 'History', 'Engineering', 'Fiction', 'Non-Fiction'];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data } = await API.get('/auth/me'); 
        if (data.success && data.user.wishlist) {
          setWishlist(data.user.wishlist);
        }
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/books?search=${search}&category=${category === 'All' ? '' : category}&sort=${sort}`);
        if (data.success) {
          setBooks(data.books);
        }
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchBooks, 400);
    return () => clearTimeout(debounceFetch);
  }, [search, category, sort]);

  const toggleWishlist = async (bookId) => {
    try {
      const { data } = await API.post(`/books/wishlist/${bookId}`);
      if (data.success) {
        setWishlist(data.wishlist);
        toast.success(wishlist.includes(bookId) ? 'Removed from favorites' : 'Added to favorites');
      }
    } catch (error) {
      console.error("Wishlist toggle failed", error);
      toast.error('Failed to update favorites');
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Search & Filter Header */}
      <div className="bg-surface rounded-card p-6 shadow-bento border border-outline-variant/30 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-[450px] group">
            <MdSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-40 group-focus-within:opacity-100 transition-opacity text-2xl" />
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-background border border-outline-variant/20 focus:outline-none focus:border-primary/50 focus:bg-background transition-all text-sm font-medium placeholder:text-on-surface-variant/30"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <MdFilterList className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 pointer-events-none" />
              <select
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-background border border-outline-variant/20 text-xs font-bold text-on-surface-variant focus:outline-none focus:border-primary appearance-none cursor-pointer hover:bg-surface-variant/5 transition-all"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="relative flex-1 md:flex-none">
              <MdSort className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 pointer-events-none" />
              <select
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-background border border-outline-variant/20 text-xs font-bold text-on-surface-variant focus:outline-none focus:border-primary appearance-none cursor-pointer hover:bg-surface-variant/5 transition-all"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title_asc">Title A-Z</option>
                <option value="title_desc">Title Z-A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-40">Syncing Catalog...</p>
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map(book => (
            <div
              key={book._id}
              className="relative aspect-[3/4.2] rounded-card overflow-hidden group shadow-bento transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl cursor-pointer"
            >
              {/* 1. Background Image with Zoom on Hover */}
              {book.coverImageUrl ? (
                <img
                  src={book.coverImageUrl}
                  alt={book.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 z-0"
                />
              ) : (
                <div className="absolute inset-0 bg-surface flex items-center justify-center z-0">
                  <MdOutlineLibraryBooks className="text-7xl text-primary/10 transition-transform duration-1000 group-hover:scale-110" />
                </div>
              )}

              {/* 2. Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700 z-10"></div>
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700 z-10"></div>

              {/* 3. Content Wrapper */}
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">

                {/* Top Section */}
                <div className="flex justify-between items-start translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                    {book.category}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(book._id);
                    }}
                    className={`p-2.5 rounded-xl backdrop-blur-md shadow-xl transition-all ${wishlist.includes(book._id)
                        ? 'bg-primary text-white scale-110'
                        : 'bg-black/30 text-white hover:bg-primary/80 border border-white/10'
                      }`}
                  >
                    {wishlist.includes(book._id) ? <MdBookmark className="text-lg" /> : <MdBookmarkBorder className="text-lg" />}
                  </button>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col">
                    <h3 className="font-headline italic text-2xl text-white line-clamp-2 leading-tight drop-shadow-2xl transition-transform duration-500 group-hover:translate-y-[-8px]">
                      {book.title}
                    </h3>
                    <p className="text-sm text-white/60 mt-2 mb-6 line-clamp-1 group-hover:text-white/90 transition-colors duration-500">
                      By {book.author}
                    </p>

                    {/* Expandable Footer on Hover */}
                    <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 border-t border-white/10 pt-4 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Availability</span>
                        <span className={`text-xs font-bold ${book.availableCopies > 0 ? 'text-secondary' : 'text-red-400'}`}>
                          {book.availableCopies > 0 ? `${book.availableCopies} Copies` : 'Borrowed'}
                        </span>
                      </div>

                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${book.availableCopies > 0
                            ? 'bg-white text-black hover:bg-primary hover:text-white'
                            : 'bg-white/5 text-white/20 cursor-not-allowed'
                          }`}
                        disabled={book.availableCopies === 0}
                      >
                        Detail <MdArrowForward />
                      </button>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-card p-24 shadow-bento border border-outline-variant/30 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mb-8">
            <MdHourglassEmpty className="text-5xl text-primary/20" />
          </div>
          <h3 className="font-headline text-3xl italic text-on-surface mb-3">No Assets Found</h3>
          <p className="text-sm text-on-surface-variant opacity-60 max-w-sm leading-relaxed">
            We couldn't locate any items matching "{search}" in {category}. Try adjusting your filters.
          </p>
          <button
            onClick={() => { setSearch(''); setCategory('All'); }}
            className="mt-10 px-8 py-3 rounded-2xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/5"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
