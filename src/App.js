import React, { useState, useEffect } from 'react';
import PostForm from './components/PostForm';
import Posts from './components/Posts';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchId, setSearchId] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        setError('Error retrieving posts.');
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchId === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => post.id.toString() === searchId);
      setFilteredPosts(filtered);
    }
  }, [searchId, posts]);

  const handleSearch = (e) => {
    setSearchId(e.target.value);
  };

  const addPost = async (title, body) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body,
        userId: 1,
      });
      const newPost = response.data;
      setPosts([...posts, newPost]);
    } catch (error) {
      setError('Error creating post.');
    }
  };

  const updatePost = async (id, title, body) => {
    if (id <= 100) {
      try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          id,
          title,
          body,
          userId: 1,
        });
        const updatedPost = response.data;
        const updatedPosts = posts.map(post =>
          post.id === updatedPost.id ? updatedPost : post
        );
        setPosts(updatedPosts);
      } catch (error) {
        setError('Error updating post.');
      }
    } else {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const newPostResponse = await axios.post('https://jsonplaceholder.typicode.com/posts', {
          id,
          title,
          body,
          userId: 1,
        });
        const newPost = newPostResponse.data;
        const updatedPosts = posts.map(post =>
          post.id === id ? newPost : post
        );
        setPosts(updatedPosts);
      } catch (error) {
        setError('Error updating post.');
      }
    }
  }; 

  const deletePost = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
    } catch (error) {
      setError('Error deleting post.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Create Post</h1>
      <PostForm onSubmit={addPost} />
      <h1>Posts</h1>
      <input type="text" placeholder="Enter post ID" value={searchId} onChange={handleSearch} />
      <Posts posts={filteredPosts} deletePost={deletePost} updatePost={updatePost} />
    </div>
  );
};

export default App;
