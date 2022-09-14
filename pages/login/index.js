import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import logo from "../../assets/Instagram.jpg";
import Button from "@mui/material/Button";
import { Carousel } from "react-responsive-carousel";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import bg4 from "../../assets/bg4.jpg";
import bg5 from "../../assets/bg5.jpg";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import Link from "next/link";
function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { login , user } = useContext(AuthContext);

  useEffect(()=>{
    if(user){
      // route to feeds page
      router.push("/");
    }
  },[user])

  let handleClick = async () => {
    try {
      setLoading(true);
      setError("");
      await login(email,password);
      console.log("Logged in !!");
    }catch (err) {
      setError(err.code);
      console.log("Error occured");
      // use setTimeout to remove error after 2 sec 
      setTimeout(() => {
        setError("");
      }, 2000);
    }

    setLoading(false);
    
  };
  return (
    <div className="login-container">
      <div className="insta-mob-bg">
        <Carousel
          className="carousel"
          autoPlay
          interval={2000}
          infiniteLoop={true}
          showArrows={false}
          showThumbs={false}
          showIndicators={false}
          stopOnHover
          showStatus={false}
        >
          <Image src={bg1} />
          <Image src={bg2} />
          <Image src={bg3} />
          <Image src={bg4} />
          <Image src={bg5} />
        </Carousel>
      </div>
      <div>
        <div className="login-card">
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
          {/* If error is present then show error */}
          {error!="" && <div style={{ color: "red" }}>{error}</div>}
          <div style={{ color: "blue", marginTop: "0.5rem" }}>
            Forget Password{" "}
          </div>

          <Button
            style={{ marginTop: "1rem" }}
            variant="contained"
            component="label"
            fullWidth
            onClick={handleClick}
          >
            Log in
          </Button>
        </div>
        <div className="bottom-card">
          Don't Have an account ?{" "}
          <Link href="./signup">
            <span style={{ color: "blueviolet" , cursor:"pointer"}}>Signup</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default index;
