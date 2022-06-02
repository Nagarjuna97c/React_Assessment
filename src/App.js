import "./App.css";
import { Route, Routes } from "react-router-dom";

import Login from "./components/login/login";
import Register from "./components/Register/register";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
