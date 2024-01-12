import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Registration/Register';
import Home from './Home/Home';
import Login from './SignIn/Login';
import ForgotPass from './Password/ForgotPass';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/reset" element={<ForgotPass/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
