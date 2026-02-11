
import React, { useState } from 'react';
import { ArrowUpRight, Plus, X, Trash2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectGridProps {
  projects: Project[];
  isAdminMode: boolean;
  onAddProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, isAdminMode, onAddProject, onDeleteProject }) => {
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    tags: '',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title,
      category: newProject.category,
      description: newProject.description,
      image: newProject.image || `https://picsum.photos/seed/${Date.now()}/1200/800`,
      tags: newProject.tags.split(',').map(t => t.trim()),
      details: newProject.details
    };
    onAddProject(project);
    setShowModal(false);
    setNewProject({ title: '', category: '', description: '', image: '', tags: '', details: '' });
  };

  return (
    <section id="work" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-outfit font-bold text-slate-900 mt-2">Selected Works</h2>
          </div>
          <div className="flex flex-col items-end gap-4">
            <p className="text-slate-500 max-w-md text-right">
              A curated selection of digital products where I helped companies achieve their goals through intentional design.
            </p>
            {isAdminMode && (
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                <Plus size={20} />
                <span>Add New Work</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <div key={project.id} className="group relative">
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 bg-slate-100">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                    <ArrowUpRight className="text-slate-900" size={32} />
                  </div>
                </div>
                
                {isAdminMode && (
                  <button 
                    onClick={() => onDeleteProject(project.id)}
                    className="absolute top-6 right-6 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              
              <div className="flex justify-between items-start px-2">
                <div>
                  <div className="flex space-x-2 mb-2">
                    {project.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-outfit font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 mt-1">{project.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 md:p-10 relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-3xl font-outfit font-bold text-slate-900 mb-8">Add New Project</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Title</label>
                  <input 
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    placeholder="e.g. FinanceFlow"
                    value={newProject.title}
                    onChange={e => setNewProject({...newProject, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Category</label>
                  <input 
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    placeholder="e.g. Mobile App"
                    value={newProject.category}
                    onChange={e => setNewProject({...newProject, category: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Short Description</label>
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  placeholder="What is this project about?"
                  value={newProject.description}
                  onChange={e => setNewProject({...newProject, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Tags (comma separated)</label>
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  placeholder="UI Design, Figma, Research"
                  value={newProject.tags}
                  onChange={e => setNewProject({...newProject, tags: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Detail Info</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
                  placeholder="Tell more about the design process..."
                  value={newProject.details}
                  onChange={e => setNewProject({...newProject, details: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 mt-4"
              >
                Publish Project
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectGrid;
