import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Books from "./Pages/Books";
import Authors from "./Pages/Authors";
import Orders from "./Pages/Orders";

export default function App() {
  return (
    <Router>
      <nav className="bg-zinc-900 text-white p-4 flex justify-center gap-20">
        <Link to="/">Books</Link>
        <Link to="/authors">Authors</Link>
        <Link to="/orders">Orders</Link>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}
