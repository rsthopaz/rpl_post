import React, {useState} from "react";
import Post from "./Post";

const PostList = ({ posts, onLike, onDelete, onEdit, currentUser }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onLike={onLike}
          onDelete={onDelete}
          onEdit={onEdit}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default PostList;