import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import users from "../assets/avatar.png";
import { AuthContext } from "../context/auth";
import { useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
function Profile() {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [postIds, setPostIds] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    console.log(user);
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      setUserData(doc.data());
      setPostIds(doc.data().posts);
    });
    return () => {
      unsub();
    };
  }, [user]);

  useEffect(() => {
    let tempArr = [];
    postIds.map((pid) => {
      const unsub = onSnapshot(doc(db, "posts", pid), (doc) => {
        tempArr.push(doc.data());
        setUserPosts([...tempArr]);
        console.log("hello",tempArr);
      });
    })
  }, [postIds]);

  
  return (
    <div>
      <Navbar userData={userData} />
      <div>
        <div className="profile-intro">
          <div
            style={{ height: "8rem", width: "8rem", clipPath: "circle(50%)" }}
          >
            <Image layout="fill" src={userData.do} />
          </div>
          <div>
            <h1>Riya Bhandari</h1>
            <h1>Posts:12</h1>
          </div>
        </div>
        <div className="profile-posts">
          <video src="https://firebasestorage.googleapis.com/v0/b/reels-839c5.appspot.com/o/posts%2Fa7cfed8e-8193-430d-909a-e10e64de47a8%2Fstream%20(2).mp4?alt=media&token=85920cf2-9f35-4bb6-8b12-f628d418e93b"></video>
          <video src="https://firebasestorage.googleapis.com/v0/b/reels-839c5.appspot.com/o/posts%2Fa0cec983-0c29-48a8-bdcd-e54d5e577405%2Fa0ZOwXX_460svvp9.webm?alt=media&token=02f2d8fb-b77a-48b9-827c-fadcfe9b32d3"></video>
          <video src="https://firebasestorage.googleapis.com/v0/b/reels-839c5.appspot.com/o/posts%2F976ed55a-3c35-4e03-a431-e1e4a05ab78e%2F%F0%9F%98%8EBoys%20Attitude%20Status%20%F0%9F%94%A5-%20Attitude%20WhatsApp%20Status%20Video%202020%20-%20Attitude%20Status.mp4?alt=media&token=f047879c-4bee-49b8-8ff0-e1b6fe3ce8e6"></video>
          <video src="https://firebasestorage.googleapis.com/v0/b/reels-839c5.appspot.com/o/posts%2F976ed55a-3c35-4e03-a431-e1e4a05ab78e%2F%F0%9F%98%8EBoys%20Attitude%20Status%20%F0%9F%94%A5-%20Attitude%20WhatsApp%20Status%20Video%202020%20-%20Attitude%20Status.mp4?alt=media&token=f047879c-4bee-49b8-8ff0-e1b6fe3ce8e6"></video>
          <video src="https://firebasestorage.googleapis.com/v0/b/reels-839c5.appspot.com/o/posts%2F976ed55a-3c35-4e03-a431-e1e4a05ab78e%2F%F0%9F%98%8EBoys%20Attitude%20Status%20%F0%9F%94%A5-%20Attitude%20WhatsApp%20Status%20Video%202020%20-%20Attitude%20Status.mp4?alt=media&token=f047879c-4bee-49b8-8ff0-e1b6fe3ce8e6"></video>
          <video src="https://firebasestorage.googleapis.com/v0/b/reels-839c5.appspot.com/o/posts%2F976ed55a-3c35-4e03-a431-e1e4a05ab78e%2F%F0%9F%98%8EBoys%20Attitude%20Status%20%F0%9F%94%A5-%20Attitude%20WhatsApp%20Status%20Video%202020%20-%20Attitude%20Status.mp4?alt=media&token=f047879c-4bee-49b8-8ff0-e1b6fe3ce8e6"></video>
        </div>
      </div>
    </div>
  );
}

export default Profile;
