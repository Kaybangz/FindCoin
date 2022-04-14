import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import { ThemeContext } from "./ThemeContext/ThemeContext";
import MainDisplay from "./pages/MainDisplay/MainDisplay";
import SingleDisplay from "./pages/SingleDisplay/SingleDisplay";

const App = () => {
  const [pageTheme, setPageTheme] = useState("darkTheme");
  const [isToggled, setIsToggled] = useState(false);

  const toggleTheme = () => {
    setIsToggled(!isToggled);
    setPageTheme((currTheme) =>
      currTheme === "lightTheme" ? "darkTheme" : "lightTheme"
    );
  };

  return (
    <ThemeContext.Provider value={{ pageTheme, toggleTheme, isToggled }}>
      <main className="main__wrapper" id={pageTheme}>
        <Navbar toggleTheme={toggleTheme} isToggled={isToggled} />
        <Routes>
          <Route path="/" element={<MainDisplay />} />
          <Route path="/coin/:id" element={<SingleDisplay />} />
        </Routes>
      </main>
    </ThemeContext.Provider>
  );
};

export default App;
