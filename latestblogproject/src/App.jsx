import React, { useState, useEffect } from "react";
import successImage from './assets/images/blog-posts.png';
import errorImage from './assets/images/error-message.png';

/**
 * Component for displaying blog posts with an optional popup image.
 * It fetches data from an API, and handles success and error states with popup images.
 * 
 * @component
 * @example
 * return (
 *   <BlogPostsWithPopup />
 * )
 */
const BlogPostsWithPopup = () => {
  // State variables for storing posts, error messages, loading state, and popup image
  const [posts, setPosts] = useState([]);  // Stores fetched blog posts
  const [error, setError] = useState(null);  // Stores error message
  const [loading, setLoading] = useState(true);  // Tracks loading state
  const [popupImage, setPopupImage] = useState(null);  // Stores image URL for popup (success or error)

  /**
   * Fetch blog posts from the API when the component mounts.
   * Sets the posts in state or handles errors.
   * 
   * @returns {Promise<void>}
   */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts. Please try again later.");
        }
        const data = await response.json();
        setPosts(data); // Set the posts if successful
      } catch (err) {
        setError(err.message); // Set error message in case of failure
      } finally {
        setLoading(false); // Stop the loading spinner once data is fetched or an error occurs
      }
    };

    fetchPosts();
  }, []);

  /**
   * Handle the button click to simulate a success or error state.
   * Based on random success or failure, it shows an image and clears any previous error.
   * 
   * @returns {void}
   */
  const handleButtonClick = () => {
    const isSuccess = Math.random() > 0.5; // Simulate success or error

    if (isSuccess) {
      setPopupImage(successImage); // Show success image
      setError(null); // Clear any previous error message
    } else {
      setError(null); //Clear any previous error message
      setPopupImage(errorImage); // Show error image
    }
  };

  // Show loading message while posts are being fetched
  if (loading) return <p>Loading posts...</p>;

  // Show error message if there is an error
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <button onClick={handleButtonClick}>Click Me</button>

      {/* Conditional rendering: if there's a popupImage and no error, show success image */}
      {popupImage && !error ? (
        <div className="popup">
          <img
            src={popupImage} // Use the popupImage for success or error image
            alt="Success"
            style={{ maxWidth: "600px" }}
          />
        </div>
      ) : null}

      {/* Conditional rendering: if there's an error and no popupImage, show error image */}
      {error && !popupImage ? (
        <div className="popup">
          <img
            src={errorImage} // Display error image
            alt="Error"
            style={{ maxWidth: "600px" }}
          />
          <p>{error}</p> {/* Display the error message */}
        </div>
      ) : null}

      {/* Render blog posts if there is no error or popup image */}
      {!error && !popupImage && (
        <div>
          <h1>Blog Posts</h1>
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPostsWithPopup;
