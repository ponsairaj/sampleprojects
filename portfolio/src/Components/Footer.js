import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Inline styles for the footer
  const footerStyle = {
    backgroundColor: "#000", // Dark background
    color: "#fff",           // White text
    textAlign: "center",     // Center align text
    padding: "20px 0",       // Padding for spacing
    position: "relative",       // Stick footer to the bottom
    bottom: 0,
    width: "100%",
    fontSize: "14px"
  };

  return (
    <footer style={footerStyle}>
      <div>
        <p>© {currentYear} All rights reserved</p>
      </div>
    </footer>
  );
}
