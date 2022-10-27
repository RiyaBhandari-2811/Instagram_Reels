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
      (snapshot) => {
        let tempArray = [];
        snapshot.docs.map((doc) => tempArray.push(doc.data()));
        console.log(tempArray);
        setPosts([...tempArray]);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const callback = (entries) => {
    entries.forEach((entry) => {
      let ele = entry.target.childNodes[1];
      console.log("ele : " , ele );
      ele.play().then(() => {
        if (!ele.paused && !entry.isIntersecting) {
          console.log("isIntersecting : ", entry.isIntersecting);
          ele.pause();
        }
      });
    });
  };

  let options = {
    threshold: 0.6,
  };

  let observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    const elements = document.querySelectorAll(".videos-container");
    console.log("elements : ", elements);
    let postContainer = elements[0].childNodes;
    console.log("postContainer : ",postContainer);
    postContainer.forEach((video) => {
      console.log("childNodes : ", video.childNodes[1]);
       observer.observe(video);
    });

    //cleanup 
    return () => {
      observer.disconnect();
    }
  }, [posts]);


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
