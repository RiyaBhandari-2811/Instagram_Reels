import "../styles/globals.css";
import "../pages/signup/signup.css";
import "../pages/login/login.css";
import "../components/feed.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AuthWrapper from "../context/auth";
import "../components/Profile.css"

function MyApp({ Component, pageProps }) {
  return (
    <AuthWrapper>
      <Component {...pageProps} />
    </AuthWrapper>
  );
}

export default MyApp;
