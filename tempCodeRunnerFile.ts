// src/components/Post.js
import React, { useState } from "react";

const Post = ({ post, onDelete, onEdit, onLike }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(post.id, editedText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="post">
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <p>{post.text}</p>
      )}
      <button onClick={() => onDelete(post.id)}>Hapus</button>
      <button onClick={handleEdit}>{isEditing ? "Simpan" : "Edit"}</button>
      <button onClick={() => onLike(post.id)}>Like ({post.likes})</button>
    </div>
  );
};

export default Post;
