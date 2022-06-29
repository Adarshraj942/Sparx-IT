import HomePage from "./Pages/HomePage/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Otp from "./Components/Otp/Otp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
      </Routes>
    </div>
  );
}

export default App;
