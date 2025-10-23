
import React from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  isHighlighted?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleTask, onDeleteTask, isHighlighted }) => {
  const bgClasses = isHighlighted
    ? 'bg-sky-900 hover:bg-sky-800'
    : 'bg-gray-800 hover:bg-gray-700';

  return (
    <li className={`flex items-center justify-between p-4 rounded-lg shadow-md transition-all duration-300 ${bgClasses}`}>
      <div className="flex items-center gap-4">
        <label className="relative flex items-center justify-center cursor-pointer pt-2">
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={() => onToggleTask(task.id)}
            className="peer appearance-none h-6 w-6 border-2 border-gray-500 rounded-md checked:bg-green-500 checked:border-green-500 transition-all duration-300"
          />
           {task.isDone && (
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
           )}
        </label>
        <div className="flex flex-col">
          <span className={`text-lg ${task.isDone ? 'line-through text-gray-500' : 'text-gray-200'}`}>
            {task.text}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {task.deadline}
          </span>
        </div>
      </div>

      {!task.isDone && (
        <button
          onClick={() => onDeleteTask(task.id)}
          className="text-gray-500 hover:text-red-500 transition-colors duration-300"
          aria-label="Delete task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </li>
  );
};
