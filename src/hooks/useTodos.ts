import { useState, useEffect } from 'react';
import type { Todo, FilterType } from '../types';

const STORAGE_KEY = 'todo-app-v1';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as Todo[]) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos(prev => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, completed: false },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      deleteTodo(id);
      return;
    }
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, text: trimmed } : t))
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed));
  };

  const toggleAll = () => {
    const allCompleted = todos.every(t => t.completed);
    setTodos(prev => prev.map(t => ({ ...t, completed: !allCompleted })));
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return {
    todos: filteredTodos,
    totalCount: todos.length,
    activeCount: todos.filter(t => !t.completed).length,
    completedCount: todos.filter(t => t.completed).length,
    allCompleted: todos.length > 0 && todos.every(t => t.completed),
    filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    setFilter,
  };
}
