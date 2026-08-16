import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nameGujarati: '', nameEnglish: '', slug: '' });

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const openAdd = () => { setEditing(null); setForm({ nameGujarati: '', nameEnglish: '', slug: '' }); setShowForm(true); };
  const openEdit = (cat) => { setEditing(cat); setForm(cat); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await api.put(`/categories/${editing._id}`, form);
      else await api.post('/categories', form);
      setShowForm(false);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error.message);
    }
  };

  return (
    <div className="font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#6B2E1F] tracking-wide">શ્રેણીઓ (Categories)</h1>
          <p className="text-xs text-[#8B6F5E] mt-1 font-semibold uppercase tracking-wider">Create and modify mehendi and service categories</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-1.5 bg-[#6B2E1F] hover:bg-[#C1662F] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md shadow-[#6B2E1F]/15 active:scale-95 cursor-pointer">
          <Plus size={16} /> નવી શ્રેણી ઉમેરો
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#D4AF37]/15 divide-y divide-gray-100 overflow-hidden shadow-sm">
        {categories.map((cat) => (
          <div key={cat._id} className="flex justify-between items-center p-5 hover:bg-[#FFFBF7]/40 transition">
            <div>
              <p className="font-bold text-[#2B1810] text-sm">{cat.nameGujarati}</p>
              {cat.nameEnglish && <p className="text-xs text-[#8B6F5E] mt-0.5">{cat.nameEnglish}</p>}
            </div>
            <div className="flex gap-4">
              <button onClick={() => openEdit(cat)} className="hover:scale-110 transition"><Pencil size={18} className="text-blue-600" /></button>
              <button onClick={() => handleDelete(cat._id)} className="hover:scale-110 transition"><Trash2 size={18} className="text-red-600" /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-[#D4AF37]/20">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
              <h2 className="font-extrabold text-[#6B2E1F] text-lg">{editing ? 'Edit' : 'Add'} Category</h2>
              <button type="button" onClick={() => setShowForm(false)} className="text-[#8B6F5E] hover:text-[#6B2E1F] transition"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-[#6B2E1F] uppercase tracking-wider mb-1">ગુજરાતી નામ</label>
                <input placeholder="Gujarati Name (e.g. બ્રાઇડલ મહેંદી)" value={form.nameGujarati}
                  onChange={(e) => setForm({ ...form, nameGujarati: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 outline-none bg-gray-50/50" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#6B2E1F] uppercase tracking-wider mb-1">અંગ્રેજી ટેગ (વૈકલ્પિક)</label>
                <input placeholder="English Tag (optional, e.g. Bridal Mehendi)" value={form.nameEnglish}
                  onChange={(e) => setForm({ ...form, nameEnglish: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 outline-none bg-gray-50/50" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#6B2E1F] uppercase tracking-wider mb-1">સ્લગ (Slug)</label>
                <input placeholder="Slug (e.g. bridal-mehendi)" value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 outline-none bg-gray-50/50" required />
              </div>
            </div>
            <button className="w-full mt-6 bg-[#6B2E1F] hover:bg-[#C1662F] text-white rounded-xl py-3.5 font-bold tracking-wide active:scale-95 transition shadow-md shadow-[#6B2E1F]/20 cursor-pointer text-sm">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
