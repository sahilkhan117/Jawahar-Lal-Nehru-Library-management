import React from 'react';
import { MdClose, MdUploadFile, MdDownload, MdInfo } from 'react-icons/md';

export default function BulkImportModal({ isOpen, onClose, onUpload, uploading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-surface w-full max-w-lg rounded-card shadow-2xl border border-outline-variant/30 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-variant/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <MdUploadFile className="text-2xl" />
            </div>
            <div>
              <h3 className="font-headline italic text-xl text-on-surface">Bulk Ingestion</h3>
              <p className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest">Import CSV Manifest</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-variant/20 rounded-full transition-all">
            <MdClose className="text-xl text-on-surface-variant" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4 items-start">
            <MdInfo className="text-primary mt-0.5 text-lg" />
            <p className="text-xs text-on-surface-variant opacity-80 leading-relaxed">
              Fast-track your inventory updates by uploading a standardized CSV file. Ensure your manifest follows the system template for seamless integration.
            </p>
          </div>

          <label className="border-2 border-dashed border-outline-variant/20 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-background/30 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer group">
            <input 
              type="file" 
              accept=".csv" 
              className="hidden" 
              onChange={(e) => {
                onUpload(e);
                onClose();
              }} 
              disabled={uploading} 
            />
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/5">
              <MdUploadFile className="text-4xl" />
            </div>
            <div className="font-bold text-on-surface mb-1 text-lg">
               {uploading ? 'Processing...' : 'Upload Manifest'}
            </div>
            <div className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-8">Drop CSV or Click to Browse</div>
            <div className="px-8 py-3 rounded-xl bg-surface border border-outline-variant/20 text-on-surface font-bold text-sm group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                Select Manifest File
            </div>
          </label>

          <button 
            onClick={() => {
              const template = "title,author,isbn,category,totalCopies,availableCopies,shelfLocation,description,publisher,edition,coverImageUrl\nExample Book,Author Name,ISBN123,Category,5,5,Shelf-01,Description here,Publisher,1st,https://image.url";
              const blob = new Blob([template], { type: 'text/csv' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.setAttribute('download', 'book_ingestion_template.csv');
              link.click();
            }}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-bold text-primary uppercase tracking-widest hover:bg-primary/5 transition-all border border-primary/10"
          >
            <MdDownload className="text-xl" />
            Download Manifest Template (.CSV)
          </button>
        </div>

        <div className="p-6 bg-surface-variant/5 border-t border-outline-variant/10 flex justify-end">
          <button onClick={onClose} className="px-6 py-2.5 text-xs font-bold text-on-surface-variant uppercase tracking-widest hover:text-on-surface transition-all">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
