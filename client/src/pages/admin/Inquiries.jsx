import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Phone, MessageCircle } from 'lucide-react';

const statusColors = { 
  new: 'bg-[#FFF3E0] text-[#C1662F] border border-[#C1662F]/20', 
  contacted: 'bg-[#FFF8F0] text-[#D4AF37] border border-[#D4AF37]/20', 
  closed: 'bg-gray-100 text-gray-500 border border-gray-200' 
};

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
    <div className="font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#6B2E1F] tracking-wide">બુકિંગ ઇન્ક્વાયરીઝ (Inquiries)</h1>
          <p className="text-xs text-[#8B6F5E] mt-1 font-semibold uppercase tracking-wider">Manage customer booking requests and statuses</p>
        </div>
        <div className="bg-[#6B2E1F]/10 text-[#6B2E1F] text-xs font-bold px-3 py-1.5 rounded-xl border border-[#6B2E1F]/20">
          કુલ: {inquiries.length}
        </div>
      </div>
      
      {inquiries.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
          <p className="text-gray-400 text-sm font-medium">હજુ સુધી કોઈ ઇન્ક્વાયરી આવેલ નથી.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inquiries.map((i) => {
            const isNew = i.status === 'new';
            const isContacted = i.status === 'contacted';
            return (
              <div 
                key={i._id} 
                className={`bg-white rounded-3xl p-5 shadow-sm border transition duration-300 hover:shadow-md ${
                  isNew 
                    ? 'border-l-4 border-l-[#C1662F] border-gray-100' 
                    : isContacted 
                      ? 'border-l-4 border-l-[#D4AF37] border-gray-100' 
                      : 'border-l-4 border-l-gray-300 border-gray-100'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-[#2B1810] text-base">{i.name}</h3>
                    <p className="text-xs text-[#8B6F5E] font-medium mt-0.5">{i.phone}</p>
                  </div>
                  <select 
                    value={i.status} 
                    onChange={(e) => updateStatus(i._id, e.target.value)}
                    className={`text-xs font-bold px-3 py-1 rounded-full outline-none cursor-pointer shadow-sm transition ${statusColors[i.status] || ''}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                
                <div className="space-y-2 bg-[#FFFBF7]/60 rounded-2xl p-3 border border-[#D4AF37]/10 mb-4 text-xs">
                  {i.serviceInterested && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-[#8B6F5E] font-semibold">સેવા (Service):</span>
                      <span className="font-bold text-[#6B2E1F]">{i.serviceInterested}</span>
                    </div>
                  )}
                  {i.peopleCount && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-[#8B6F5E] font-semibold">લોકો (People):</span>
                      <span className="font-bold text-[#6B2E1F] bg-[#6B2E1F]/10 px-2 py-0.5 rounded-md">{i.peopleCount} વ્યક્તિ</span>
                    </div>
                  )}
                  {i.eventDate && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-[#8B6F5E] font-semibold">તારીખ (Date):</span>
                      <span className="font-bold text-[#2B1810]">{new Date(i.eventDate).toLocaleDateString('gu-IN')}</span>
                    </div>
                  )}
                  {i.message && (
                    <div className="pt-1.5 border-t border-gray-100">
                      <span className="text-[#8B6F5E] font-semibold block mb-0.5">સંદેશો (Message):</span>
                      <p className="text-[#4A2E22] font-medium leading-relaxed italic bg-white p-2 rounded-xl border border-gray-50">{i.message}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <a 
                    href={`tel:${i.phone}`} 
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold bg-[#EBF5FF] text-[#1E40AF] px-4 py-2.5 rounded-xl hover:bg-[#DBEAFE] active:scale-95 transition duration-300"
                  >
                    <Phone size={14} /> Call
                  </a>
                  <a 
                    href={`https://wa.me/91${i.phone}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-grow-[1.5] flex items-center justify-center gap-1.5 text-xs font-bold bg-[#DCFCE7] text-[#15803D] px-4 py-2.5 rounded-xl hover:bg-[#D1FAE5] active:scale-95 transition duration-300"
                  >
                    <MessageCircle size={14} /> WhatsApp Chat
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Inquiries;
