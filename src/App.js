import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import PostList from "./components/PostList";
import Navbar from "./components/Navbar";
import "./styles.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showRegister, setShowRegister] = useState(false);

  // Load posts from localStorage
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  // Save posts to localStorage
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleRegister = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleAddPost = (text) => {
    if (text.trim() === "") return; // Pastikan teks tidak kosong
    const newPost = {
      id: Date.now(),
      text,
      author: currentUser.username,
      profileImage: currentUser.profileImage,
      likes: [],
    };
    setPosts([...posts, newPost]); // Tambahkan postingan baru ke akhir array
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes.includes(currentUser.username)
                ? post.likes.filter((user) => user !== currentUser.username)
                : [...post.likes, currentUser.username],
            }
          : post
      )
    );
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId)); // Hapus postingan berdasarkan postId
  };

  const handleEdit = (postId, newText) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, text: newText } : post
      )
    );
  };

  return (
    <div className="app">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      {currentUser ? (
        <>
          <div className="new-post">
            <textarea
              placeholder="Apa yang sedang Anda pikirkan?"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  e.preventDefault(); // Mencegah perilaku default
                  handleAddPost(e.target.value.trim());
                  e.target.value = ""; // Kosongkan textarea setelah posting
                }
              }}
            />
          </div>
          <PostList
            posts={posts}
            onLike={handleLike}
            onDelete={handleDelete}
            onEdit={handleEdit}
            currentUser={currentUser}
          />
        </>
      ) : showRegister ? (
        <Register onRegister={handleRegister} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
      {!currentUser && (
        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? "Sudah punya akun? Login" : "Belum punya akun? Register"}
        </button>
      )}
    </div>
  );
};

export default App;