import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ titleGujarati: '', titleEnglish: '', descriptionGujarati: '', category: '', priceNote: '', isFeatured: false });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchData = async () => {
    try {
      const [svc, cat] = await Promise.all([api.get('/services'), api.get('/categories')]);
      setServices(svc.data);
      setCategories(cat.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm({ titleGujarati: '', titleEnglish: '', descriptionGujarati: '', category: '', priceNote: '', isFeatured: false }); setImageFile(null); setPreview(null); setShowForm(true); };
  const openEdit = (s) => { setEditing(s); setForm({ ...s, category: s.category?._id || '' }); setPreview(s.image?.url || null); setShowForm(true); };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (imageFile) data.append('image', imageFile);

      if (editing) {
        await api.put(`/services/${editing._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/services', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }

      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error saving service:', error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting service:', error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Services</h1>
        <button onClick={openAdd} className="flex items-center gap-1 bg-[#6B2E1F] text-white px-4 py-2 rounded-lg text-sm">
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {services.map((s) => (
          <div key={s._id} className="bg-white rounded-xl overflow-hidden shadow-sm">
            {s.image?.url && <img src={s.image.url} alt={s.titleGujarati} className="w-full h-28 object-cover" />}
            <div className="p-3">
              <p className="text-sm font-medium truncate">{s.titleGujarati}</p>
              <div className="flex justify-between mt-2">
                <button onClick={() => openEdit(s)}><Pencil size={16} className="text-blue-600" /></button>
                <button onClick={() => handleDelete(s._id)}><Trash2 size={16} className="text-red-600" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 overflow-y-auto">
          <form onSubmit={handleSubmit} className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-6 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">{editing ? 'Edit' : 'Add'} Service</h2>
              <button type="button" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>

            {preview && <img src={preview} className="w-full h-32 object-cover rounded-lg mb-3" />}
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full mb-3 text-sm" />

            <input placeholder="Gujarati Title" value={form.titleGujarati}
              onChange={(e) => setForm({ ...form, titleGujarati: e.target.value })}
              className="w-full border rounded-lg px-4 py-3 mb-3" required />
            <input placeholder="English Title (optional)" value={form.titleEnglish}
              onChange={(e) => setForm({ ...form, titleEnglish: e.target.value })}
              className="w-full border rounded-lg px-4 py-3 mb-3" />
            <textarea placeholder="Description (Gujarati)" value={form.descriptionGujarati}
              onChange={(e) => setForm({ ...form, descriptionGujarati: e.target.value })}
              className="w-full border rounded-lg px-4 py-3 mb-3" rows={3} required />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border rounded-lg px-4 py-3 mb-3" required>
              <option value="">Select Category</option>
              {categories.map((c) => <option key={c._id} value={c._id}>{c.nameGujarati} {c.nameEnglish && `(${c.nameEnglish})`}</option>)}
            </select>
            <input placeholder="Price Note (e.g. ₹2000 થી શરૂ)" value={form.priceNote}
              onChange={(e) => setForm({ ...form, priceNote: e.target.value })}
              className="w-full border rounded-lg px-4 py-3 mb-3" />
            <label className="flex items-center gap-2 mb-4 text-sm">
              <input type="checkbox" checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
              Show on Homepage (Featured)
            </label>
            <button className="w-full bg-[#6B2E1F] text-white rounded-lg py-3 font-semibold">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
