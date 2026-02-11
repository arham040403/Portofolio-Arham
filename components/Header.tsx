
import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, ShieldCheck, Settings } from 'lucide-react';

interface HeaderProps {
  isAdminMode: boolean;
  onToggleAdmin: () => void;
  onOpenManager: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAdminMode, onToggleAdmin, onOpenManager }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-outfit font-bold tracking-tight text-indigo-600">
          ARHAM<span className="text-slate-900">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          {isAdminMode && (
            <button 
              onClick={onOpenManager}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold hover:bg-indigo-100 transition-all"
            >
              <Settings size={14} />
              <span>Manager</span>
            </button>
          )}

          <button 
            onClick={onToggleAdmin}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              isAdminMode 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {isAdminMode ? <ShieldCheck size={14} /> : <Shield size={14} />}
            <span>{isAdminMode ? 'Admin On' : 'Admin Mode'}</span>
          </button>

          <a 
            href="#contact" 
            className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-200"
          >
            Get in touch
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-medium text-slate-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          {isAdminMode && (
            <button 
              onClick={() => { onOpenManager(); setIsMobileMenuOpen(false); }}
              className="text-left text-lg font-medium text-indigo-600 flex items-center"
            >
              <Settings size={20} className="mr-2" /> Project Manager
            </button>
          )}
          <button 
            onClick={() => { onToggleAdmin(); setIsMobileMenuOpen(false); }}
            className="text-left text-lg font-medium text-slate-600"
          >
            {isAdminMode ? 'Disable Admin' : 'Enable Admin'}
          </button>
          <a 
            href="#contact" 
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-center font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Arham
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
