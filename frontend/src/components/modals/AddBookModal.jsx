import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AddBookModal({ isOpen, onClose, onBookAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: 'Fiction',
    totalCopies: 1,
    availableCopies: 1,
    shelfLocation: '',
    publisher: '',
    edition: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Assuming you've set up base URL in axios or use full URL
      const response = await axios.post('http://localhost:5000/api/books', formData);
      toast.success('Book added successfully!');
      onBookAdded(response.data);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white border-b border-outline-variant/30 p-6 flex justify-between items-center z-10">
          <h2 className="font-headline-md text-headline-md text-on-surface">Add New Book</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-variant rounded-full transition-colors">
            <MdClose className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-outline">Title *</label>
              <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary" placeholder="Enter book title" />
            </div>
            
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-outline">Author *</label>
              <input required name="author" value={formData.author} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary" placeholder="Enter author name" />
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md text-outline">ISBN *</label>
              <input required name="isbn" value={formData.isbn} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary" placeholder="e.g., 978-0132350884" />
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md text-outline">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary">
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Reference">Reference</option>
                <option value="Web Development">Web Development</option>
                <option value="Python/Data Science">Python/Data Science</option>
                <option value="Software Engineering">Software Engineering</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md text-outline">Total Copies</label>
              <input type="number" min="1" name="totalCopies" value={formData.totalCopies} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary" />
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md text-outline">Available Copies</label>
              <input type="number" min="0" name="availableCopies" value={formData.availableCopies} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary" />
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md text-outline">Shelf Location</label>
              <input name="shelfLocation" value={formData.shelfLocation} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary" placeholder="e.g., Shelf A-12" />
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md text-outline">Publisher</label>
              <input name="publisher" value={formData.publisher} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary" placeholder="Publisher name" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-outline-variant/30">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-variant transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl font-label-md text-label-md bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50">
              {loading ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
