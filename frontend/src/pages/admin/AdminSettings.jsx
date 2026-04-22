import React, { useState, useEffect } from 'react';
import { MdSettings, MdMenuBook, MdAttachMoney, MdSave, MdTrendingUp } from 'react-icons/md';
import API from '../../api/axios';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    ugBookLimit: 2,
    pgBookLimit: 4,
    maxFineLimit: 500
  });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await API.get('/settings');
        if (data.success) {
          if (data.settings) setSettings(data.settings);
          setTotalRevenue(data.totalRevenue || 0);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await API.put('/settings', settings);
      toast.success('Settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-card-gap max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-2">System Settings</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Configure library parameters and view financial reports.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Settings Form */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 border border-surface-container-highest/50">
          <h3 className="font-headline-sm text-xl text-on-surface mb-6 flex items-center gap-2">
            <MdSettings className="text-primary" />
            Library Rules Configuration
          </h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface-variant flex items-center gap-2">
                  <MdMenuBook className="text-primary" /> UG Book Issue Limit
                </label>
                <input 
                  type="number" 
                  className="w-full bg-surface-container border-none rounded-lg px-4 py-3 font-body-md text-on-surface focus:ring-2 focus:ring-primary transition-all"
                  value={settings.ugBookLimit}
                  onChange={(e) => setSettings({...settings, ugBookLimit: parseInt(e.target.value) || 0})}
                  min="1"
                />
                <p className="text-[10px] text-outline">Maximum books an Undergrad can hold.</p>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface-variant flex items-center gap-2">
                  <MdMenuBook className="text-secondary" /> PG Book Issue Limit
                </label>
                <input 
                  type="number" 
                  className="w-full bg-surface-container border-none rounded-lg px-4 py-3 font-body-md text-on-surface focus:ring-2 focus:ring-primary transition-all"
                  value={settings.pgBookLimit}
                  onChange={(e) => setSettings({...settings, pgBookLimit: parseInt(e.target.value) || 0})}
                  min="1"
                />
                <p className="text-[10px] text-outline">Maximum books a Postgrad can hold.</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-outline-variant/30 pt-6">
              <label className="font-label-md text-on-surface-variant flex items-center gap-2">
                <MdAttachMoney className="text-error" /> Maximum Fine Limit (₹)
              </label>
              <input 
                type="number" 
                className="w-full md:w-1/2 bg-surface-container border-none rounded-lg px-4 py-3 font-body-md text-on-surface focus:ring-2 focus:ring-primary transition-all"
                value={settings.maxFineLimit}
                onChange={(e) => setSettings({...settings, maxFineLimit: parseInt(e.target.value) || 0})}
                min="0"
              />
              <p className="text-[10px] text-outline">Account is locked if fines exceed this amount.</p>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <MdSave className="text-lg" />
                {saving ? 'Saving...' : 'Save Configuration'}
              </button>
            </div>
          </div>
        </div>

        {/* Financial Report Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 border border-surface-container-highest/50 relative overflow-hidden group">
            <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-tertiary/10 rounded-full blur-3xl group-hover:bg-tertiary/20 transition-all duration-700"></div>
            
            <h3 className="font-headline-sm text-xl text-on-surface mb-6 flex items-center gap-2">
              <MdTrendingUp className="text-tertiary" />
              Revenue Report
            </h3>

            <div className="bg-tertiary/5 rounded-2xl p-6 border border-tertiary/20 text-center">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-80 mb-2">Total Fines Collected</p>
              <p className="text-5xl font-headline italic text-tertiary mb-2">₹{totalRevenue.toFixed(2)}</p>
              <p className="text-[10px] text-outline">Lifetime revenue from late returns</p>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-xl border border-primary/20 p-6 flex items-start gap-4">
            <div className="mt-1">
              <MdSettings className="text-primary text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-on-surface mb-1">System Health</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                All settings changes take effect immediately across the LMS platform. Ensure limits are communicated to students via the Notices board.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
