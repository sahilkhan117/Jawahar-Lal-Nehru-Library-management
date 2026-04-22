import React, { useState } from 'react';
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdFormatListBulleted, MdFormatListNumbered, MdLink, MdImage, MdSend, MdSignalCellular4Bar, MdWifi, MdBatteryFull } from 'react-icons/md';
import API from '../../api/axios';
import toast from 'react-hot-toast';

export default function AdminNotices() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'System Update',
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      toast.error('Title and Content are required!');
      return;
    }
    
    setSubmitting(true);
    try {
      await API.post('/notices', formData);
      toast.success('Notice published successfully!');
      setFormData({ title: '', category: 'System Update', content: '' });
      // In a real editor, you'd reset innerHTML. For now, we'll let it be or just rely on state.
      document.getElementById('notice-editor').innerHTML = '<p class="text-on-surface-variant font-body-md text-body-md">Start typing your notice here...</p>';
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to publish notice');
    } finally {
      setSubmitting(false);
    }
  };

  const handleContentInput = (e) => {
    // Only extract text for now to keep it simple, or extract raw HTML if we wanted rich text
    const text = e.target.innerText;
    if (text === 'Start typing your notice here...') return;
    setFormData({ ...formData, content: text });
  };

  return (
    <div className="space-y-card-gap">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-gutter">
        <div className="flex-1 flex flex-col gap-card-gap">
          <div className="mb-4">
            <h1 className="font-headline-md text-headline-md text-on-background mb-2">Create Notice</h1>
            <p className="text-on-surface-variant font-body-md text-body-md">Draft and preview announcements before publishing.</p>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2">Notice Title</label>
                <input 
                  className="w-full bg-[#F1F5F9] border-none rounded-lg px-4 py-3 text-on-background focus:ring-2 focus:ring-primary focus:bg-white transition-all font-body-md text-body-md" 
                  placeholder="e.g., Library Closure on Friday" 
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2">Category</label>
                <select 
                  className="w-full bg-[#F1F5F9] border-none rounded-lg px-4 py-3 text-on-background focus:ring-2 focus:ring-primary focus:bg-white transition-all font-body-md text-body-md appearance-none"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option>System Update</option>
                  <option>Event</option>
                  <option>Alert</option>
                </select>
              </div>
            </div>

            <div className="border border-outline-variant rounded-lg overflow-hidden flex flex-col">
              <div className="bg-surface-container-low p-2 flex items-center gap-1 border-b border-outline-variant">
                <button className="p-2 hover:bg-surface-variant rounded text-on-surface-variant" title="Bold"><MdFormatBold /></button>
                <button className="p-2 hover:bg-surface-variant rounded text-on-surface-variant" title="Italic"><MdFormatItalic /></button>
                <button className="p-2 hover:bg-surface-variant rounded text-on-surface-variant" title="Underline"><MdFormatUnderlined /></button>
                <div className="w-px h-6 bg-outline-variant mx-1"></div>
                <button className="p-2 hover:bg-surface-variant rounded text-on-surface-variant" title="Bullet List"><MdFormatListBulleted /></button>
                <button className="p-2 hover:bg-surface-variant rounded text-on-surface-variant" title="Numbered List"><MdFormatListNumbered /></button>
                <div className="w-px h-6 bg-outline-variant mx-1"></div>
                <button className="p-2 hover:bg-surface-variant rounded text-on-surface-variant" title="Insert Link"><MdLink /></button>
                <button className="p-2 hover:bg-surface-variant rounded text-on-surface-variant" title="Attach Image"><MdImage /></button>
              </div>

              <div 
                id="notice-editor"
                className="min-h-[300px] p-4 bg-white focus-within:ring-2 focus-within:ring-primary focus-within:ring-inset transition-all outline-none" 
                contentEditable="true"
                suppressContentEditableWarning={true}
                onInput={handleContentInput}
                onFocus={(e) => { if(e.target.innerText.trim() === 'Start typing your notice here...') e.target.innerHTML = ''; }}
              >
                <p className="text-on-surface-variant font-body-md text-body-md">Start typing your notice here...</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button className="px-6 py-2 rounded-lg font-label-md text-label-md border border-slate-300 text-on-background hover:bg-surface-variant transition-colors">Save Draft</button>
              <button 
                onClick={handleSubmit} 
                disabled={submitting}
                className="px-6 py-2 rounded-lg font-label-md text-label-md bg-primary text-on-primary shadow-md hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <MdSend /> {submitting ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-80 flex-shrink-0 flex flex-col gap-4">
          <h2 className="font-headline-sm text-headline-sm text-on-background">Mobile Preview</h2>
          <div className="bg-black p-3 rounded-[2.5rem] shadow-xl mx-auto w-full max-w-[320px] relative">
            <div className="bg-surface-container-low rounded-[2rem] overflow-hidden h-[600px] flex flex-col relative">
              <div className="bg-primary text-on-primary p-4 pb-6 flex flex-col gap-2 rounded-b-2xl shadow-sm z-10">
                <div className="flex justify-between items-center text-xs opacity-80 mb-2">
                  <span>9:41</span>
                  <div className="flex gap-1"><MdSignalCellular4Bar /><MdWifi /><MdBatteryFull /></div>
                </div>
                <h3 className="font-headline-sm text-[18px] font-semibold">Student Dashboard</h3>
              </div>
              <div className="p-4 flex flex-col gap-3 overflow-y-auto pt-2">
                
                <div className="bg-white p-4 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col gap-2 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full ${formData.category === 'Alert' ? 'bg-error' : formData.category === 'Event' ? 'bg-secondary' : 'bg-primary'}`}></div>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                      formData.category === 'Alert' ? 'bg-error/10 text-error' :
                      formData.category === 'Event' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                    }`}>
                      {formData.category || 'System Update'}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">Just now</span>
                  </div>
                  <h4 className="font-label-md text-label-md text-on-background">{formData.title || 'Notice Title'}</h4>
                  <p className="text-[12px] text-on-surface-variant line-clamp-3">
                    {formData.content || 'Start typing your notice here... The text will appear formatted in this preview box to show exactly how students will see it on their mobile devices.'}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col gap-2 relative overflow-hidden opacity-60">
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">Event</span>
                    <span className="text-[10px] text-on-surface-variant">2h ago</span>
                  </div>
                  <h4 className="font-label-md text-label-md text-on-background">Study Group Meetup</h4>
                  <p className="text-[12px] text-on-surface-variant line-clamp-2">Join us for the weekly study group in room 302.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
