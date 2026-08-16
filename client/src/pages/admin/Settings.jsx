import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Save, ShieldCheck } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    ownerName: '',
    whatsappNumber: '',
    instagramUrl: '',
    siteTitle: '',
    seoDescription: '',
    stat1Title: '',
    stat1Desc: '',
    stat2Title: '',
    stat2Desc: '',
    stat3Title: '',
    stat3Desc: '',
    beforeImage: '',
    afterImage: ''
  });

  const [authForm, setAuthForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const [authMessage, setAuthMessage] = useState({ text: '', type: '' });

  const fetchSettings = async () => {
    try {
      const { data } = await api.get('/settings');
      setSettings(data);
      setAuthForm(prev => ({ ...prev, username: localStorage.getItem('admin_username') || 'admin' }));
    } catch (error) {
      console.error('Error fetching settings:', error.message);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    try {
      await api.put('/settings', settings);
      setMessage({ text: 'વેબસાઇટ કન્ટેન્ટ અને સેટિંગ્સ સફળતાપૂર્વક અપડેટ થઈ ગઈ છે!', type: 'success' });
      // Trigger a reload event so other components can fetch the new settings if needed
      window.dispatchEvent(new Event('site-settings-updated'));
    } catch (error) {
      setMessage({ text: 'સેટિંગ્સ અપડેટ કરવામાં નિષ્ફળતા મળી.', type: 'error' });
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthMessage({ text: '', type: '' });

    if (authForm.password !== authForm.confirmPassword) {
      setAuthMessage({ text: 'પાસવર્ડ મેળ ખાતા નથી!', type: 'error' });
      return;
    }

    try {
      const { data } = await api.put('/auth/update-credentials', {
        username: authForm.username,
        password: authForm.password
      });
      setAuthMessage({ text: 'એડમિન ક્રેડેન્શિયલ્સ સફળતાપૂર્વક અપડેટ થઈ ગયા છે!', type: 'success' });
      localStorage.setItem('admin_username', data.admin.username);
      setAuthForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (error) {
      setAuthMessage({ text: 'ક્રેડેન્શિયલ્સ અપડેટ કરવામાં નિષ્ફળતા મળી.', type: 'error' });
    }
  };

  return (
    <div className="font-sans space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#6B2E1F] tracking-wide">સેટિંગ્સ (Site Settings)</h1>
        <p className="text-xs text-[#8B6F5E] mt-1 font-semibold uppercase tracking-wider">Manage administrative credentials and dynamic site configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Dynamic Website Content Settings */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#D4AF37]/15 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
            <h2 className="font-extrabold text-[#6B2E1F] text-lg">વેબસાઇટ કન્ટેન્ટ અને માહિતી</h2>
            <span className="text-[10px] bg-[#6B2E1F]/10 text-[#6B2E1F] font-bold px-2.5 py-1 rounded-lg uppercase">Config</span>
          </div>

          {message.text && (
            <div className={`p-4 rounded-xl text-xs font-bold border ${
              message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSettingsSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-[#6B2E1F] uppercase tracking-wider mb-1.5">વેબસાઇટ નામ (Title)</label>
                <input 
                  type="text" 
                  value={settings.siteTitle} 
                  onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 outline-none bg-gray-50/50 text-[#2B1810] font-medium" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#6B2E1F] uppercase tracking-wider mb-1.5">ઓનરનું નામ (Owner Name)</label>
                <input 
                  type="text" 
                  value={settings.ownerName} 
                  onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 outline-none bg-gray-50/50 text-[#2B1810]" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-[#6B2E1F] uppercase tracking-wider mb-1.5">WhatsApp નંબર</label>
                <input 
                  type="text" 
                  value={settings.whatsappNumber} 
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 outline-none bg-gray-50/50 text-[#2B1810]" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#6B2E1F] uppercase tracking-wider mb-1.5">Instagram લિંક</label>
                <input 
                  type="text" 
                  value={settings.instagramUrl} 
                  onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 outline-none bg-gray-50/50 text-[#2B1810]" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#6B2E1F] uppercase tracking-wider mb-1.5">SEO વર્ણન (Description)</label>
              <textarea 
                value={settings.seoDescription} 
                onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 outline-none bg-gray-50/50 text-[#2B1810]" 
              />
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-xs font-extrabold text-[#6B2E1F] uppercase tracking-wider mb-3">ટ્રસ્ટ આંકડા (Trust Stats)</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-50/50 rounded-2xl border border-gray-100">
                  <input 
                    type="text" 
                    placeholder="Stat 1 Title"
                    value={settings.stat1Title} 
                    onChange={(e) => setSettings({ ...settings, stat1Title: e.target.value })}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-[#D4AF37] outline-none" 
                  />
                  <input 
                    type="text" 
                    placeholder="Stat 1 Description"
                    value={settings.stat1Desc} 
                    onChange={(e) => setSettings({ ...settings, stat1Desc: e.target.value })}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-[#D4AF37] outline-none" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-50/50 rounded-2xl border border-gray-100">
                  <input 
                    type="text" 
                    placeholder="Stat 2 Title"
                    value={settings.stat2Title} 
                    onChange={(e) => setSettings({ ...settings, stat2Title: e.target.value })}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-[#D4AF37] outline-none" 
                  />
                  <input 
                    type="text" 
                    placeholder="Stat 2 Description"
                    value={settings.stat2Desc} 
                    onChange={(e) => setSettings({ ...settings, stat2Desc: e.target.value })}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-[#D4AF37] outline-none" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-50/50 rounded-2xl border border-gray-100">
                  <input 
                    type="text" 
                    placeholder="Stat 3 Title"
                    value={settings.stat3Title} 
                    onChange={(e) => setSettings({ ...settings, stat3Title: e.target.value })}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-[#D4AF37] outline-none" 
                  />
                  <input 
                    type="text" 
                    placeholder="Stat 3 Description"
                    value={settings.stat3Desc} 
                    onChange={(e) => setSettings({ ...settings, stat3Desc: e.target.value })}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-[#D4AF37] outline-none" 
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-[#6B2E1F] uppercase tracking-wider mb-1.5">Before Image URL</label>
                <input 
                  type="text" 
                  value={settings.beforeImage} 
                  onChange={(e) => setSettings({ ...settings, beforeImage: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-xs focus:border-[#D4AF37] outline-none bg-gray-50/50" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#6B2E1F] uppercase tracking-wider mb-1.5">After Image URL</label>
                <input 
                  type="text" 
                  value={settings.afterImage} 
                  onChange={(e) => setSettings({ ...settings, afterImage: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-xs focus:border-[#D4AF37] outline-none bg-gray-50/50" 
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#6B2E1F] hover:bg-[#C1662F] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition active:scale-95 duration-300 shadow-md shadow-[#6B2E1F]/20 flex items-center justify-center gap-2 cursor-pointer">
              <Save size={18} /> ફેરફારો સાચવો
            </button>
          </form>
        </div>

        {/* Change Admin Password */}
        <div className="bg-white rounded-3xl p-6 border border-[#D4AF37]/15 shadow-sm space-y-6 self-start">
          <div className="border-b border-gray-100 pb-3 flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#6B2E1F]" />
            <h2 className="font-extrabold text-[#6B2E1F] text-lg">એડમિન ક્રેડેન્શિયલ્સ</h2>
          </div>

          {authMessage.text && (
            <div className={`p-4 rounded-xl text-xs font-bold border ${
              authMessage.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {authMessage.text}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-[#6B2E1F] uppercase tracking-wider mb-1.5">નવું યુઝરનેમ</label>
              <input 
                type="text" 
                value={authForm.username} 
                onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 outline-none bg-gray-50/50 text-[#2B1810] font-medium" 
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#6B2E1F] uppercase tracking-wider mb-1.5">નવો પાસવર્ડ</label>
              <input 
                type="password" 
                value={authForm.password} 
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 outline-none bg-gray-50/50 text-[#2B1810]" 
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#6B2E1F] uppercase tracking-wider mb-1.5">નવો પાસવર્ડ ફરીથી લખો</label>
              <input 
                type="password" 
                value={authForm.confirmPassword} 
                onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 outline-none bg-gray-50/50 text-[#2B1810]" 
                required
              />
            </div>

            <button type="submit" className="w-full bg-[#3E1B12] hover:bg-[#6B2E1F] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition active:scale-95 duration-300 shadow-md shadow-[#3E1B12]/20 flex items-center justify-center gap-2 cursor-pointer">
              ક્રેડેન્શિયલ્સ બદલો
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
