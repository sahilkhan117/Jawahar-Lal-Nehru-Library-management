import React, { useState, useEffect } from 'react';
import { 
  MdDownload, MdAdd, MdBook, MdCheckCircle, 
  MdAssignmentInd, MdWarning, MdSearch, MdFilterList, 
  MdShelves, MdBuild, MdSearchOff, MdMoreVert, 
  MdChevronLeft, MdChevronRight, MdUploadFile, MdInfo,
  MdDeleteOutline, MdEdit
} from 'react-icons/md';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import Papa from 'papaparse';
import AddBookModal from '../../components/modals/AddBookModal';
import BulkImportModal from '../../components/modals/BulkImportModal';

export default function LibrarianInventory() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [shelfFilter, setShelfFilter] = useState('All Shelves');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [uploadingCSV, setUploadingCSV] = useState(false);

  // Fetch books from optimized endpoint
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (categoryFilter !== 'All Categories') params.category = categoryFilter;
      if (shelfFilter !== 'All Shelves') params.shelf = shelfFilter;

      const res = await API.get('/books', { params });
      if (res.data.success) {
        setBooks(res.data.books);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBooks();
    }, 400); 
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, categoryFilter, shelfFilter]);

  // Derived stats
  const totalBooks = books.reduce((acc, curr) => acc + (curr.totalCopies || 0), 0);
  const availableBooks = books.reduce((acc, curr) => acc + (curr.availableCopies || 0), 0);
  const issuedBooks = totalBooks - availableBooks;

  const handleExport = () => {
    if (books.length === 0) {
      toast.error("No books to export");
      return;
    }
    const csvData = books.map(b => ({
      Title: b.title,
      Author: b.author,
      ISBN: b.isbn,
      Category: b.category,
      TotalCopies: b.totalCopies,
      AvailableCopies: b.availableCopies,
      Shelf: b.shelfLocation || ''
    }));
    
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `library_inventory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error("Please upload a valid CSV file");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadingCSV(true);
      const res = await API.post('/books/bulk', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchBooks();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to import books");
    } finally {
      setUploadingCSV(false);
      if (e.target) e.target.value = null;
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <AddBookModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onBookAdded={fetchBooks} 
      />

      <BulkImportModal 
        isOpen={isBulkModalOpen} 
        onClose={() => setIsBulkModalOpen(false)} 
        onUpload={handleFileSelect} 
        uploading={uploadingCSV} 
      />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div className="space-y-1">
          <h2 className="font-headline text-3xl italic text-on-surface">Asset Registry</h2>
          <p className="text-on-surface-variant/60 text-sm">Monitor and manage the global book inventory.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setIsBulkModalOpen(true)} 
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface font-bold text-sm hover:bg-surface-variant/10 transition-all"
          >
            <MdUploadFile className="text-lg" />
            Bulk Ingestion
          </button>
          <button 
            onClick={handleExport} 
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface-variant font-bold text-sm hover:bg-surface-variant/10 transition-all"
          >
            <MdDownload className="text-lg" />
            Export CSV
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)} 
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-headline italic text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all"
          >
            <MdAdd className="text-xl" />
            Add New Entry
          </button>
        </div>
      </div>

      {/* Stats Bento */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface rounded-card p-6 border border-outline-variant/30 shadow-bento group">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <MdBook className="text-xl" />
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Total Assets</span>
          </div>
          <div className="font-headline italic text-3xl text-on-surface">{totalBooks}</div>
        </div>
        <div className="bg-surface rounded-card p-6 border border-outline-variant/30 shadow-bento group">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary group-hover:scale-110 transition-transform">
              <MdCheckCircle className="text-xl" />
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Available</span>
          </div>
          <div className="font-headline italic text-3xl text-secondary">{availableBooks}</div>
        </div>
        <div className="bg-surface rounded-card p-6 border border-outline-variant/30 shadow-bento group">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/5 text-primary/60 group-hover:scale-110 transition-transform">
              <MdAssignmentInd className="text-xl" />
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">On Loan</span>
          </div>
          <div className="font-headline italic text-3xl text-on-surface-variant">{issuedBooks}</div>
        </div>
        <div className="bg-surface rounded-card p-6 border border-outline-variant/30 shadow-bento group">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-500 group-hover:scale-110 transition-transform">
              <MdWarning className="text-xl" />
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Restock Needed</span>
          </div>
          <div className="font-headline italic text-3xl text-red-500">0</div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main List Section */}
        <div className="col-span-12 bg-surface rounded-card shadow-bento border border-outline-variant/30 flex flex-col min-h-[600px] overflow-hidden">
          {/* List Toolbar */}
          <div className="p-6 border-b border-outline-variant/10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface/50 backdrop-blur-md sticky top-0 z-10">
            <div className="relative w-full sm:w-80 group">
              <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-40 group-focus-within:opacity-100 transition-opacity text-2xl" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background/50 border border-outline-variant/20 rounded-2xl pl-12 pr-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 focus:bg-background transition-all" 
                placeholder="Search Title, Author, or ISBN..." 
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative">
                <MdFilterList className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 pointer-events-none" />
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-background/50 border border-outline-variant/20 rounded-xl pl-10 pr-8 py-2.5 font-bold text-xs text-on-surface-variant focus:outline-none focus:border-primary/50 appearance-none cursor-pointer">
                  <option>All Categories</option>
                  <option>Fiction</option>
                  <option>Non-Fiction</option>
                  <option>Reference</option>
                  <option>Web Development</option>
                  <option>Python/Data Science</option>
                  <option>Software Engineering</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-40">Syncing Catalog...</p>
              </div>
            ) : books.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-96 text-on-surface-variant/40 italic">
                <MdSearchOff className="text-6xl mb-4 opacity-20" />
                <p className="text-lg">No assets found matching your criteria</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-background/30 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    <th className="px-6 py-4">Asset Details</th>
                    <th className="px-6 py-4">Identification</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Availability</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {books.map(book => (
                    <tr key={book._id} className="hover:bg-surface-variant/5 transition-all group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-16 rounded-lg overflow-hidden bg-background shadow-lg border border-outline-variant/20 flex items-center justify-center shrink-0">
                            {book.coverImageUrl ? (
                                <img src={book.coverImageUrl} alt={book.title} className="w-full h-full object-cover" />
                            ) : (
                                <MdBook className="text-on-surface-variant/20 text-2xl" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-on-surface truncate group-hover:text-primary transition-colors">{book.title}</div>
                            <div className="text-xs text-on-surface-variant opacity-60 truncate">{book.author}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-[10px] text-on-surface-variant font-bold tracking-wider">{book.isbn}</td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background/50 border border-outline-variant/10 font-bold text-[10px] text-on-surface-variant uppercase tracking-tighter">
                          <MdShelves className="text-sm opacity-60" />
                          {book.shelfLocation || 'Main Hall'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold mb-1">
                            <span className={book.availableCopies > 0 ? 'text-secondary' : 'text-red-500'}>
                              {book.availableCopies > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                            <span className="text-on-surface-variant opacity-40">{book.availableCopies}/{book.totalCopies}</span>
                          </div>
                          <div className="h-1.5 w-24 bg-background rounded-full overflow-hidden border border-outline-variant/10">
                            <div 
                                className={`h-full transition-all duration-1000 ${book.availableCopies > 0 ? 'bg-secondary' : 'bg-red-500'}`}
                                style={{ width: `${(book.availableCopies / (book.totalCopies || 1)) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-xl transition-all">
                            <MdEdit className="text-xl" />
                          </button>
                          <button className="p-2 text-on-surface-variant hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                            <MdDeleteOutline className="text-xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-outline-variant/10 flex items-center justify-between bg-surface-variant/5">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-40">
              Sync complete. {books.length} assets retrieved.
            </span>
            <div className="flex gap-2">
              <button className="p-2 rounded-xl hover:bg-surface-variant/20 transition-all disabled:opacity-20" disabled>
                <MdChevronLeft className="text-xl" />
              </button>
              <button className="w-8 h-8 rounded-xl bg-primary text-white font-bold text-xs shadow-lg shadow-primary/20">1</button>
              <button className="p-2 rounded-xl hover:bg-surface-variant/20 transition-all disabled:opacity-20" disabled>
                <MdChevronRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
