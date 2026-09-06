import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Loans from "@/pages/Loans";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Apply from "@/pages/Apply";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loans" element={<Loans />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/apply" element={<Apply />} />
    </Routes>
  );
}
