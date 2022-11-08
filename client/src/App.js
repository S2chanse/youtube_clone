import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './component/Main';
import Footer from './component/Footer';
import NavBar from './component/NavBar/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
