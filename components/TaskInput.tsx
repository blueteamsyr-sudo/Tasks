
import React, { useState } from 'react';

interface TaskInputProps {
  onAddTask: (text: string, deadline: string) => void;
  texts: {
    addTaskPlaceholder: string;
    addButton: string;
    addTaskDeadlinePlaceholder: string;
  };
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, texts }) => {
  const [inputText, setInputText] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && deadline) {
      onAddTask(inputText.trim(), deadline);
      setInputText('');
      setDeadline('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={texts.addTaskPlaceholder}
        className="flex-grow bg-gray-800 border-2 border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 transition-colors duration-300"
        required
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="bg-gray-800 border-2 border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 transition-colors duration-300 text-gray-400"
        aria-label={texts.addTaskDeadlinePlaceholder}
        required
      />
      <button
        type="submit"
        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!inputText.trim() || !deadline}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rtl:ml-2 ltr:mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        {texts.addButton}
      </button>
    </form>
  );
};