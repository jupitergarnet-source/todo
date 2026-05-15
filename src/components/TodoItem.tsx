import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const startEdit = () => {
    setDraft(todo.text);
    setEditing(true);
  };

  const commitEdit = () => {
    setEditing(false);
    onEdit(todo.id, draft);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') {
      setDraft(todo.text);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <li className="todo-item editing">
        <input
          ref={inputRef}
          className="edit-input"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitEdit}
        />
      </li>
    );
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label className="check-label">
        <input
          type="checkbox"
          className="check-input"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="checkmark" />
      </label>
      <span className="todo-text" onDoubleClick={startEdit}>
        {todo.text}
      </span>
      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="削除"
        title="削除"
      >
        ×
      </button>
    </li>
  );
}
