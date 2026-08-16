const PageHeader = ({ title, subtitle }) => (
  <div className="bg-gradient-to-b from-[#FFF3E0] to-[#FFF8F0] px-4 py-10 text-center border-b border-[#D4AF37]/20">
    <h1 className="text-2xl sm:text-3xl font-bold text-[#6B2E1F]">{title}</h1>
    {subtitle && <p className="text-[#4A2E22] text-sm mt-2 max-w-md mx-auto">{subtitle}</p>}
  </div>
);

export default PageHeader;
