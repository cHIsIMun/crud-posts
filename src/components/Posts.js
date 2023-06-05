import React, { useState } from 'react';

const Posts = ({ posts, deletePost, updatePost }) => {
    const [editingId, setEditingId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedBody, setEditedBody] = useState('');
  
    const handleEdit = (post) => {
      setEditingId(post.id);
      setEditedTitle(post.title);
      setEditedBody(post.body);
    };
  
    const handleSave = () => {
      if (editingId) {
        updatePost(editingId, editedTitle, editedBody);
        setEditingId(null);
      }
    };
  
    const handleCancel = () => {
      setEditingId(null);
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {posts.map(post => (
          <div key={post.id}>
            {editingId === post.id ? (
              <div>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                ></textarea>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            ) : (
              <div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <button onClick={() => deletePost(post.id)}>Delete</button>
                <button onClick={() => handleEdit(post)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  
export default Posts;