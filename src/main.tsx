import React, { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Page, ThemeProvider, ThemeToggle } from './theme';
import { loadTodos, type Todo } from './storage';
import './style.css';

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch {
      console.warn('任务暂时只能保存在当前页面');
    }
  }, [todos]);

  const [draft, setDraft] = useState('');
  return <Page><section><header><h1>我的待办清单</h1><ThemeToggle /></header>
    <form onSubmit={event => {
      event.preventDefault();
      const text = draft.trim();
      if (!text) return;
      const item = { id: Date.now(), text, completed: false };
      setTodos(list => [...list, item]);
      setDraft('');
    }}><input aria-label="新任务" placeholder="写下要做的事" value={draft}
      onChange={event => setDraft(event.target.value)} /><button>添加任务</button></form>
    <h2>任务列表 <small>{todos.filter(t => t.completed).length} / {todos.length} 已完成</small></h2>
    {todos.length === 0 && <p>还没有任务，添加第一项吧。</p>}
    <ul>{todos.map(t => <li key={t.id}><label><input type="checkbox" checked={t.completed}
      onChange={() => setTodos(list => list.map(item => item.id === t.id
        ? { ...item, completed: !item.completed } : item))} /><span>{t.text}</span></label>
      <button onClick={() => setTodos(list => list.filter(item => item.id !== t.id))}>删除</button></li>)}</ul>
  </section></Page>;
}
createRoot(document.getElementById('root')!).render(
  <StrictMode><ThemeProvider><TodoApp /></ThemeProvider></StrictMode>
);
