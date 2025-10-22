
import React from 'react';
import type { BookAnalysis } from '../types';
import { Section } from './Section';

interface AnalysisDisplayProps {
  analysis: BookAnalysis;
}

// Simple function to format text for copying
const formatForCopy = (data: any): string => {
    if (typeof data === 'string') {
        return data;
    }
    if (Array.isArray(data)) {
        if(data.length > 0 && typeof data[0] === 'object' && data[0] !== null && 'quote' in data[0]){
             // It's the quotes array
             return data.map(q => `"${q.quote}"\n- ${q.attribution || 'Unknown'}`).join('\n\n');
        }
        return data.map(item => `- ${item}`).join('\n');
    }
    return '';
};

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  return (
    <div className="space-y-6">
      <Section title="Detailed Summary" emoji="📘" copyText={formatForCopy(analysis.summary)}>
        <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{analysis.summary}</p>
      </Section>

      <Section title="Core Topics & Themes" emoji="💡" copyText={formatForCopy(analysis.themes)}>
        <ul className="list-disc list-inside space-y-2 text-slate-300">
          {analysis.themes.map((theme, index) => (
            <li key={index}>{theme}</li>
          ))}
        </ul>
      </Section>

      <Section title="Key Takeaways" emoji="🧠" copyText={formatForCopy(analysis.takeaways)}>
        <ul className="list-disc list-inside space-y-2 text-slate-300">
          {analysis.takeaways.map((takeaway, index) => (
            <li key={index}>{takeaway}</li>
          ))}
        </ul>
      </Section>

      <Section title="Notable Quotes" emoji="🗣️" copyText={formatForCopy(analysis.quotes)}>
        <div className="space-y-4">
          {analysis.quotes.map((q, index) => (
            <blockquote key={index} className="border-l-4 border-sky-500 pl-4 text-slate-300 italic">
              <p>"{q.quote}"</p>
              {q.attribution && <cite className="block text-right not-italic text-slate-400 mt-1">- {q.attribution}</cite>}
            </blockquote>
          ))}
        </div>
      </Section>

      <Section title="Recommendation" emoji="🎯" copyText={formatForCopy(analysis.recommendation)}>
        <p className="text-slate-300">{analysis.recommendation}</p>
      </Section>
    </div>
  );
};
