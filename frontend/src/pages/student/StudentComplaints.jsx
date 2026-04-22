import React, { useState, useEffect } from 'react';
import { MdSend, MdAttachFile, MdCheckCircle, MdErrorOutline, MdAccessTime } from 'react-icons/md';
import API from '../../api/axios';

export default function StudentComplaints() {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const { data } = await API.get('/complaints/my');
      if (data.success) setComplaints(data.complaints);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description) return alert("Please describe your issue");

    const formData = new FormData();
    formData.append('issueDescription', description);
    if (file) formData.append('attachment', file);

    setSubmitting(true);
    try {
      const { data } = await API.post('/complaints', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (data.success) {
        alert("Complaint submitted successfully");
        setDescription("");
        setFile(null);
        fetchComplaints();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="font-headline text-4xl italic text-on-surface mb-2">Help & Support</h2>
        <p className="text-sm text-on-surface-variant opacity-60">Submit a complaint or request assistance from library staff.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-5">
          <div className="bg-surface border border-outline-variant/30 rounded-card p-8 shadow-bento">
            <h3 className="font-headline text-2xl italic text-on-surface mb-6">New Complaint</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Issue Description</label>
                <textarea 
                  className="w-full bg-background border border-outline-variant/30 rounded-xl p-4 text-sm focus:border-primary outline-none min-h-[150px] transition-all"
                  placeholder="Describe your issue in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Attachment (Optional)</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 flex items-center gap-3 px-4 py-3 bg-background border border-dashed border-outline-variant/50 rounded-xl cursor-pointer hover:border-primary transition-all group">
                    <MdAttachFile className="text-xl text-on-surface-variant group-hover:text-primary" />
                    <span className="text-xs font-medium text-on-surface-variant line-clamp-1">
                      {file ? file.name : "Upload image (JPG/PNG)"}
                    </span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                  {file && (
                    <button 
                      type="button" 
                      onClick={() => setFile(null)}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="btn-primary w-full py-4 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {submitting ? "Submitting..." : (
                  <>
                    Submit Complaint
                    <MdSend className="text-lg" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-7">
          <div className="bg-surface border border-outline-variant/30 rounded-card p-8 shadow-bento h-full">
            <h3 className="font-headline text-2xl italic text-on-surface mb-6">Recent Tickets</h3>
            <div className="space-y-4">
              {complaints.length > 0 ? complaints.map((c) => (
                <div key={c._id} className="p-5 bg-background rounded-2xl border border-outline-variant/30 hover:border-primary/20 transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      {c.status === 'Resolved' ? (
                        <MdCheckCircle className="text-secondary" />
                      ) : (
                        <MdAccessTime className="text-tertiary" />
                      )}
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${
                        c.status === 'Resolved' ? 'text-secondary' : 'text-tertiary'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                    <span className="text-[10px] text-on-surface-variant opacity-40 font-mono">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed mb-4">{c.issueDescription}</p>
                  {c.attachment && (
                    <a 
                      href={c.attachment} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] font-bold text-primary hover:underline bg-primary/5 px-3 py-1 rounded-full"
                    >
                      View Attachment
                    </a>
                  )}
                </div>
              )) : (
                <div className="flex flex-col items-center justify-center h-64 opacity-20">
                  <MdErrorOutline className="text-6xl mb-2" />
                  <p className="text-xs font-bold uppercase tracking-widest">No complaints yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
