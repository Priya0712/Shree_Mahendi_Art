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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Categories</h1>
        <button onClick={openAdd} className="flex items-center gap-1 bg-[#6B2E1F] text-white px-4 py-2 rounded-lg text-sm">
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="bg-white rounded-xl divide-y">
        {categories.map((cat) => (
          <div key={cat._id} className="flex justify-between items-center p-4">
            <div>
              <p className="font-medium">{cat.nameGujarati}</p>
              {cat.nameEnglish && <p className="text-xs text-gray-500">{cat.nameEnglish}</p>}
            </div>
            <div className="flex gap-3">
              <button onClick={() => openEdit(cat)}><Pencil size={18} className="text-blue-600" /></button>
              <button onClick={() => handleDelete(cat._id)}><Trash2 size={18} className="text-red-600" /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-6">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">{editing ? 'Edit' : 'Add'} Category</h2>
              <button type="button" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <input placeholder="Gujarati Name (e.g. બ્રાઇડલ મહેંદી)" value={form.nameGujarati}
              onChange={(e) => setForm({ ...form, nameGujarati: e.target.value })}
              className="w-full border rounded-lg px-4 py-3 mb-3" required />
            <input placeholder="English Tag (optional, e.g. Bridal Mehendi)" value={form.nameEnglish}
              onChange={(e) => setForm({ ...form, nameEnglish: e.target.value })}
              className="w-full border rounded-lg px-4 py-3 mb-3" />
            <input placeholder="Slug (e.g. bridal-mehendi)" value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full border rounded-lg px-4 py-3 mb-4" required />
            <button className="w-full bg-[#6B2E1F] text-white rounded-lg py-3 font-semibold">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
