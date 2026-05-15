import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import type { FilterType } from './types';
import './App.css';

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'すべて' },
  { key: 'active', label: '未完了' },
  { key: 'completed', label: '完了済み' },
];

export default function App() {
  const {
    todos,
    totalCount,
    activeCount,
    completedCount,
    allCompleted,
    filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    setFilter,
  } = useTodos();

  return (
    <div className="app">
      <header>
        <h1 className="app-title">TODO</h1>
        <p className="app-subtitle">シンプルなタスク管理</p>
      </header>

      <main className="card">
        <TodoInput
          onAdd={addTodo}
          onToggleAll={toggleAll}
          totalCount={totalCount}
          allCompleted={allCompleted}
        />

        {totalCount > 0 ? (
          <>
            <ul className="todo-list">
              {todos.length > 0 ? (
                todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                ))
              ) : (
                <li className="list-empty">タスクがありません</li>
              )}
            </ul>

            <footer className="card-footer">
              <span className="item-count">
                {activeCount > 0
                  ? `${activeCount}件の未完了タスク`
                  : 'すべて完了！'}
              </span>

              <nav className="filter-nav" aria-label="フィルター">
                {FILTERS.map(({ key, label }) => (
                  <button
                    key={key}
                    className={`filter-btn ${filter === key ? 'active' : ''}`}
                    onClick={() => setFilter(key)}
                  >
                    {label}
                  </button>
                ))}
              </nav>

              {completedCount > 0 && (
                <button className="clear-btn" onClick={clearCompleted}>
                  完了済みを削除
                </button>
              )}
            </footer>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">✓</div>
            <p>タスクを追加してはじめましょう</p>
          </div>
        )}
      </main>

      <p className="hint">ダブルクリックでタスクを編集できます</p>
    </div>
  );
}
