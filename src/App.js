import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Registration/Register';
import Home from './Home/Home';
import Login from './SignIn/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
