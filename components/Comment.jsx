import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { db } from '../firebase';
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

function Comment({ postData , userData}) {
    console.log("userData" , userData );
    const [comment, setComment] = useState("");

  const handleComment = async () => {
    let uid = uuidv4();
    const Commentobj = {
      text: comment,
      userDP: userData.downloadURL,
      userName: userData.fullname,
      CommentId: uid,
      postId: postData.postID,
    };
    await setDoc(doc(db, "comments", uid), Commentobj);
    await updateDoc(doc(db, "posts", postData.postID), {
      comments: arrayUnion(uid),
    });
      setComment('');
  };
  return (
    <div className="addComment" sx={{width: "100%" }}>
    {/* Comment */}
    <TextField
      id="standard-basic"
      label="Add Comment"
      variant="standard"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    />
    {/* Button */}
    <Button variant="contained" size="small" endIcon={<SendIcon size="small" />} sx={{marginTop : "1rem"}} onClick={handleComment}>
      Post
    </Button>
  </div>
  )
}

export default Comment