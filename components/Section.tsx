
import React from 'react';
import { CopyButton } from './CopyButton';

interface SectionProps {
  title: string;
  emoji: string;
  children: React.ReactNode;
  copyText: string;
}

export const Section: React.FC<SectionProps> = ({ title, emoji, children, copyText }) => {
  return (
    <section className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
          <span>{emoji}</span>
          <span>{title}</span>
        </h2>
        <CopyButton textToCopy={copyText} />
      </div>
      <div className="prose prose-invert max-w-none text-slate-300">
        {children}
      </div>
    </section>
  );
};
