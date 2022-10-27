import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Comment from "./Comment";
import DisplayComments from "./DisplayComments";
function Post({ postData, userData }) {
  console.log("PostData : ", postData);
  console.log("userData : ", userData);
  const [like, setLike] = useState(false);
  // heart red -> jab logged in user ne like kia hta h
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log("dialog opened");
    setOpen(true);
  };

  const handleClose = () => {
    console.log("dialog closed");
    setOpen(false);
  };

  useEffect(() => {
    if (postData.likes.includes(userData.uid)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [postData]);

  const handleLike = async () => {
    if (like) {
      //unlike
      await updateDoc(doc(db, "posts", postData.postID), {
        likes: arrayRemove(userData.uid),
      });
    } else {
      //Like
      await updateDoc(doc(db, "posts", postData.postID), {
        likes: arrayUnion(userData.uid),
      });
    }
  };

  return (
    <div className="post-container">
      <div className="header">
        {/* Header of post */}
        <div className="avatar-container">
          <Avatar
            alt={postData.profileName}
            src={postData.profilePhotoURL}
            sx={{ margin: "0.5rem" }}
          />
          <p style={{ color: "black" }}>{postData.profileName}</p>
        </div>
      </div>

      <video src={postData.postURL} autoPlay muted controls />

      <div className="post-info">
        {/* footer of post : likes comments etc */}

        <div className="likes">
          <FavoriteIcon
            style={
              like
                ? { color: "red" }
                : { color: "black", cursor: "pointer", marginRight: "0.5rem" }
            }
            onClick={handleLike}
          />
          <p style={{ color: "black", margin: "0" }}>{postData.likes.length}</p>
        </div>

        <AddCommentIcon
          onClick={handleClickOpen}
          style={{ color: "black", cursor: "pointer" }}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="md"
        >
          <div
            className="modal-container"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "77vh",
            }}
          >
            <div
              className="video-modal"
              style={{ display: "contents", height: "80vh", width: "50%" }}
            >
              <video
                src={postData.postURL}
                style={{ width: "50%", height: "100%" }}
                autoPlay
                muted
                controls
              />
            </div>
            <div className="comments-modal">
              <Card sx={{ maxWidth: 345, border: "none" }}>
                {/* All the comments  */}
                <DisplayComments postData={postData} />
              </Card>

              <br />
              <Card
                sx={{
                  maxWidth: 345,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Likes */}

                <div className="likes">
                  <FavoriteIcon
                    style={
                      like
                        ? { color: "red" }
                        : {
                            color: "black",
                            cursor: "pointer",
                            marginRight: "0.5rem",
                          }
                    }
                    onClick={handleLike}
                  />
                  <Typography>
                    {postData.likes.length == 0
                      ? `Be the first one to like this post`
                      : `Liked by ${postData.likes.length} users `}
                  </Typography>
                </div>
                <Comment postData={postData} userData={userData} />
              </Card>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default Post;
