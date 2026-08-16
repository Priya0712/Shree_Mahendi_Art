const QuickBookBar = () => (
  <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#D4AF37]/30 p-3 flex gap-2 md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
    <a href="tel:8799008221" className="flex-1 text-center border-2 border-[#6B2E1F] text-[#6B2E1F] rounded-full py-2.5 text-sm font-semibold active:scale-95 transition">
      કૉલ કરો
    </a>
    <a href="https://wa.me/918799008221?text=નમસ્તે%2C%20મારે%20મહેંદી%20બુકિંગ%20વિશે%20જાણવું%20છે" target="_blank" rel="noreferrer"
      className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] text-white rounded-full py-2.5 text-sm font-semibold active:scale-95 transition hover:bg-[#20ba59]">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
        <path d="M12.031 2C6.479 2 2 6.48 2 12.03c0 1.91.53 3.69 1.44 5.21L2 22l4.9-1.39c1.47.8 3.14 1.25 4.93 1.25 5.56 0 10.04-4.48 10.04-10.03C21.87 6.5 17.59 2 12.03 2zm4.58 13.9c-.27.8-1.57 1.47-2.18 1.54-.53.07-1.22.1-3.5-1.12-2.92-1.56-4.81-4.52-4.96-4.71-.14-.2-1.25-1.66-1.25-3.17s.78-2.27 1.05-2.54c.27-.27.6-.34.8-.34.2 0 .4.01.57.01.2 0 .44-.07.7.55.27.63.92 2.27 1 2.45.1.18.17.4.03.67-.14.27-.3.44-.54.73-.24.3-.5.67-.72.9-.24.25-.5.53-.2.98.27.46 1.22 2.01 2.62 3.26 1.8 1.6 3.32 2.1 3.79 2.3.47.2.74.17.92-.02.26-.27 1.09-1.28 1.39-1.72.3-.44.6-.37.94-.24.34.14 2.16 1 2.53 1.2.37.18.6.27.7.46.09.2.09 1.15-.18 1.95z" />
      </svg>
      બુક કરો
    </a>
  </div>
);

export default QuickBookBar;
