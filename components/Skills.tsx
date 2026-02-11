
import React from 'react';
import { SKILLS } from '../constants';
import * as Icons from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-outfit font-bold text-slate-900 mt-2 mb-8">
              Technical Arsenal <br/>& Creative Skills.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              I combine research, strategy, and aesthetics to build products that not only look beautiful but perform exceptionally well in the hands of real users.
            </p>
            
            <div className="space-y-4">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-start space-x-4">
                <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
                  <Icons.Search size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">User Research</h4>
                  <p className="text-sm text-slate-500">Qualitative and quantitative data collection to inform every design decision.</p>
                </div>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-xl text-pink-600">
                  <Icons.Zap size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Rapid Prototyping</h4>
                  <p className="text-sm text-slate-500">Fast iterations from low-fidelity wireframes to high-fidelity clickable prototypes.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-50">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
              <Icons.ShieldCheck className="text-indigo-600 mr-2" />
              Proficiency Scores
            </h3>
            <div className="space-y-8">
              {SKILLS.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-slate-700">{skill.name}</span>
                    <span className="text-sm font-bold text-indigo-600">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
