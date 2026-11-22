export type Todo = { id: number; text: string; completed: boolean };

function isTodo(item: unknown): item is Todo {
  return typeof item === 'object' && item !== null
    && 'id' in item && typeof item.id === 'number'
    && 'text' in item && typeof item.text === 'string'
    && 'completed' in item && typeof item.completed === 'boolean';
}

export function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem('todos');
    if (raw === null) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isTodo) : [];
  } catch {
    return [];
  }
}
