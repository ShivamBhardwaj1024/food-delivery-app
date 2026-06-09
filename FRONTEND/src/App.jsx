import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import FoodReels from "./components/Reels";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/reel" element={<FoodReels />} />
    </Routes>
  );
}

export default App;
