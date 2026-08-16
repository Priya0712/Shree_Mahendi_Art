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
    { label: 'Gallery Images', value: stats.gallery, icon: Image, color: 'bg-amber-100 text-amber-700' },
    { label: 'Active Services', value: stats.services, icon: Sparkles, color: 'bg-rose-100 text-rose-700' },
    { label: 'New Inquiries', value: stats.newInquiries, icon: Inbox, color: 'bg-green-100 text-green-700' },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className={`rounded-2xl p-5 flex items-center gap-4 ${color}`}>
            <Icon size={28} />
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
