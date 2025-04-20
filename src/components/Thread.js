// Thread.js
import React from 'react';
import Post from './Post';

const Thread = ({ post, allPosts, onLike, onDelete, onEdit, onReply, currentUser }) => {
  const replies = allPosts.filter(p => p.parentId === post.id);

  return (
    <div className="thread" style={{ marginLeft: `${post.depth * 20}px` }}>
      <Post
        post={post}
        onLike={onLike}
        onDelete={onDelete}
        onEdit={onEdit}
        onReply={onReply}
        currentUser={currentUser}
      />
      {replies.length > 0 && (
        <div className="replies">
          {replies.map(reply => (
            <Thread
              key={reply.id}
              post={reply}
              allPosts={allPosts}
              onLike={onLike}
              onDelete={onDelete}
              onEdit={onEdit}
              onReply={onReply}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Thread;