import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeContext/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";

const LDmodeBtn = () => {
  const pageThemeContext = useContext(ThemeContext);

  return (
    <div>
      {pageThemeContext.isToggled ? (
        <FiMoon className="toggleBtn" onClick={pageThemeContext.toggleTheme} />
      ) : (
        <FiSun className="toggleBtn" onClick={pageThemeContext.toggleTheme} />
      )}
    </div>
  );
};

export default LDmodeBtn;
