// PostList.js
import React from 'react';
import Thread from './Thread';

const PostList = ({ posts, allPosts, onLike, onDelete, onEdit, onReply, currentUser }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Thread
          key={post.id}
          post={post}
          allPosts={allPosts}
          onLike={onLike}
          onDelete={onDelete}
          onEdit={onEdit}
          onReply={onReply}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default PostList;