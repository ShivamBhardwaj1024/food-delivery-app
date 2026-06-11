import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import FoodReels from "./components/Reels";
import FoodPartner from "./pages/Foodpartner";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/reel" element={<FoodReels />} />
      <Route path="/foodpartner" element={<FoodPartner />} />
    </Routes>
  );
}

export default App;
