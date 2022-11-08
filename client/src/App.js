import { Routes, Route } from "react-router-dom";
import Main from "./component/Main";
import Footer from "./component/Footer";
import NavBar from "./component/NavBar/NavBar";
import LoginPage from "./component/LoginPage/LoginPage";
import RegisterPage from "./component/RegisterPage/RegisterPage";
import VideoUploadPage from "./component/views/VideoUploadPage";

function App() {
  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/video/upload" element={<VideoUploadPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
