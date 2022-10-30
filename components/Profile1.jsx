import React, { useContext,useEffect, useState } from "react";
import NavBar from "./NavBar";
import Image from "next/image";
import user from "../assets/avatar.png";
import { AuthContext } from "../context/auth";

import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";


function Profile1() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [postIds, setPostIds] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    // console.log(user.uid);
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      console.log("doc" , doc.data());
      setUserData(doc.data());
      setPostIds(doc.data().posts);
    });
    return () => {
      unsub();
    };
  }, [user]);

  useEffect(() => {
    let tempArr = [];
    postIds.map(pid => {
      const unsub = onSnapshot(doc(db, "posts", pid), (doc) => {
        tempArr.push(doc.data());
        setUserPosts([...tempArr]);
        console.log("hello",tempArr);
      });
      return () => {
        unsub();
      };
    })
  }, [postIds]);


  return (
    <div>
      <NavBar userData={userData} />
      <div>
        <div className="profile-intro">
          <div
            style={{ height: "8rem", width: "8rem" , clipPath: "circle(50%)" }}
          >
            <Image width={500} height={500} src={userData.downloadURL}  />
          </div>
          <div>
            <h1>{userData.fullname}</h1>
            <h1>Posts:{userData.posts?.length}</h1>
          </div>
        </div>
        <hr />
        <div className="profile-posts">{userPosts.map(( post , idx) => (
          <video src={post.postURL} key={idx} ></video>
        ))}</div>
      </div>
    </div>
  );
}

export default Profile1 ;