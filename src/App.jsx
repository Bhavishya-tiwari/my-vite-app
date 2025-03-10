import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router basename="/my-vite-app">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-white text-xl font-bold">
            MyLogo
          </NavLink>
          <div className="space-x-4">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                isActive ? "text-white font-bold" : "text-gray-300 hover:text-white"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? "text-white font-bold" : "text-gray-300 hover:text-white"
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive ? "text-white font-bold" : "text-gray-300 hover:text-white"
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
