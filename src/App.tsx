import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import CoinPage from "./routes/CoinPage";
import Navbar from "./routes/Navbar";
import NotFound from "./routes/NotFound";
import { ThemeContext, IThemeContext } from "./features/contexts/theme.context";

import "./App.scss";

function App() {
  const { theme } = useContext(ThemeContext) as IThemeContext;

  return (
    <div className={`app ${theme}`}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/coin/:coinId" element={<CoinPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
