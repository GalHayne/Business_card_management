import { createContext, useState } from "react";

const DarkContext = createContext();

function Provider({ children }) {
    
  const [theme, setTheme] = useState("light");

  const toogleTheme = () => {
    setTheme((prev) => {
      return prev === "light" ? "dark" : "light";
    });
  };

  const valueToShare = {
    toogleTheme,
    theme,
  };

  return (
    <DarkContext.Provider value={valueToShare}>{children}</DarkContext.Provider>
  );
}

export { Provider };
export default DarkContext;
