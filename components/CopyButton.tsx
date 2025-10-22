
import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon } from './Icons';

interface CopyButtonProps {
  textToCopy: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors duration-200"
      aria-label="Copy text"
    >
      {copied ? (
        <>
          <CheckIcon className="h-4 w-4 text-green-400" />
          <span className="text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <ClipboardIcon className="h-4 w-4" />
          <span>Copy Text</span>
        </>
      )}
    </button>
  );
};
