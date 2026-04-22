import React, { useState, useEffect } from 'react';
import { MdCheckCircle, MdSchedule, MdErrorOutline, MdPerson, MdOpenInNew, MdRefresh } from 'react-icons/md';
import API from '../../api/axios';
import toast from 'react-hot-toast';

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/admin/complaints');
      if (data.success) {
        setComplaints(data.complaints);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await API.patch(`/admin/complaints/${id}/status`, { status: newStatus });
      toast.success(`Complaint marked as ${newStatus}`);
      fetchComplaints();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-card-gap max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Facility Reports Dashboard</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Review and manage student maintenance requests and complaints.</p>
        </div>
        <button onClick={fetchComplaints} className="btn-secondary px-4 py-2 flex items-center gap-2 border border-outline-variant/30 rounded-lg hover:bg-surface-variant transition-colors">
          <MdRefresh /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {complaints.length === 0 ? (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-outline-variant/50 rounded-xl">
            <MdCheckCircle className="text-4xl text-outline mb-2 mx-auto" />
            <p className="text-on-surface-variant">No active complaints found. Everything is running smoothly!</p>
          </div>
        ) : (
          complaints.map(complaint => (
            <div key={complaint._id} className="bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 border border-surface-container-highest/50 flex flex-col h-full relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className={`absolute top-0 left-0 w-1.5 h-full ${complaint.status === 'Resolved' ? 'bg-secondary' : 'bg-tertiary'}`}></div>
              
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  complaint.status === 'Resolved' 
                    ? 'bg-secondary/10 text-secondary border border-secondary/20' 
                    : 'bg-tertiary/10 text-tertiary border border-tertiary/20'
                }`}>
                  {complaint.status === 'Resolved' ? <MdCheckCircle /> : <MdSchedule />}
                  {complaint.status}
                </span>
                <span className="text-[10px] text-outline font-medium">
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex-1 mb-6">
                <p className="font-body-lg text-body-lg text-on-surface line-clamp-4">
                  "{complaint.issueDescription}"
                </p>
                {complaint.attachment && (
                  <a href={complaint.attachment} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-primary text-sm hover:underline">
                    <MdOpenInNew /> View Attachment
                  </a>
                )}
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MdPerson />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">{complaint.studentId?.name || 'Unknown Student'}</p>
                    <p className="text-[10px] text-on-surface-variant">{complaint.studentId?.enrollmentNumber || 'N/A'}</p>
                  </div>
                </div>

                {complaint.status === 'Pending' && (
                  <button 
                    onClick={() => handleUpdateStatus(complaint._id, 'Resolved')}
                    className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 text-xs font-semibold text-on-surface hover:bg-secondary hover:text-white hover:border-secondary transition-colors"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
