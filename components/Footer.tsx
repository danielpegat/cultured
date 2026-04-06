export function Footer() {
  return (
    <footer className="w-full py-12 mt-20 bg-page hairline-t">
      <div className="w-full max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-[10px] uppercase tracking-[0.1em] text-stone font-body">
          © 2024 CULTURED ARCHIVE
        </div>
        <div className="flex gap-12">
          <a href="#" className="text-[10px] uppercase tracking-[0.1em] text-faded hover:text-ink transition-colors">
            Privacy
          </a>
          <a href="#" className="text-[10px] uppercase tracking-[0.1em] text-faded hover:text-ink transition-colors">
            Terms
          </a>
          <a href="#" className="text-[10px] uppercase tracking-[0.1em] text-faded hover:text-ink transition-colors">
            Contact
          </a>
          <a href="#" className="text-[10px] uppercase tracking-[0.1em] text-ink underline">
            Archive
          </a>
        </div>
      </div>
    </footer>
  );
}
