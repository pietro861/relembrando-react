import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MeterGroup } from 'primereact/metergroup';
        

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todosRes, usersRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/todos"),
          fetch("https://jsonplaceholder.typicode.com/users"),
        ]);
        
        const todosData = await todosRes.json();
        const usersData = await usersRes.json();
        
        setTodos(todosData);
        setUsers(usersData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const getUserTodos = (userId) => {
    const userTodos = todos.filter(todo => todo.userId === userId);
    if (filter === "completed") return userTodos.filter(t => t.completed);
    if (filter === "pending") return userTodos.filter(t => !t.completed);
    return userTodos;
  };

  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = todos.filter(t => !t.completed).length;
  
  return (
    <div className="app-container">
      <header className="todos-header">
        <Link to="/" className="btn btn-secondary">
          ← Voltar
        </Link>
        <h1>✓ Lista de Tarefas</h1>
      </header>
    

      <div className="todos-stats">
        <div className="stat-card total">
          <p className="stat-label">Total</p>
          <p className="stat-value">{todos.length}</p>
        </div>
        <div className="stat-card completed">
          <p className="stat-label">Concluídas</p>
          <p className="stat-value">{completedCount}</p>
        </div>
        <div className="stat-card pending">
          <p className="stat-label">Pendentes</p>
          <p className="stat-value">{pendingCount}</p>
        </div>
      </div>

      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          Todas
        </button>
        <button
          className={`filter-tab ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Concluídas
        </button>
        <button
          className={`filter-tab ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pendentes
        </button>
      </div>

      <main className="main-content">
        {loading ? (
          <div className="loading">Carregando...</div>
        ) : (
          users.map(user => {
            const userTodos = getUserTodos(user.id);
            if (userTodos.length === 0) return null;

            const allUserTodos = todos.filter(t => t.userId === user.id);
            const completed = allUserTodos.filter(t => t.completed).length;
            const total = allUserTodos.length;
            const percentage = Math.round((completed / total) * 100);
            const meterValues = [
                  { label: 'Concluídas', value: completed, color: '#34d399' },
                  { label: 'Pendentes', value: total - completed, color: '#f87171' }
];

            return (
              <div key={user.id} className="todo-card">
                <div className="todo-card-header">
                  <MeterGroup values={meterValues} />
                  <div>
                    <h2 className="user-name">👤 {user.name}</h2>
                    <p className="user-username">@{user.username}</p>
                  </div>
                  <div className="progress-info">
                    <p className="progress-percentage">{percentage}%</p>
                    <p className="progress-text">{completed}/{total} concluídas</p>
                  </div>
                </div>

                <div className="todo-list">
                  {userTodos.map(todo => (
                    <div
                      key={todo.id}
                      className={`todo-item ${todo.completed ? "completed" : ""}`}
                    >
                      <input
                        type="checkbox"
                        className="todo-checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                      />
                      <p className={`todo-text ${todo.completed ? "completed" : ""}`}>
                        {todo.title}
                      </p>
                      {todo.completed && (
                        <span className="todo-badge">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}
