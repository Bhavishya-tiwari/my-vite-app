// src/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import UnGroupped from "./pages/UnGroupped";
import Groupped from "./pages/Groupped";
import SessionUnGroupped from "./pages/SessionUnGroupped";
import SessionGroupped from "./pages/SessionGroupped";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UnGroupped />} />
      <Route path="/ungroupped" element={<UnGroupped />} />
      <Route path="/groupped" element={<Groupped />} />
      <Route path="/session-ungroupped" element={<SessionUnGroupped />} />
      <Route path="/session-groupped" element={<SessionGroupped />} />
    </Routes>
  );
}

export default AppRoutes;
