import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { Task, Language } from './types';
import { UI_TEXT } from './constants';

const TASKS_STORAGE_KEY = 'adam-restaurant-tasks';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
      if (storedTasks) {
        // FIX: Use type assertion for JSON.parse to ensure type safety.
        return JSON.parse(storedTasks) as Task[];
      }
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
    }
    // Default tasks if localStorage is empty or parsing fails
    const defaultTasks = [
      { id: '1', text: 'تحضير قائمة الطعام الجديدة', isDone: true, deadline: '2024-08-01' },
      { id: '2', text: 'شراء مكونات للوصفات', isDone: false, deadline: '2024-08-10' },
      { id: '3', text: 'تنظيف المطبخ الرئيسي', isDone: false, deadline: '2024-08-15' },
    ];
    // Also save default tasks to localStorage
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(defaultTasks));
    return defaultTasks;
  });
  const [language, setLanguage] = useState<Language>(Language.AR);
  const [recentlyUpdated, setRecentlyUpdated] = useState<Set<string>>(new Set());

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === Language.AR ? 'rtl' : 'ltr';
  }, [language]);

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage", error);
    }
  }, [tasks]);

  // Listen for storage changes from other tabs to sync state
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === TASKS_STORAGE_KEY && event.newValue) {
        try {
          // FIX: Use type assertion for JSON.parse to ensure type safety.
          const newTasks = JSON.parse(event.newValue) as Task[];
          const oldTasksById = new Map(tasks.map(t => [t.id, t]));
          const updatedIds = new Set<string>();

          newTasks.forEach(newTask => {
            const oldTask = oldTasksById.get(newTask.id);
            // Highlight if task is new or its status has changed
            if (!oldTask || oldTask.isDone !== newTask.isDone) {
              updatedIds.add(newTask.id);
            }
          });

          if (updatedIds.size > 0) {
            setRecentlyUpdated(updatedIds);
            // Clear highlights after animation duration
            setTimeout(() => {
              setRecentlyUpdated(new Set());
            }, 2000);
          }
          
          setTasks(newTasks);
        } catch (error) {
          console.error("Failed to parse tasks from storage event", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [tasks]);

  const handleAddTask = (text: string, deadline: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      isDone: false,
      deadline,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isDone: !task.isDone } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const pendingTasks = tasks.filter(task => !task.isDone);
  const completedTasks = tasks.filter(task => task.isDone);
  const texts = UI_TEXT[language];

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8 max-w-3xl">
        <Header 
          language={language}
          setLanguage={setLanguage}
          texts={texts}
        />
        <main className="mt-8">
          <TaskInput onAddTask={handleAddTask} texts={texts} />
          <div className="mt-8 grid gap-8">
            <TaskList 
              title={texts.pendingTasks}
              tasks={pendingTasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              emptyMessage={texts.noPendingTasks}
              recentlyUpdated={recentlyUpdated}
            />
            <TaskList
              title={texts.completedTasks}
              tasks={completedTasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              emptyMessage={texts.noCompletedTasks}
              recentlyUpdated={recentlyUpdated}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
