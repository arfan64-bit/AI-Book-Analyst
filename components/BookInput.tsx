
import React, { useState } from 'react';
import { SearchIcon } from './Icons';

interface BookInputProps {
  onSubmit: (title: string) => void;
  isLoading: boolean;
}

export const BookInput: React.FC<BookInputProps> = ({ onSubmit, isLoading }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700 shadow-lg">
      <div className="relative w-full">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., 'The Power of Habit' by Charles Duhigg"
          className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-4 pr-12 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200"
          disabled={isLoading}
        />
        <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto flex justify-center items-center gap-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Book'}
      </button>
    </form>
  );
};
