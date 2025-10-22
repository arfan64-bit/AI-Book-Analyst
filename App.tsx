
import React, { useState, useCallback } from 'react';
import { BookInput } from './components/BookInput';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { Loader } from './components/Loader';
import { BookOpenIcon, SparklesIcon } from './components/Icons';
import type { BookAnalysis } from './types';
import { generateBookAnalysis } from './services/geminiService';

export default function App() {
  const [analysis, setAnalysis] = useState<BookAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (title: string) => {
    if (!title.trim()) {
      setError('Please enter a book title.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await generateBookAnalysis(title);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate analysis. The model may be unavailable or the book is too obscure. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-4">
            <BookOpenIcon className="h-12 w-12 text-sky-400" />
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              AI Book Analyst
            </h1>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Unlock deep insights from any book. Just provide a title and let our AI generate a comprehensive analysis in seconds.
          </p>
        </header>

        <main>
          <BookInput onSubmit={handleAnalyze} isLoading={isLoading} />

          {error && (
            <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}

          {isLoading && <Loader />}
          
          {analysis && !isLoading && (
            <div className="mt-8 animate-fade-in">
                <AnalysisDisplay analysis={analysis} />
            </div>
          )}
          
          {!analysis && !isLoading && !error && (
             <div className="text-center mt-12 p-8 border-2 border-dashed border-slate-700 rounded-xl text-slate-500">
                <SparklesIcon className="h-12 w-12 mx-auto mb-4 text-slate-600"/>
                <h2 className="text-xl font-medium">Your analysis will appear here.</h2>
                <p>Ready to dive deep into your next read?</p>
             </div>
          )}
        </main>
      </div>
    </div>
  );
}
