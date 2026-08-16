import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Plus, Pencil, Trash2, X, Star } from 'lucide-react';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ customerName: '', messageGujarati: '', rating: 5, isApproved: true });

  const fetchTestimonials = async () => {
    try {
      const { data } = await api.get('/testimonials');
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error.message);
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const openAdd = () => { setEditing(null); setForm({ customerName: '', messageGujarati: '', rating: 5, isApproved: true }); setShowForm(true); };
  const openEdit = (t) => { setEditing(t); setForm(t); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await api.put(`/testimonials/${editing._id}`, form);
      else await api.post('/testimonials', form);
      setShowForm(false);
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error.message);
    }
  };

  const toggleApproval = async (t) => {
    try {
      await api.put(`/testimonials/${t._id}`, { isApproved: !t.isApproved });
      fetchTestimonials();
    } catch (error) {
      console.error('Error toggling approval:', error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Testimonials</h1>
        <button onClick={openAdd} className="flex items-center gap-1 bg-[#6B2E1F] text-white px-4 py-2 rounded-lg text-sm">
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t._id} className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{t.customerName}</span>
                <span className="flex text-amber-400">
                  {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                    <Star key={idx} size={14} className="fill-amber-400" />
                  ))}
                </span>
              </div>
              <p className="text-sm text-gray-600">{t.messageGujarati}</p>
            </div>
            <div className="flex items-center gap-4 ml-4">
              <button 
                onClick={() => toggleApproval(t)}
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${t.isApproved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}
              >
                {t.isApproved ? 'Approved' : 'Pending'}
              </button>
              <button onClick={() => openEdit(t)}><Pencil size={18} className="text-blue-600" /></button>
              <button onClick={() => handleDelete(t._id)}><Trash2 size={18} className="text-red-600" /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-6">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">{editing ? 'Edit' : 'Add'} Testimonial</h2>
              <button type="button" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>

            <input placeholder="Customer Name" value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              className="w-full border rounded-lg px-4 py-3 mb-3" required />

            <textarea placeholder="Review Message (Gujarati)" value={form.messageGujarati}
              onChange={(e) => setForm({ ...form, messageGujarati: e.target.value })}
              className="w-full border rounded-lg px-4 py-3 mb-3" rows={3} required />

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
              <select 
                value={form.rating} 
                onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                className="w-full border rounded-lg px-4 py-3"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <label className="flex items-center gap-2 mb-4 text-sm">
              <input type="checkbox" checked={form.isApproved}
                onChange={(e) => setForm({ ...form, isApproved: e.target.checked })} />
              Approve Immediately (Show on Site)
            </label>

            <button className="w-full bg-[#6B2E1F] text-white rounded-lg py-3 font-semibold">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageTestimonials;
