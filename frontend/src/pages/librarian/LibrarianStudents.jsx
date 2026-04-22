import React, { useState, useEffect } from 'react';
import { 
  MdAdd, MdEdit, MdKey, MdSearch, MdClose, MdSave, 
  MdDeleteOutline, MdPerson, MdSchool, MdUploadFile, MdDownload
} from 'react-icons/md';
import API from '../../api/axios';
import toast from 'react-hot-toast';

export default function LibrarianStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadingCSV, setUploadingCSV] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    enrollmentNumber: '',
    email: '',
    password: '',
    department: '',
    semester: 1,
    fatherName: '',
    mobileNo: ''
  });

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/librarian/students');
      if (data.success) setStudents(data.students);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentStudent) {
        await API.put(`/librarian/students/${currentStudent._id}`, formData);
        toast.success("Student updated successfully");
      } else {
        await API.post('/librarian/students', formData);
        toast.success("Student enrolled successfully");
      }
      setShowModal(false);
      fetchStudents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await API.delete(`/librarian/students/${id}`);
      toast.success("Student deleted");
      fetchStudents();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const handleResetPassword = async (id) => {
    const newPass = window.prompt('Enter new password:');
    if (!newPass) return;
    try {
      await API.patch(`/librarian/students/${id}/reset-password`, { newPassword: newPass });
      toast.success('Password reset successful');
    } catch (error) {
      toast.error('Reset failed');
    }
  };

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
      const res = await API.post('/librarian/students/bulk', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.status === 207) {
        toast.success(res.data.message);
      } else {
        toast.success(`Successfully imported ${res.data.count} students`);
      }
      fetchStudents(); // Refresh list
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to import students");
    } finally {
      setUploadingCSV(false);
      e.target.value = null; // Reset input
    }
  };

  const openModal = (student = null) => {
    if (student) {
      setCurrentStudent(student);
      setFormData({ 
        name: student.name, 
        enrollmentNumber: student.enrollmentNumber, 
        email: student.email || '',
        department: student.department,
        semester: student.semester,
        fatherName: student.fatherName,
        mobileNo: student.mobileNo || ''
      });
    } else {
      setCurrentStudent(null);
      setFormData({ 
        name: '', enrollmentNumber: '', email: '', password: '', 
        department: '', semester: 1, fatherName: '', mobileNo: '' 
      });
    }
    setShowModal(true);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-card-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="font-headline text-4xl italic text-on-surface mb-2">Student CRM</h1>
          <p className="text-sm text-on-surface-variant opacity-60">Manage student enrollments, academic standing, and access.</p>
        </div>
        <div className="flex gap-3">
          <label className={`cursor-pointer btn-secondary px-6 py-3 flex items-center gap-2 border border-outline-variant/30 rounded-xl hover:bg-surface-variant transition-colors ${uploadingCSV ? 'opacity-50' : ''}`}>
            <MdUploadFile className="text-xl" />
            {uploadingCSV ? 'Uploading...' : 'Bulk Import CSV'}
            <input type="file" accept=".csv" className="hidden" onChange={handleFileSelect} disabled={uploadingCSV} />
          </label>
          <button 
            onClick={() => openModal()}
            className="btn-primary px-6 py-3 flex items-center gap-2 rounded-xl bg-primary text-on-primary hover:bg-primary/90 transition-colors"
          >
            <MdAdd className="text-xl" />
            Enroll New Student
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative max-w-md w-full">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-on-surface-variant opacity-40" />
          <input 
            type="text"
            placeholder="Search by name or ID..."
            className="w-full bg-surface border border-outline-variant/30 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-primary shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={() => {
            const template = "name,enrollmentNumber,email,department,semester,fatherName,mobileNo\nJohn Doe,Y24104001,john@example.com,BCA,1,Richard Doe,9999999999";
            const blob = new Blob([template], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', 'student_import_template.csv');
            document.body.appendChild(link);
            link.click();
          }} className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1 ml-4">
            <MdDownload className="text-[16px]" />
            CSV Template
        </button>
      </div>

      <div className="bg-surface rounded-card shadow-bento overflow-hidden border border-outline-variant/30">
        <div className="overflow-x-auto">
          {loading ? (
             <div className="flex justify-center items-center h-64 text-outline">Loading...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background border-b border-outline-variant/30">
                  <th className="py-5 px-8 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Student</th>
                  <th className="py-5 px-8 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Department</th>
                  <th className="py-5 px-8 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Semester</th>
                  <th className="py-5 px-8 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="hover:bg-background/50 transition-colors group">
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                          <MdPerson className="text-xl" />
                        </div>
                        <div>
                          <div className="font-bold text-on-surface">{student.name}</div>
                          <div className="text-[10px] font-mono text-on-surface-variant opacity-50 uppercase">{student.enrollmentNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                        <MdSchool className="text-primary" />
                        {student.department}
                      </div>
                    </td>
                    <td className="py-5 px-8">
                      <span className="text-sm font-bold text-on-surface">{student.semester}</span>
                    </td>
                    <td className="py-5 px-8 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openModal(student)}
                          className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-lg hover:bg-primary/5" title="Edit"
                        >
                          <MdEdit className="text-lg" />
                        </button>
                        <button 
                          onClick={() => handleResetPassword(student._id)}
                          className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-lg hover:bg-primary/5" title="Reset Password"
                        >
                          <MdKey className="text-lg" />
                        </button>
                        <button 
                          onClick={() => handleDelete(student._id)}
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
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-on-surface/20 backdrop-blur-sm">
          <div className="bg-surface w-full max-w-2xl rounded-card shadow-bento border border-outline-variant/30 overflow-hidden">
            <div className="p-8 border-b border-outline-variant/30 flex justify-between items-center bg-background/50">
              <h3 className="font-headline text-2xl italic text-on-surface">
                {currentStudent ? 'Edit Student Details' : 'New Enrollment'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-background rounded-full transition-colors">
                <MdClose className="text-2xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Enrollment ID</label>
                <input 
                  className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all disabled:opacity-50"
                  value={formData.enrollmentNumber}
                  onChange={(e) => setFormData({...formData, enrollmentNumber: e.target.value})}
                  required
                  disabled={!!currentStudent}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Email Address</label>
                <input 
                  type="email"
                  className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Department</label>
                <input 
                  className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Semester</label>
                <input 
                  type="number"
                  className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all"
                  value={formData.semester}
                  onChange={(e) => setFormData({...formData, semester: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Father's Name</label>
                <input 
                  className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Mobile No</label>
                <input 
                  className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all"
                  value={formData.mobileNo}
                  onChange={(e) => setFormData({...formData, mobileNo: e.target.value})}
                  required
                />
              </div>
              {!currentStudent && (
                <div className="space-y-2 md:col-span-2">
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
              <div className="md:col-span-2 pt-4">
                <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2 rounded-xl bg-primary text-on-primary hover:bg-primary/90 transition-colors">
                  <MdSave className="text-xl" />
                  {currentStudent ? 'Save Changes' : 'Enroll Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
