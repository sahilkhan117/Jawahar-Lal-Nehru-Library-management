import React, { useState, useEffect } from 'react';
import { MdDownload, MdAdd, MdBook, MdCheckCircle, MdAssignmentInd, MdWarning, MdSearch, MdFilterList, MdShelves, MdBuild, MdSearchOff, MdMoreVert, MdChevronLeft, MdChevronRight, MdUploadFile, MdInfo } from 'react-icons/md';
import axios from 'axios';
import toast from 'react-hot-toast';
import Papa from 'papaparse';
import AddBookModal from '../../components/modals/AddBookModal';

export default function LibrarianInventory() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [shelfFilter, setShelfFilter] = useState('All Shelves');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [uploadingCSV, setUploadingCSV] = useState(false);

  // Fetch books
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.query = searchQuery;
      if (categoryFilter !== 'All Categories') params.category = categoryFilter;
      if (shelfFilter !== 'All Shelves') params.shelf = shelfFilter;

      const res = await axios.get('http://localhost:5000/api/books', { params });
      setBooks(res.data);
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
    }, 300); // Debounce search
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, categoryFilter, shelfFilter]);

  // Derived stats
  const totalBooks = books.reduce((acc, curr) => acc + curr.totalCopies, 0);
  const availableBooks = books.reduce((acc, curr) => acc + curr.availableCopies, 0);
  const issuedBooks = totalBooks - availableBooks;

  // Handle Export CSV
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
    link.setAttribute('download', 'library_inventory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Bulk Import
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast.error("Please upload a valid CSV file");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadingCSV(true);
      const res = await axios.post('http://localhost:5000/api/books/bulk', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.status === 207) {
        toast.success(res.data.message);
      } else {
        toast.success(`Successfully imported ${res.data.count} books`);
      }
      fetchBooks(); // Refresh list
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to import books");
    } finally {
      setUploadingCSV(false);
      e.target.value = null; // Reset input
    }
  };

  return (
    <div className="space-y-card-gap relative">
      <AddBookModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onBookAdded={fetchBooks} 
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface">Inventory Management</h2>
          <p className="font-body-lg text-body-lg text-outline mt-2">Manage physical assets, locations, and bulk uploads.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="bg-surface text-on-surface border border-outline-variant font-label-md text-label-md py-2.5 px-5 rounded-xl hover:bg-surface-variant transition-colors flex items-center gap-2">
            <MdDownload className="text-[18px]" />
            Export List
          </button>
          <button onClick={() => setIsAddModalOpen(true)} className="bg-primary text-on-primary font-label-md text-label-md py-2.5 px-5 rounded-xl hover:bg-on-primary-fixed-variant transition-colors flex items-center gap-2 shadow-sm">
            <MdAdd className="text-[18px]" />
            Add Single Book
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-card-gap">
        <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-card-gap">
          <div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                <MdBook className="text-[18px]" />
              </div>
              <span className="font-label-md text-label-md text-outline">Total Books</span>
            </div>
            <div className="font-headline-md text-headline-md text-on-surface">{totalBooks}</div>
          </div>
          <div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                <MdCheckCircle className="text-[18px]" />
              </div>
              <span className="font-label-md text-label-md text-outline">Available</span>
            </div>
            <div className="font-headline-md text-headline-md text-on-surface">{availableBooks}</div>
          </div>
          <div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-tertiary-container/10 flex items-center justify-center text-tertiary">
                <MdAssignmentInd className="text-[18px]" />
              </div>
              <span className="font-label-md text-label-md text-outline">Issued</span>
            </div>
            <div className="font-headline-md text-headline-md text-on-surface">{issuedBooks}</div>
          </div>
          <div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-error-container/50 flex items-center justify-center text-error">
                <MdWarning className="text-[18px]" />
              </div>
              <span className="font-label-md text-label-md text-outline">Action Needed</span>
            </div>
            <div className="font-headline-md text-headline-md text-error">0</div>
          </div>
        </div>

        {/* Inventory List */}
        <div className="lg:col-span-8 bg-white rounded-[24px] shadow-soft border border-slate-100/50 flex flex-col overflow-hidden min-h-[600px]">
          <div className="p-6 border-b border-surface-variant flex flex-col md:flex-row gap-4 justify-between items-center bg-white z-10">
            <div className="relative w-full md:w-72">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-xl pl-10 pr-4 py-2.5 font-body-md text-body-md focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-outline-variant text-on-surface" 
                placeholder="Search Title, Author, or ISBN..." 
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-surface-container-low border-none rounded-xl px-4 py-2.5 font-label-md text-label-md text-on-surface focus:ring-2 focus:ring-primary focus:bg-white appearance-none pr-10 relative">
                <option>All Categories</option>
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Reference</option>
                <option>Web Development</option>
                <option>Python/Data Science</option>
                <option>Software Engineering</option>
              </select>
              <select 
                value={shelfFilter}
                onChange={(e) => setShelfFilter(e.target.value)}
                className="bg-surface-container-low border-none rounded-xl px-4 py-2.5 font-label-md text-label-md text-on-surface focus:ring-2 focus:ring-primary focus:bg-white appearance-none pr-10">
                <option>All Shelves</option>
                <option>Shelf A-12</option>
                <option>Shelf P-04</option>
                <option>Shelf C-01</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64 text-outline">Loading...</div>
            ) : books.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-64 text-outline">
                <MdSearchOff className="text-4xl mb-2" />
                <p>No books found matching your criteria</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-surface-variant bg-surface-bright/50 font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    <th className="p-4 pl-6 font-medium">Book Details</th>
                    <th className="p-4 font-medium">ISBN</th>
                    <th className="p-4 font-medium">Location</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 pr-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant/50">
                  {books.map(book => (
                    <tr key={book._id} className="hover:bg-surface-container-low/50 transition-colors group">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-14 bg-surface-dim rounded flex items-center justify-center shrink-0">
                            <MdBook className="text-outline-variant" />
                          </div>
                          <div>
                            <div className="font-label-md text-label-md text-on-surface font-semibold">{book.title}</div>
                            <div className="font-body-md text-body-md text-outline text-[13px] mt-0.5">{book.author}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-body-md text-body-md text-on-surface-variant">{book.isbn}</td>
                      <td className="p-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">
                          <MdShelves className="text-[14px]" />
                          {book.shelfLocation || 'Unassigned'}
                        </div>
                      </td>
                      <td className="p-4">
                        {book.availableCopies > 0 ? (
                           <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold bg-secondary/10 text-secondary border border-secondary/20">
                             Available ({book.availableCopies}/{book.totalCopies})
                           </span>
                        ) : (
                           <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold bg-tertiary/10 text-tertiary border border-tertiary/20">
                             Issued
                           </span>
                        )}
                      </td>
                      <td className="p-4 pr-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex justify-end gap-1">
                          <button className="p-1.5 text-outline hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                            <MdBuild className="text-[18px]" />
                          </button>
                          <button className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-variant rounded-lg transition-colors">
                            <MdMoreVert className="text-[18px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          <div className="p-4 border-t border-surface-variant flex items-center justify-between text-outline font-label-sm text-label-sm bg-white">
            <div>Showing {books.length} entries</div>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-variant transition-colors disabled:opacity-50" disabled>
                <MdChevronLeft className="text-[18px]" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-medium">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-variant transition-colors disabled:opacity-50" disabled>
                <MdChevronRight className="text-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar panels */}
        <div className="lg:col-span-4 flex flex-col gap-card-gap">
          <div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100/50">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">Bulk Import</h3>
            <p className="font-body-md text-body-md text-outline mb-6 text-[14px]">Upload a CSV file to add multiple books at once. Format must match the system template.</p>
            
            <label className="border-2 border-dashed border-outline-variant/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-surface-bright hover:bg-surface-container-low transition-colors cursor-pointer group">
              <input type="file" accept=".csv" className="hidden" onChange={handleFileSelect} disabled={uploadingCSV} />
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MdUploadFile className="text-[24px]" />
              </div>
              <div className="font-label-md text-label-md text-on-surface mb-1">
                 {uploadingCSV ? 'Uploading...' : 'Drag & drop your CSV here'}
              </div>
              <div className="font-body-md text-body-md text-outline text-[13px] mb-4">or click to browse files</div>
              <div className="bg-white border border-outline-variant text-on-surface font-label-sm text-label-sm py-2 px-4 rounded-lg hover:bg-surface-variant transition-colors shadow-sm">
                  {uploadingCSV ? 'Processing...' : 'Select File'}
              </div>
            </label>

            <div className="mt-4 flex items-center justify-center">
              <button onClick={() => {
                const template = "title,author,isbn,category,totalCopies,availableCopies,shelfLocation\nExample Book,John Doe,978-0000000000,Fiction,5,5,Shelf A-1";
                const blob = new Blob([template], { type: 'text/csv' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.setAttribute('download', 'book_import_template.csv');
                document.body.appendChild(link);
                link.click();
              }} className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1">
                <MdDownload className="text-[16px]" />
                Download CSV Template
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100/50 flex-1">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-error-container bg-error-container/20 flex gap-3 items-start">
                <MdWarning className="text-error mt-0.5" />
                <div>
                  <div className="font-label-md text-label-md text-on-surface">No lost books reported</div>
                  <div className="font-body-md text-body-md text-outline text-[13px] mt-0.5">Inventory is healthy.</div>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-surface-variant bg-surface-container-low flex gap-3 items-start">
                <MdInfo className="text-tertiary mt-0.5" />
                <div>
                  <div className="font-label-md text-label-md text-on-surface">System Update</div>
                  <div className="font-body-md text-body-md text-outline text-[13px] mt-0.5">All features are now fully functional.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
