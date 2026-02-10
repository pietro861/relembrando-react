import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/posts"),
        ]);
        
        const usersData = await usersRes.json();
        const postsData = await postsRes.json();
        
        setUsers(usersData);
        setPosts(postsData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserPosts = (userId) => {
    return posts.filter(post => post.userId === userId);
  };

  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query)
    );
  });

  const filteredData = filteredUsers.map(user => {
    const userPosts = getUserPosts(user.id);
    const matchingPosts = searchQuery 
      ? userPosts.filter(post =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : userPosts;
    
    return { user, posts: matchingPosts.length > 0 ? matchingPosts : userPosts.slice(0, 3) };
  });

  return (
    <div className="app-container">
      <header className="header">
        <h1>📱 Social Hub</h1>
        <Link to="/todos" className="btn btn-primary">
          ✓ Tarefas
        </Link>
      </header>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Buscar usuários ou posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <main className="main-content">
        {loading ? (
          <div className="loading">Carregando...</div>
        ) : filteredData.length === 0 ? (
          <div className="empty-state">
            <h3>Nenhum resultado encontrado</h3>
            <p>Tente buscar por outro termo</p>
          </div>
        ) : (
          filteredData.map(({ user, posts }) => (
            <div key={user.id} className="user-card">
              <div className="user-header">
                <h2 className="user-name">👤 {user.name}</h2>
                <p className="user-username">@{user.username}</p>
                <p className="user-email">📧 {user.email}</p>
                <p className="user-company">🏢 {user.company.name}</p>
              </div>
              
              <div className="posts-section">
                <h3>📝 Posts ({posts.length})</h3>
                {posts.map(post => (
                  <div key={post.id} className="post-item">
                    <h4 className="post-title">{post.title}</h4>
                    <p className="post-body">{post.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
