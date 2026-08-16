import { useEffect, useRef, useState } from 'react';
import api from '../../services/api';
import { Save, ShieldCheck, Upload, ImageIcon } from 'lucide-react';

/* ─── Reusable image upload card with live preview ─── */
const ImageUploadCard = ({ label, hint, currentUrl, field, onUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || '');
  const [error, setError] = useState('');
  const inputRef = useRef();

  useEffect(() => { setPreview(currentUrl || ''); }, [currentUrl]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError('ફાઈલ 5MB થી મોટી ન હોવી જોઈએ'); return; }
    setError('');
    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      setPreview(base64); // instant local preview
      try {
        const { data } = await api.post('/settings/upload-image', { imageData: base64, field });
        onUploaded(field, data.url);
        setPreview(data.url);
      } catch {
        setError('અપલોડ નિષ્ફળ. ફરીથી પ્રયાસ કરો.');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-bold text-[#6B2E1F] uppercase tracking-wider">{label}</label>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className="relative w-full rounded-2xl border-2 border-dashed border-[#D4AF37]/40 overflow-hidden cursor-pointer hover:border-[#D4AF37] transition group bg-[#FFF8F0]"
        style={{ aspectRatio: '3/2' }}
      >
        {preview
          ? <img src={preview} alt={label} className="w-full h-full object-cover" />
          : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <ImageIcon size={32} className="text-[#D4AF37]/60" />
              <p className="text-xs text-[#8B6F5E] font-medium">ક્લિક કરીને ફોટો પસંદ કરો</p>
            </div>
          )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
          <Upload size={24} className="text-white" />
          <p className="text-white text-xs font-semibold">ફોટો બદલો</p>
        </div>
        {uploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#6B2E1F] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      {hint && <p className="text-[10px] text-[#8B6F5E]">{hint}</p>}
      {error && <p className="text-[10px] text-red-500 font-semibold">{error}</p>}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
};

/* ─── Main Settings Page ─── */
const Settings = () => {
  const [settings, setSettings] = useState({
    ownerName: '', whatsappNumber: '', instagramUrl: '',
    siteTitle: '', seoDescription: '',
    stat1Title: '', stat1Desc: '',
    stat2Title: '', stat2Desc: '',
    stat3Title: '', stat3Desc: '',
    mehendiImage: '', plainImage: '',
  });
  const [authForm, setAuthForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [authMessage, setAuthMessage] = useState({ text: '', type: '' });

  const fetchSettings = async () => {
    try {
      const { data } = await api.get('/settings');
      setSettings(s => ({ ...s, ...data }));
      setAuthForm(prev => ({ ...prev, username: localStorage.getItem('admin_username') || '' }));
    } catch (err) { console.error('Settings fetch error:', err.message); }
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleImageUploaded = (field, url) => setSettings(s => ({ ...s, [field]: url }));

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    try {
      await api.put('/settings', settings);
      setMessage({ text: '✅ સેટિંગ્સ સફળતાપૂર્વક સાચવવામાં આવ્યા!', type: 'success' });
      window.dispatchEvent(new Event('site-settings-updated'));
    } catch {
      setMessage({ text: '❌ સેટિંગ્સ સાચવવામાં નિષ્ફળ.', type: 'error' });
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthMessage({ text: '', type: '' });
    if (authForm.password !== authForm.confirmPassword) {
      setAuthMessage({ text: '❌ પાસવર્ડ મેળ ખાતા નથી!', type: 'error' });
      return;
    }
    try {
      const { data } = await api.put('/auth/update-credentials', {
        username: authForm.username, password: authForm.password
      });
      setAuthMessage({ text: '✅ ક્રેડેન્શિયલ્સ સફળતાપૂર્વક અપડેટ!', type: 'success' });
      localStorage.setItem('admin_username', data.admin.username);
      setAuthForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch {
      setAuthMessage({ text: '❌ અપડેટ નિષ્ફળ.', type: 'error' });
    }
  };

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 outline-none bg-gray-50/50 text-[#2B1810] font-medium";
  const labelCls = "block text-[10px] font-bold text-[#6B2E1F] uppercase tracking-wider mb-1.5";

  return (
    <div className="font-sans space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-[#6B2E1F] tracking-wide">સેટિંગ્સ</h1>
        <p className="text-xs text-[#8B6F5E] mt-1 font-semibold uppercase tracking-wider">Manage site content, slider images & admin credentials</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left panel */}
        <div className="lg:col-span-2 space-y-6">

          {/* ── All Site Images ── */}
          <div className="bg-white rounded-3xl p-6 border border-[#D4AF37]/15 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-3 flex items-center gap-2">
              <ImageIcon size={18} className="text-[#D4AF37]" />
              <h2 className="font-extrabold text-[#6B2E1F] text-lg">વેબસાઇટ ફોટા (Site Images)</h2>
            </div>
            <p className="text-xs text-[#8B6F5E]">ફોટા ઉપર ક્લિક કરીને નવો ફોટો અપલોડ કરો — Cloudinary પર auto-save થઈ જશે.</p>

            {/* Row 1: Hero + Owner Portrait */}
            <div>
              <p className="text-[10px] font-bold text-[#8B6F5E] uppercase tracking-widest mb-3">📄 Page Images</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <ImageUploadCard label="🏠 Hero Image (Home Page)" hint="Landscape photo — bridal mehendi hands" currentUrl={settings.heroImage} field="heroImage" onUploaded={handleImageUploaded} />
                <ImageUploadCard label="👤 Owner Portrait (About Page)" hint="Portrait photo of the artist" currentUrl={settings.ownerPortrait} field="ownerPortrait" onUploaded={handleImageUploaded} />
              </div>
            </div>

            {/* Row 2: Before/After Slider */}
            <div>
              <p className="text-[10px] font-bold text-[#8B6F5E] uppercase tracking-widest mb-3">🔄 Before/After Slider</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <ImageUploadCard label="🌿 Mehendi Photo (Left)" hint="Portrait — both hands with bridal mehendi" currentUrl={settings.mehendiImage} field="mehendiImage" onUploaded={handleImageUploaded} />
                <ImageUploadCard label="✋ Plain Hand Photo (Right)" hint="Plain hand without mehendi" currentUrl={settings.plainImage} field="plainImage" onUploaded={handleImageUploaded} />
              </div>
            </div>

            {/* Row 3: Cone Photos */}
            <div>
              <p className="text-[10px] font-bold text-[#8B6F5E] uppercase tracking-widest mb-3">🌿 Mehendi Cones Photos (Services Page)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <ImageUploadCard label="Shalimar Cones (Colored Pack)" hint="Shalimar brand mehendi cone photo" currentUrl={settings.coneShalimar} field="coneShalimar" onUploaded={handleImageUploaded} />
                <ImageUploadCard label="Natural Cones (Handmade)" hint="Natural henna cones — no chemicals" currentUrl={settings.coneNatural} field="coneNatural" onUploaded={handleImageUploaded} />
              </div>
            </div>
          </div>

          {/* ── Website Content ── */}
          <div className="bg-white rounded-3xl p-6 border border-[#D4AF37]/15 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
              <h2 className="font-extrabold text-[#6B2E1F] text-lg">વેબસાઇટ કન્ટેન્ટ</h2>
              <span className="text-[10px] bg-[#6B2E1F]/10 text-[#6B2E1F] font-bold px-2.5 py-1 rounded-lg uppercase">Config</span>
            </div>

            {message.text && (
              <div className={`p-4 rounded-xl text-xs font-bold border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSettingsSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>વેબસાઇટ નામ (Title)</label>
                  <input type="text" value={settings.siteTitle} onChange={e => setSettings({ ...settings, siteTitle: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>ઓનરનું નામ</label>
                  <input type="text" value={settings.ownerName} onChange={e => setSettings({ ...settings, ownerName: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>WhatsApp નંબર</label>
                  <input type="text" value={settings.whatsappNumber} onChange={e => setSettings({ ...settings, whatsappNumber: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Instagram લિંક</label>
                  <input type="text" value={settings.instagramUrl} onChange={e => setSettings({ ...settings, instagramUrl: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>SEO વર્ણન</label>
                <textarea value={settings.seoDescription} onChange={e => setSettings({ ...settings, seoDescription: e.target.value })} rows={2} className={inputCls} />
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-extrabold text-[#6B2E1F] uppercase tracking-wider mb-3">ટ્રસ્ટ આંકડા</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-50/50 rounded-2xl border border-gray-100">
                      <input type="text" placeholder={`Stat ${n} Title`} value={settings[`stat${n}Title`]} onChange={e => setSettings({ ...settings, [`stat${n}Title`]: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-[#D4AF37] outline-none" />
                      <input type="text" placeholder={`Stat ${n} Description`} value={settings[`stat${n}Desc`]} onChange={e => setSettings({ ...settings, [`stat${n}Desc`]: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-[#D4AF37] outline-none" />
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-[#6B2E1F] hover:bg-[#C1662F] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition active:scale-95 shadow-md flex items-center justify-center gap-2">
                <Save size={18} /> ફેરફારો સાચવો
              </button>
            </form>
          </div>
        </div>

        {/* Right panel: Credentials */}
        <div className="bg-white rounded-3xl p-6 border border-[#D4AF37]/15 shadow-sm space-y-6 self-start">
          <div className="border-b border-gray-100 pb-3 flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#6B2E1F]" />
            <h2 className="font-extrabold text-[#6B2E1F] text-lg">એડમિન ક્રેડેન્શિયલ્સ</h2>
          </div>
          {authMessage.text && (
            <div className={`p-4 rounded-xl text-xs font-bold border ${authMessage.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
              {authMessage.text}
            </div>
          )}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {[
              { label: 'નવું યુઝરનેમ', key: 'username', type: 'text' },
              { label: 'નવો પાસવર્ડ', key: 'password', type: 'password' },
              { label: 'પાસવર્ડ ફરીથી', key: 'confirmPassword', type: 'password' },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className={labelCls}>{label}</label>
                <input type={type} value={authForm[key]} onChange={e => setAuthForm({ ...authForm, [key]: e.target.value })} className={inputCls} required />
              </div>
            ))}
            <button type="submit" className="w-full bg-[#3E1B12] hover:bg-[#6B2E1F] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition active:scale-95 shadow-md flex items-center justify-center gap-2">
              ક્રેડેન્શિયલ્સ બદલો
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
