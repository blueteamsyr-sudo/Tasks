
import React from 'react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  title: string;
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  emptyMessage: string;
  recentlyUpdated: Set<string>;
}

export const TaskList: React.FC<TaskListProps> = ({ title, tasks, onToggleTask, onDeleteTask, emptyMessage, recentlyUpdated }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-400 mb-4 border-b-2 border-gray-700 pb-2">{title}</h2>
      {tasks.length > 0 ? (
        <ul className="space-y-3">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
              isHighlighted={recentlyUpdated.has(task.id)}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-4">{emptyMessage}</p>
      )}
    </section>
  );
};
