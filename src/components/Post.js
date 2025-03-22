import React, {useState} from "react";

const Post = ({ post, onLike, onDelete, onEdit, currentUser }) => {
  const hasLiked = post.likes.includes(currentUser.username);
  const isAuthor = post.author === currentUser.username;
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.text);

  const handleEdit = () => {
    if(isEditing){
      onEdit(post.id, editedText);
    }
    setIsEditing(!isEditing);
  }

  return (
    <div className="post">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={currentUser.profileImage}
              alt="Profile"
              style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            />
            <small>{post.author}!</small>
            {/* <span>11.42 AM</span> */}
      </div>
      {
        isEditing ? (
          <textarea value={editedText} onChange={(e) => setEditedText(e.target.value)} style={{width: "100%", height: "80px"}}/>
          ) : (
          <p style={{maxWidth: "100%", wordWrap: "break-word"}}>{post.text}</p>
          )
      }
      {/* <p style={{maxWidth: "100%", wordWrap: "break-word"}}>{post.text}</p> */}
      {/* <small>Oleh: {post.author}</small> */}
      <button
        onClick={() => onLike(post.id)}
        style={{ color: hasLiked ? "red" : "black" }}
      >
        {hasLiked ? "Unlike" : "Like"} ({post.likes.length})
      </button>
      
      {
      isAuthor && ( // Tampilkan tombol edit hanya jika pengguna adalah penulis
        <button onClick={handleEdit}>
          {isEditing ? "Simpan" : "Edit"}
        </button>
      )}
      {isAuthor && ( // Tampilkan tombol hapus hanya jika pengguna adalah penulis
        <button onClick={() => onDelete(post.id)}>Hapus</button>
      )}
      {/* <button onClick={() => onDelete(post.id)}>Delete</button> */}
    </div>
  );
};

export default Post;