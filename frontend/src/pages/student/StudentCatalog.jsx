import React, { useState, useEffect } from 'react';
import {
  MdArrowForward, MdSearch, MdFilterList,
  MdSort, MdHourglassEmpty, MdBookmarkBorder,
  MdChromeReaderMode, MdOutlineLibraryBooks
} from 'react-icons/md';
import API from '../../api/axios';

export default function StudentCatalog() {
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');

  const categories = ['All', 'Computer Science', 'Physics', 'Mathematics', 'Literature', 'History', 'Engineering'];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data } = await API.get('/auth/me'); // We need this to get student's wishlist
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
        const { data } = await API.get(`/books?search=${search}&category=${category}&sort=${sort}`);
        if (data.success) {
          setBooks(data.books);
        }
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchBooks, 300);
    return () => clearTimeout(debounceFetch);
  }, [search, category, sort]);

  const toggleWishlist = async (bookId) => {
    try {
      const { data } = await API.post(`/books/wishlist/${bookId}`);
      if (data.success) {
        setWishlist(data.wishlist);
      }
    } catch (error) {
      console.error("Wishlist toggle failed", error);
    }
  };

  return (
    <div className="space-y-card-gap pb-10">
      {/* Search & Filter Header */}
      <div className="bg-surface rounded-card p-6 shadow-bento border border-outline-variant/30 mb-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-40 text-xl" />
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-background border border-outline-variant/20 focus:outline-none focus:border-primary transition-all text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <select
              className="px-4 py-2 rounded-full bg-background border border-outline-variant/20 text-xs font-bold text-on-surface-variant focus:outline-none focus:border-primary appearance-none cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <select
              className="px-4 py-2 rounded-full bg-background border border-outline-variant/20 text-xs font-bold text-on-surface-variant focus:outline-none focus:border-primary appearance-none cursor-pointer"
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

      {/* Catalog Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-xs font-bold text-on-surface-variant opacity-40 uppercase tracking-widest">Scanning Catalog...</p>
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap gap-4">
          {books.map(book => (
            <div
              key={book._id}
              className="relative aspect-[3/4] rounded-card overflow-hidden group shadow-bento transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              {/* 1. Background Image with Zoom on Hover */}
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                />
              ) : (
                <div className="absolute inset-0 bg-surface flex items-center justify-center z-0">
                  <MdOutlineLibraryBooks className="text-6xl text-primary/20 transition-transform duration-700 group-hover:scale-110" />
                </div>
              )}

              {/* 2. Dark Gradient Overlay (Crucial for text readability) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

              {/* 3. Content Wrapper */}
              <div className="absolute inset-0 z-20 p-5 flex flex-col justify-between">

                {/* Top Section: Category Badge & Wishlist Button */}
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
                    {book.category}
                  </span>

                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent triggering card click if wrapped in a Link
                      toggleWishlist(book._id);
                    }}
                    className={`p-2 rounded-full backdrop-blur-md shadow-lg transition-all ${wishlist.includes(book._id)
                        ? 'bg-primary text-white'
                        : 'bg-black/30 text-white hover:bg-primary border border-white/10'
                      }`}
                  >
                    <MdBookmarkBorder className={wishlist.includes(book._id) ? 'fill-current' : ''} />
                  </button>
                </div>

                {/* Bottom Section: Text & Slide-up Actions */}
                <div className="flex flex-col justify-end">
                  <div className="transform transition-transform duration-500 translate-y-10 group-hover:translate-y-0">

                    {/* Title & Author */}
                    <h3 className="font-headline italic text-xl md:text-2xl text-white line-clamp-2 leading-tight drop-shadow-md">
                      {book.title}
                    </h3>
                    <p className="text-sm text-white/70 mt-1 mb-4 line-clamp-1">
                      By {book.author}
                    </p>

                    {/* Hidden Footer: Availability & Action (Reveals on Hover) */}
                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 border-t border-white/10 pt-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                          Availability
                        </span>
                        <span className={`text-xs font-bold ${book.availableCopies > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {book.availableCopies > 0 ? `${book.availableCopies} Copies Left` : 'Out of Stock'}
                        </span>
                      </div>

                      <button
                        onClick={(e) => e.preventDefault()}
                        className={`p-2.5 rounded-full transition-all ${book.availableCopies > 0
                            ? 'bg-primary text-white shadow-lg shadow-primary/40 hover:scale-110'
                            : 'bg-white/10 text-white/30 cursor-not-allowed'
                          }`}
                        disabled={book.availableCopies === 0}
                      >
                        <MdChromeReaderMode className="text-xl" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-card p-20 shadow-bento border border-outline-variant/30 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
            <MdHourglassEmpty className="text-4xl text-primary/30" />
          </div>
          <h3 className="font-headline text-2xl italic text-on-surface mb-2">No Books Found</h3>
          <p className="text-sm text-on-surface-variant opacity-60 max-w-xs">
            We couldn't find any books matching your current search or filters.
          </p>
          <button
            onClick={() => { setSearch(''); setCategory('All'); }}
            className="mt-8 px-6 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
