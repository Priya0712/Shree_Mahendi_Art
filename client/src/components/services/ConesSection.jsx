import { optimizedUrl } from '../../utils/cloudinaryUrl';

const WhatsAppIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 448 512" width={size} height={size} fill="currentColor">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

/* Real cone photos always shown — static assets from your own photos */
const STATIC_CONES = [
  {
    img: '/images/cones-shalimar.jpg',
    title: 'Shalimar Mahendi Cones',
    subtitle: 'Colored Pack — Premium Quality',
  },
  {
    img: '/images/cones-natural.jpg',
    title: 'Natural Mehendi Cones',
    subtitle: 'Handmade — Pure Henna — No Chemicals',
    objectPos: 'object-top',
  },
];

const ConesSection = ({ cones = [] }) => (
  <section className="bg-[#FFF3E0] py-10 mt-6">
    <div className="max-w-6xl mx-auto px-4">

      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#6B2E1F] inline-block border-b-2 border-[#D4AF37] pb-1">
          🌿 અમારા મહેંદી કોન્સ
        </h2>
        <p className="text-[#4A2E22] text-sm mt-2">100% Natural — No Chemicals — Best Quality</p>
      </div>

      {/* Static photos from your real cones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {STATIC_CONES.map(({ img, title, subtitle, objectPos = 'object-center' }) => (
          <div key={title} className="rounded-3xl overflow-hidden shadow-md border border-[#D4AF37]/20 group">
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img
                src={img}
                alt={title}
                className={`w-full h-full object-cover ${objectPos} group-hover:scale-105 transition duration-500`}
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#6B2E1F]/85 to-transparent px-4 py-4">
                <p className="text-white text-sm font-bold">{title}</p>
                <p className="text-[#D4AF37] text-xs mt-0.5">{subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DB-driven cones (from admin panel) — shown if any exist */}
      {cones.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {cones.map((c) => (
            <div key={c._id} className="bg-white rounded-2xl p-3 shadow-sm text-center">
              {c.image?.url && (
                <img
                  src={optimizedUrl(c.image.url, 300)}
                  alt={c.titleGujarati}
                  className="w-full h-24 object-cover rounded-xl mb-2"
                  loading="lazy"
                />
              )}
              <p className="text-sm font-medium text-[#2B1810]">{c.titleGujarati}</p>
            </div>
          ))}
        </div>
      )}

      {/* WhatsApp CTA */}
      <div className="text-center">
        <a
          href="https://wa.me/918799008221?text=નમસ્તે,%20મારે%20મહેંદી%20કોન%20ઓર્ડર%20કરવા%20છે"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-full font-semibold text-sm transition active:scale-95 shadow-md"
        >
          <WhatsAppIcon size={18} /> ઓર્ડર માટે WhatsApp કરો
        </a>
      </div>
    </div>
  </section>
);

export default ConesSection;
