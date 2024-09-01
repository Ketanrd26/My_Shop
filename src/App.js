import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "../src/comp/header/Header";
import Sign from "./pages/sign/Sign";
import Login from "./pages/login/Login";
import ContextProvider from "./context";
import Admin from "./pages/admin/Admin";
function App() {
  return (
    <div className="App">

      <ContextProvider>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Sign />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      
      </ContextProvider>
    </div>
  );
}

export default App;
