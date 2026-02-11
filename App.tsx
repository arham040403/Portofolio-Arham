
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import Skills from './components/Skills';
import Footer from './components/Footer';
import PortfolioChat from './components/PortfolioChat';
import ProjectManager from './components/ProjectManager';
import { PROJECTS as INITIAL_PROJECTS } from './constants';
import { Project } from './types';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  // Load projects from localStorage or use initial data
  useEffect(() => {
    const savedProjects = localStorage.getItem('arham_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(INITIAL_PROJECTS);
    }
  }, []);

  const addProject = (newProject: Project) => {
    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    localStorage.setItem('arham_projects', JSON.stringify(updatedProjects));
  };

  const deleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to remove this project from your portfolio?')) {
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
      localStorage.setItem('arham_projects', JSON.stringify(updatedProjects));
    }
  };

  const toggleAdminMode = () => setIsAdminMode(!isAdminMode);

  return (
    <div className="min-h-screen selection:bg-indigo-500 selection:text-white">
      <Header 
        isAdminMode={isAdminMode} 
        onToggleAdmin={toggleAdminMode} 
        onOpenManager={() => setIsManagerOpen(true)}
      />
      <main>
        <Hero />
        <ProjectGrid 
          projects={projects} 
          isAdminMode={isAdminMode} 
          onAddProject={addProject}
          onDeleteProject={deleteProject}
        />
        <Skills />
        {/* Visual Divider */}
        <div className="py-24 bg-white flex flex-col items-center">
            <div className="h-px w-32 bg-indigo-100 mb-8"></div>
            <p className="text-slate-400 font-medium italic">"Design is not just what it looks like and feels like. Design is how it works."</p>
        </div>
      </main>
      <Footer />
      <PortfolioChat projects={projects} />
      
      <ProjectManager 
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        projects={projects}
        onAddProject={addProject}
        onDeleteProject={deleteProject}
      />
    </div>
  );
};

export default App;
