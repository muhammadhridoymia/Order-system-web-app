import React, { useState } from "react";
import "./Post.css";

export default function Post() {

  const demoPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      message: "Enjoying a beautiful day with delicious food 🍕",
      likes: 12,
      comments: ["Looks tasty!", "Wow 😍"]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
      message: "Coffee time ☕",
      likes: 8,
      comments: ["I need this now!", "Perfect shot!"]
    }
  ];

  const [posts, setPosts] = useState(demoPosts);
  const [commentInputs, setCommentInputs] = useState({});

  // Like Handler
  const handleLike = (id) => {
    const updated = posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updated);
  };

  // Handle Input Change
  const handleInputChange = (id, value) => {
    setCommentInputs({
      ...commentInputs,
      [id]: value
    });
  };

  // Add Comment
  const handleComment = (id) => {
    if (!commentInputs[id] || commentInputs[id].trim() === "") return;

    const updated = posts.map(post =>
      post.id === id
        ? { ...post, comments: [...post.comments, commentInputs[id]] }
        : post
    );

    setPosts(updated);

    setCommentInputs({
      ...commentInputs,
      [id]: ""
    });
  };

  return (
    <div className="post-container">
      {posts.map(post => (
        <div key={post.id} className="post-card">

          <img src={post.image} alt="post" className="post-image" />

          <p className="post-message">{post.message}</p>

          <div className="post-actions">
            <button onClick={() => handleLike(post.id)} className="btn like-btn">
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