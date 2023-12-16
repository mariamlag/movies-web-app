import Header from "./components/Header";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Search from "./components/Search";
import Movies from "./components/Movies";
import data from "./data/data.json";
import { useNavigate } from "react-router-dom";

function App() {
  const [movies] = useState(data);

  const navigate = useNavigate();
  const routesWithoutHeader = ["/login", "/signup"];
  //tu ar aris es ori path mashin darenderder header
  const shouldRenderHeader = !routesWithoutHeader.includes(
    window.location.pathname
  );

  useEffect(() => {
    // Check if the user is already logged in
    if (localStorage.getItem("logined") === "true") {
      navigate("/home");
    }
  }, [navigate]);
  useEffect(() => {
    // Check if the user is already logged in
    if (window.location.pathname === "/") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      {shouldRenderHeader && <Header></Header>}
      <Routes>
        <Route path={"/:filmnav"} element={<Movies movies={movies} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
