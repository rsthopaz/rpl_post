import React, {useState} from "react";

const Post = ({ post, onLike, onDelete, onEdit, onReply, currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.text);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleEdit = () => {
    if(isEditing){
      onEdit(post.id, editedText);
    }
    setIsEditing(!isEditing);
  }

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      onReply(post.id, replyText);
      setReplyText("");
      setShowReplyForm(false);
    }
  };

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
<div className="post-actions">
        <button
          onClick={() => onLike(post.id)}
          style={{ color: post.likes.includes(currentUser.username) ? "red" : "black" }}
        >
          {post.likes.includes(currentUser.username) ? "Unlike" : "Like"} ({post.likes.length})
        </button>
        
        <button onClick={() => setShowReplyForm(!showReplyForm)}>
          Reply
        </button>

        {post.author === currentUser.username && (
          <>
            <button onClick={handleEdit}>
              {isEditing ? "Simpan" : "Edit"}
            </button>
            <button onClick={() => onDelete(post.id)}>Hapus</button>
          </>
        )}
      </div>{showReplyForm && (
        <form onSubmit={handleReplySubmit} className="reply-form">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
          />
          <button type="submit">Post Reply</button>
        </form>
      )}
    </div>
  );
};

export default Post;