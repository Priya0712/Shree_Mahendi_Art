import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Phone, MessageCircle } from 'lucide-react';

const statusColors = { new: 'bg-green-100 text-green-700', contacted: 'bg-amber-100 text-amber-700', closed: 'bg-gray-100 text-gray-500' };

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await api.get('/inquiries');
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error.message);
    }
  };
  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/inquiries/${id}/status`, { status });
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error.message);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Inquiries</h1>
      <div className="space-y-3">
        {inquiries.map((i) => (
          <div key={i._id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{i.name}</p>
                <p className="text-sm text-gray-500">{i.phone}</p>
                {i.serviceInterested && <p className="text-sm text-gray-600 mt-1"><strong>સેવા:</strong> {i.serviceInterested}</p>}
                {i.peopleCount && <p className="text-sm text-gray-600 mt-1"><strong>લોકો:</strong> {i.peopleCount}</p>}
                {i.eventDate && <p className="text-sm text-gray-600 mt-1"><strong>તારીખ:</strong> {new Date(i.eventDate).toLocaleDateString('gu-IN')}</p>}
                {i.message && <p className="text-sm text-gray-600 mt-1"><strong>સંદેશો:</strong> {i.message}</p>}
              </div>
              <select value={i.status} onChange={(e) => updateStatus(i._id, e.target.value)}
                className={`text-xs px-2 py-1 rounded-full border-none ${statusColors[i.status] || ''}`}>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="flex gap-3 mt-3">
              <a href={`tel:${i.phone}`} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full">
                <Phone size={14} /> Call
              </a>
              <a href={`https://wa.me/91${i.phone}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-1 text-xs bg-green-50 text-green-600 px-3 py-1.5 rounded-full">
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inquiries;
