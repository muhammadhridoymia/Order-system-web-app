import React, { useState } from "react";
import "./Post.css";
import { useCart } from "../../context/CartContext";

export default function Post() {
  const { post = [], setPost } = useCart();
  console.log("Post Data from post page:", post);

  const [commentInputs, setCommentInputs] = useState({});

  // Like Handler
  const handleLike = (id) => {
    const updated = post.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post,
    );
    setPost(updated);
  };

  // Handle Input Change
  const handleInputChange = (id, value) => {
    setCommentInputs({
      ...commentInputs,
      [id]: value,
    });
  };

  // Add Comment
  const handleComment = (id) => {
    if (!commentInputs[id] || commentInputs[id].trim() === "") return;

    const updated = post.map((post) =>
      post.id === id
        ? { ...post, comments: [...post.comments, commentInputs[id]] }
        : post,
    );

    setPost(updated);

    setCommentInputs({
      ...commentInputs,
      [id]: "",
    });
  };

  return (
    <div className="post-container">
      {post.map((post) => (
        <div key={post.id} className="post-card">
          <img src={post.image} alt="post" className="post-image" />

          <p className="post-message">{post.message}</p>

          <div className="post-actions">
            <button
              onClick={() => handleLike(post.id)}
              className="btn like-btn"
            >
              👍 {post.likes}
            </button>

            <button onClick={() => alert("Shared!")} className="btn share-btn">
              🔗 Share
            </button>
          </div>

          <div className="comment-section">
            {post.comments.map((comment, index) => (
              <p key={index} className="comment">
                💬 {comment}
              </p>
            ))}

            <input
              type="text"
              placeholder="Write a comment..."
              value={commentInputs[post.id] || ""}
              onChange={(e) => handleInputChange(post.id, e.target.value)}
              className="comment-input"
            />

            <button
              onClick={() => handleComment(post.id)}
              className="btn comment-btn"
            >
              Add Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
