import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";

function Post({ postData, userData }) {
  console.log("postData : ", postData);
  console.log("userData : ", userData);
  return (
    <div className="post-container">
      <video src={postData.downloadURL} />
      <div className="video-info">
        <div className="avatar-container">
          <Avatar
            alt="Remy Sharp"
            src={postData.profilePhotoURL}
            sx={{ margin: "0.5rem" }}
          />
        <p>{postData.profileName}</p>
        </div>
        <div className="post-like">
          <FavoriteIcon />
          <p>{postData.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
