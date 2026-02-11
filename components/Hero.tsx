
import React from 'react';
import { ArrowDownRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-pink-50 rounded-full blur-3xl opacity-60"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={14} />
            <span>Available for freelance</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-outfit font-extrabold text-slate-900 leading-[1.1] mb-6">
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Digital</span> Experiences with Purpose.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl leading-relaxed">
            I'm Arham, a UI/UX Designer dedicated to bridging the gap between human needs and digital solutions through empathetic design.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="#work" 
              className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-200"
            >
              <span>View Portfolio</span>
              <ArrowDownRight size={20} className="group-hover:rotate-45 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-bold hover:border-indigo-100 hover:bg-indigo-50/30 transition-all text-center"
            >
              Let's Talk
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
            <img 
              src="https://picsum.photos/seed/arham-portrait/800/800" 
              alt="Arham - UI/UX Designer" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Floating tags/badges */}
          <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg border border-slate-50 animate-bounce">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-bold">Figma Pro</span>
            </div>
          </div>
          <div className="absolute bottom-10 -left-8 bg-white p-4 rounded-2xl shadow-lg border border-slate-50">
            <p className="text-xs text-slate-400 font-semibold mb-1 uppercase">Years Exp</p>
            <p className="text-2xl font-outfit font-black text-indigo-600">5+</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
