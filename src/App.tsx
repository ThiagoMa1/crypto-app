import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import CoinPage from "./routes/CoinPage";
import Navbar from "./routes/Navbar";

import "./App.scss";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/coin/:coinId" element={<CoinPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
