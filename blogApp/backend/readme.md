CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    blog_id INT REFERENCES blog(id) ON DELETE CASCADE,  -- Foreign key referencing the blog
    user_id INT REFERENCES users(id) ON DELETE CASCADE,  -- Foreign key referencing the user
    parent_comment_id INT REFERENCES comments(comment_id) ON DELETE CASCADE,  -- Self-referencing for replies
    content TEXT NOT NULL,  -- Comment content
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
