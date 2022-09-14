import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import Upload from "./Upload";
import { AuthContext } from "../context/auth";
import { useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";
function Feed() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("user", user);
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      // why call back  ?? coz we're implementing real time thing so if any change occurs it will call the callback and we've make the state so we will update it
      console.log("hello", doc.data());
      setUserData(doc.data());
    });
    return () => {
      unsub();
    };
  }, [user]);

  // Get post from Db here we'll see all members post only in profile we'll get to our own post this is difference to be NOTED .
  useEffect(() => {
    console.log(user.uid);
    const unsub = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snaps) => {
        let tempArray = [];
        snaps.docs.map((doc) => tempArray.push(doc.data()));
        console.log(tempArray);
        setPosts([...tempArray]);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  return (
    <div className="feed-container">
      <Navbar userData={userData} />
      <Upload userData={userData} />
      <div className="videos-container">
        {posts.map((post) => (
          <Post postData={post} userData={userData} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
