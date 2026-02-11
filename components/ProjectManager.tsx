
import React, { useState, useRef } from 'react';
import { X, Upload, Trash2, Plus, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectManagerProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onAddProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ isOpen, onClose, projects, onAddProject, onDeleteProject }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    tags: '',
    details: ''
  });

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: Date.now().toString(),
      title: form.title,
      category: form.category,
      description: form.description,
      image: previewImage || `https://picsum.photos/seed/${Date.now()}/1200/800`,
      tags: form.tags.split(',').map(t => t.trim()),
      details: form.details
    };
    onAddProject(project);
    setIsAdding(false);
    setPreviewImage(null);
    setForm({ title: '', category: '', description: '', tags: '', details: '' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-2xl font-outfit font-bold text-slate-900">Portfolio Manager</h2>
            <p className="text-sm text-slate-500">Manage and upload your design works</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-900">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!isAdding ? (
            <div className="space-y-6">
              <button 
                onClick={() => setIsAdding(true)}
                className="w-full py-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
                  <Plus size={24} />
                </div>
                <span className="font-bold">Add New Project</span>
              </button>

              <div className="grid gap-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Existing Works ({projects.length})</h3>
                {projects.map(project => (
                  <div key={project.id} className="group p-4 bg-white border border-slate-100 rounded-2xl flex items-center space-x-4 hover:shadow-md transition-all">
                    <img src={project.image} className="w-16 h-16 rounded-xl object-cover bg-slate-100" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">{project.title}</h4>
                      <p className="text-xs text-slate-500">{project.category}</p>
                    </div>
                    <button 
                      onClick={() => onDeleteProject(project.id)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative aspect-video rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 transition-colors group"
              >
                {previewImage ? (
                  <>
                    <img src={previewImage} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-bold flex items-center"><Upload size={18} className="mr-2"/> Change File</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-slate-400">
                      <ImageIcon size={32} />
                    </div>
                    <p className="font-bold text-slate-600">Upload Project Image</p>
                    <p className="text-xs text-slate-400 mt-1">Recommended: 1200x800px (JPG, PNG)</p>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Title</label>
                  <input 
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="e.g. FinanceFlow"
                    value={form.title}
                    onChange={e => setForm({...form, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <input 
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="e.g. Mobile App"
                    value={form.category}
                    onChange={e => setForm({...form, category: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Short Description</label>
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="The objective of this project..."
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tags (comma separated)</label>
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="UI Design, Research, Prototyping"
                  value={form.tags}
                  onChange={e => setForm({...form, tags: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Details</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                  placeholder="Describe your design process, challenges, and solutions..."
                  value={form.details}
                  onChange={e => setForm({...form, details: e.target.value})}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-4 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-2 px-12 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                >
                  Publish Work
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;
