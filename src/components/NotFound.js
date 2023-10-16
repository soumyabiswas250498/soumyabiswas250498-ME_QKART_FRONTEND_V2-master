import React from "react";
import "./NotFound.css"; // You can create a custom CSS file for styling

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-header">404</h1>
      <p className="not-found-text">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        className="not-found-button"
        onClick={() => (window.location.href = "/")}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
