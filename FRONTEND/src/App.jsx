import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import FoodReels from "./components/Reels";
import FoodPartner from "./pages/Foodpartner";
import ProtectedRouts from "./components/ProtectedRouts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRouts><Home /></ProtectedRouts>} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/reel" element={<ProtectedRouts><FoodReels /></ProtectedRouts>} />
      <Route path="/foodpartner" element={<ProtectedRouts><FoodPartner /></ProtectedRouts>} />
    </Routes>
  );
}

export default App;
