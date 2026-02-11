import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const INITIAL_POSTS = 3;
const POSTS_STEP = 3;

export default function Home() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [visiblePostsByUser, setVisiblePostsByUser] = useState({});

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
    return posts.filter((post) => post.userId === userId);
  };

  const getVisibleCount = (userId) => {
    return visiblePostsByUser[userId] ?? INITIAL_POSTS;
  };

  const showMorePosts = (userId) => {
    setVisiblePostsByUser((prev) => ({
      ...prev,
      [userId]: (prev[userId] ?? INITIAL_POSTS) + POSTS_STEP,
    }));
  };

  const query = searchQuery.trim().toLowerCase();

  const filteredData = users
    .map((user) => {
      const userPosts = getUserPosts(user.id);

      const userMatches =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query);

      const matchingPosts = query
        ? userPosts.filter(
            (post) =>
              post.title.toLowerCase().includes(query) ||
              post.body.toLowerCase().includes(query)
          )
        : userPosts;

      if (query && !userMatches && matchingPosts.length === 0) {
        return null;
      }
      
      // se usuário bate na busca, mas nenhum post bate, mostra os 3 primeiros dele.
      const postsToRender =
        query && userMatches && matchingPosts.length === 0
          ? userPosts.slice(0, INITIAL_POSTS)
          : matchingPosts;

      const visibleCount = getVisibleCount(user.id);
      const visiblePosts = postsToRender.slice(0, visibleCount);
      const hasMore = visibleCount < postsToRender.length;

      return {
        user,
        posts: visiblePosts,
        totalPosts: postsToRender.length,
        hasMore,
      };
    })
    .filter(Boolean);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Social Hub</h1>
        <Link to="/todos" className="btn btn-primary">
          Tarefas
        </Link>
        <Link to="/sobre" className="btn btn-secondary">
          Sobre
        </Link>
      </header>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar usuários ou posts..."
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
          filteredData.map(({ user, posts, totalPosts, hasMore }) => (
            <div key={user.id} className="user-card">
              <div className="user-header">
                <h2 className="user-name">{user.name}</h2>
                <p className="user-username">@{user.username}</p>
                <p className="user-email">{user.email}</p>
                <p className="user-company">{user.company.name}</p>
              </div>

              <div className="posts-section">
                <h3>
                  Posts ({posts.length}/{totalPosts})
                </h3>

                {posts.map((post) => (
                  <div key={post.id} className="post-item">
                    <h4 className="post-title">{post.title}</h4>
                    <p className="post-body">{post.body}</p>
                  </div>
                ))}

                {hasMore && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => showMorePosts(user.id)}
                  >
                    Mostrar mais
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
