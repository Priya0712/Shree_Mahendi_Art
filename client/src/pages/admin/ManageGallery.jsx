import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Plus, Trash2, Star, X } from 'lucide-react';

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState('');
  const [caption, setCaption] = useState('');

  const fetchData = async () => {
    try {
      const [img, cat] = await Promise.all([api.get('/gallery'), api.get('/categories')]);
      setImages(img.data);
      setCategories(cat.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  useEffect(() => { fetchData(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      files.forEach((f) => data.append('images', f));
      data.append('category', category);
      data.append('captionGujarati', caption);
      await api.post('/gallery', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setShowForm(false);
      setFiles([]);
      setCaption('');
      fetchData();
    } catch (error) {
      console.error('Error uploading images:', error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting image:', error.message);
    }
  };

  const toggleFeatured = async (img) => {
    try {
      await api.put(`/gallery/${img._id}`, { isFeatured: !img.isFeatured });
      fetchData();
    } catch (error) {
      console.error('Error updating featured state:', error.message);
    }
  };

  const filtered = activeCategory === 'all' 
    ? images 
    : images.filter((i) => i.category?._id === activeCategory);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Gallery</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1 bg-[#6B2E1F] text-white px-4 py-2 rounded-lg text-sm">
          <Plus size={16} /> Upload
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto mb-4 pb-1">
        <button onClick={() => setActiveCategory('all')} className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${activeCategory === 'all' ? 'bg-[#6B2E1F] text-white' : 'bg-gray-100'}`}>All</button>
        {categories.map((c) => (
          <button key={c._id} onClick={() => setActiveCategory(c._id)}
            className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${activeCategory === c._id ? 'bg-[#6B2E1F] text-white' : 'bg-gray-100'}`}>
            {c.nameGujarati}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((img) => (
          <div key={img._id} className="relative rounded-xl overflow-hidden group">
            {img.image?.url && <img src={img.image.url} className="w-full h-32 object-cover" />}
            <div className="absolute top-1 right-1 flex gap-1">
              <button onClick={() => toggleFeatured(img)} className="bg-white/90 p-1.5 rounded-full">
                <Star size={14} className={img.isFeatured ? 'fill-amber-400 text-amber-400' : 'text-gray-500'} />
              </button>
              <button onClick={() => handleDelete(img._id)} className="bg-white/90 p-1.5 rounded-full">
                <Trash2 size={14} className="text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50">
          <form onSubmit={handleUpload} className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-6">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">Upload Images</h2>
              <button type="button" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <input type="file" accept="image/*" multiple onChange={(e) => setFiles([...e.target.files])} className="w-full mb-3 text-sm" required />
            <p className="text-xs text-gray-500 mb-3">{files.length} file(s) selected</p>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded-lg px-4 py-3 mb-3" required>
              <option value="">Select Category</option>
              {categories.map((c) => <option key={c._id} value={c._id}>{c.nameGujarati}</option>)}
            </select>
            <input placeholder="Caption (optional)" value={caption} onChange={(e) => setCaption(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-4" />
            <button className="w-full bg-[#6B2E1F] text-white rounded-lg py-3 font-semibold">Upload</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
