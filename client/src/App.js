import { Routes, Route } from "react-router-dom";
import Main from "./component/Main";
import Footer from "./component/Footer";
import NavBar from "./component/NavBar/NavBar";
import LoginPage from "./component/LoginPage/LoginPage";
import RegisterPage from "./component/RegisterPage/RegisterPage";
import VideoUploadPage from "./component/views/VideoUploadPage";
import VideoDetailPage from "./component/views/VideoDetailPage";
import Subscription from "./component/views/SubscriptionPage/Subscription";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/video/upload" element={<VideoUploadPage />} />
        <Route
          path="/video/detail/:videoId/:writerId"
          element={<VideoDetailPage />}
        />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
