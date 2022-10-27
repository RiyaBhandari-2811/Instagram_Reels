import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import logo from "../../assets/Instagram.jpg";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fullname, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const router = useRouter();
  const { signup, user } = useContext(AuthContext);

  // useEffect(() => {
  //   if (user) {
  //     router.push("/");
  //   }
  // }, [user]);  

  let handleClick = async () => {
    console.log(email);
    console.log(password);
    console.log(fullname);
    console.log(file);
    try {
      setLoading(true);
      setEmail("");
      const userInfo = await signup(email, password);
      console.log(userInfo.user.uid);

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, `${userInfo.user.uid}/Profile`);
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            let userData = {
              fullname,
              email,
              password,
              downloadURL,
              uid: userInfo.user.uid,
              posts : [] ,
            };
            // doc ((db,collection name, document name ), jo data put karna hai) 
            await setDoc(doc(db, "users", userInfo.user.uid), userData);
            console.log("doc added to db");
          });
        }
      );
      console.log("User Signed up ");
    } 
    catch (err) {
      console.log("err", err);
      setError(err.code);
      // use settimeout to remove error after 2sec
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <Image src={logo} />
        <TextField
          id="outlined-basic"
          size="small"
          label="Email"
          variant="outlined"
          fullWidth
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          size="small"
          label="Password"
          variant="outlined"
          fullWidth
          margin="dense"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          size="small"
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="dense"
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Button
          color="secondary"
          variant="outlined"
          component="label"
          fullWidth
          size="small"
        >
          {/* <IconButton color="secondary">
            <CloudUploadIcon />
          </IconButton> */}
          Upload Profile Image
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </Button>

        <Button
          style={{ marginTop: "1rem" }}
          variant="contained"
          component="label"
          fullWidth
          onClick={handleClick}
        >
          Sign Up
        </Button>
        <div className="tnc">
          By signing up, you agree to our Terms, Conditions and Cookies policy.
        </div>
      </div>
      <div className="bottom-card">
        Already Have an account ?{" "}
        <Link href="/login">
          <span style={{ color: "blueviolet", cursor: "pointer" }}>Login</span>
        </Link>
      </div>
    </div>
  );
}

export default index;
