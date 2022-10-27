import { Button, IconButton, LinearProgress } from "@mui/material";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import MovieIcon from "@mui/icons-material/Movie";
import {v4 as uuidv4} from "uuid" ;
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";

function Upload({userData}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress , setProgress] = useState(0);
  const fileLimit = 50;

  const handleChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file == null) {
      setError("File Not Selected");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    if ( (file.size / (1024 * 1024) )> fileLimit) {
      // not more then 50mb
      setError(
        `File too large , try uploading a file less then ${fileLimit} mb `
      );
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    // user selected file is right with no error  now here onwards we've to upload it 
    let uid = uuidv4() ; //post uid 
    setLoading(true);
    // Upload file and metadata to the object 'images/mountains.jpg'
    // UserId / post / uid .
    const storageRef = ref(storage, `${userData.uid}/post/${uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const prog =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
        console.log("Upload is " + prog + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        setError(error);
        setTimeout(() => {
          setError("");
        }, 5000);
      return ; 
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        setLoading(false);
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          let postObj = {
            likes: [] ,
            comments: [] ,
            postID : uid ,
            userID : userData.uid ,
            postURL : downloadURL ,
            profilePhotoURL : userData.downloadURL ,
            profileName : userData.fullname,
            timestamp : serverTimestamp() ,
          };
          console.log(postObj);
          await setDoc(doc(db, "posts", uid), postObj);
          console.log("post added to postcollection ");

          // Update in users , posts ka array
          await updateDoc(doc(db,"users",userData.uid),{
            posts : arrayUnion(uid),
          });
          console.log("Posts array added to user doc");
        });
      }
    );
    console.log("User Signed up ");

  };
  return (
    <div className="upload-btn">
      {error != "" ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Button
          color="secondary"
          variant="outlined"
          component="label"
          size="large"
          startIcon={<MovieIcon />}
        >
          Upload Video
          <input hidden accept="video/*" type="file" onChange={handleChange} />
        </Button>
      )}
      {
        // agar loading hori hai i.e true then show progress bar . if not then remove the progress bar
        loading && (
          <LinearProgress
            color="secondary"
            variant="determinate"
            value={progress}
            sx={{ mt: "0.2rem" }}
          />
        )
      }
    </div>
  );
}

export default Upload;
