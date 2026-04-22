import React, { useState, useEffect } from 'react';
import { 
  MdAdd, MdEdit, MdKey, MdBlock, MdChevronLeft, MdChevronRight, 
  MdPerson, MdAccessTime, MdClose, MdSave, MdDeleteOutline 
} from 'react-icons/md';
import API from '../../api/axios';

export default function AdminStaff() {
  const [librarians, setLibrarians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentLib, setCurrentLib] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    password: '',
    assignedShift: 'Morning'
  });

  const fetchLibrarians = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/admin/librarians');
      if (data.success) setLibrarians(data.librarians);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibrarians();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentLib) {
        await API.put(`/admin/librarians/${currentLib._id}`, formData);
      } else {
        await API.post('/admin/librarians', formData);
      }
      setShowModal(false);
      fetchLibrarians();
    } catch (error) {
      alert(error.response?.data?.message || 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this librarian?')) return;
    try {
      await API.delete(`/admin/librarians/${id}`);
      fetchLibrarians();
    } catch (error) {
      alert('Delete failed');
    }
  };

  const handleResetPassword = async (id) => {
    const newPass = window.prompt('Enter new password:');
    if (!newPass) return;
    try {
      await API.patch(`/admin/librarians/${id}/reset-password`, { newPassword: newPass });
      alert('Password reset successful');
    } catch (error) {
      alert('Reset failed');
    }
  };

  const openModal = (lib = null) => {
    if (lib) {
      setCurrentLib(lib);
      setFormData({ name: lib.name, employeeId: lib.employeeId, assignedShift: lib.assignedShift });
    } else {
      setCurrentLib(null);
      setFormData({ name: '', employeeId: '', password: '', assignedShift: 'Morning' });
    }
    setShowModal(true);
  };

  return (
    <div className="space-y-card-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="font-headline text-4xl italic text-on-surface mb-2">Librarian Directory</h1>
          <p className="text-sm text-on-surface-variant opacity-60">Manage staff accounts, shifts, and access levels across all facilities.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="btn-primary px-6 py-3 flex items-center gap-2"
        >
          <MdAdd className="text-xl" />
          Add New Librarian
        </button>
      </div>

      <div className="bg-surface rounded-card shadow-bento overflow-hidden border border-outline-variant/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-outline-variant/30">
                <th className="py-5 px-8 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Librarian</th>
                <th className="py-5 px-8 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Employee ID</th>
                <th className="py-5 px-8 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Shift</th>
                <th className="py-5 px-8 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {librarians.map((lib) => (
                <tr key={lib._id} className="hover:bg-background/50 transition-colors group">
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <MdPerson className="text-xl" />
                      </div>
                      <div className="font-bold text-on-surface">{lib.name}</div>
                    </div>
                  </td>
                  <td className="py-5 px-8 text-sm font-mono text-on-surface-variant opacity-70">{lib.employeeId}</td>
                  <td className="py-5 px-8">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">
                      <MdAccessTime />
                      {lib.assignedShift}
                    </span>
                  </td>
                  <td className="py-5 px-8 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openModal(lib)}
                        className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-lg hover:bg-primary/5" title="Edit"
                      >
                        <MdEdit className="text-lg" />
                      </button>
                      <button 
                        onClick={() => handleResetPassword(lib._id)}
                        className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-lg hover:bg-primary/5" title="Reset Password"
                      >
                        <MdKey className="text-lg" />
                      </button>
                      <button 
                        onClick={() => handleDelete(lib._id)}
                        className="p-2 text-on-surface-variant hover:text-red-600 transition-colors rounded-lg hover:bg-red-50" title="Delete"
                      >
                        <MdDeleteOutline className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-on-surface/20 backdrop-blur-sm">
          <div className="bg-surface w-full max-w-md rounded-card shadow-bento border border-outline-variant/30 overflow-hidden">
            <div className="p-8 border-b border-outline-variant/30 flex justify-between items-center">
              <h3 className="font-headline text-2xl italic text-on-surface">
                {currentLib ? 'Edit Librarian' : 'Add Librarian'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-background rounded-full transition-colors">
                <MdClose className="text-2xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Full Name</label>
                <input 
                  className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Employee ID</label>
                <input 
                  className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all disabled:opacity-50"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                  required
                  disabled={!!currentLib}
                />
              </div>
              {!currentLib && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Temporary Password</label>
                  <input 
                    type="password"
                    className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Assigned Shift</label>
                <select 
                  className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all"
                  value={formData.assignedShift}
                  onChange={(e) => setFormData({...formData, assignedShift: e.target.value})}
                >
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                  <option>Night</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                <MdSave className="text-xl" />
                {currentLib ? 'Update Staff' : 'Create Staff'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
