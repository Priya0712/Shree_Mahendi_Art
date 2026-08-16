import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Image, Sparkles, Inbox } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({ gallery: 0, services: 0, newInquiries: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [gallery, services, inquiries] = await Promise.all([
          api.get('/gallery'), api.get('/services'), api.get('/inquiries'),
        ]);
        setStats({
          gallery: gallery.data.length,
          services: services.data.length,
          newInquiries: inquiries.data.filter((i) => i.status === 'new').length,
        });
      } catch (error) {
        console.error('Error fetching dashboard statistics:', error.message);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'ગેલેરી ઈમેજીસ (Gallery)', value: stats.gallery, icon: Image, textColor: 'text-[#D4AF37]', bgColor: 'bg-[#FFFBF2]', borderColor: 'border-[#D4AF37]/25' },
    { label: 'સેવાઓ (Active Services)', value: stats.services, icon: Sparkles, textColor: 'text-[#6B2E1F]', bgColor: 'bg-[#FFF3E0]', borderColor: 'border-[#6B2E1F]/20' },
    { label: 'નવી ઇન્ક્વાયરીઝ (New)', value: stats.newInquiries, icon: Inbox, textColor: 'text-[#C1662F]', bgColor: 'bg-[#FFF8F0]', borderColor: 'border-[#C1662F]/20' },
  ];

  return (
    <div className="font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#6B2E1F] tracking-wide">ડેશબોર્ડ (Dashboard)</h1>
        <p className="text-xs text-[#8B6F5E] mt-1 font-semibold uppercase tracking-wider">Overview of Shree Mahendi Art platform statistics</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {cards.map(({ label, value, icon: Icon, textColor, bgColor, borderColor }) => (
          <div 
            key={label} 
            className={`rounded-3xl p-6 flex items-center gap-5 bg-white border ${borderColor} shadow-sm transition duration-300 hover:shadow-md`}
          >
            <div className={`p-4 rounded-2xl ${bgColor} ${textColor}`}>
              <Icon size={26} />
            </div>
            <div>
              <p className="text-3xl font-black text-[#2B1810] leading-none">{value}</p>
              <p className="text-xs text-[#8B6F5E] font-bold mt-2 uppercase tracking-wide">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
