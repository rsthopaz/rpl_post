import React from "react";

const Navbar = ({ currentUser, onLogout }) => {
  return (
    <div className="navbar">
      {currentUser ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={currentUser.profileImage}
              alt="Profile"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <span>Halo, {currentUser.username}!</span>
            <span>11.42 AM</span>
          </div>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <span>Silakan login atau register</span>
      )}
    </div>
  );
};

export default Navbar;
