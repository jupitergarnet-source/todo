import { useState, type KeyboardEvent } from 'react';

interface Props {
  onAdd: (text: string) => void;
  onToggleAll: () => void;
  totalCount: number;
  allCompleted: boolean;
}

export function TodoInput({ onAdd, onToggleAll, totalCount, allCompleted }: Props) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAdd(value);
      setValue('');
    }
  };

  return (
    <div className="input-row">
      {totalCount > 0 && (
        <button
          className={`toggle-all-btn ${allCompleted ? 'all-completed' : ''}`}
          onClick={onToggleAll}
          title="すべて完了/未完了に切り替え"
          aria-label="すべて完了/未完了に切り替え"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
      <input
        className="todo-input"
        type="text"
        placeholder="タスクを入力して Enter で追加..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
}
