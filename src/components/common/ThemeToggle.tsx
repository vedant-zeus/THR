import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useWorkflowStore } from '../../store/useWorkflowStore';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useWorkflowStore();

  return (
    <button 
      className="icon-btn theme-toggle" 
      onClick={toggleTheme}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};
