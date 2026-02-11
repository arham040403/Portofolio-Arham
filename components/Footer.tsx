
import React from 'react';
import { Mail, Linkedin, Twitter, Instagram, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-slate-900 text-white pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 mb-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-outfit font-bold mb-8">
              Let's create something <span className="text-indigo-400 italic">extraordinary</span> together.
            </h2>
            <div className="flex flex-col space-y-6">
              <a 
                href="mailto:hello@arham.design" 
                className="text-2xl md:text-3xl font-medium hover:text-indigo-400 transition-colors underline underline-offset-8 decoration-indigo-500/30"
              >
                arham@design.portfolio
              </a>
              <div className="flex space-x-6">
                {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-indigo-600 p-8 md:p-12 rounded-[2rem] relative z-10">
              <h3 className="text-2xl font-bold mb-4">Newsletter</h3>
              <p className="text-indigo-100 mb-8">Receive design insights and project updates directly in your inbox.</p>
              <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:bg-white/20 transition-all"
                />
                <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                  Join
                </button>
              </form>
            </div>
            {/* Background pattern */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full pointer-events-none"></div>
          </div>
        </div>

        <hr className="border-white/10 mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Arham UI/UX Design. Built with passion and code.
          </p>
          
          <div className="flex items-center space-x-8">
            <button 
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors group"
            >
              <span className="text-sm font-bold">Back to top</span>
              <div className="p-2 rounded-full border border-slate-700 group-hover:border-slate-500">
                <ArrowUp size={16} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
