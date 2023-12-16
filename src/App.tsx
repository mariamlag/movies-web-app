import Header from "./components/Header";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Search from "./components/Search";
import Movies from "./components/Movies";
// import Trending from "./components/Trending";
import data from "./data/data.json";
import { useNavigate } from "react-router-dom";

function App() {
  const handleLogin = (data: FormData) => {
    // Handle login logic here
    console.log("Logging in with:", data);
  };
  const [movies, setMovies] = useState(data);

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

  return (
    <>
      {shouldRenderHeader && <Header></Header>}
      <Routes>
        {/* <Route path="/" element={<Header />} /> */}
        <Route path={"/:filmnav"} element={<Movies movies={movies} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
